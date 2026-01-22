// src/app/api/personal-vault/route.ts
// Get user's personal vault from securevault.PersonalVault (Aurora PostgreSQL)
// Note: Document table has FK to PersonalVault, not UserProfile

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    // Get PersonalVault (Document table has FK to this table)
    let personalVault = await queryOne(
      `SELECT * FROM ${getTableName('PersonalVault')} WHERE "userId" = $1`,
      [userId]
    )

    // If vault doesn't exist, create it
    if (!personalVault) {
      personalVault = await queryOne(
        `INSERT INTO ${getTableName('PersonalVault')}
         (id, "userId", "createdAt", "updatedAt")
         VALUES (gen_random_uuid(), $1, NOW(), NOW())
         RETURNING *`,
        [userId]
      )
    }

    // Also ensure UserProfile exists (for storage tracking)
    const userProfile = await queryOne(
      `SELECT id FROM ${getTableName('UserProfile')} WHERE "userId" = $1`,
      [userId]
    )
    if (!userProfile) {
      try {
        await queryOne(
          `INSERT INTO ${getTableName('UserProfile')}
           (id, "userId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt")
           VALUES (gen_random_uuid(), $1, 0, 0, 0, NOW(), NOW())
           RETURNING *`,
          [userId]
        )
      } catch (e) {
        // UserProfile might already exist or table might not exist
      }
    }

    return NextResponse.json({ personalVault })
  } catch (error: any) {
    console.error('Error in GET /api/personal-vault:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
