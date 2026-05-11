import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'atelier_kairos';

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
    secure: true, // 465 = SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  return cachedTransporter;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path === '' || path === 'health') {
      return NextResponse.json({ status: 'ok', service: 'atelier-kairos-api' }, { headers: corsHeaders() });
    }
    if (path === 'messages') {
      const db = await getDb();
      const messages = await db.collection('contact_messages')
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();
      return NextResponse.json({ messages }, { headers: corsHeaders() });
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendContactEmail(doc) {
  const transporter = getTransporter();
  const to = process.env.SMTP_TO || process.env.SMTP_USER;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  const subjectLine = doc.subject
    ? `[Atelier Kairos] ${doc.subject}`
    : `[Atelier Kairos] Nouveau message de ${doc.name}`;

  const text = `Nouveau message reçu via le site Atelier Kairos

Nom        : ${doc.name}
Email      : ${doc.email}
Téléphone  : ${doc.phone || '—'}
Sujet      : ${doc.subject || '—'}
Date       : ${doc.createdAt}

Message :
${doc.message}
`;

  const html = `
  <div style="font-family: -apple-system, system-ui, sans-serif; max-width:600px; margin:0 auto; color:#162032;">
    <div style="background:#162032; color:#f4f7fb; padding:24px 28px; border-radius:14px 14px 0 0;">
      <p style="margin:0; font-size:12px; letter-spacing:.18em; text-transform:uppercase; opacity:.7;">Atelier Kairos</p>
      <h2 style="margin:8px 0 0; font-weight:400; font-size:22px;">Nouveau message reçu</h2>
    </div>
    <div style="background:#f4f7fb; padding:28px; border-radius:0 0 14px 14px; border:1px solid #e1e7ef; border-top:0;">
      <table style="width:100%; border-collapse:collapse; font-size:14px;">
        <tr><td style="padding:6px 0; color:#56607a; width:120px;">Nom</td><td style="padding:6px 0;"><strong>${escapeHtml(doc.name)}</strong></td></tr>
        <tr><td style="padding:6px 0; color:#56607a;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(doc.email)}" style="color:#3d5a80; text-decoration:none;">${escapeHtml(doc.email)}</a></td></tr>
        <tr><td style="padding:6px 0; color:#56607a;">Téléphone</td><td style="padding:6px 0;">${escapeHtml(doc.phone) || '—'}</td></tr>
        <tr><td style="padding:6px 0; color:#56607a;">Sujet</td><td style="padding:6px 0;">${escapeHtml(doc.subject) || '—'}</td></tr>
        <tr><td style="padding:6px 0; color:#56607a;">Date</td><td style="padding:6px 0; color:#56607a;">${escapeHtml(doc.createdAt)}</td></tr>
      </table>
      <div style="margin-top:20px; padding:18px 20px; background:#fff; border-left:3px solid #3d5a80; border-radius:8px; white-space:pre-wrap; line-height:1.6;">${escapeHtml(doc.message)}</div>
    </div>
    <p style="text-align:center; color:#56607a; font-size:11px; margin-top:14px;">Message envoyé depuis le formulaire de contact d'atelierkairos.ch</p>
  </div>`;

  await transporter.sendMail({
    from: `"Atelier Kairos — Formulaire" <${from}>`,
    to,
    replyTo: doc.email,
    subject: subjectLine,
    text,
    html,
  });
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path === 'contact') {
      const body = await request.json();
      const { name, email, phone, subject, message } = body || {};
      if (!name || !email || !message) {
        return NextResponse.json(
          { error: "Le nom, l'email et le message sont requis." },
          { status: 400, headers: corsHeaders() }
        );
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Adresse email invalide.' },
          { status: 400, headers: corsHeaders() }
        );
      }

      const doc = {
        id: uuidv4(),
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : '',
        subject: subject ? String(subject).trim() : '',
        message: String(message).trim(),
        createdAt: new Date().toISOString(),
      };

      // Save to MongoDB (best effort)
      try {
        const db = await getDb();
        await db.collection('contact_messages').insertOne(doc);
      } catch (dbErr) {
        console.error('Mongo save failed:', dbErr.message);
      }

      // Send email via Infomaniak SMTP
      let emailSent = false;
      let emailError = null;
      try {
        await sendContactEmail(doc);
        emailSent = true;
      } catch (mailErr) {
        emailError = mailErr.message;
        console.error('Email send failed:', mailErr);
      }

      return NextResponse.json(
        {
          success: true,
          id: doc.id,
          emailSent,
          emailError,
          message: 'Votre message a bien été reçu. Je reviens vers vous très bientôt.',
        },
        { headers: corsHeaders() }
      );
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
