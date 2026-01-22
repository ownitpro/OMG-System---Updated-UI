const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function listTables() {
  try {
    const res = await pool.query(`
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE table_schema IN ('core', 'hub', 'securevault')
      ORDER BY table_schema, table_name
    `);
    console.log('Tables in database:');
    console.table(res.rows);
  } catch (err) {
    console.error('Error listing tables:', err);
  } finally {
    await pool.end();
  }
}

listTables();
