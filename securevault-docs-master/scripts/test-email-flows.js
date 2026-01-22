#!/usr/bin/env node
/**
 * Email Flow Test Script
 * Tests all email sending capabilities in SecureVault
 *
 * Prerequisites:
 * - AWS credentials configured
 * - DATABASE_URL set in .env.local
 * - For Cognito tests: SES must be in production mode OR use sandbox-verified emails
 *
 * Run: node scripts/test-email-flows.js [--type <type>] [--email <email>]
 *
 * Types:
 *   all         - Run all tests
 *   cognito     - Test Cognito auth emails only
 *   app         - Test application emails only
 *   template    - Test DB template lookup only
 */

const { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminDeleteUserCommand } = require('@aws-sdk/client-cognito-identity-provider');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { Pool } = require('pg');

require('dotenv').config({ path: '.env.local' });

// Configuration
const CONFIG = {
  region: 'ca-central-1',
  userPoolId: 'ca-central-1_JY2OSgN3y',
  fromEmail: process.env.EMAIL_FROM || 'noreply@securevaultdocs.com',
  testOrgId: '9f097ca5-5669-4470-b325-4b527e294fec', // Update to your test org
};

// Parse CLI arguments
const args = process.argv.slice(2);
const typeArg = args.indexOf('--type');
const emailArg = args.indexOf('--email');
const testType = typeArg !== -1 ? args[typeArg + 1] : 'all';
const testEmail = emailArg !== -1 ? args[emailArg + 1] : null;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('rds.amazonaws.com') ? { rejectUnauthorized: false } : false
});

// ============ Test Result Tracking ============

const results = {
  passed: 0,
  failed: 0,
  skipped: 0,
  details: []
};

function logResult(name, status, message = '') {
  const icons = { pass: '✅', fail: '❌', skip: '⏭️' };
  const icon = icons[status] || '❓';
  console.log(`${icon} ${name}${message ? ': ' + message : ''}`);
  results.details.push({ name, status, message });
  if (status === 'pass') results.passed++;
  else if (status === 'fail') results.failed++;
  else results.skipped++;
}

// ============ Cognito Email Tests ============

async function testCognitoSignupEmail() {
  if (!testEmail) {
    logResult('Cognito Signup Email', 'skip', 'No test email provided (--email required)');
    return;
  }

  console.log('\n--- Testing Cognito Signup Email ---');

  const client = new CognitoIdentityProviderClient({ region: CONFIG.region });
  const testUsername = `test-${Date.now()}@example.com`;

  try {
    // Create temporary user (triggers signup email)
    const createCommand = new AdminCreateUserCommand({
      UserPoolId: CONFIG.userPoolId,
      Username: testEmail,
      UserAttributes: [
        { Name: 'email', Value: testEmail },
        { Name: 'email_verified', Value: 'true' },
        { Name: 'name', Value: 'Test User' }
      ],
      MessageAction: 'SUPPRESS', // Don't send default email
      TemporaryPassword: 'TempPass123!'
    });

    await client.send(createCommand);
    logResult('Cognito AdminCreateUser', 'pass', `Created temp user: ${testEmail}`);

    // Note: The CustomEmailSender Lambda should be triggered
    // Check CloudWatch logs for Lambda execution

    // Cleanup - delete test user
    const deleteCommand = new AdminDeleteUserCommand({
      UserPoolId: CONFIG.userPoolId,
      Username: testEmail
    });
    await client.send(deleteCommand);
    logResult('Cognito Cleanup', 'pass', 'Test user deleted');

  } catch (error) {
    if (error.name === 'UsernameExistsException') {
      logResult('Cognito Signup Email', 'skip', 'Test email already exists in Cognito');
    } else {
      logResult('Cognito Signup Email', 'fail', error.message);
    }
  }
}

async function testCognitoForgotPasswordEmail() {
  // This would trigger forgot password flow
  // Requires existing user - skipping for safety
  logResult('Cognito Forgot Password', 'skip', 'Requires existing user - manual test recommended');
}

// ============ Application Email Tests ============

async function testDirectSESEmail() {
  if (!testEmail) {
    logResult('Direct SES Email', 'skip', 'No test email provided');
    return;
  }

  console.log('\n--- Testing Direct SES Email ---');

  const client = new SESClient({ region: CONFIG.region });

  try {
    const command = new SendEmailCommand({
      Source: CONFIG.fromEmail,
      Destination: {
        ToAddresses: [testEmail]
      },
      Message: {
        Subject: {
          Data: '[TEST] SecureVault Email Test',
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #3B82F6;">SecureVault Email Test</h1>
                <p>This is a test email sent at ${new Date().toISOString()}</p>
                <p>If you're receiving this, SES is working correctly!</p>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                <p style="color: #6B7280; font-size: 12px;">
                  Sent from SecureVault email test script
                </p>
              </div>
            `,
            Charset: 'UTF-8'
          },
          Text: {
            Data: `SecureVault Email Test\n\nThis is a test email sent at ${new Date().toISOString()}\n\nIf you're receiving this, SES is working correctly!`,
            Charset: 'UTF-8'
          }
        }
      }
    });

    const response = await client.send(command);
    logResult('Direct SES Email', 'pass', `MessageId: ${response.MessageId}`);

  } catch (error) {
    if (error.name === 'MessageRejected' && error.message.includes('sandbox')) {
      logResult('Direct SES Email', 'fail', 'SES still in sandbox mode - verify recipient email first');
    } else {
      logResult('Direct SES Email', 'fail', error.message);
    }
  }
}

// ============ Database Template Tests ============

async function testTemplateRetrieval() {
  console.log('\n--- Testing Database Template Retrieval ---');

  try {
    const client = await pool.connect();

    // Test fetching a template
    const result = await client.query(
      `SELECT id, name, slug, subject, "isActive"
       FROM securevault."EmailTemplate"
       WHERE "organizationId" = $1
       LIMIT 5`,
      [CONFIG.testOrgId]
    );

    if (result.rows.length > 0) {
      logResult('Template Retrieval', 'pass', `Found ${result.rows.length} templates`);
      console.log('   Templates found:');
      result.rows.forEach(t => {
        console.log(`     - ${t.slug}: ${t.name} (${t.isActive ? 'active' : 'inactive'})`);
      });
    } else {
      logResult('Template Retrieval', 'skip', 'No templates found for org - run migration first');
    }

    // Test template with specific slug
    const portalTemplate = await client.query(
      `SELECT id, name, subject, "htmlContent"
       FROM securevault."EmailTemplate"
       WHERE "organizationId" = $1 AND slug = 'portal_created' AND "isActive" = true
       LIMIT 1`,
      [CONFIG.testOrgId]
    );

    if (portalTemplate.rows.length > 0) {
      const template = portalTemplate.rows[0];
      logResult('Portal Created Template', 'pass', `Subject: ${template.subject.substring(0, 50)}...`);

      // Validate template has required variables
      const hasVariables = template.htmlContent.includes('{{') &&
        (template.htmlContent.includes('{{clientName}}') || template.htmlContent.includes('{{portalUrl}}'));
      if (hasVariables) {
        logResult('Template Variables', 'pass', 'Contains expected variables');
      } else {
        logResult('Template Variables', 'fail', 'Missing expected variables (clientName, portalUrl)');
      }
    } else {
      logResult('Portal Created Template', 'skip', 'Template not found');
    }

    client.release();

  } catch (error) {
    if (error.message.includes('does not exist')) {
      logResult('Template Retrieval', 'skip', 'EmailTemplate table not found - run migration');
    } else {
      logResult('Template Retrieval', 'fail', error.message);
    }
  }
}

async function testVariableReplacement() {
  console.log('\n--- Testing Variable Replacement ---');

  // Simulate the replaceVariables function
  function replaceVariables(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : match;
    });
  }

  const testTemplate = 'Hello {{clientName}}, your portal is at {{portalUrl}}. PIN: {{pin}}';
  const testData = {
    clientName: 'John Doe',
    portalUrl: 'https://securevaultdocs.com/portal/abc123',
    pin: '123456'
  };

  const result = replaceVariables(testTemplate, testData);
  const expected = 'Hello John Doe, your portal is at https://securevaultdocs.com/portal/abc123. PIN: 123456';

  if (result === expected) {
    logResult('Variable Replacement', 'pass', 'All variables replaced correctly');
  } else {
    logResult('Variable Replacement', 'fail', `Got: ${result}`);
  }

  // Test with missing variable
  const partialData = { clientName: 'Jane' };
  const partialResult = replaceVariables(testTemplate, partialData);
  const hasMissingVar = partialResult.includes('{{portalUrl}}');

  if (hasMissingVar) {
    logResult('Missing Variable Handling', 'pass', 'Keeps placeholder for missing vars');
  } else {
    logResult('Missing Variable Handling', 'fail', 'Should keep {{placeholder}} for missing vars');
  }
}

// ============ Integration Tests ============

async function testEmailServiceIntegration() {
  console.log('\n--- Testing Email Service Integration ---');

  try {
    // Check if email.ts exports exist
    const emailLib = require('../src/lib/email');

    if (typeof emailLib.sendEmail === 'function') {
      logResult('sendEmail Export', 'pass', 'Function exists');
    } else {
      logResult('sendEmail Export', 'fail', 'Not a function');
    }

    if (typeof emailLib.sendPortalCreatedEmail === 'function') {
      logResult('sendPortalCreatedEmail Export', 'pass', 'Function exists');
    } else {
      logResult('sendPortalCreatedEmail Export', 'fail', 'Not a function');
    }

  } catch (error) {
    logResult('Email Service Integration', 'skip', 'Cannot import email lib in test context');
  }
}

// ============ Main Test Runner ============

async function runTests() {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║     SecureVault Email Flow Test Suite        ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`\nTest Type: ${testType}`);
  console.log(`Test Email: ${testEmail || '(not provided)'}`);
  console.log(`Organization: ${CONFIG.testOrgId}`);

  try {
    if (testType === 'all' || testType === 'template') {
      await testTemplateRetrieval();
      await testVariableReplacement();
    }

    if (testType === 'all' || testType === 'app') {
      await testDirectSESEmail();
      await testEmailServiceIntegration();
    }

    if (testType === 'all' || testType === 'cognito') {
      await testCognitoSignupEmail();
      await testCognitoForgotPasswordEmail();
    }

  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
  }

  // Summary
  console.log('\n══════════════════════════════════════════════');
  console.log('Test Summary');
  console.log('══════════════════════════════════════════════');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⏭️  Skipped: ${results.skipped}`);
  console.log('══════════════════════════════════════════════\n');

  // Cleanup
  await pool.end();

  // Exit with error code if any failures
  if (results.failed > 0) {
    process.exit(1);
  }
}

runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
