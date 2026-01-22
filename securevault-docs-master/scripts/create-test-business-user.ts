
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { 
  CognitoIdentityProviderClient, 
  SignUpCommand, 
  AdminConfirmSignUpCommand,
  InitiateAuthCommand
} from '@aws-sdk/client-cognito-identity-provider';
import crypto from 'crypto';
import path from 'path';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

// Configuration
const EMAIL = 'test-business@review.com';
const PASSWORD = 'TestBusiness123!';
const NAME = 'Test Business User';
const ACCOUNT_TYPE = 'business';
const PLAN = 'business_starter'; 

// Constants and Helpers
const SECUREVAULT_APP_ID = 'app_securevault';

const SCHEMA_MAP: Record<string, string> = {
  'User': 'core',
  'Organization': 'core',
  'OrganizationMember': 'core',
  'UserProfile': 'securevault',
  'OrganizationProfile': 'securevault',
  'Subscription': 'hub',
};

function getTableName(table: string): string {
  const schema = SCHEMA_MAP[table] || 'securevault';
  return `${schema}."${table}"`;
}

async function main() {
  console.log('🚀 Starting Test Business User Creation Script');
  console.log(`Target User: ${EMAIL}`);
  console.log(`Plan: ${PLAN}`);

  // 1. Setup DB Connection
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost') ? undefined : { rejectUnauthorized: false },
  });

  // 2. Setup Cognito Client
  const cognitoClient = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION || 'ca-central-1',
  });

  try {
    // Check if user exists in DB
    const userInfo = await pool.query(
      `SELECT id FROM ${getTableName('User')} WHERE email = $1`,
      [EMAIL.toLowerCase()]
    );

    if (userInfo.rows.length > 0) {
      console.log('⚠️  User already exists in Database.');
      // Ideally we might want to update their plan, but let's just warn for now.
      // logic could be added to upgrade them if they exist.
    }

    // 3. Cognito Signup
    const clientId = process.env.COGNITO_CLIENT_ID;
    const clientSecret = process.env.COGNITO_CLIENT_SECRET;
    const userPoolId = process.env.COGNITO_USER_POOL_ID;

    if (!clientId || !userPoolId) {
      throw new Error('Missing Cognito Configuration (CLIENT_ID or USER_POOL_ID)');
    }

    console.log('🔑 Creating user in Cognito...');
    
    let secretHash: string | undefined;
    if (clientSecret) {
      const message = EMAIL + clientId;
      secretHash = crypto
        .createHmac('sha256', clientSecret)
        .update(message)
        .digest('base64');
    }

    try {
      await cognitoClient.send(new SignUpCommand({
        ClientId: clientId,
        Username: EMAIL,
        Password: PASSWORD,
        SecretHash: secretHash,
        UserAttributes: [
          { Name: 'email', Value: EMAIL },
          { Name: 'name', Value: NAME },
        ],
      }));
      console.log('✅ Cognito SignUp successful');
    } catch (err: any) {
      if (err.name === 'UsernameExistsException') {
        console.log('⚠️  User already exists in Cognito (proceeding to DB sync/check).');
      } else {
        throw err;
      }
    }

    // 4. Confirm User
    if (userPoolId) { // Should be present
        try {
            await cognitoClient.send(new AdminConfirmSignUpCommand({
                UserPoolId: userPoolId,
                Username: EMAIL
            }));
            console.log('✅ User confirmed in Cognito');
        } catch (err: any) {
            console.error('⚠️  Failed to auto-confirm user (might already be confirmed):', err.message);
        }
    }

    // 5. DB Insertion
    console.log('💾 Inserting/Updating user in Database...');
    const userId = crypto.randomUUID();
    const now = new Date(); // Use local time or UTC as needed by DB, PG usually expects ISO string or date obj

    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Insert User
      // ON CONFLICT UPDATE to ensure they are set to business
      const userRes = await client.query(
        `INSERT INTO ${getTableName('User')} (id, email, name, "accountType", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         ON CONFLICT (email) DO UPDATE SET
           "accountType" = $4,
           "updatedAt" = NOW()
         RETURNING id`,
        [userId, EMAIL, NAME, ACCOUNT_TYPE]
      );
      
      const actualUserId = userRes.rows[0].id;
      console.log(`   User ID: ${actualUserId}`);

      // Handle Organization for Business User
      // Check for existing org
      const existingOrg = await client.query(
        `SELECT om."organizationId" FROM ${getTableName('OrganizationMember')} om WHERE om."userId" = $1 LIMIT 1`,
        [actualUserId]
      );

      let orgId: string;

      if (existingOrg.rows.length === 0) {
        // Create new Org
        orgId = crypto.randomUUID();
        const orgName = `${NAME}'s Business`;
        // Simple slug generation
        const orgSlug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + actualUserId.slice(0, 8);
        
        await client.query(
          `INSERT INTO ${getTableName('Organization')} (id, name, slug, plan, "createdAt", "updatedAt")
           VALUES ($1, $2, $3, $4, NOW(), NOW())`,
          [orgId, orgName, orgSlug, PLAN]
        );
        console.log(`   Created Organization: ${orgName} (${PLAN})`);

        // Add Member
        await client.query(
          `INSERT INTO ${getTableName('OrganizationMember')} (id, "organizationId", "userId", role, "createdAt", "updatedAt")
           VALUES (gen_random_uuid()::text, $1, $2, 'admin', NOW(), NOW())`,
          [orgId, actualUserId]
        );

        // Profile
        await client.query(
          `INSERT INTO ${getTableName('OrganizationProfile')} ("organizationId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt")
           VALUES ($1, 0, 0, 0, NOW(), NOW())
           ON CONFLICT ("organizationId") DO NOTHING`,
          [orgId]
        );

      } else {
        orgId = existingOrg.rows[0].organizationId;
        console.log(`   User already has Organization: ${orgId}`);
        // Build 'Update' query if we want to ensure plan is business_starter
        // For now, let's update it to ensure test is valid
        await client.query(
            `UPDATE ${getTableName('Organization')} SET plan = $1 WHERE id = $2`,
            [PLAN, orgId]
        );
        console.log(`   Updated Organization Plan to: ${PLAN}`);
      }

      // Subscription (Hub)
      // We set status to 'active' to mimic a paid user
      const trialExpires = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
      
      await client.query(
        `INSERT INTO ${getTableName('Subscription')} (id, "userId", "appId", plan, status, "trialStartedAt", "trialExpiresAt", "createdAt", "updatedAt")
         VALUES (gen_random_uuid()::text, $1, $2, $3, 'active', $4, $5, NOW(), NOW())
         ON CONFLICT ("userId", "appId") DO UPDATE SET
            plan = $3,
            status = 'active', 
            "updatedAt" = NOW()`,
        [actualUserId, SECUREVAULT_APP_ID, PLAN, now.toISOString(), trialExpires.toISOString()]
      );
      console.log(`   Updated/Created Subscription with plan: ${PLAN}`);

      await client.query('COMMIT');
      console.log('✅ Database setup complete.');

    } catch (dbErr) {
      await client.query('ROLLBACK');
      throw dbErr;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }

  // Summary
  console.log('\n=============================================');
  console.log('ACCOUNT CREATED SUCCESSFULLY');
  console.log('=============================================');
  console.log('URL:      (Localhost or Staging URL)');
  console.log(`Email:    ${EMAIL}`);
  console.log(`Password: ${PASSWORD}`);
  console.log(`Plan:     ${PLAN}`);
  console.log('=============================================');
}

main();
