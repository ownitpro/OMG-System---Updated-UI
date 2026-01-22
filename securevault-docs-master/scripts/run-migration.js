#!/usr/bin/env node
/**
 * Run database migrations
 * Usage: node scripts/run-migration.js [migration-file]
 *
 * Requires DATABASE_URL environment variable to be set.
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const migrationFile = process.argv[2];

  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL environment variable is not set');
    console.log('\nSet it like this:');
    console.log('  Windows: set DATABASE_URL=postgresql://user:pass@host:5432/dbname');
    console.log('  Linux/Mac: export DATABASE_URL=postgresql://user:pass@host:5432/dbname');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log('Connecting to database...');
    await pool.query('SELECT 1');
    console.log('Connected!\n');

    const migrationsDir = path.join(__dirname, '..', 'migrations');
    let filesToRun = [];

    if (migrationFile) {
      const fullPath = path.join(migrationsDir, migrationFile);
      if (!fs.existsSync(fullPath)) {
        console.error('Migration file not found:', fullPath);
        process.exit(1);
      }
      filesToRun = [migrationFile];
    } else {
      filesToRun = fs.readdirSync(migrationsDir)
        .filter(f => f.endsWith('.sql'))
        .sort();
    }

    for (const file of filesToRun) {
      const fullPath = path.join(migrationsDir, file);
      console.log('Running migration:', file);

      const sql = fs.readFileSync(fullPath, 'utf8');
      const statements = sql
        .split(/;(?=\s*(?:--|ALTER|CREATE|UPDATE|INSERT|DELETE|DROP|$))/i)
        .map(s => s.trim())
        .filter(s => s && !s.startsWith('--'));

      for (const statement of statements) {
        if (statement) {
          try {
            await pool.query(statement);
            console.log('  OK');
          } catch (err) {
            if (err.message.includes('already exists') || err.message.includes('duplicate')) {
              console.log('  Skipped (already exists)');
            } else {
              throw err;
            }
          }
        }
      }
      console.log('Migration complete:', file, '\n');
    }

    console.log('All migrations completed!');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
