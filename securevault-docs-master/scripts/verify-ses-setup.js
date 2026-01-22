#!/usr/bin/env node
/**
 * SES Setup Verification Script
 * Verifies Lambda-Cognito connection and SES configuration
 *
 * Prerequisites:
 * - AWS credentials configured (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION)
 * - @aws-sdk packages installed
 *
 * Run: node scripts/verify-ses-setup.js
 */

const { CognitoIdentityProviderClient, DescribeUserPoolCommand } = require('@aws-sdk/client-cognito-identity-provider');
const { LambdaClient, GetFunctionConfigurationCommand } = require('@aws-sdk/client-lambda');
const { SESClient, GetAccountCommand, GetIdentityVerificationAttributesCommand } = require('@aws-sdk/client-ses');

require('dotenv').config({ path: '.env.local' });

const REGION = 'ca-central-1';
const USER_POOL_ID = 'ca-central-1_JY2OSgN3y';
const LAMBDA_FUNCTION = 'securevault-cognito-email-sender';
const DOMAIN = 'securevaultdocs.com';
const EXPECTED_KMS_KEY = 'arn:aws:kms:ca-central-1:825738202952:key/590ea24d-127f-423b-ae51-e54941c3c0f7';

async function verifyCognitoLambdaTrigger() {
  console.log('\n=== Cognito User Pool Lambda Trigger ===');

  const client = new CognitoIdentityProviderClient({ region: REGION });

  try {
    const command = new DescribeUserPoolCommand({ UserPoolId: USER_POOL_ID });
    const response = await client.send(command);

    const lambdaConfig = response.UserPool?.LambdaConfig;

    if (lambdaConfig?.CustomEmailSender) {
      console.log('✅ CustomEmailSender trigger configured');
      console.log(`   Lambda ARN: ${lambdaConfig.CustomEmailSender.LambdaArn}`);
      console.log(`   Lambda Version: ${lambdaConfig.CustomEmailSender.LambdaVersion}`);

      if (lambdaConfig.KMSKeyID === EXPECTED_KMS_KEY) {
        console.log('✅ KMS Key matches expected value');
      } else {
        console.log('⚠️  KMS Key mismatch');
        console.log(`   Expected: ${EXPECTED_KMS_KEY}`);
        console.log(`   Actual: ${lambdaConfig.KMSKeyID}`);
      }
    } else {
      console.log('❌ CustomEmailSender trigger NOT configured');
      console.log('\nTo configure, run:');
      console.log(`aws cognito-idp update-user-pool --user-pool-id ${USER_POOL_ID} \\`);
      console.log(`  --lambda-config "CustomEmailSender={LambdaVersion=V1_0,LambdaArn=arn:aws:lambda:${REGION}:825738202952:function:${LAMBDA_FUNCTION}},KMSKeyID=${EXPECTED_KMS_KEY}" \\`);
      console.log(`  --region ${REGION}`);
    }

    // Check email configuration
    const emailConfig = response.UserPool?.EmailConfiguration;
    if (emailConfig) {
      console.log('\n--- Email Configuration ---');
      console.log(`   Email Sending Account: ${emailConfig.EmailSendingAccount || 'Cognito Default'}`);
      console.log(`   Source ARN: ${emailConfig.SourceArn || 'Not set'}`);
      console.log(`   From: ${emailConfig.From || 'Default'}`);
    }

  } catch (error) {
    console.error('❌ Error checking Cognito:', error.message);
  }
}

async function verifyLambdaFunction() {
  console.log('\n=== Lambda Function Configuration ===');

  const client = new LambdaClient({ region: REGION });

  try {
    const command = new GetFunctionConfigurationCommand({ FunctionName: LAMBDA_FUNCTION });
    const response = await client.send(command);

    console.log('✅ Lambda function exists');
    console.log(`   Runtime: ${response.Runtime}`);
    console.log(`   Handler: ${response.Handler}`);
    console.log(`   Last Modified: ${response.LastModified}`);
    console.log(`   Memory: ${response.MemorySize} MB`);
    console.log(`   Timeout: ${response.Timeout} seconds`);

    const envVars = response.Environment?.Variables || {};
    console.log('\n--- Environment Variables ---');
    console.log(`   USER_POOL_ID: ${envVars.USER_POOL_ID || '❌ NOT SET'}`);
    console.log(`   FROM_EMAIL: ${envVars.FROM_EMAIL || '❌ NOT SET'}`);
    console.log(`   KMS_KEY_ARN: ${envVars.KMS_KEY_ARN ? '✅ Set' : '❌ NOT SET'}`);

  } catch (error) {
    if (error.name === 'ResourceNotFoundException') {
      console.log('❌ Lambda function not found');
    } else {
      console.error('❌ Error checking Lambda:', error.message);
    }
  }
}

async function verifySESSetup() {
  console.log('\n=== SES Configuration ===');

  const client = new SESClient({ region: REGION });

  try {
    // Check account status
    const accountCommand = new GetAccountCommand({});
    const accountResponse = await client.send(accountCommand);

    const sendingEnabled = accountResponse.SendingEnabled;
    const enforcementStatus = accountResponse.EnforcementStatus;

    console.log(`Sending Enabled: ${sendingEnabled ? '✅ Yes' : '❌ No (Sandbox mode)'}`);
    console.log(`Enforcement Status: ${enforcementStatus || 'Unknown'}`);

    if (!sendingEnabled || enforcementStatus === 'SANDBOX') {
      console.log('\n⚠️  SES is in sandbox mode - can only send to verified emails');
      console.log('   Status: Waiting for AWS production access approval');
    }

  } catch (error) {
    console.error('❌ Error checking SES account:', error.message);
  }

  try {
    // Check domain verification
    const identityCommand = new GetIdentityVerificationAttributesCommand({
      Identities: [DOMAIN]
    });
    const identityResponse = await client.send(identityCommand);

    const domainStatus = identityResponse.VerificationAttributes?.[DOMAIN];
    if (domainStatus) {
      console.log(`\nDomain ${DOMAIN}: ${domainStatus.VerificationStatus === 'Success' ? '✅ Verified' : '⏳ Pending'}`);
    } else {
      console.log(`\nDomain ${DOMAIN}: ❌ Not found in SES`);
    }

  } catch (error) {
    console.error('❌ Error checking domain:', error.message);
  }
}

async function main() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║     SecureVault SES Setup Verification     ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log(`\nRegion: ${REGION}`);
  console.log(`User Pool: ${USER_POOL_ID}`);
  console.log(`Lambda: ${LAMBDA_FUNCTION}`);
  console.log(`Domain: ${DOMAIN}`);

  await verifyCognitoLambdaTrigger();
  await verifyLambdaFunction();
  await verifySESSetup();

  console.log('\n════════════════════════════════════════════');
  console.log('Verification complete');
  console.log('════════════════════════════════════════════\n');
}

main().catch(console.error);
