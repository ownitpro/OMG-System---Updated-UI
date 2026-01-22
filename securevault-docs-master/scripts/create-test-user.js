// Script to create a test user directly in the database
// Run with: node scripts/create-test-user.js

const { Pool } = require('pg');
const crypto = require('crypto');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('rds.amazonaws.com') ? { rejectUnauthorized: false } : false
});

async function createTestUser() {
  const client = await pool.connect();

  try {
    const email = 'ownittest1@gmail.com';
    const name = 'Mike';
    const userId = crypto.randomUUID();
    const accountType = 'business';
    const plan = 'pro'; // Highest tier

    console.log('Creating test user:', { email, name, userId, accountType, plan });

    // Check if user already exists
    const existingUser = await client.query(
      `SELECT id, email FROM core."User" WHERE email = $1`,
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      console.log('User already exists:', existingUser.rows[0]);
      const existingUserId = existingUser.rows[0].id;

      // Update the subscription to pro (Subscription is in hub schema)
      await client.query(
        `UPDATE hub."Subscription" SET plan = $1, status = 'active', "updatedAt" = NOW() WHERE "userId" = $2`,
        [plan, existingUserId]
      );
      console.log('Updated subscription to pro for existing user');

      await client.end();
      return;
    }

    // Start transaction
    await client.query('BEGIN');

    // Create user record
    await client.query(
      `INSERT INTO core."User" (id, email, name, "accountType", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, NOW(), NOW())`,
      [userId, email.toLowerCase(), name, accountType]
    );
    console.log('Created User record');

    // Create organization for business account
    const orgId = crypto.randomUUID();
    const orgName = `${name}'s Business`;
    const orgSlug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + userId.slice(0, 8);

    await client.query(
      `INSERT INTO core."Organization" (id, name, slug, plan, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, NOW(), NOW())`,
      [orgId, orgName, orgSlug, plan]
    );
    console.log('Created Organization:', orgId);

    // Add user as admin member
    await client.query(
      `INSERT INTO core."OrganizationMember" (id, "organizationId", "userId", role, "createdAt", "updatedAt")
       VALUES (gen_random_uuid()::text, $1, $2, 'admin', NOW(), NOW())`,
      [orgId, userId]
    );
    console.log('Added user as organization admin');

    // Create OrganizationProfile for SecureVault
    await client.query(
      `INSERT INTO securevault."OrganizationProfile" ("organizationId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt")
       VALUES ($1, 0, 0, 0, NOW(), NOW())`,
      [orgId]
    );
    console.log('Created OrganizationProfile');

    // Create subscription with pro plan (active, not trialing) - Subscription is in hub schema
    // App ID is 'app_securevault' as defined in db-utils.ts
    await client.query(
      `INSERT INTO hub."Subscription" (id, "userId", "appId", plan, status, "createdAt", "updatedAt")
       VALUES (gen_random_uuid()::text, $1, 'app_securevault', $2, 'active', NOW(), NOW())`,
      [userId, plan]
    );
    console.log('Created Subscription with pro plan');

    // Commit transaction
    await client.query('COMMIT');

    console.log('\n✅ Test user created successfully!');
    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Password: admin123 (needs to be set in Cognito)');
    console.log('Account Type:', accountType);
    console.log('Plan:', plan);
    console.log('User ID:', userId);
    console.log('Organization ID:', orgId);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating user:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

createTestUser().catch(console.error);
