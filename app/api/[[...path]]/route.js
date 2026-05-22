import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'atelier_kairos';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kairos-admin';

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
  const pwd = request.headers.get('x-admin-password') || '';
  return pwd === ADMIN_PASSWORD;
}

export async function OPTIONS() { return new NextResponse(null, { status: 204, headers: corsHeaders() }); }

export async function GET(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path === '' || path === 'health') {
      return NextResponse.json({ status: 'ok' }, { headers: corsHeaders() });
    }
    // Public: GET /api/entries/:type
    if (path.startsWith('entries/')) {
      const type = path.split('/')[1];
      if (!VALID_TYPES.includes(type)) {
        return NextResponse.json({ error: 'Type invalide' }, { status: 400, headers: corsHeaders() });
      }
      const db = await getDb();
      await ensureSeed(db, type);
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
      if (body?.password === ADMIN_PASSWORD) return NextResponse.json({ success: true, token: ADMIN_PASSWORD }, { headers: corsHeaders() });
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401, headers: corsHeaders() });
    }

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
