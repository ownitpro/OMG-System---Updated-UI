require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function addPasswordHashColumn() {
  console.log('🔒 Password Hash Column Migration');
  console.log('=================================\n');

  // Safety check: Verify we're targeting staging
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('❌ DATABASE_URL not found in environment');
    process.exit(1);
  }

  if (!dbUrl.includes('staging')) {
    console.error('❌ SAFETY BLOCK: DATABASE_URL does not contain "staging"');
    console.error('   This migration is only for staging environments');
    console.error('   Current host:', dbUrl.split('@')[1]?.split('/')[0]);
    process.exit(1);
  }

  console.log('✅ Safety check passed: Targeting staging database\n');

  try {
    // Check if column already exists
    const checkQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'core' 
        AND table_name = 'User' 
        AND column_name = 'passwordHash'
    `;

    const result = await pool.query(checkQuery);

    if (result.rows.length > 0) {
      console.log('ℹ️  Column "passwordHash" already exists in core.User');
      console.log('   No migration needed.');
      await pool.end();
      return;
    }

    console.log('📝 Adding "passwordHash" column to core.User...');

    // Add the column
    await pool.query(`
      ALTER TABLE core."User" 
      ADD COLUMN "passwordHash" TEXT
    `);

    console.log('✅ Migration completed successfully!');
    console.log('   Column "passwordHash" added to core.User\n');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

addPasswordHashColumn();
