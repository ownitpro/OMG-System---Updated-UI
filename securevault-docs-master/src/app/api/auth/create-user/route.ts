// src/app/api/auth/create-user/route.ts
// Create user record in core.User table (Aurora PostgreSQL only)

import { NextRequest, NextResponse } from 'next/server'
import { queryOne, query } from '@/lib/db'
import { getTableName, SECUREVAULT_APP_ID } from '@/lib/db-utils'

export async function POST(request: NextRequest) {
  try {
    const { userId, email, name, plan, accountType } = await request.json()

    if (!userId || !email) {
      return NextResponse.json({ error: 'userId and email are required' }, { status: 400 })
    }

    // Create user record in core.User table
    const user = await queryOne(
      `INSERT INTO ${getTableName('User')} (id, email, name, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, NOW(), NOW())
       ON CONFLICT (id) DO UPDATE SET
         email = COALESCE(EXCLUDED.email, ${getTableName('User')}.email),
         name = COALESCE(EXCLUDED.name, ${getTableName('User')}.name),
         "updatedAt" = NOW()
       RETURNING *`,
      [userId, email, name || null]
    )

    // Create UserProfile for SecureVault (replaces PersonalVault)
    if (accountType === 'personal' || !accountType) {
      try {
        await query(
          `INSERT INTO ${getTableName('UserProfile')} ("userId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt")
           VALUES ($1, 0, 0, 0, NOW(), NOW())
           ON CONFLICT ("userId") DO NOTHING`,
          [userId]
        )
      } catch (profileError) {
        console.error('Error creating user profile:', profileError)
        // Don't fail the whole signup for profile creation
      }
    }

    // Create subscription record in hub.Subscription
    try {
      await query(
        `INSERT INTO ${getTableName('Subscription')} (id, "userId", "appId", plan, status, "createdAt", "updatedAt")
         VALUES (gen_random_uuid()::text, $1, $2, $3, 'active', NOW(), NOW())
         ON CONFLICT ("userId", "appId") DO NOTHING`,
        [userId, SECUREVAULT_APP_ID, plan || 'free']
      )
    } catch (subError) {
      console.error('Error creating subscription:', subError)
      // Don't fail for subscription creation
    }

    return NextResponse.json({ user, success: true })
  } catch (error: any) {
    console.error('Error in create-user API:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
