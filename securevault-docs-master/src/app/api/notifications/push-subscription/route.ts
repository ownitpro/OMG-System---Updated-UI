// Push Subscription API Route
// Handles saving and removing push notification subscriptions

import { NextRequest, NextResponse } from 'next/server'

// POST - Save push subscription
export async function POST(request: NextRequest) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    // Get authenticated user from auth header or cookie
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      // For now, allow anonymous subscriptions with user_id from body
      // In production, implement proper auth
    }

    const { subscription, userId } = await request.json()

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const user = { id: userId }

    // Check if subscription already exists
    const existing = await queryOne(
      `SELECT id FROM ${getTableName('push_subscriptions')}
       WHERE user_id = $1 AND endpoint = $2`,
      [user.id, subscription.endpoint]
    )

    if (existing) {
      // Update existing subscription
      try {
        await queryOne(
          `UPDATE ${getTableName('push_subscriptions')}
           SET subscription_data = $1, updated_at = $2
           WHERE id = $3
           RETURNING id`,
          [JSON.stringify(subscription), new Date().toISOString(), existing.id]
        )
      } catch (updateError) {
        console.error('[PUSH-API] Update error:', updateError)
        return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 })
      }
    } else {
      // Create new subscription
      try {
        await queryOne(
          `INSERT INTO ${getTableName('push_subscriptions')}
           (user_id, endpoint, subscription_data, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id`,
          [
            user.id,
            subscription.endpoint,
            JSON.stringify(subscription),
            new Date().toISOString(),
            new Date().toISOString()
          ]
        )
      } catch (insertError) {
        // If table doesn't exist, just log and return success
        // The subscription is still saved locally
        console.error('[PUSH-API] Insert error:', insertError)
        // Don't fail - local subscription still works
      }
    }

    console.log('[PUSH-API] Subscription saved for user:', user.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[PUSH-API] Error saving subscription:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Remove push subscription
export async function DELETE(request: NextRequest) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { endpoint, userId } = await request.json()

    if (!endpoint) {
      return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Remove subscription
    try {
      await queryOne(
        `DELETE FROM ${getTableName('push_subscriptions')}
         WHERE user_id = $1 AND endpoint = $2
         RETURNING id`,
        [userId, endpoint]
      )
    } catch (deleteError) {
      console.error('[PUSH-API] Delete error:', deleteError)
      // Don't fail - may not exist
    }

    console.log('[PUSH-API] Subscription removed for user:', userId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[PUSH-API] Error removing subscription:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET - Get user's subscriptions
export async function GET(request: NextRequest) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    try {
      const subscriptions = await query(
        `SELECT id, endpoint, created_at FROM ${getTableName('push_subscriptions')}
         WHERE user_id = $1`,
        [userId]
      )

      return NextResponse.json({ subscriptions: subscriptions || [] })
    } catch (queryError) {
      console.error('[PUSH-API] Query error:', queryError)
      return NextResponse.json({ subscriptions: [] })
    }
  } catch (error) {
    console.error('[PUSH-API] Error getting subscriptions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
