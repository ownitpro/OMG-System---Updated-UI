const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function checkOrgMember(email) {
  try {
    const userRes = await pool.query('SELECT id FROM core."User" WHERE email = $1', [email]);
    if (userRes.rows.length === 0) return console.log('User not found');
    const userId = userRes.rows[0].id;

    const memberRes = await pool.query(`
      SELECT * FROM core."OrganizationMember" WHERE "userId" = $1
    `, [userId]);
    
    console.log('Organization members for user:');
    console.table(memberRes.rows);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

checkOrgMember('test-business@review.com');
