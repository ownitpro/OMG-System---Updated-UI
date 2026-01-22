require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function addMissingConstraints() {
  console.log('🔧 Adding Missing Unique Constraints');
  console.log('====================================\n');

  // Safety check
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || !dbUrl.includes('staging')) {
    console.error('❌ SAFETY BLOCK: This script only runs on staging');
    process.exit(1);
  }

  console.log('✅ Safety check passed\n');

  try {
    // 1. UserProfile.userId unique constraint
    console.log('📝 Adding unique constraint to UserProfile.userId...');
    await pool.query(`
      ALTER TABLE securevault."UserProfile" 
      DROP CONSTRAINT IF EXISTS "UserProfile_userId_key"
    `);
    await pool.query(`
      ALTER TABLE securevault."UserProfile" 
      ADD CONSTRAINT "UserProfile_userId_key" UNIQUE ("userId")
    `);
    console.log('   ✅ UserProfile.userId constraint added');

    // 2. OrganizationProfile.organizationId is already the primary key, so it's unique
    console.log('📝 Checking OrganizationProfile.organizationId...');
    console.log('   ✅ Already unique (primary key)');

    // 3. Subscription(userId, appId) composite unique constraint
    console.log('📝 Adding unique constraint to Subscription(userId, appId)...');
    await pool.query(`
      ALTER TABLE hub."Subscription" 
      DROP CONSTRAINT IF EXISTS unique_user_app
    `);
    await pool.query(`
      ALTER TABLE hub."Subscription" 
      ADD CONSTRAINT unique_user_app UNIQUE ("userId", "appId")
    `);
    console.log('   ✅ Subscription(userId, appId) constraint added');

    console.log('\n✅ All constraints added successfully!\n');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

addMissingConstraints();
