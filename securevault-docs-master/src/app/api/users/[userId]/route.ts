// src/app/api/users/[userId]/route.ts
// Fetch user data from core.User table (Aurora PostgreSQL only)

import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { getStripeClient } from '@/lib/stripe'
import { getPlanFromPriceId } from '@/config/stripe-prices'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    // Validate UUID format (or demo ID format)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    const demoIdRegex = /^demo-/

    if (!uuidRegex.test(userId) && !demoIdRegex.test(userId)) {
      console.error('[GET /api/users] Invalid user ID format:', userId)
      return NextResponse.json(
        { error: 'Invalid user ID format. Please clear your browser cache and try logging in again.' },
        { status: 400 }
      )
    }

    // Fetch user from core.User table
    const user = await queryOne(
      `SELECT * FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    // If user not found, return 404 - user should be created via auth flow
    if (!user) {
      console.log('[GET /api/users] User not found in database:', userId)
      return NextResponse.json(
        { error: 'User not found. Please sign out and sign in again.' },
        { status: 404 }
      )
    }

    // Get subscription info from hub.Subscription
    let subscription = null
    try {
      subscription = await queryOne(
        `SELECT * FROM ${getTableName('Subscription')} WHERE "userId" = $1 AND "appId" = 'app_securevault'`,
        [userId]
      )
    } catch (subError) {
      // Subscription table might not exist yet - continue anyway
      console.log('Could not query Subscription, table may not exist')
    }

    // Self-healing: Sync with Stripe if plan looks stale but subscription exists
    if (user && user.stripeSubscriptionId && (!user.plan || user.plan === 'free')) {
      try {
        const stripe = await getStripeClient()
        const sub = await stripe.subscriptions.retrieve(user.stripeSubscriptionId)

        if (sub.status === 'active' || sub.status === 'trialing') {
           const priceId = sub.items.data[0].price.id || ''
           const planInfo = getPlanFromPriceId(priceId)
           
           if (planInfo) {
              let newPlan = planInfo.tier as string
              if (planInfo.planType === 'business') {
                  newPlan = `business_${newPlan}`
              }
              
              if (newPlan !== subscription?.plan) {
                  console.log(`[Self-Healing] Detected plan discrepancy for user ${userId}: Stripe=${newPlan}, DB=${subscription?.plan}`)
                  // Instead of updating User table which lacks plan column, 
                  // we should update the Subscription table or just let it be synced by webhook
                  await query(
                      `UPDATE ${getTableName('Subscription')} SET plan = $1 WHERE "userId" = $2 AND "appId" = 'app_securevault'`,
                      [newPlan, userId]
                  )
                  if (subscription) subscription.plan = newPlan
              }

           }
        }
      } catch (err) {
        console.error('[Self-Healing] Failed to sync with Stripe:', err)
      }
    }

    return NextResponse.json({
      user: {
        ...user,
        // The core.User table does not have a 'plan' column. 
        // We use the hub.Subscription table as the source of truth for the active plan.
        plan: subscription?.plan || 'trial',
        stripeSubscriptionId: user.stripeSubscriptionId || subscription?.stripeSubscriptionId || null,
        stripeSubscriptionStatus: user.stripeSubscriptionStatus || subscription?.status || null,
      }
    })

  } catch (error: any) {
    console.error('Error in GET /api/users/[userId]:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
