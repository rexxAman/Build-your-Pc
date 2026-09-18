import { neon } from '@neondatabase/serverless';

// Returns the Neon SQL query function if DATABASE_URL is configured
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return null;
  }
  return neon(databaseUrl);
}

// Helper to auto-create setups table if using Neon
export async function initDb() {
  const sql = getDb();
  if (!sql) return false;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS setups (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        data JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return true;
  } catch (error) {
    console.error('Failed to initialize Neon DB:', error);
    return false;
  }
}
