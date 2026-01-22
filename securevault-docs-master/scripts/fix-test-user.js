const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function fixUser() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? undefined : { rejectUnauthorized: false }
  });

  try {
    const userRes = await pool.query('SELECT * FROM core."User" WHERE email = $1', ['test-business@review.com']);
    const user = userRes.rows[0];
    
    if (!user) {
      console.log('User not found');
      return;
    }

    console.log('User found:', user.id);

    // Create UserProfile if missing
    const profileRes = await pool.query('SELECT id FROM securevault."UserProfile" WHERE "userId" = $1', [user.id]);
    if (profileRes.rows.length === 0) {
      await pool.query(
        'INSERT INTO securevault."UserProfile" (id, "userId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt") VALUES (gen_random_uuid(), $1, 0, 0, 0, NOW(), NOW())',
        [user.id]
      );
      console.log('UserProfile created for user');
    } else {
      console.log('UserProfile already exists');
    }


    // Update Subscription plan to business_starter if it's 'free'
    const subRes = await pool.query('SELECT * FROM hub."Subscription" WHERE "userId" = $1 AND "appId" = $2', [user.id, 'app_securevault']);
    if (subRes.rows.length > 0) {
      const sub = subRes.rows[0];
      if (sub.plan === 'free') {
        await pool.query('UPDATE hub."Subscription" SET plan = $1 WHERE "userId" = $2 AND "appId" = $3', ['business_starter', user.id, 'app_securevault']);
        console.log('Updated subscription plan to business_starter');
      }
    }

    // Update Organization plan to business_starter if it's 'free'
    const orgRes = await pool.query(
      'SELECT o.* FROM core."Organization" o JOIN core."OrganizationMember" om ON om."organizationId" = o.id WHERE om."userId" = $1 LIMIT 1',
      [user.id]
    );
    if (orgRes.rows.length > 0) {
      const org = orgRes.rows[0];
      if (org.plan === 'free') {
        await pool.query('UPDATE core."Organization" SET plan = $1 WHERE id = $2', ['business_starter', org.id]);
        console.log('Updated organization plan to business_starter');
      }
    }

    console.log('Migration fixed for test user');
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

fixUser();
