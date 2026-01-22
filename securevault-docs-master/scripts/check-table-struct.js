const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function check() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? undefined : { rejectUnauthorized: false }
  });

  try {
    const cols = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_schema = 'securevault' AND table_name = 'UserProfile'");
    console.log('Columns:', cols.rows);
    
    const constraints = await pool.query("SELECT * FROM information_schema.table_constraints WHERE table_schema = 'securevault' AND table_name = 'UserProfile'");
    console.log('Constraints:', constraints.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

check();
