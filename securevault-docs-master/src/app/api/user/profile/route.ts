// src/app/api/user/profile/route.ts
// User profile API (Aurora PostgreSQL only)

import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'

// GET /api/user/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await queryOne(
      `SELECT * FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error: any) {
    console.error('Error in GET /api/user/profile:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PATCH /api/user/profile - Update user profile
export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, emailNotificationsEnabled } = body

    // Build dynamic update query based on provided fields
    const updates: string[] = []
    const values: any[] = []
    let paramIndex = 1

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 })
      }
      updates.push(`name = $${paramIndex++}`)
      values.push(name.trim())
    }

    if (emailNotificationsEnabled !== undefined) {
      if (typeof emailNotificationsEnabled !== 'boolean') {
        return NextResponse.json({ error: 'emailNotificationsEnabled must be a boolean' }, { status: 400 })
      }
      updates.push(`"emailNotificationsEnabled" = $${paramIndex++}`)
      values.push(emailNotificationsEnabled)
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    // Add updatedAt and userId
    updates.push(`"updatedAt" = NOW()`)
    values.push(userId)

    const user = await queryOne(
      `UPDATE ${getTableName('User')}
       SET ${updates.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING *`,
      values
    )

    return NextResponse.json({ user, message: 'Profile updated successfully' })
  } catch (error: any) {
    console.error('Error in PATCH /api/user/profile:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
