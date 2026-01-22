// src/app/api/admin/create-demo-users/route.ts
// Admin endpoint to create demo business accounts
// Protected by admin secret

import { NextRequest, NextResponse } from 'next/server'
import { CognitoIdentityProviderClient, SignUpCommand, AdminConfirmSignUpCommand, AdminSetUserPasswordCommand, AdminDeleteUserCommand, AdminGetUserCommand } from '@aws-sdk/client-cognito-identity-provider'
import { transaction } from '@/lib/db'
import { getTableName, SECUREVAULT_APP_ID } from '@/lib/db-utils'
import { getAwsConfig } from '@/lib/aws/config'
import crypto from 'crypto'

const cognitoClient = new CognitoIdentityProviderClient(getAwsConfig())

interface DemoUserConfig {
  email: string
  password: string
  name: string
  plan: string
}

export async function POST(request: NextRequest) {
  try {
    // Check for admin secret
    const authHeader = request.headers.get('x-admin-secret')
    const adminSecret = process.env.ADMIN_SECRET || 'migrate-2024'

    if (authHeader !== adminSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { users } = await request.json() as { users: DemoUserConfig[] }

    if (!users || !Array.isArray(users)) {
      return NextResponse.json({ error: 'users array is required' }, { status: 400 })
    }

    const results: any[] = []
    const clientId = process.env.COGNITO_CLIENT_ID
    const clientSecret = process.env.COGNITO_CLIENT_SECRET
    const userPoolId = process.env.COGNITO_USER_POOL_ID

    for (const userConfig of users) {
      const { email: rawEmail, password, name, plan } = userConfig
      const email = rawEmail?.toLowerCase() // Normalize email to lowercase for Cognito

      if (!email || !password) {
        results.push({ email: rawEmail, error: 'Email and password are required' })
        continue
      }

      try {
        // Generate a UUID for the user
        const userId = crypto.randomUUID()

        // Create user in Cognito
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
            const signUpCommand = new SignUpCommand({
              ClientId: clientId,
              Username: email,
              Password: password,
              SecretHash: secretHash,
              UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'name', Value: name },
              ],
            })

            const cognitoResponse = await cognitoClient.send(signUpCommand)
            console.log('[CreateDemoUser] Cognito user created:', cognitoResponse.UserSub)

            // Auto-confirm user
            const confirmCommand = new AdminConfirmSignUpCommand({
              UserPoolId: userPoolId,
              Username: email,
            })
            await cognitoClient.send(confirmCommand)
            console.log('[CreateDemoUser] User auto-confirmed:', email)

          } catch (cognitoError: any) {
            if (cognitoError.name === 'UsernameExistsException') {
              console.log('[CreateDemoUser] User already exists in Cognito:', email)

              // First try to update the password with lowercase email
              try {
                const setPasswordCommand = new AdminSetUserPasswordCommand({
                  UserPoolId: userPoolId,
                  Username: email,
                  Password: password,
                  Permanent: true,
                })
                await cognitoClient.send(setPasswordCommand)
                console.log('[CreateDemoUser] Password updated for:', email)
              } catch (pwdError: any) {
                console.log('[CreateDemoUser] Could not update password with lowercase, trying original case')

                // The user might exist with different casing - delete and recreate
                try {
                  // Try to delete user with original casing (rawEmail)
                  const deleteCommand = new AdminDeleteUserCommand({
                    UserPoolId: userPoolId,
                    Username: rawEmail,
                  })
                  await cognitoClient.send(deleteCommand)
                  console.log('[CreateDemoUser] Deleted old user with wrong casing:', rawEmail)

                  // Now create with lowercase
                  const retrySignUpCommand = new SignUpCommand({
                    ClientId: clientId,
                    Username: email,
                    Password: password,
                    SecretHash: secretHash,
                    UserAttributes: [
                      { Name: 'email', Value: email },
                      { Name: 'name', Value: name },
                    ],
                  })
                  await cognitoClient.send(retrySignUpCommand)

                  const retryConfirmCommand = new AdminConfirmSignUpCommand({
                    UserPoolId: userPoolId,
                    Username: email,
                  })
                  await cognitoClient.send(retryConfirmCommand)
                  console.log('[CreateDemoUser] Recreated user with lowercase email:', email)
                } catch (recreateError: any) {
                  console.error('[CreateDemoUser] Failed to recreate user:', recreateError.message)
                }
              }
            } else {
              throw cognitoError
            }
          }
        }

        // Create database records in transaction
        const result = await transaction(async (client) => {
          // Check if user already exists
          const existingUserResult = await client.query(
            `SELECT id FROM ${getTableName('User')} WHERE email = $1`,
            [email.toLowerCase()]
          )

          let actualUserId = userId

          if (existingUserResult.rows.length > 0) {
            // User exists, update their record
            actualUserId = existingUserResult.rows[0].id
            await client.query(
              `UPDATE ${getTableName('User')} SET
                 name = $1,
                 "accountType" = 'business',
                 "updatedAt" = NOW()
               WHERE id = $2`,
              [name, actualUserId]
            )
            console.log('[CreateDemoUser] Updated existing user:', actualUserId)
          } else {
            // Create new user
            const userResult = await client.query(
              `INSERT INTO ${getTableName('User')} (id, email, name, "accountType", "createdAt", "updatedAt")
               VALUES ($1, $2, $3, 'business', NOW(), NOW())
               RETURNING *`,
              [userId, email.toLowerCase(), name]
            )
            actualUserId = userResult.rows[0].id
            console.log('[CreateDemoUser] Created new user:', actualUserId)
          }

          // Check if user has an organization
          const existingOrgResult = await client.query(
            `SELECT om."organizationId" FROM ${getTableName('OrganizationMember')} om WHERE om."userId" = $1 LIMIT 1`,
            [actualUserId]
          )

          let orgId: string

          if (existingOrgResult.rows.length > 0) {
            // Update existing organization plan
            orgId = existingOrgResult.rows[0].organizationId
            await client.query(
              `UPDATE ${getTableName('Organization')} SET plan = $1, "updatedAt" = NOW() WHERE id = $2`,
              [plan, orgId]
            )
            console.log('[CreateDemoUser] Updated org plan:', orgId, plan)
          } else {
            // Create new organization
            orgId = crypto.randomUUID()
            const orgName = `${name}'s Business`
            const orgSlug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + actualUserId.slice(0, 8)

            await client.query(
              `INSERT INTO ${getTableName('Organization')} (id, name, slug, plan, "createdAt", "updatedAt")
               VALUES ($1, $2, $3, $4, NOW(), NOW())`,
              [orgId, orgName, orgSlug, plan]
            )
            console.log('[CreateDemoUser] Created organization:', orgId)

            // Add user as admin member
            await client.query(
              `INSERT INTO ${getTableName('OrganizationMember')} (id, "organizationId", "userId", role, "createdAt", "updatedAt")
               VALUES (gen_random_uuid()::text, $1, $2, 'admin', NOW(), NOW())`,
              [orgId, actualUserId]
            )
          }

          // Ensure OrganizationProfile exists
          await client.query(
            `INSERT INTO ${getTableName('OrganizationProfile')} ("organizationId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt")
             VALUES ($1, 0, 0, 0, NOW(), NOW())
             ON CONFLICT ("organizationId") DO NOTHING`,
            [orgId]
          )

          // Create/update subscription
          await client.query(
            `INSERT INTO ${getTableName('Subscription')} (id, "userId", "organizationId", "appId", plan, status, "createdAt", "updatedAt")
             VALUES (gen_random_uuid()::text, $1, $2, $3, $4, 'active', NOW(), NOW())
             ON CONFLICT ("userId", "appId") DO UPDATE SET
               "organizationId" = EXCLUDED."organizationId",
               plan = EXCLUDED.plan,
               status = 'active',
               "updatedAt" = NOW()`,
            [actualUserId, orgId, SECUREVAULT_APP_ID, plan]
          )

          return { userId: actualUserId, organizationId: orgId }
        })

        results.push({
          email,
          success: true,
          userId: result.userId,
          organizationId: result.organizationId,
          plan,
        })

      } catch (error: any) {
        console.error('[CreateDemoUser] Error for', email, ':', error)
        results.push({
          email,
          error: error.message || 'Failed to create user',
        })
      }
    }

    return NextResponse.json({
      success: true,
      results,
      timestamp: new Date().toISOString(),
    })

  } catch (error: any) {
    console.error('[CreateDemoUser] Error:', error)
    return NextResponse.json({ error: error.message || 'Failed to create demo users' }, { status: 500 })
  }
}
