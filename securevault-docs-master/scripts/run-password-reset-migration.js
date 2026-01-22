#!/usr/bin/env node
/**
 * Run Password Reset Token Migration
 * Creates the core.PasswordResetToken table needed for password reset flow
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

async function runMigration() {
  // Read database connection from .env.local
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Required for AWS RDS
    }
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Read migration file
    const migrationPath = path.join(__dirname, '../supabase/migrations/20251222_create_password_reset_token.sql');
    const migration = fs.readFileSync(migrationPath, 'utf8');

    console.log('\n📝 Running migration: 20251222_create_password_reset_token.sql\n');

    // Execute migration
    await client.query(migration);

    console.log('✅ Migration completed successfully!');
    console.log('\n📋 Created:');
    console.log('   - Table: core.PasswordResetToken');
    console.log('   - Indexes for userId, token, expiresAt');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n✅ Database connection closed');
  }
}

runMigration();
