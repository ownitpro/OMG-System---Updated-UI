#!/usr/bin/env node
/**
 * SES Sandbox Testing Script
 *
 * Usage:
 *   node scripts/ses-sandbox-test.js verify <email>   - Verify an email address
 *   node scripts/ses-sandbox-test.js send <email>     - Send test email to verified address
 *   node scripts/ses-sandbox-test.js status           - Check SES account status
 *   node scripts/ses-sandbox-test.js list             - List verified emails
 */

const { SESClient, VerifyEmailIdentityCommand, ListIdentitiesCommand,
        GetIdentityVerificationAttributesCommand, SendEmailCommand,
        GetAccountCommand } = require('@aws-sdk/client-ses');

require('dotenv').config({ path: '.env.local' });

const REGION = process.env.AWS_REGION || 'ca-central-1';
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@securevaultdocs.com';

const client = new SESClient({ region: REGION });

async function checkStatus() {
  console.log('\n=== SES Account Status ===\n');

  try {
    const response = await client.send(new GetAccountCommand({}));

    console.log('Account Details:');
    console.log(`  Sending Enabled: ${response.SendingEnabled ? '✅ Yes' : '❌ No'}`);
    console.log(`  Enforcement Status: ${response.EnforcementStatus || 'Unknown'}`);

    if (response.EnforcementStatus === 'SANDBOX' || !response.SendingEnabled) {
      console.log('\n⚠️  Your account is in SANDBOX mode');
      console.log('   You can only send to VERIFIED email addresses');
      console.log('   Run: node scripts/ses-sandbox-test.js verify <your-email>');
    } else {
      console.log('\n✅ Your account has PRODUCTION access');
      console.log('   You can send to any email address');
    }

    // Show sending limits
    if (response.SendQuota) {
      console.log('\nSending Limits:');
      console.log(`  Max 24-hour send: ${response.SendQuota.Max24HourSend}`);
      console.log(`  Max send rate: ${response.SendQuota.MaxSendRate}/sec`);
      console.log(`  Sent last 24h: ${response.SendQuota.SentLast24Hours}`);
    }
  } catch (error) {
    console.error('❌ Error checking status:', error.message);
    console.log('\nMake sure your AWS credentials are configured correctly.');
  }
}

async function listVerifiedEmails() {
  console.log('\n=== Verified Email Identities ===\n');

  try {
    const listResponse = await client.send(new ListIdentitiesCommand({
      IdentityType: 'EmailAddress'
    }));

    const emails = listResponse.Identities || [];

    if (emails.length === 0) {
      console.log('No verified emails found.');
      console.log('Run: node scripts/ses-sandbox-test.js verify <your-email>');
      return;
    }

    // Get verification status for each
    const statusResponse = await client.send(new GetIdentityVerificationAttributesCommand({
      Identities: emails
    }));

    console.log('Verified emails:');
    emails.forEach(email => {
      const status = statusResponse.VerificationAttributes?.[email];
      const icon = status?.VerificationStatus === 'Success' ? '✅' : '⏳';
      console.log(`  ${icon} ${email} - ${status?.VerificationStatus || 'Unknown'}`);
    });

  } catch (error) {
    console.error('❌ Error listing emails:', error.message);
  }
}

async function verifyEmail(email) {
  console.log(`\n=== Verifying Email: ${email} ===\n`);

  if (!email || !email.includes('@')) {
    console.error('❌ Invalid email address');
    return;
  }

  try {
    await client.send(new VerifyEmailIdentityCommand({
      EmailAddress: email
    }));

    console.log('✅ Verification email sent!');
    console.log(`\nCheck your inbox at: ${email}`);
    console.log('Click the verification link in the email from AWS.');
    console.log('\nAfter clicking the link, run:');
    console.log(`  node scripts/ses-sandbox-test.js send ${email}`);

  } catch (error) {
    console.error('❌ Error sending verification:', error.message);
  }
}

async function sendTestEmail(toEmail) {
  console.log(`\n=== Sending Test Email to: ${toEmail} ===\n`);

  if (!toEmail || !toEmail.includes('@')) {
    console.error('❌ Invalid email address');
    return;
  }

  try {
    const response = await client.send(new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [toEmail]
      },
      Message: {
        Subject: {
          Data: '🧪 SecureVault Test Email - SES Working!',
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 20px; }
                  .container { max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; padding: 32px; }
                  .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 24px; border-radius: 8px; text-align: center; }
                  .content { padding: 24px 0; }
                  .success { color: #059669; font-weight: bold; }
                  .footer { color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 16px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>✅ SES Email Test Successful</h1>
                  </div>
                  <div class="content">
                    <p class="success">Your AWS SES email integration is working!</p>
                    <p>This email was sent at: <strong>${new Date().toISOString()}</strong></p>
                    <p>From: <strong>${FROM_EMAIL}</strong></p>
                    <p>To: <strong>${toEmail}</strong></p>
                    <p>Region: <strong>${REGION}</strong></p>
                  </div>
                  <div class="footer">
                    <p>SecureVault Docs - Secure Document Management</p>
                  </div>
                </div>
              </body>
              </html>
            `,
            Charset: 'UTF-8'
          },
          Text: {
            Data: `SES Email Test Successful!\n\nYour AWS SES email integration is working.\n\nSent at: ${new Date().toISOString()}\nFrom: ${FROM_EMAIL}\nTo: ${toEmail}`,
            Charset: 'UTF-8'
          }
        }
      }
    }));

    console.log('✅ Email sent successfully!');
    console.log(`\nMessage ID: ${response.MessageId}`);
    console.log(`\nCheck your inbox at: ${toEmail}`);

  } catch (error) {
    if (error.name === 'MessageRejected') {
      if (error.message.includes('not verified')) {
        console.error('❌ Recipient email is not verified in SES sandbox');
        console.log(`\nRun: node scripts/ses-sandbox-test.js verify ${toEmail}`);
      } else if (error.message.includes('Email address is not verified')) {
        console.error('❌ FROM email is not verified');
        console.log('\nMake sure securevaultdocs.com domain is verified in SES');
      } else {
        console.error('❌ Email rejected:', error.message);
      }
    } else {
      console.error('❌ Error sending email:', error.message);
    }
  }
}

// Main
const [,, command, arg] = process.argv;

switch (command) {
  case 'status':
    checkStatus();
    break;
  case 'list':
    listVerifiedEmails();
    break;
  case 'verify':
    if (!arg) {
      console.error('Usage: node scripts/ses-sandbox-test.js verify <email>');
      process.exit(1);
    }
    verifyEmail(arg);
    break;
  case 'send':
    if (!arg) {
      console.error('Usage: node scripts/ses-sandbox-test.js send <email>');
      process.exit(1);
    }
    sendTestEmail(arg);
    break;
  default:
    console.log(`
SES Sandbox Testing Script

Usage:
  node scripts/ses-sandbox-test.js status          - Check SES account status
  node scripts/ses-sandbox-test.js list            - List verified emails
  node scripts/ses-sandbox-test.js verify <email>  - Verify an email address
  node scripts/ses-sandbox-test.js send <email>    - Send test to verified email

For sandbox mode testing:
  1. Run: node scripts/ses-sandbox-test.js verify your@email.com
  2. Click the link in the verification email
  3. Run: node scripts/ses-sandbox-test.js send your@email.com
`);
}
