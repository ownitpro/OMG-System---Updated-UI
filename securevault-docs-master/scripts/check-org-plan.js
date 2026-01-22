const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function checkOrgPlan(email) {
  try {
    const userRes = await pool.query('SELECT id FROM core."User" WHERE email = $1', [email]);
    if (userRes.rows.length === 0) return console.log('User not found');
    const userId = userRes.rows[0].id;

    const orgRes = await pool.query(`
      SELECT o.id, o.name, o.plan 
      FROM core."Organization" o
      JOIN core."OrganizationMember" om ON o.id = om."organizationId"
      WHERE om."userId" = $1
    `, [userId]);
    
    console.log('Organizations for user:');
    console.table(orgRes.rows);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

checkOrgPlan('test-business@review.com');
