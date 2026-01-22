// src/app/api/users/[userId]/account-type/route.ts
// Update user's account type (personal/business)

import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    const { accountType } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    if (!accountType || !['personal', 'business'].includes(accountType)) {
      return NextResponse.json(
        { error: 'accountType must be "personal" or "business"' },
        { status: 400 }
      )
    }

    // Update user's accountType
    const updatedUser = await queryOne(
      `UPDATE ${getTableName('User')}
       SET "accountType" = $1, "updatedAt" = NOW()
       WHERE id = $2
       RETURNING *`,
      [accountType, userId]
    )

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    console.log(`[PATCH /api/users/${userId}/account-type] Updated to: ${accountType}`)

    return NextResponse.json({ user: updatedUser, success: true })
  } catch (error: any) {
    console.error('Error updating account type:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
