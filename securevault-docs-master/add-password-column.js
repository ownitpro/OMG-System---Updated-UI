// add-password-column.js
// Script to add passwordHash column to User table

const { Pool } = require('pg');

async function addPasswordHashColumn() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://securevault_user:securevault_password123@localhost:5432/securevault'
  });

  try {
    console.log('🔧 Connecting to database...');

    // Check if column exists
    const checkResult = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'core'
        AND table_name = 'User'
        AND column_name = 'passwordHash';
    `);

    if (checkResult.rows.length > 0) {
      console.log('✅ Column passwordHash already exists!');
      await pool.end();
      return;
    }

    console.log('➕ Adding passwordHash column...');

    // Add the column
    await pool.query(`
      ALTER TABLE core."User" ADD COLUMN "passwordHash" TEXT;
    `);

    console.log('✅ Column passwordHash added successfully!');
    console.log('');
    console.log('You can now sign up with:');
    console.log('  Email: business@test.com');
    console.log('  Password: Test1234!');
    console.log('  Account Type: Business');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

addPasswordHashColumn();
