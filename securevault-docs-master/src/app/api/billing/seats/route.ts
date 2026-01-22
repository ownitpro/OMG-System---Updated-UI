// POST /api/billing/seats
// Update seat count for organization subscription
// GET /api/billing/seats - Preview seat change cost

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { updateSubscriptionSeats, previewSeatChange } from '@/lib/stripe'
import { BUSINESS_PLAN_LIMITS, type BusinessPlan } from '@/lib/plan-limits'

// GET - Preview cost of seat change
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get('orgId')
    const newSeatCount = parseInt(searchParams.get('seatCount') || '0', 10)

    if (!orgId) {
      return NextResponse.json({ error: 'Organization ID required' }, { status: 400 })
    }

    if (!newSeatCount || newSeatCount < 1) {
      return NextResponse.json({ error: 'Valid seat count required' }, { status: 400 })
    }

    const orgTable = getTableName('Organization')
    const memberTable = getTableName('OrganizationMember')

    // Verify user is org admin
    const membership = await queryOne<{ role: string }>(
      `SELECT role FROM ${memberTable} WHERE "userId" = $1 AND "organizationId" = $2`,
      [userId, orgId]
    )

    if (!membership || !['owner', 'admin'].includes(membership.role)) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    // Get org subscription info
    const org = await queryOne<{
      stripeSubscriptionId: string
      plan: string
      seatCount: number
    }>(
      `SELECT "stripeSubscriptionId", plan, "seatCount" FROM ${orgTable} WHERE id = $1`,
      [orgId]
    )

    if (!org?.stripeSubscriptionId) {
      return NextResponse.json({ error: 'No active subscription' }, { status: 400 })
    }

    // Validate seat count against plan limits
    const planLimits = BUSINESS_PLAN_LIMITS[org.plan as BusinessPlan]
    if (planLimits) {
      if (newSeatCount < planLimits.seatMin) {
        return NextResponse.json({
          error: `Minimum seats for ${org.plan} is ${planLimits.seatMin}`,
        }, { status: 400 })
      }

      if (planLimits.seatMax !== 'unlimited' && newSeatCount > planLimits.seatMax) {
        return NextResponse.json({
          error: `Maximum seats for ${org.plan} is ${planLimits.seatMax}. Consider upgrading.`,
        }, { status: 400 })
      }
    }

    // Count current active members
    const memberCount = await queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM ${memberTable} WHERE "organizationId" = $1`,
      [orgId]
    )

    const currentMembers = memberCount?.count || 0
    if (newSeatCount < currentMembers) {
      return NextResponse.json({
        error: `Cannot reduce below ${currentMembers} seats (current member count)`,
        currentMembers,
      }, { status: 400 })
    }

    // Preview the cost change
    const preview = await previewSeatChange(org.stripeSubscriptionId, newSeatCount)

    if (!preview.success) {
      return NextResponse.json({
        error: preview.error || 'Failed to preview change',
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      currentSeatCount: org.seatCount || 1,
      newSeatCount,
      currentMembers,
      amountDue: preview.amountDue,
      amountDueFormatted: `$${((preview.amountDue || 0) / 100).toFixed(2)}`,
    })
  } catch (error: any) {
    console.error('[Seats] Preview error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to preview seat change' },
      { status: 500 }
    )
  }
}

// POST - Update seat count
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()
    const { orgId, seatCount } = body

    if (!orgId) {
      return NextResponse.json({ error: 'Organization ID required' }, { status: 400 })
    }

    if (!seatCount || seatCount < 1) {
      return NextResponse.json({ error: 'Valid seat count required' }, { status: 400 })
    }

    const orgTable = getTableName('Organization')
    const memberTable = getTableName('OrganizationMember')

    // Verify user is org admin
    const membership = await queryOne<{ role: string }>(
      `SELECT role FROM ${memberTable} WHERE "userId" = $1 AND "organizationId" = $2`,
      [userId, orgId]
    )

    if (!membership || !['owner', 'admin'].includes(membership.role)) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    // Get org subscription info
    const org = await queryOne<{
      stripeSubscriptionId: string
      plan: string
      seatCount: number
    }>(
      `SELECT "stripeSubscriptionId", plan, "seatCount" FROM ${orgTable} WHERE id = $1`,
      [orgId]
    )

    if (!org?.stripeSubscriptionId) {
      return NextResponse.json({ error: 'No active subscription' }, { status: 400 })
    }

    // Validate seat count against plan limits
    const planLimits = BUSINESS_PLAN_LIMITS[org.plan as BusinessPlan]
    if (planLimits) {
      if (seatCount < planLimits.seatMin) {
        return NextResponse.json({
          error: `Minimum seats for ${org.plan} is ${planLimits.seatMin}`,
        }, { status: 400 })
      }

      if (planLimits.seatMax !== 'unlimited' && seatCount > planLimits.seatMax) {
        return NextResponse.json({
          error: `Maximum seats for ${org.plan} is ${planLimits.seatMax}. Consider upgrading.`,
        }, { status: 400 })
      }
    }

    // Count current active members
    const memberCount = await queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM ${memberTable} WHERE "organizationId" = $1`,
      [orgId]
    )

    const currentMembers = memberCount?.count || 0
    if (seatCount < currentMembers) {
      return NextResponse.json({
        error: `Cannot reduce below ${currentMembers} seats (current member count). Remove members first.`,
        currentMembers,
      }, { status: 400 })
    }

    // Update Stripe subscription
    const result = await updateSubscriptionSeats(org.stripeSubscriptionId, seatCount)

    if (!result.success) {
      return NextResponse.json({
        error: result.error || 'Failed to update seats',
      }, { status: 500 })
    }

    // Update organization in database
    await query(
      `UPDATE ${orgTable} SET "seatCount" = $1, "updatedAt" = NOW() WHERE id = $2`,
      [seatCount, orgId]
    )

    return NextResponse.json({
      success: true,
      previousSeatCount: org.seatCount || 1,
      newSeatCount: seatCount,
      message: `Successfully updated to ${seatCount} seats`,
    })
  } catch (error: any) {
    console.error('[Seats] Update error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update seat count' },
      { status: 500 }
    )
  }
}
