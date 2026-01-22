require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function runMigration() {
  console.log('🚀 Running database migration...');
  
  const sql = fs.readFileSync(path.join(__dirname, 'init-local-db.sql'), 'utf8');
  
  try {
    await pool.query(sql);
    console.log('✅ Migration completed successfully!');
    console.log('You can now create an account.');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
