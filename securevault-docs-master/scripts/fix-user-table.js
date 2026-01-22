require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function fixUserTableConstraints() {
  console.log('🔧 User Table Constraints Fix');
  console.log('=============================\n');

  // Safety check
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || !dbUrl.includes('staging')) {
    console.error('❌ SAFETY BLOCK: This script only runs on staging');
    process.exit(1);
  }

  console.log('✅ Safety check passed\n');

  try {
    // 1. Check if passwordHash column exists, add if missing
    console.log('📝 Checking passwordHash column...');
    const colCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'core' 
        AND table_name = 'User' 
        AND column_name = 'passwordHash'
    `);

    if (colCheck.rows.length === 0) {
      console.log('   Adding passwordHash column...');
      await pool.query(`ALTER TABLE core."User" ADD COLUMN "passwordHash" TEXT`);
      console.log('   ✅ Added passwordHash column');
    } else {
      console.log('   ✅ passwordHash column exists');
    }

    // 2. Drop the unnamed unique constraint and create a named one
    console.log('\n📝 Fixing email unique constraint...');
    
    // Drop existing unnamed constraint if it exists
    await pool.query(`
      ALTER TABLE core."User" 
      DROP CONSTRAINT IF EXISTS "User_email_key"
    `);

    // Add named unique constraint
    await pool.query(`
      ALTER TABLE core."User" 
      ADD CONSTRAINT "User_email_key" UNIQUE (email)
    `);

    console.log('   ✅ Email unique constraint fixed');

    console.log('\n✅ All fixes applied successfully!\n');

  } catch (error) {
    console.error('❌ Fix failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

fixUserTableConstraints();
