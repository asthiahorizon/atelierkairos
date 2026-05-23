import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'atelier_kairos';

let cachedClient = null;
export async function getDb() {
  if (!MONGO_URL) throw new Error('MONGO_URL not set');
  if (cachedClient) return cachedClient.db(DB_NAME);
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  cachedClient = client;
  return client.db(DB_NAME);
}

export async function getPublishedEntry(type, id) {
  try {
    const db = await getDb();
    const entry = await db
      .collection('cms_entries')
      .findOne({ id, type, published: true }, { projection: { _id: 0 } });
    return entry || null;
  } catch (e) {
    console.error('getPublishedEntry error:', e.message);
    return null;
  }
}

export async function listPublishedEntries(type) {
  try {
    const db = await getDb();
    return await db
      .collection('cms_entries')
      .find({ type, published: true }, { projection: { _id: 0 } })
      .sort({ order: 1, createdAt: -1 })
      .toArray();
  } catch (e) {
    console.error('listPublishedEntries error:', e.message);
    return [];
  }
}
