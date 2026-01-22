#!/usr/bin/env node
/**
 * Run the complete SecureVault database migration
 *
 * This script executes the complete schema migration against your Aurora PostgreSQL
 * or Supabase database. It creates all necessary schemas (core, hub, securevault)
 * and all tables with proper indexes and constraints.
 *
 * Usage:
 *   node scripts/run-complete-migration.js
 *
 * Required environment variables:
 *   - DATABASE_URL: PostgreSQL connection string
 *   OR
 *   - NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY: Supabase credentials
 */

const fs = require('fs');
const path = require('path');

async function runMigration() {
  console.log('🚀 SecureVault Database Migration');
  console.log('================================\n');

  // Read the migration file
  const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251220_complete_schema.sql');

  if (!fs.existsSync(migrationPath)) {
    console.error('❌ Migration file not found:', migrationPath);
    process.exit(1);
  }

  const sql = fs.readFileSync(migrationPath, 'utf8');
  console.log(`📄 Loaded migration file (${sql.length} bytes)\n`);

  // Check for database connection
  const databaseUrl = process.env.DATABASE_URL;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (databaseUrl) {
    console.log('🔗 Using DATABASE_URL (PostgreSQL direct connection)\n');
    await runWithPg(sql, databaseUrl);
  } else if (supabaseUrl && supabaseKey) {
    console.log('🔗 Using Supabase REST API\n');
    await runWithSupabase(sql, supabaseUrl, supabaseKey);
  } else {
    console.error('❌ No database connection configured!');
    console.error('\nPlease set one of:');
    console.error('  - DATABASE_URL: PostgreSQL connection string');
    console.error('  - NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY: Supabase credentials');
    process.exit(1);
  }
}

async function runWithPg(sql, connectionString) {
  try {
    const { Pool } = require('pg');
    const pool = new Pool({ connectionString });

    console.log('⏳ Executing migration...\n');

    await pool.query(sql);

    console.log('✅ Migration completed successfully!\n');

    // List created tables
    const result = await pool.query(`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_schema IN ('core', 'hub', 'securevault')
      ORDER BY table_schema, table_name
    `);

    console.log('📊 Tables created:');
    let currentSchema = '';
    for (const row of result.rows) {
      if (row.table_schema !== currentSchema) {
        currentSchema = row.table_schema;
        console.log(`\n  ${currentSchema.toUpperCase()}:`);
      }
      console.log(`    - ${row.table_name}`);
    }

    await pool.end();
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    if (error.detail) console.error('   Detail:', error.detail);
    if (error.hint) console.error('   Hint:', error.hint);
    process.exit(1);
  }
}

async function runWithSupabase(sql, supabaseUrl, supabaseKey) {
  try {
    // Supabase doesn't support raw SQL via REST API easily
    // We'll use the SQL Editor RPC if available, or fall back to instructions

    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ query: sql })
    });

    if (response.ok) {
      console.log('✅ Migration completed successfully!');
    } else {
      const errorText = await response.text();

      if (response.status === 404) {
        console.log('⚠️  The exec_sql RPC function is not available.');
        console.log('\n📋 Please run the migration manually:');
        console.log('   1. Go to your Supabase dashboard');
        console.log('   2. Open the SQL Editor');
        console.log('   3. Copy and paste the contents of:');
        console.log(`      ${path.resolve(__dirname, '..', 'supabase', 'migrations', '20251220_complete_schema.sql')}`);
        console.log('   4. Execute the SQL');
      } else {
        console.error('❌ Migration failed:', errorText);
        process.exit(1);
      }
    }
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run the migration
runMigration().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
