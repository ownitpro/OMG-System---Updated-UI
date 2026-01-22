// src/lib/db.ts
// PostgreSQL connection pool for Aurora PostgreSQL
// Replaces Supabase client for database operations

import { Pool } from 'pg';
import fs from 'fs';

// Build SSL configuration
function getSslConfig() {
  // Disable SSL for local development
  if (process.env.DATABASE_URL?.includes('localhost') || process.env.DATABASE_URL?.includes('127.0.0.1')) {
    return undefined;
  }
  
  // TEMPORARY: Disable SSL verification for internal testing
  // TODO: Re-enable proper CA verification for production
  return { rejectUnauthorized: false };
}

// Create connection pool for Aurora PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: getSslConfig(),
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Log pool errors
pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error:', err);
});

/**
 * Execute a parameterized SQL query
 * Returns the rows directly (throws on error)
 */
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  try {
    const result = await pool.query(text, params);
    return result.rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Execute a query and return a single row (or null)
 */
export async function queryOne<T = any>(
  text: string,
  params?: any[]
): Promise<T | null> {
  try {
    const result = await pool.query(text, params);
    return (result.rows[0] as T) ?? null;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Execute an INSERT and return the inserted row
 */
export async function insert<T = any>(
  table: string,
  data: Record<string, any>
): Promise<T> {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
  const columns = keys.map(k => `"${k}"`).join(', ');

  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;

  try {
    const result = await pool.query(sql, values);
    return result.rows[0] as T;
  } catch (error) {
    console.error('Database insert error:', error);
    throw error;
  }
}

/**
 * Execute an UPDATE and return the updated row(s)
 */
export async function update<T = any>(
  table: string,
  data: Record<string, any>,
  where: Record<string, any>
): Promise<T[]> {
  const dataKeys = Object.keys(data);
  const whereKeys = Object.keys(where);

  let paramIndex = 1;
  const setClause = dataKeys.map(k => `"${k}" = $${paramIndex++}`).join(', ');
  const whereClause = whereKeys.map(k => `"${k}" = $${paramIndex++}`).join(' AND ');

  const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause} RETURNING *`;
  const values = [...Object.values(data), ...Object.values(where)];

  try {
    const result = await pool.query(sql, values);
    return result.rows as T[];
  } catch (error) {
    console.error('Database update error:', error);
    throw error;
  }
}

/**
 * Execute a DELETE
 */
export async function remove(
  table: string,
  where: Record<string, any>
): Promise<number> {
  const whereKeys = Object.keys(where);
  const whereClause = whereKeys.map((k, i) => `"${k}" = $${i + 1}`).join(' AND ');

  const sql = `DELETE FROM ${table} WHERE ${whereClause}`;

  try {
    const result = await pool.query(sql, Object.values(where));
    return result.rowCount ?? 0;
  } catch (error) {
    console.error('Database delete error:', error);
    throw error;
  }
}

/**
 * Check database connection health
 */
export async function checkHealth(): Promise<{ healthy: boolean; latency?: number; error?: string }> {
  const start = Date.now();
  try {
    await pool.query('SELECT 1');
    return { healthy: true, latency: Date.now() - start };
  } catch (error) {
    return { healthy: false, error: (error as Error).message };
  }
}

/**
 * Get a client from the pool for transactions
 */
export async function getClient() {
  return pool.connect();
}

/**
 * Execute a transaction
 */
export async function transaction<T>(
  callback: (client: any) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transaction error:', error);
    throw error;
  } finally {
    client.release();
  }
}

export default pool;
