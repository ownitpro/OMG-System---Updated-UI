// Script to check if a user has an organization and create one if missing
// Run with: node scripts/check-user-org.js

const { Pool } = require('pg');
const crypto = require('crypto');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('rds.amazonaws.com') ? { rejectUnauthorized: false } : false
});

async function checkAndFixUserOrg() {
  const client = await pool.connect();

  try {
    const email = 'mario@ownitpro.com';

    console.log('Checking user:', email);

    // Find the user
    const userResult = await client.query(
      `SELECT id, email, name, "accountType" FROM core."User" WHERE email = $1`,
      [email.toLowerCase()]
    );

    if (userResult.rows.length === 0) {
      console.log('User not found in database!');
      return;
    }

    const user = userResult.rows[0];
    console.log('Found user:', user);

    // Check for organization memberships
    const membershipResult = await client.query(
      `SELECT m.*, o.id as org_id, o.name as org_name, o.slug
       FROM core."OrganizationMember" m
       JOIN core."Organization" o ON o.id = m."organizationId"
       WHERE m."userId" = $1`,
      [user.id]
    );

    if (membershipResult.rows.length > 0) {
      console.log('\nUser has organizations:');
      membershipResult.rows.forEach(m => {
        console.log(`  - ${m.org_name} (${m.org_id}) - role: ${m.role}`);
      });
      return;
    }

    console.log('\nNo organizations found for user!');

    if (user.accountType !== 'business') {
      console.log('User is not a business account, no organization needed.');
      return;
    }

    console.log('\nCreating organization for business user...');

    // Create organization for business account
    const orgId = crypto.randomUUID();
    const orgName = `${user.name || user.email.split('@')[0]}'s Business`;
    const orgSlug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + orgId.slice(0, 8);

    await client.query('BEGIN');

    await client.query(
      `INSERT INTO core."Organization" (id, name, slug, plan, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, NOW(), NOW())`,
      [orgId, orgName, orgSlug, 'pro']
    );
    console.log('Created Organization:', orgId);

    // Add user as admin member
    await client.query(
      `INSERT INTO core."OrganizationMember" (id, "organizationId", "userId", role, "createdAt", "updatedAt")
       VALUES (gen_random_uuid()::text, $1, $2, 'admin', NOW(), NOW())`,
      [orgId, user.id]
    );
    console.log('Added user as organization admin');

    // Create OrganizationProfile for SecureVault
    await client.query(
      `INSERT INTO securevault."OrganizationProfile" ("organizationId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt")
       VALUES ($1, 0, 0, 0, NOW(), NOW())`,
      [orgId]
    );
    console.log('Created OrganizationProfile');

    await client.query('COMMIT');

    console.log('\n✅ Organization created successfully!');
    console.log('Organization ID:', orgId);
    console.log('Organization Name:', orgName);
    console.log('\nPlease refresh the dashboard.');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

checkAndFixUserOrg().catch(console.error);
