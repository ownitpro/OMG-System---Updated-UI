#!/usr/bin/env node
/**
 * PIN Migration Script
 *
 * This script migrates existing plaintext PINs to bcrypt-hashed PINs.
 *
 * IMPORTANT: This is a ONE-WAY operation. Once PINs are hashed, they cannot
 * be recovered. Make sure to:
 * 1. Back up your database before running
 * 2. Notify clients that their PINs will be reset (if you can't hash existing ones)
 *
 * Usage:
 *   node scripts/migrate-plaintext-pins.js --dry-run    # Preview what would change
 *   node scripts/migrate-plaintext-pins.js --apply      # Actually migrate PINs
 *   node scripts/migrate-plaintext-pins.js --reset      # Generate new PINs and send emails
 */

require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const BCRYPT_SALT_ROUNDS = 10;

// Create database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Determine schema based on DATABASE_PROVIDER
const schema = process.env.DATABASE_PROVIDER === 'postgres' ? 'securevault' : 'public';
const portalTable = `"${schema}"."Portal"`;

async function getPortalsWithPins() {
  const result = await pool.query(`
    SELECT id, name, pin, "clientEmail", "clientName"
    FROM ${portalTable}
    WHERE pin IS NOT NULL
  `);
  return result.rows;
}

function isAlreadyHashed(pin) {
  // bcrypt hashes start with $2a$, $2b$, or $2y$ and are 60 characters
  return pin && pin.length === 60 && /^\$2[aby]\$/.test(pin);
}

function generateNewPin() {
  // Generate a random 6-character alphanumeric PIN
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

async function dryRun() {
  console.log('=== DRY RUN - No changes will be made ===\n');

  const portals = await getPortalsWithPins();
  console.log(`Found ${portals.length} portals with PINs\n`);

  let alreadyHashed = 0;
  let needsMigration = 0;

  for (const portal of portals) {
    if (isAlreadyHashed(portal.pin)) {
      alreadyHashed++;
      console.log(`✅ ${portal.name} (${portal.id.slice(0, 8)}...) - Already hashed`);
    } else {
      needsMigration++;
      console.log(`⚠️  ${portal.name} (${portal.id.slice(0, 8)}...) - PLAINTEXT PIN: ${portal.pin}`);
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Already hashed: ${alreadyHashed}`);
  console.log(`Needs migration: ${needsMigration}`);

  if (needsMigration > 0) {
    console.log('\n⚠️  WARNING: Plaintext PINs cannot be hashed and verified later.');
    console.log('   You have two options:');
    console.log('   1. Run with --apply to hash existing PINs (clients keep same PINs)');
    console.log('   2. Run with --reset to generate new PINs (requires notifying clients)');
  }
}

async function applyMigration() {
  console.log('=== APPLYING PIN MIGRATION ===\n');

  const portals = await getPortalsWithPins();
  let migrated = 0;
  let skipped = 0;
  let errors = 0;

  for (const portal of portals) {
    if (isAlreadyHashed(portal.pin)) {
      skipped++;
      console.log(`⏭️  ${portal.name} - Already hashed, skipping`);
      continue;
    }

    try {
      // Hash the existing plaintext PIN
      const hashedPin = await bcrypt.hash(portal.pin, BCRYPT_SALT_ROUNDS);

      await pool.query(
        `UPDATE ${portalTable} SET pin = $1 WHERE id = $2`,
        [hashedPin, portal.id]
      );

      migrated++;
      console.log(`✅ ${portal.name} - PIN hashed successfully`);
    } catch (error) {
      errors++;
      console.error(`❌ ${portal.name} - Error: ${error.message}`);
    }
  }

  console.log('\n=== Migration Complete ===');
  console.log(`Migrated: ${migrated}`);
  console.log(`Skipped (already hashed): ${skipped}`);
  console.log(`Errors: ${errors}`);
}

async function resetPins() {
  console.log('=== RESETTING PINS (New PINs will be generated) ===\n');
  console.log('⚠️  This will generate NEW PINs. Clients will need to be notified!\n');

  const portals = await getPortalsWithPins();
  const updatedPortals = [];
  let errors = 0;

  for (const portal of portals) {
    if (isAlreadyHashed(portal.pin)) {
      console.log(`⏭️  ${portal.name} - Already hashed, skipping`);
      continue;
    }

    try {
      // Generate a new PIN
      const newPin = generateNewPin();
      const hashedPin = await bcrypt.hash(newPin, BCRYPT_SALT_ROUNDS);

      await pool.query(
        `UPDATE ${portalTable} SET pin = $1 WHERE id = $2`,
        [hashedPin, portal.id]
      );

      updatedPortals.push({
        id: portal.id,
        name: portal.name,
        clientEmail: portal.clientEmail,
        clientName: portal.clientName,
        newPin: newPin  // Store plaintext for notification
      });

      console.log(`✅ ${portal.name} - New PIN: ${newPin} (for ${portal.clientEmail})`);
    } catch (error) {
      errors++;
      console.error(`❌ ${portal.name} - Error: ${error.message}`);
    }
  }

  console.log('\n=== Reset Complete ===');
  console.log(`Updated: ${updatedPortals.length}`);
  console.log(`Errors: ${errors}`);

  if (updatedPortals.length > 0) {
    console.log('\n=== NEW PINS (Send these to clients) ===\n');
    for (const p of updatedPortals) {
      console.log(`${p.clientName || 'Client'} <${p.clientEmail}>: ${p.newPin}`);
    }

    // Also save to a file for reference
    const fs = require('fs');
    const outputPath = `./new-pins-${Date.now()}.json`;
    fs.writeFileSync(outputPath, JSON.stringify(updatedPortals, null, 2));
    console.log(`\n📁 New PINs saved to: ${outputPath}`);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.length === 0) {
    console.log(`
PIN Migration Script for SecureVault

Usage:
  node scripts/migrate-plaintext-pins.js --dry-run    Preview what would change
  node scripts/migrate-plaintext-pins.js --apply      Hash existing plaintext PINs
  node scripts/migrate-plaintext-pins.js --reset      Generate new PINs (for broken ones)

Options:
  --dry-run   Show portals with plaintext PINs without making changes
  --apply     Hash existing plaintext PINs (clients keep same PINs)
  --reset     Generate new random PINs and hash them (requires client notification)
  --help      Show this help message
`);
    process.exit(0);
  }

  try {
    // Test database connection
    await pool.query('SELECT 1');
    console.log('✅ Database connected\n');

    if (args.includes('--dry-run')) {
      await dryRun();
    } else if (args.includes('--apply')) {
      await applyMigration();
    } else if (args.includes('--reset')) {
      await resetPins();
    } else {
      console.log('Unknown option. Use --help to see available options.');
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
