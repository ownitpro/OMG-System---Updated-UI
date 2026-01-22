// Script to fix corrupted organization ID by creating a new org with proper UUID
// Run with: node scripts/fix-org-id.js

const { Pool } = require('pg');
const crypto = require('crypto');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('rds.amazonaws.com') ? { rejectUnauthorized: false } : false
});

async function safeUpdate(client, tableName, savepointName, newId, oldId) {
  try {
    // Use a savepoint so failures don't abort the whole transaction
    await client.query(`SAVEPOINT ${savepointName}`);
    const result = await client.query(
      `UPDATE ${tableName} SET "organizationId" = $1 WHERE "organizationId" = $2 RETURNING id`,
      [newId, oldId]
    );
    console.log(`✓ Updated ${result.rowCount} ${tableName} records`);
    return true;
  } catch (e) {
    await client.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
    console.log(`⚠ ${tableName} update skipped (table may not exist)`);
    return false;
  }
}

async function fixOrgId() {
  const client = await pool.connect();

  try {
    const oldOrgId = 'org_1766298659412_6rc4kuxgb';
    const newOrgId = crypto.randomUUID();

    console.log('Fixing corrupted organization ID');
    console.log('Old ID:', oldOrgId);
    console.log('New ID:', newOrgId);

    // Get the organization data
    const orgResult = await client.query(
      `SELECT * FROM core."Organization" WHERE id = $1`,
      [oldOrgId]
    );

    if (orgResult.rows.length === 0) {
      console.log('Organization not found!');
      return;
    }

    const org = orgResult.rows[0];
    console.log('\nOrganization data:', org);

    await client.query('BEGIN');

    // Step 1: Create new organization with proper UUID
    await client.query(
      `INSERT INTO core."Organization" (id, name, slug, description, plan, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [newOrgId, org.name, org.slug + '-new', org.description, org.plan, org.createdAt, org.updatedAt]
    );
    console.log('✓ Created new Organization with valid UUID');

    // Step 2: Update OrganizationMember to point to new org
    const memberResult = await client.query(
      `UPDATE core."OrganizationMember" SET "organizationId" = $1 WHERE "organizationId" = $2 RETURNING *`,
      [newOrgId, oldOrgId]
    );
    console.log(`✓ Updated ${memberResult.rowCount} OrganizationMember records`);

    // Step 3: Update or create OrganizationProfile
    const profileCheck = await client.query(
      `SELECT * FROM securevault."OrganizationProfile" WHERE "organizationId" = $1`,
      [oldOrgId]
    );

    if (profileCheck.rows.length > 0) {
      await client.query(
        `UPDATE securevault."OrganizationProfile" SET "organizationId" = $1 WHERE "organizationId" = $2`,
        [newOrgId, oldOrgId]
      );
      console.log(`✓ Updated OrganizationProfile`);
    } else {
      await client.query(
        `INSERT INTO securevault."OrganizationProfile" ("organizationId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt")
         VALUES ($1, 0, 0, 0, NOW(), NOW())`,
        [newOrgId]
      );
      console.log(`✓ Created OrganizationProfile`);
    }

    // Step 4-7: Update related tables (with savepoints for safety)
    await safeUpdate(client, 'securevault."Portal"', 'sp_portal', newOrgId, oldOrgId);
    await safeUpdate(client, 'securevault."Document"', 'sp_document', newOrgId, oldOrgId);
    await safeUpdate(client, 'securevault."Label"', 'sp_label', newOrgId, oldOrgId);
    await safeUpdate(client, 'securevault."Notification"', 'sp_notification', newOrgId, oldOrgId);

    // Step 8: Delete old organization
    await client.query(
      `DELETE FROM core."Organization" WHERE id = $1`,
      [oldOrgId]
    );
    console.log('✓ Deleted old Organization with corrupted ID');

    // Step 9: Update slug to remove -new suffix
    await client.query(
      `UPDATE core."Organization" SET slug = $1 WHERE id = $2`,
      [org.slug, newOrgId]
    );
    console.log('✓ Restored original slug');

    await client.query('COMMIT');

    console.log('\n✅ Organization ID fixed successfully!');
    console.log('New Organization ID:', newOrgId);
    console.log('\nPlease clear your browser cache/localStorage and refresh the page.');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

fixOrgId().catch(console.error);
