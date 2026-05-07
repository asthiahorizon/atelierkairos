import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

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

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path === 'contact') {
      const body = await request.json();
      const { name, email, phone, subject, message } = body || {};
      if (!name || !email || !message) {
        return NextResponse.json(
          { error: 'Le nom, l\'email et le message sont requis.' },
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
      const db = await getDb();
      const doc = {
        id: uuidv4(),
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : '',
        subject: subject ? String(subject).trim() : '',
        message: String(message).trim(),
        createdAt: new Date().toISOString(),
      };
      await db.collection('contact_messages').insertOne(doc);
      return NextResponse.json(
        { success: true, id: doc.id, message: 'Votre message a bien été reçu. Je reviens vers vous très bientôt.' },
        { headers: corsHeaders() }
      );
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
