// src/app/api/auth/ensure-user/route.ts
// Ensure user exists in core.User table (Aurora PostgreSQL only)

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { queryOne, query } from '@/lib/db'
import { getTableName, SECUREVAULT_APP_ID } from '@/lib/db-utils'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
  try {
    // Get session from NextAuth
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      // Also check authorization header for API calls
      const authHeader = req.headers.get('authorization')
      if (!authHeader) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const { userId, email, name } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    // Check if user exists in core.User
    const existingUser = await queryOne(
      `SELECT id FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    if (!existingUser) {
      // User doesn't exist - create user and profile
      console.log('[Ensure User] Creating new user:', userId)

      const now = new Date()
      const trialExpires = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)

      // Create user in core.User
      await queryOne(
        `INSERT INTO ${getTableName('User')} (id, email, name, "emailVerified", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         ON CONFLICT (id) DO NOTHING
         RETURNING *`,
        [userId, email, name || null, now.toISOString()]
      )

      // Create UserProfile for SecureVault
      await query(
        `INSERT INTO ${getTableName('UserProfile')} ("userId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt")
         VALUES ($1, 0, 0, 0, NOW(), NOW())
         ON CONFLICT ("userId") DO NOTHING`,
        [userId]
      )

      // Create subscription record
      await query(
        `INSERT INTO ${getTableName('Subscription')} (id, "userId", "appId", plan, status, "trialStartedAt", "trialExpiresAt", "createdAt", "updatedAt")
         VALUES (gen_random_uuid()::text, $1, $2, 'free', 'trialing', $3, $4, NOW(), NOW())
         ON CONFLICT ("userId", "appId") DO NOTHING`,
        [userId, SECUREVAULT_APP_ID, now.toISOString(), trialExpires.toISOString()]
      )

      console.log('[Ensure User] User and profile created')
    } else {
      console.log('[Ensure User] User already exists:', userId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Ensure User] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
