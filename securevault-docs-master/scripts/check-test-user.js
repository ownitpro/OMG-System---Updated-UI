const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function checkUser() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? undefined : { rejectUnauthorized: false }
  });

  try {
    const res = await pool.query('SELECT * FROM core."User" WHERE email = $1', ['test-business@review.com']);
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

checkUser();
