#!/usr/bin/env node

/**
 * Run Email Template Migration
 * This script runs the 20251222_create_email_templates.sql migration
 * against your Aurora PostgreSQL database.
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function runMigration() {
  console.log('🚀 Email Template Migration Runner\n');

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL not found in environment variables');
    console.error('   Please set DATABASE_URL in your .env.local file\n');
    process.exit(1);
  }

  // Read the migration file
  const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251222_create_email_templates.sql');

  if (!fs.existsSync(migrationPath)) {
    console.error(`❌ ERROR: Migration file not found at ${migrationPath}\n`);
    process.exit(1);
  }

  const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
  console.log(`📄 Migration file: ${migrationPath}`);
  console.log(`📊 SQL length: ${migrationSQL.length} characters\n`);

  // Connect to database
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔌 Connecting to Aurora PostgreSQL...');
    await client.connect();
    console.log('✅ Connected successfully\n');

    console.log('🔨 Running migration...');
    await client.query(migrationSQL);
    console.log('✅ Migration completed successfully!\n');

    // Verify the table was created
    console.log('🔍 Verifying table creation...');
    const result = await client.query(`
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'securevault'
        AND table_name = 'EmailTemplate'
      ORDER BY ordinal_position
    `);

    if (result.rows.length > 0) {
      console.log('✅ Table "securevault"."EmailTemplate" created with columns:');
      result.rows.forEach(row => {
        console.log(`   - ${row.column_name}: ${row.data_type}`);
      });
      console.log('');
    } else {
      console.log('⚠️  Warning: Could not verify table creation\n');
    }

    // Check indexes
    const indexes = await client.query(`
      SELECT indexname
      FROM pg_indexes
      WHERE schemaname = 'securevault'
        AND tablename = 'EmailTemplate'
    `);

    if (indexes.rows.length > 0) {
      console.log('📑 Indexes created:');
      indexes.rows.forEach(row => {
        console.log(`   - ${row.indexname}`);
      });
      console.log('');
    }

    // Check trigger
    const triggers = await client.query(`
      SELECT trigger_name
      FROM information_schema.triggers
      WHERE event_object_schema = 'securevault'
        AND event_object_table = 'EmailTemplate'
    `);

    if (triggers.rows.length > 0) {
      console.log('⚡ Triggers created:');
      triggers.rows.forEach(row => {
        console.log(`   - ${row.trigger_name}`);
      });
      console.log('');
    }

    console.log('🎉 Migration complete! You can now:');
    console.log('   1. Start your dev server: npm run dev');
    console.log('   2. Navigate to: /org/[orgId]/admin/email-templates');
    console.log('   3. Click "Migrate from Code" to populate default templates');
    console.log('');

  } catch (error) {
    console.error('❌ Migration failed:');
    console.error(error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Database connection closed');
  }
}

// Run the migration
runMigration().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
