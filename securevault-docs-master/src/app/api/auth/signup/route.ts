// src/app/api/auth/signup/route.ts
// Handle user signup - creates user in Cognito and database

import { NextRequest, NextResponse } from 'next/server'
import { CognitoIdentityProviderClient, SignUpCommand, AdminConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider'
import { transaction } from '@/lib/db'
import { getTableName, SECUREVAULT_APP_ID } from '@/lib/db-utils'
import { getAwsConfig } from '@/lib/aws/config'
import crypto from 'crypto'

const cognitoClient = new CognitoIdentityProviderClient(getAwsConfig())

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, accountType } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Check if email already exists in database
    const { queryOne } = await import('@/lib/db')
    const existingUser = await queryOne<{ id: string; email: string }>(
      `SELECT id, email FROM ${getTableName('User')} WHERE email = $1`,
      [email.toLowerCase()]
    )

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    // Generate a UUID for the user
    const userId = crypto.randomUUID()

    // Variable to store password hash if using local auth
    let passwordHash: string | undefined;

    // LOCAL AUTHENTICATION
    if (process.env.AUTH_PROVIDER === 'local') {
      console.log('[Signup] Using LOCAL authentication');
      const bcryptModule = await import('bcryptjs' + '');
      const bcrypt = bcryptModule.default || bcryptModule;
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    } 
    // COGNITO AUTHENTICATION
    else {
      // Try to create user in Cognito
      const clientId = process.env.COGNITO_CLIENT_ID
      const clientSecret = process.env.COGNITO_CLIENT_SECRET
      const userPoolId = process.env.COGNITO_USER_POOL_ID
  
      if (clientId && userPoolId) {
        try {
          // Calculate secret hash if client secret exists
          let secretHash: string | undefined
          if (clientSecret) {
            const message = email + clientId
            secretHash = crypto
              .createHmac('sha256', clientSecret)
              .update(message)
              .digest('base64')
          }
  
          // Sign up with Cognito
          const displayName = name || email.split('@')[0]
          const signUpCommand = new SignUpCommand({
            ClientId: clientId,
            Username: email,
            Password: password,
            SecretHash: secretHash,
            UserAttributes: [
              { Name: 'email', Value: email },
              { Name: 'name', Value: displayName },
            ],
          })
  
          const cognitoResponse = await cognitoClient.send(signUpCommand)
          console.log('[Signup] Cognito user created:', cognitoResponse.UserSub)
  
          // Auto-confirm user (for internal testing - require email verification in public release)
          try {
            const confirmCommand = new AdminConfirmSignUpCommand({
              UserPoolId: userPoolId,
              Username: email,
            })
            await cognitoClient.send(confirmCommand)
            console.log('[Signup] User auto-confirmed')
          } catch (confirmError) {
            console.log('[Signup] Auto-confirm failed:', confirmError)
          }
        } catch (cognitoError: any) {
          console.error('[Signup] Cognito error:', cognitoError.name, cognitoError.message)
  
          // Handle specific Cognito errors
          if (cognitoError.name === 'UsernameExistsException') {
            return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
          }
          if (cognitoError.name === 'InvalidPasswordException') {
            return NextResponse.json({ error: 'Password does not meet requirements. Must be at least 8 characters with uppercase, lowercase, and numbers.' }, { status: 400 })
          }
          if (cognitoError.name === 'InvalidParameterException') {
            console.error('[Signup] Invalid parameter details:', cognitoError.message)
            return NextResponse.json({ error: 'Invalid signup parameters: ' + cognitoError.message }, { status: 400 })
          }
  
          // For other Cognito errors, return error to user
          return NextResponse.json({ error: 'Failed to create account: ' + cognitoError.message }, { status: 500 })
        }
      } else {
        console.log('[Signup] Cognito not configured, creating database record only')
      }
    }

    // Determine account type (default to 'personal' if not specified)
    const userAccountType = accountType === 'business' ? 'business' : 'personal'

    // Use a transaction to ensure all database operations are atomic
    const result = await transaction(async (client) => {
      // Create user record in database with accountType
      const userResult = await client.query(
        `INSERT INTO ${getTableName('User')} (id, email, name, "accountType", "passwordHash", "createdAt", "updatedAt")
         VALUES ($1::uuid, $2, $3, $4, $5, NOW(), NOW())
         ON CONFLICT ON CONSTRAINT "User_email_key" DO UPDATE SET
           name = COALESCE(EXCLUDED.name, ${getTableName('User')}.name),
           "accountType" = COALESCE(EXCLUDED."accountType", ${getTableName('User')}."accountType"),
           "passwordHash" = COALESCE(EXCLUDED."passwordHash", ${getTableName('User')}."passwordHash"),
           "updatedAt" = NOW()
         RETURNING *`,
        [userId, email, name || null, userAccountType, passwordHash]
      )
      const user = userResult.rows[0]

      // Use the actual user ID from the database (may differ if email already existed)
      const actualUserId = user?.id || userId

      // Create UserProfile (personal vault/profile) for ALL account types
      // Front-end components expect this profile to exist to track usage and state
      await client.query(
        `INSERT INTO ${getTableName('UserProfile')} ("userId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt")
         VALUES ($1::uuid, 0, 0, 0, NOW(), NOW())
         ON CONFLICT ON CONSTRAINT "UserProfile_userId_key" DO NOTHING`,
        [actualUserId]
      )
      console.log('[Signup] Created UserProfile for user:', actualUserId)


      // For BUSINESS accounts: Auto-create default Organization (if user doesn't already have one)
      if (userAccountType === 'business') {
        // Check if user already has an organization
        const existingOrgResult = await client.query(
          `SELECT om."organizationId" FROM ${getTableName('OrganizationMember')} om WHERE om."userId" = $1 LIMIT 1`,
          [actualUserId]
        )

        if (existingOrgResult.rows.length === 0) {
          // User doesn't have an org, create one
          const orgId = crypto.randomUUID()
          const orgName = name ? `${name}'s Business` : 'My Business'
          const orgSlug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

          // Create Organization with 'trial' plan
          await client.query(
            `INSERT INTO ${getTableName('Organization')} (id, name, slug, plan, "createdAt", "updatedAt")
             VALUES ($1::uuid, $2, $3, 'trial', NOW(), NOW())`,
            [orgId, orgName, orgSlug + '-' + actualUserId.slice(0, 8)]
          )


          // Add user as admin member
          await client.query(
            `INSERT INTO ${getTableName('OrganizationMember')} (id, "organizationId", "userId", role, "createdAt", "updatedAt")
             VALUES (gen_random_uuid(), $1::uuid, $2::uuid, 'admin', NOW(), NOW())`,
            [orgId, actualUserId]
          )

          // Create OrganizationProfile for SecureVault
          await client.query(
            `INSERT INTO ${getTableName('OrganizationProfile')} ("organizationId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt")
             VALUES ($1::uuid, 0, 0, 0, NOW(), NOW())
             ON CONFLICT ("organizationId") DO NOTHING`,
            [orgId]
          )

          console.log('[Signup] Created Organization for business account:', orgId, 'user:', actualUserId)
        } else {
          console.log('[Signup] User already has organization:', existingOrgResult.rows[0].organizationId)
        }
      }

      // Create subscription record
      const now = new Date()
      const trialExpires = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)

      await client.query(
        `INSERT INTO ${getTableName('Subscription')} (id, "userId", "appId", plan, status, "trialStartedAt", "trialExpiresAt", "createdAt", "updatedAt")
         VALUES (gen_random_uuid(), $1::uuid, $2, 'trial', 'trialing', $3, $4, NOW(), NOW())
         ON CONFLICT ON CONSTRAINT "Subscription_userId_appId_key" DO NOTHING`,
        [actualUserId, SECUREVAULT_APP_ID, now.toISOString(), trialExpires.toISOString()]
      )


      return { user, actualUserId }
    })

    // Send welcome email to the new user
    try {
      const { sendWelcomeEmail } = await import('@/lib/email');

      // For business accounts, get the organization ID
      let organizationId: string | undefined;
      if (userAccountType === 'business') {
        const { queryOne } = await import('@/lib/db');
        const orgMember = await queryOne(
          `SELECT om."organizationId" FROM ${getTableName('OrganizationMember')} om WHERE om."userId" = $1 LIMIT 1`,
          [result.actualUserId]
        );
        organizationId = orgMember?.organizationId;
      }

      await sendWelcomeEmail({
        email: email.toLowerCase(),
        name: name || email.split('@')[0],
        accountType: userAccountType as 'personal' | 'business',
        organizationId,
      });
      console.log('[Signup] Welcome email sent to:', email);
    } catch (emailError) {
      // Don't fail signup if email fails
      console.error('[Signup] Failed to send welcome email:', emailError);
    }

    return NextResponse.json({
      success: true,
      userId: result.actualUserId,
      user: result.user,
      message: 'Account created successfully'
    })
  } catch (error: any) {
    console.error('[Signup] Error:', error)
    return NextResponse.json({ error: error.message || 'Failed to create account' }, { status: 500 })
  }
}
