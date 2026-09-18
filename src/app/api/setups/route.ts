import { NextResponse } from 'next/server';
import { getDb, initDb } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const sql = getDb();
  if (!sql) {
    return NextResponse.json({ 
      onlineStorageAvailable: false, 
      message: 'Neon DATABASE_URL is not configured yet. Using local browser storage.' 
    });
  }

  try {
    await initDb();
    if (id) {
      const rows = await sql`SELECT id, name, data, updated_at FROM setups WHERE id = ${id}`;
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Setup not found' }, { status: 404 });
      }
      return NextResponse.json({ onlineStorageAvailable: true, setup: rows[0] });
    }

    const list = await sql`SELECT id, name, updated_at FROM setups ORDER BY updated_at DESC LIMIT 20`;
    return NextResponse.json({ onlineStorageAvailable: true, setups: list });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Database error', onlineStorageAvailable: true }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const sql = getDb();
  if (!sql) {
    return NextResponse.json(
      { onlineStorageAvailable: false, message: 'Neon DATABASE_URL is not set.' },
      { status: 503 }
    );
  }

  try {
    await initDb();
    const body = await request.json();
    const { id, name, data } = body;

    if (!id || !name || !data) {
      return NextResponse.json({ error: 'Missing required fields (id, name, data)' }, { status: 400 });
    }

    await sql`
      INSERT INTO setups (id, name, data, updated_at)
      VALUES (${id}, ${name}, ${JSON.stringify(data)}, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE
      SET name = EXCLUDED.name,
          data = EXCLUDED.data,
          updated_at = CURRENT_TIMESTAMP;
    `;

    return NextResponse.json({ success: true, id, name });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Database error' }, { status: 500 });
  }
}
