
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import path from 'path';
import bcrypt from 'bcryptjs';

const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost') ? undefined : { rejectUnauthorized: false },
  });

  try {
    const client = await pool.connect();
    
    console.log('🔒 Enabling Local Authentication...');

    // 1. Add passwordHash column
    console.log('   Adding passwordHash column...');
    await client.query(`
      ALTER TABLE core."User" 
      ADD COLUMN IF NOT EXISTS "passwordHash" TEXT;
    `);

    // 2. Update test user password
    const email = 'test-business@review.com';
    const password = 'TestBusiness123!';
    
    console.log(`   Hashing password for ${email}...`);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const res = await client.query(`
      UPDATE core."User" 
      SET "passwordHash" = $1, "updatedAt" = NOW()
      WHERE email = $2
      RETURNING id
    `, [hash, email]);

    if (res.rowCount === 0) {
      console.warn(`⚠️  User ${email} not found. Could not set password.`);
    } else {
      console.log(`✅ Password set for user ${email} (ID: ${res.rows[0].id})`);
    }
    
    client.release();
  } catch (err) {
    console.error('❌ Error enabling local auth:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
