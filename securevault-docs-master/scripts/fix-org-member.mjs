// Quick script to fix database schema issues
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgresql://postgres:89562685@securevault-database.cluster-ct8ewcosm9gd.ca-central-1.rds.amazonaws.com:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

async function run() {
  try {
    console.log('Connecting to database...');
    await pool.query('SELECT 1');
    console.log('Connected!');

    // Fix Subscription table - add missing columns
    console.log('\n--- Fixing Subscription table ---');
    const subCols = await pool.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'hub' AND table_name = 'Subscription'
    `);
    const existingCols = subCols.rows.map(r => r.column_name);
    console.log('Existing columns:', existingCols);

    // Add trialStartedAt if missing
    if (!existingCols.includes('trialStartedAt')) {
      await pool.query(`ALTER TABLE hub."Subscription" ADD COLUMN "trialStartedAt" TIMESTAMPTZ`);
      console.log('Added trialStartedAt column');
    }

    // Add trialExpiresAt if missing
    if (!existingCols.includes('trialExpiresAt')) {
      await pool.query(`ALTER TABLE hub."Subscription" ADD COLUMN "trialExpiresAt" TIMESTAMPTZ`);
      console.log('Added trialExpiresAt column');
    }

    // Add createdAt if missing
    if (!existingCols.includes('createdAt')) {
      await pool.query(`ALTER TABLE hub."Subscription" ADD COLUMN "createdAt" TIMESTAMPTZ DEFAULT NOW()`);
      console.log('Added createdAt column');
    }

    // Add updatedAt if missing
    if (!existingCols.includes('updatedAt')) {
      await pool.query(`ALTER TABLE hub."Subscription" ADD COLUMN "updatedAt" TIMESTAMPTZ DEFAULT NOW()`);
      console.log('Added updatedAt column');
    }

    console.log('Subscription table fixed!');

    // Check for the problematic user
    console.log('\n--- Checking user diegobarradas0309@gmail.com ---');
    const userCheck = await pool.query(`
      SELECT id, email, "accountType" FROM core."User" WHERE email = 'diegobarradas0309@gmail.com'
    `);
    console.log('User:', userCheck.rows);

    // Check OrganizationMember for this user
    if (userCheck.rows.length > 0) {
      const userId = userCheck.rows[0].id;
      const memberCheck = await pool.query(`
        SELECT * FROM core."OrganizationMember" WHERE "userId" = $1
      `, [userId]);
      console.log('OrganizationMember records:', memberCheck.rows);

      // Check if Organization exists for this user
      const orgCheck = await pool.query(`
        SELECT o.* FROM core."Organization" o
        JOIN core."OrganizationMember" om ON o.id = om."organizationId"
        WHERE om."userId" = $1
      `, [userId]);
      console.log('Organizations:', orgCheck.rows);
    }

    // Check OrganizationProfile table structure
    console.log('\n--- Checking OrganizationProfile table structure ---');
    const cols = await pool.query(`
      SELECT column_name, data_type, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'securevault' AND table_name = 'OrganizationProfile'
      ORDER BY ordinal_position
    `);
    console.log('Columns:', cols.rows);

    // Drop and recreate with proper structure
    console.log('\n--- Recreating OrganizationProfile with correct structure ---');

    // Drop existing table
    await pool.query(`DROP TABLE IF EXISTS securevault."OrganizationProfile" CASCADE`);
    console.log('Dropped old OrganizationProfile table');

    // Create with id column that has default
    await pool.query(`
      CREATE TABLE securevault."OrganizationProfile" (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        "organizationId" TEXT UNIQUE NOT NULL,
        "storageUsedBytes" BIGINT DEFAULT 0,
        "ocrPagesUsed" INTEGER DEFAULT 0,
        "egressBytesUsed" BIGINT DEFAULT 0,
        "createdAt" TIMESTAMPTZ DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log('Created new OrganizationProfile table with proper structure');

    // Also fix UserProfile if needed
    console.log('\n--- Checking UserProfile table structure ---');
    const userProfileCols = await pool.query(`
      SELECT column_name, data_type, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'securevault' AND table_name = 'UserProfile'
      ORDER BY ordinal_position
    `);
    console.log('UserProfile columns:', userProfileCols.rows);

    // Check if UserProfile id column has a default
    const idCol = userProfileCols.rows.find(c => c.column_name === 'id');
    if (idCol && !idCol.column_default) {
      console.log('Setting default for UserProfile id column...');
      await pool.query(`
        ALTER TABLE securevault."UserProfile"
        ALTER COLUMN id SET DEFAULT gen_random_uuid()::text
      `);
      console.log('Set default for UserProfile id column');
    }

    console.log('\nDone!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

run();
