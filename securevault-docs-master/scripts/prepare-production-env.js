#!/usr/bin/env node
/**
 * Production Environment Preparation Script
 *
 * This script documents all the changes needed to switch from development
 * to production mode. Run with --apply to actually make the changes.
 *
 * Usage:
 *   node scripts/prepare-production-env.js         # Show what would change
 *   node scripts/prepare-production-env.js --apply # Apply changes
 */

const fs = require('fs');
const path = require('path');

const ENV_FILE = path.join(__dirname, '..', '.env.local');

// Changes to apply for production
const PRODUCTION_CHANGES = {
  // CRITICAL: Disable test/demo modes
  'SVD_TEST_OPEN': { from: '1', to: '0', reason: 'Disable auth bypass' },
  'SVD_DEMO_MODE': { from: '1', to: '0', reason: 'Disable demo mode' },
  'NEXT_PUBLIC_ENABLE_DEMO_MODE': { from: 'true', to: 'false', reason: 'Hide demo features' },

  // CRITICAL: Set production URLs
  'NEXTAUTH_URL': { from: 'http://localhost:3000', to: 'https://securevaultdocs.com', reason: 'Production URL' },

  // CRITICAL: Enable real billing
  'NEXT_PUBLIC_BILLING_MODE': { from: 'mock', to: 'live', reason: 'Enable real Stripe billing' },

  // HIGH: AWS services (optional - keep mock if not ready)
  'OCR_MODE': { from: 'MOCK', to: 'TEXTRACT', reason: 'Enable real OCR (optional)' },
  'TEXTRACT_MODE': { from: 'mock', to: 'live', reason: 'Enable real Textract (optional)' },
};

// Variables to REMOVE for production
const REMOVE_VARS = [
  'SVD_AUTH_BYPASS_EMAILS',    // Security risk - allows bypassing auth
  'SVD_FAKE_EMAIL_DELIVERY',   // Use real SES instead
];

// Variables to ADD for production
const ADD_VARS = {
  'NEXT_PUBLIC_BASE_URL': 'https://securevaultdocs.com',
  'NEXT_PUBLIC_APP_URL': 'https://securevaultdocs.com',
};

function readEnvFile() {
  try {
    return fs.readFileSync(ENV_FILE, 'utf8');
  } catch (error) {
    console.error('Error reading .env.local:', error.message);
    process.exit(1);
  }
}

function parseEnvFile(content) {
  const lines = content.split('\n');
  const vars = {};
  const structure = []; // Preserve comments and structure

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('#') || trimmed === '') {
      structure.push({ type: 'comment', value: line, index });
    } else if (trimmed.includes('=')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').replace(/^["']|["']$/g, '');
      vars[key.trim()] = value;
      structure.push({ type: 'var', key: key.trim(), value, line, index });
    }
  });

  return { vars, structure, lines };
}

function showChanges(vars) {
  console.log('\n=== Production Environment Changes ===\n');

  console.log('CHANGES TO APPLY:');
  console.log('-'.repeat(60));
  Object.entries(PRODUCTION_CHANGES).forEach(([key, change]) => {
    const current = vars[key] || '(not set)';
    const status = current === change.from ? '⚠️' : (current === change.to ? '✅' : '❓');
    console.log(`${status} ${key}`);
    console.log(`   Current: ${current}`);
    console.log(`   Target:  ${change.to}`);
    console.log(`   Reason:  ${change.reason}`);
    console.log('');
  });

  console.log('\nVARIABLES TO REMOVE:');
  console.log('-'.repeat(60));
  REMOVE_VARS.forEach(key => {
    const current = vars[key];
    if (current) {
      console.log(`🗑️  ${key}=${current.substring(0, 30)}...`);
    } else {
      console.log(`✅ ${key} (already removed)`);
    }
  });

  console.log('\n\nVARIABLES TO ADD:');
  console.log('-'.repeat(60));
  Object.entries(ADD_VARS).forEach(([key, value]) => {
    if (vars[key]) {
      console.log(`✅ ${key}=${vars[key]} (already set)`);
    } else {
      console.log(`➕ ${key}=${value}`);
    }
  });

  console.log('\n');
}

function applyChanges(content, vars) {
  let newContent = content;

  // Apply value changes
  Object.entries(PRODUCTION_CHANGES).forEach(([key, change]) => {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(newContent)) {
      newContent = newContent.replace(regex, `${key}=${change.to}`);
      console.log(`✅ Changed ${key} to ${change.to}`);
    }
  });

  // Remove variables (comment them out instead of deleting)
  REMOVE_VARS.forEach(key => {
    const regex = new RegExp(`^${key}=(.*)$`, 'm');
    if (regex.test(newContent)) {
      newContent = newContent.replace(regex, `# REMOVED FOR PRODUCTION: ${key}=$1`);
      console.log(`🗑️  Commented out ${key}`);
    }
  });

  // Add new variables
  Object.entries(ADD_VARS).forEach(([key, value]) => {
    if (!vars[key]) {
      // Add after NEXTAUTH_URL section
      const insertPoint = newContent.indexOf('NEXTAUTH_SECRET=');
      if (insertPoint > 0) {
        const lineEnd = newContent.indexOf('\n', insertPoint);
        newContent = newContent.slice(0, lineEnd + 1) +
                     `${key}=${value}\n` +
                     newContent.slice(lineEnd + 1);
        console.log(`➕ Added ${key}=${value}`);
      }
    }
  });

  return newContent;
}

function main() {
  const applyMode = process.argv.includes('--apply');

  console.log('SecureVault Production Environment Preparation');
  console.log('='.repeat(50));

  const content = readEnvFile();
  const { vars } = parseEnvFile(content);

  showChanges(vars);

  if (applyMode) {
    console.log('Applying changes...\n');
    const newContent = applyChanges(content, vars);

    // Backup original
    const backupPath = ENV_FILE + '.backup-' + Date.now();
    fs.writeFileSync(backupPath, content);
    console.log(`\n📁 Backup saved to: ${backupPath}`);

    // Write new content
    fs.writeFileSync(ENV_FILE, newContent);
    console.log('✅ Changes applied to .env.local');

    console.log('\n⚠️  IMPORTANT: Review the changes and update Stripe keys!');
    console.log('   Current Stripe keys are test keys (sk_test_..., pk_test_...)');
    console.log('   Replace with live keys for production billing.');
  } else {
    console.log('Run with --apply to make these changes:');
    console.log('  node scripts/prepare-production-env.js --apply');
  }
}

main();
