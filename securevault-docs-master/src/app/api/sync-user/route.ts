// src/app/api/sync-user/route.ts
// Sync user to core.User table (Aurora PostgreSQL only)

import { NextRequest, NextResponse } from 'next/server'
import { queryOne, query } from '@/lib/db'
import { getTableName, SECUREVAULT_APP_ID } from '@/lib/db-utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, email, name } = body

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'userId and email are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await queryOne(
      `SELECT id FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists', user: existingUser })
    }

    // User doesn't exist, create them
    console.log('Creating User record:', userId)

    // Calculate trial dates
    const now = new Date()
    const trialExpires = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000) // 14 days from now

    // Create User record
    const newUser = await queryOne(
      `INSERT INTO ${getTableName('User')} (id, email, name, "emailVerified", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, NOW(), NOW())
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

    console.log('User and profile created successfully')
    return NextResponse.json({
      message: 'User and profile created',
      user: newUser,
    })
  } catch (error: any) {
    console.error('Error in POST /api/sync-user:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
