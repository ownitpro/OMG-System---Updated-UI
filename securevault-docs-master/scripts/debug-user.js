const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function findUser(email) {
  try {
    console.log(`Searching for user: ${email}`);
    
    // Find core user
    const userRes = await pool.query('SELECT * FROM core."User" WHERE email = $1', [email]);
    if (userRes.rows.length === 0) {
      console.log('User not found in core."User"');
      return;
    }
    const user = userRes.rows[0];
    console.log('User found:', JSON.stringify(user, null, 2));

    // Find subscription
    const subRes = await pool.query('SELECT * FROM hub."Subscription" WHERE "userId" = $1', [user.id]);
    if (subRes.rows.length === 0) {
      console.log('Subscription not found for user');
    } else {
      console.log('Subscriptions found:', JSON.stringify(subRes.rows, null, 2));
    }

    // Find UserProfile
    const profileRes = await pool.query('SELECT * FROM securevault."UserProfile" WHERE "userId" = $1', [user.id]);
    if (profileRes.rows.length === 0) {
        console.log('UserProfile not found for user');
    } else {
        console.log('UserProfile found:', JSON.stringify(profileRes.rows, null, 2));
    }

  } catch (err) {
    console.error('Error querying database:', err);
  } finally {
    await pool.end();
  }
}

const email = process.argv[2] || 'test-business@review.com';
findUser(email);
