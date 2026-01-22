const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function checkProfiles() {
  try {
    const res = await pool.query('SELECT * FROM securevault."UserProfile"');
    console.log('UserProfiles in database:');
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching profiles:', err);
  } finally {
    await pool.end();
  }
}

checkProfiles();
