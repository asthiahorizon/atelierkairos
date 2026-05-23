import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'atelier_kairos';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@atelierkairos.ch').toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kairos-admin';
const EMERGENT_LLM_KEY = process.env.EMERGENT_LLM_KEY || '';

// Token = base64(email:password). Simple stateless auth, fine for single-admin CMS.
function makeToken(email, password) {
  return Buffer.from(`${email}:${password}`).toString('base64');
}
function checkToken(token) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const idx = decoded.indexOf(':');
    if (idx < 0) return false;
    const email = decoded.slice(0, idx).toLowerCase();
    const password = decoded.slice(idx + 1);
    return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
  } catch { return false; }
}

const VALID_TYPES = ['programmes', 'ateliers', 'creations', 'articles'];

// Default seed content for first load (admin can edit/delete freely afterwards)
const SEED_DATA = {
  programmes: [
    { title: 'Neurodivergence en entreprise', subtitle: 'Axe 01', description: "Comprendre les fonctionnements atypiques, adapter les environnements, valoriser les forces créatives et cognitives.", tags: ['neurodivergence', 'inclusion'], order: 1 },
    { title: 'Créativité corporelle', subtitle: 'Axe 02', description: "Utiliser le corps, le mouvement et la présence comme portes d'accès à l'innovation et à l'intelligence collective.", tags: ['corps', 'créativité'], order: 2 },
    { title: 'Régulation du système nerveux', subtitle: 'Axe 03', description: "Reconnaître les états de stress, surcharge, figement ou dispersion — et développer des ressources concrètes de régulation.", tags: ['régulation', 'stress'], order: 3 },
    { title: "Ateliers d'équipe", subtitle: 'Axe 04', description: "Créer des espaces d'expérimentation, de respiration et de transformation collective.", tags: ['équipe', 'collectif'], order: 4 },
    { title: 'Projets créatifs', subtitle: 'Axe 05', description: "Soutenir les équipes dans l'émergence, la clarification et la matérialisation d'idées nouvelles.", tags: ['projets', 'innovation'], order: 5 },
  ],
};

async function ensureSeed(db, type) {
  if (!SEED_DATA[type]) return;
  const meta = await db.collection('cms_meta').findOne({ key: `seeded_${type}` });
  if (meta) return;
  const now = new Date().toISOString();
  const docs = SEED_DATA[type].map((d) => ({
    id: uuidv4(),
    type,
    title: d.title || '',
    subtitle: d.subtitle || '',
    description: d.description || '',
    content: d.content || '',
    imageUrl: d.imageUrl || '',
    tags: d.tags || [],
    published: true,
    order: d.order || 0,
    createdAt: now,
    updatedAt: now,
  }));
  if (docs.length) {
    try { await db.collection('cms_entries').insertMany(docs); } catch (e) { console.error('Seed:', e.message); }
  }
  try { await db.collection('cms_meta').insertOne({ key: `seeded_${type}`, at: now }); } catch (e) { /* ignore */ }
}

let cachedClient = null;
async function getDb() {
  if (cachedClient) return cachedClient.db(DB_NAME);
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  cachedClient = client;
  return client.db(DB_NAME);
}

let cachedTransporter = null;
function getTransporter() {
  if (cachedTransporter) return cachedTransporter;
  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.infomaniak.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });
  return cachedTransporter;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Password',
  };
}

function checkAdmin(request) {
  const token = request.headers.get('x-admin-token') || request.headers.get('x-admin-password') || '';
  // Backward compatibility: also accept raw password as token
  if (checkToken(token)) return true;
  if (token === ADMIN_PASSWORD) return true;
  return false;
}

export async function OPTIONS() { return new NextResponse(null, { status: 204, headers: corsHeaders() }); }

export async function GET(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path === '' || path === 'health') {
      return NextResponse.json({ status: 'ok' }, { headers: corsHeaders() });
    }

    // Public: GET /api/images/:id  -> serve image bytes
    if (path.startsWith('images/')) {
      const id = path.split('/')[1];
      if (!id) return NextResponse.json({ error: 'Id requis' }, { status: 400, headers: corsHeaders() });
      const db = await getDb();
      const img = await db.collection('cms_images').findOne({ id });
      if (!img || !img.dataUrl) return NextResponse.json({ error: 'Image introuvable' }, { status: 404, headers: corsHeaders() });
      const m = /^data:([^;]+);base64,(.+)$/.exec(img.dataUrl);
      if (!m) {
        // If it's already a URL, redirect
        return NextResponse.redirect(img.dataUrl, 302);
      }
      const mime = m[1]; const b64 = m[2];
      const buf = Buffer.from(b64, 'base64');
      return new NextResponse(buf, { status: 200, headers: { ...corsHeaders(), 'Content-Type': mime, 'Cache-Control': 'public, max-age=31536000, immutable' } });
    }
    // Public: GET /api/entries/:type
    if (path.startsWith('entries/')) {
      const parts = path.split('/');
      const type = parts[1];
      const id = parts[2];
      if (!VALID_TYPES.includes(type)) {
        return NextResponse.json({ error: 'Type invalide' }, { status: 400, headers: corsHeaders() });
      }
      const db = await getDb();
      await ensureSeed(db, type);
      if (id) {
        const entry = await db.collection('cms_entries').findOne({ id, type, published: true }, { projection: { _id: 0 } });
        if (!entry) return NextResponse.json({ error: 'Introuvable' }, { status: 404, headers: corsHeaders() });
        return NextResponse.json({ entry }, { headers: corsHeaders() });
      }
      const entries = await db.collection('cms_entries')
        .find({ type, published: true }, { projection: { _id: 0 } })
        .sort({ order: 1, createdAt: -1 })
        .toArray();
      return NextResponse.json({ entries }, { headers: corsHeaders() });
    }
    // Admin: GET /api/admin/entries/:type (includes unpublished)
    if (path.startsWith('admin/entries/')) {
      if (!checkAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401, headers: corsHeaders() });
      const type = path.split('/')[2];
      if (!VALID_TYPES.includes(type)) return NextResponse.json({ error: 'Type invalide' }, { status: 400, headers: corsHeaders() });
      const db = await getDb();
      await ensureSeed(db, type);
      const entries = await db.collection('cms_entries').find({ type }, { projection: { _id: 0 } }).sort({ order: 1, createdAt: -1 }).toArray();
      return NextResponse.json({ entries }, { headers: corsHeaders() });
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

function escapeHtml(s = '') {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

async function sendContactEmail(doc) {
  const transporter = getTransporter();
  const to = process.env.SMTP_TO || process.env.SMTP_USER;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const subjectLine = doc.subject ? `[Atelier Kairos] ${doc.subject}` : `[Atelier Kairos] Nouveau message de ${doc.name}`;
  const text = `Nouveau message via le site Atelier Kairos\n\nNom: ${doc.name}\nEmail: ${doc.email}\nTéléphone: ${doc.phone||'—'}\nSujet: ${doc.subject||'—'}\nDate: ${doc.createdAt}\n\nMessage:\n${doc.message}`;
  const html = `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#312e81"><div style="background:#312e81;color:#f5f4f8;padding:24px 28px;border-radius:14px 14px 0 0"><p style="margin:0;font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.7">Atelier Kairos</p><h2 style="margin:8px 0 0;font-weight:400;font-size:22px">Nouveau message reçu</h2></div><div style="background:#f5f4f8;padding:28px;border-radius:0 0 14px 14px;border:1px solid #e0e0ef;border-top:0"><table style="width:100%;border-collapse:collapse;font-size:14px"><tr><td style="padding:6px 0;color:#56607a;width:120px">Nom</td><td style="padding:6px 0"><strong>${escapeHtml(doc.name)}</strong></td></tr><tr><td style="padding:6px 0;color:#56607a">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(doc.email)}" style="color:#4338ca;text-decoration:none">${escapeHtml(doc.email)}</a></td></tr><tr><td style="padding:6px 0;color:#56607a">Téléphone</td><td style="padding:6px 0">${escapeHtml(doc.phone)||'—'}</td></tr><tr><td style="padding:6px 0;color:#56607a">Sujet</td><td style="padding:6px 0">${escapeHtml(doc.subject)||'—'}</td></tr></table><div style="margin-top:20px;padding:18px 20px;background:#fff;border-left:3px solid #4338ca;border-radius:8px;white-space:pre-wrap;line-height:1.6">${escapeHtml(doc.message)}</div></div></div>`;
  await transporter.sendMail({ from: `"Atelier Kairos — Formulaire" <${from}>`, to, replyTo: doc.email, subject: subjectLine, text, html });
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path === 'contact') {
      const body = await request.json();
      const { name, email, phone, subject, message } = body || {};
      if (!name || !email || !message) return NextResponse.json({ error: "Le nom, l'email et le message sont requis." }, { status: 400, headers: corsHeaders() });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Email invalide.' }, { status: 400, headers: corsHeaders() });
      const doc = {
        id: uuidv4(), name: String(name).trim(), email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : '', subject: subject ? String(subject).trim() : '',
        message: String(message).trim(), createdAt: new Date().toISOString(),
      };
      try { const db = await getDb(); await db.collection('contact_messages').insertOne(doc); } catch (e) { console.error('Mongo:', e.message); }
      let emailSent = false; try { await sendContactEmail(doc); emailSent = true; } catch (e) { console.error('Mail:', e.message); }
      return NextResponse.json({ success: true, id: doc.id, emailSent, message: "Votre message a bien été reçu. Je reviens vers vous très bientôt." }, { headers: corsHeaders() });
    }

    // Admin login: POST /api/admin/login
    if (path === 'admin/login') {
      const body = await request.json();
      const email = String(body?.email || '').trim().toLowerCase();
      const password = String(body?.password || '');
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return NextResponse.json({ success: true, token: makeToken(email, password), email }, { headers: corsHeaders() });
      }
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401, headers: corsHeaders() });
    }

    // Image upload (base64): POST /api/admin/upload-image  { dataUrl: "data:image/...;base64,..." }
    if (path === 'admin/upload-image') {
      if (!checkAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401, headers: corsHeaders() });
      const body = await request.json();
      const dataUrl = String(body?.dataUrl || '');
      if (!dataUrl.startsWith('data:image/')) {
        return NextResponse.json({ error: 'Image invalide (data URL attendu)' }, { status: 400, headers: corsHeaders() });
      }
      // Limit size (rough check) — store base64 raw in DB
      if (dataUrl.length > 8_000_000) {
        return NextResponse.json({ error: 'Image trop volumineuse (max ~6Mo)' }, { status: 400, headers: corsHeaders() });
      }
      const id = uuidv4();
      const doc = { id, dataUrl, createdAt: new Date().toISOString() };
      try {
        const db = await getDb();
        await db.collection('cms_images').insertOne(doc);
      } catch (e) { console.error('Upload Mongo:', e.message); }
      // Public URL to retrieve the image bytes
      const url = `/api/images/${id}`;
      return NextResponse.json({ success: true, id, url }, { headers: corsHeaders() });
    }

    // AI Image generation: POST /api/admin/generate-image  { prompt: "..." }
    if (path === 'admin/generate-image') {
      if (!checkAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401, headers: corsHeaders() });
      if (!EMERGENT_LLM_KEY) {
        return NextResponse.json({
          error: 'Configuration manquante : EMERGENT_LLM_KEY non définie sur le serveur. Ajoutez-la dans les variables d\u2019environnement (Railway → Variables) et redéployez.'
        }, { status: 500, headers: corsHeaders() });
      }
      const body = await request.json();
      const prompt = String(body?.prompt || '').trim();
      if (!prompt) return NextResponse.json({ error: 'Prompt requis' }, { status: 400, headers: corsHeaders() });

      // Models tried in order — if one returns 503/429/5xx, fall back to the next.
      const MODEL_CHAIN = [
        'gemini/gemini-2.5-flash-image',
        'vertex_ai/gemini-2.5-flash-image',
        'gemini/gemini-3-pro-image-preview',
        'gpt-image-2',
      ];

      const attempts = [];
      for (const model of MODEL_CHAIN) {
        // Up to 2 tries per model (transient errors retry)
        for (let tryNum = 1; tryNum <= 2; tryNum++) {
          try {
            const ctrl = new AbortController();
            const tid = setTimeout(() => ctrl.abort(), 50_000);
            // eslint-disable-next-line no-await-in-loop
            const resp = await fetch('https://integrations.emergentagent.com/llm/v1/images/generations', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${EMERGENT_LLM_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ model, prompt, n: 1, size: '1024x1024' }),
              signal: ctrl.signal,
            });
            clearTimeout(tid);
            // eslint-disable-next-line no-await-in-loop
            const text = await resp.text();
            let data; try { data = JSON.parse(text); } catch { data = { raw: text }; }

            if (resp.ok) {
              const first = data?.data?.[0] || {};
              let dataUrl = first.url || '';
              if (!dataUrl && first.b64_json) dataUrl = `data:image/png;base64,${first.b64_json}`;
              if (!dataUrl) {
                attempts.push(`${model} #${tryNum}: réponse vide`);
                continue;
              }
              // Persist
              const id = uuidv4();
              const doc = { id, dataUrl, prompt, source: 'ai', model, createdAt: new Date().toISOString() };
              try { const db = await getDb(); await db.collection('cms_images').insertOne(doc); } catch (e) { console.error('AI img Mongo:', e.message); }
              const url = dataUrl.startsWith('data:') ? `/api/images/${id}` : dataUrl;
              return NextResponse.json({ success: true, id, url, model }, { headers: corsHeaders() });
            }

            // Non-OK upstream response
            const upstreamMsg = data?.error?.message || data?.error || (typeof data?.raw === 'string' ? data.raw.slice(0, 200) : '');
            attempts.push(`${model} #${tryNum}: HTTP ${resp.status} ${upstreamMsg}`);
            console.error('Image gen err:', model, resp.status, upstreamMsg);

            // Decide: retry / fallback / abort
            if (resp.status === 401 || resp.status === 403) {
              // Auth issue — no point in retrying or trying other models
              return NextResponse.json({
                error: `Authentification IA refusée (HTTP ${resp.status}). Vérifiez la clé EMERGENT_LLM_KEY sur Railway.`,
                details: upstreamMsg || 'auth error',
              }, { status: 502, headers: corsHeaders() });
            }
            if (resp.status === 400) {
              // Bad request — likely prompt rejected by safety filter
              return NextResponse.json({
                error: 'Le service IA a refusé ce prompt (filtre de sécurité). Reformulez la description avec un vocabulaire plus neutre.',
                details: upstreamMsg,
              }, { status: 422, headers: corsHeaders() });
            }
            // 429 / 5xx → wait briefly then retry / fallback
            if (tryNum === 1 && (resp.status === 503 || resp.status === 429 || resp.status >= 500)) {
              // eslint-disable-next-line no-await-in-loop
              await new Promise((r) => setTimeout(r, 800 + Math.random() * 800));
              continue; // retry same model
            }
            // Otherwise break out and try next model
            break;
          } catch (err) {
            const isAbort = err?.name === 'AbortError';
            attempts.push(`${model} #${tryNum}: ${isAbort ? 'timeout' : err.message}`);
            if (tryNum === 2) break; // give up this model
            // brief pause before retry
            // eslint-disable-next-line no-await-in-loop
            await new Promise((r) => setTimeout(r, 500));
          }
        }
      }

      console.error('All image gen attempts failed:', attempts);
      return NextResponse.json({
        error: 'Le service IA est temporairement indisponible (tous les modèles ont échoué). Réessayez dans quelques minutes.',
        details: attempts.join(' | '),
      }, { status: 503, headers: corsHeaders() });
    }

    // Newsletter subscribe: POST /api/newsletter/subscribe
    // (Newsletter géré par un système externe — conservé désactivé)

    // Admin create: POST /api/admin/entries/:type
    if (path.startsWith('admin/entries/')) {
      if (!checkAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401, headers: corsHeaders() });
      const type = path.split('/')[2];
      if (!VALID_TYPES.includes(type)) return NextResponse.json({ error: 'Type invalide' }, { status: 400, headers: corsHeaders() });
      const body = await request.json();
      const now = new Date().toISOString();
      const doc = {
        id: uuidv4(), type,
        title: String(body.title || '').trim(),
        subtitle: String(body.subtitle || '').trim(),
        description: String(body.description || '').trim(),
        content: String(body.content || '').trim(),
        imageUrl: String(body.imageUrl || '').trim(),
        gallery: Array.isArray(body.gallery) ? body.gallery.filter((u) => typeof u === 'string' && u.trim()).map((u) => u.trim()) : [],
        tags: Array.isArray(body.tags) ? body.tags : (body.tags ? String(body.tags).split(',').map(s => s.trim()).filter(Boolean) : []),
        published: body.published !== false,
        order: Number(body.order || 0),
        createdAt: now, updatedAt: now,
      };
      if (!doc.title) return NextResponse.json({ error: 'Le titre est requis.' }, { status: 400, headers: corsHeaders() });
      const db = await getDb();
      await db.collection('cms_entries').insertOne(doc);
      return NextResponse.json({ success: true, entry: { ...doc, _id: undefined } }, { headers: corsHeaders() });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function PUT(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    // PUT /api/admin/entries/:type/:id
    if (path.startsWith('admin/entries/')) {
      if (!checkAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401, headers: corsHeaders() });
      const parts = path.split('/');
      const type = parts[2]; const id = parts[3];
      if (!VALID_TYPES.includes(type) || !id) return NextResponse.json({ error: 'Paramètres invalides' }, { status: 400, headers: corsHeaders() });
      const body = await request.json();
      const update = {
        ...(body.title !== undefined && { title: String(body.title).trim() }),
        ...(body.subtitle !== undefined && { subtitle: String(body.subtitle).trim() }),
        ...(body.description !== undefined && { description: String(body.description).trim() }),
        ...(body.content !== undefined && { content: String(body.content).trim() }),
        ...(body.imageUrl !== undefined && { imageUrl: String(body.imageUrl).trim() }),
        ...(body.gallery !== undefined && { gallery: Array.isArray(body.gallery) ? body.gallery.filter((u) => typeof u === 'string' && u.trim()).map((u) => u.trim()) : [] }),
        ...(body.tags !== undefined && { tags: Array.isArray(body.tags) ? body.tags : String(body.tags).split(',').map(s => s.trim()).filter(Boolean) }),
        ...(body.published !== undefined && { published: !!body.published }),
        ...(body.order !== undefined && { order: Number(body.order) }),
        updatedAt: new Date().toISOString(),
      };
      const db = await getDb();
      const res = await db.collection('cms_entries').updateOne({ id, type }, { $set: update });
      if (res.matchedCount === 0) return NextResponse.json({ error: 'Entrée introuvable' }, { status: 404, headers: corsHeaders() });
      return NextResponse.json({ success: true }, { headers: corsHeaders() });
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

export async function DELETE(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path.startsWith('admin/entries/')) {
      if (!checkAdmin(request)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401, headers: corsHeaders() });
      const parts = path.split('/');
      const type = parts[2]; const id = parts[3];
      if (!VALID_TYPES.includes(type) || !id) return NextResponse.json({ error: 'Paramètres invalides' }, { status: 400, headers: corsHeaders() });
      const db = await getDb();
      const res = await db.collection('cms_entries').deleteOne({ id, type });
      if (res.deletedCount === 0) return NextResponse.json({ error: 'Entrée introuvable' }, { status: 404, headers: corsHeaders() });
      return NextResponse.json({ success: true }, { headers: corsHeaders() });
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
