// GET /api/user/account-usage
// Returns account-wide usage data aggregated across ALL organizations the user belongs to
// Used for global Storage and Processing Units widgets that shouldn't change when switching orgs

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { getPlanLimits, calculateOrgProcessingUnits } from '@/lib/plan-limits'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const headerUserId = request.headers.get('x-user-id') || request.nextUrl.searchParams.get('userId')
    const userId = session?.user?.id || headerUserId

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

    const orgTable = getTableName('Organization')
    const memberTable = getTableName('OrganizationMember')
    const docTable = getTableName('Document')
    const userTable = getTableName('User')

    // Get all organizations the user is a member of
    let userOrgs: Array<{
      id: string
      plan?: string
      seatCount?: number
      processingUnitsUsedThisMonth?: number
      bonusProcessingUnits?: number
    }> = []

    try {
      userOrgs = await query<{
        id: string
        plan?: string
        seatCount?: number
        processingUnitsUsedThisMonth?: number
        bonusProcessingUnits?: number
      }>(
        `SELECT o.id, o.plan, o."seatCount", o."processingUnitsUsedThisMonth", o."bonusProcessingUnits"
         FROM ${orgTable} o
         INNER JOIN ${memberTable} m ON m."organizationId" = o.id
         WHERE m."userId" = $1`,
        [userId]
      )
    } catch (err) {
      console.warn('[/api/user/account-usage] Could not get user organizations:', err)
    }

    // Calculate total storage across all orgs
    let totalStorageBytes = 0
    const orgIds = userOrgs.map(o => o.id)

    if (orgIds.length > 0) {
      try {
        const storageResult = await queryOne<{ total: string }>(
          `SELECT COALESCE(SUM("sizeBytes"), 0) as total FROM ${docTable}
           WHERE "organizationId" = ANY($1::text[])`,
          [orgIds]
        )
        totalStorageBytes = parseInt(storageResult?.total || '0', 10)
      } catch (err) {
        console.warn('[/api/user/account-usage] Could not calculate org storage:', err)
      }
    }

    // Also add personal vault storage
    try {
      const personalStorage = await queryOne<{ total: string }>(
        `SELECT COALESCE(SUM("sizeBytes"), 0) as total FROM ${docTable}
         WHERE "uploadedById" = $1 AND "organizationId" IS NULL`,
        [userId]
      )
      totalStorageBytes += parseInt(personalStorage?.total || '0', 10)
    } catch {
      // Personal vault might not have documents
    }

    // Calculate total PU used across all orgs
    let totalPUUsed = 0
    for (const org of userOrgs) {
      totalPUUsed += org.processingUnitsUsedThisMonth || 0
    }

    // Also add personal vault PU and get personal bonus units
    let personalBonusUnits = 0;
    try {
      const userPU = await queryOne<{ pu: number; bonus: number }>(
        `SELECT COALESCE("processingUnitsUsedThisMonth", 0) as pu, COALESCE("bonusProcessingUnits", 0) as bonus 
         FROM ${userTable} WHERE id = $1`,
        [userId]
      )
      totalPUUsed += userPU?.pu || 0
      personalBonusUnits = userPU?.bonus || 0
    } catch {
      // User might not have PU tracking columns
    }

    // Determine the plan and limits (use the highest plan among all orgs, or primary org)
    let primaryPlan = 'business_starter'
    let totalSeats = 0
    let totalStorageLimit = 0
    let totalPULimit = 0

    // Map legacy plans to business plans
    const legacyToBusinessMap: Record<string, string> = {
      'free': 'business_starter',
      'trial': 'business_starter',
      'starter': 'business_starter',
      'growth': 'business_growth',
      'pro': 'business_pro',
    }

    for (const org of userOrgs) {
      let plan = org.plan || 'business_starter'
      if (legacyToBusinessMap[plan]) {
        plan = legacyToBusinessMap[plan] as string
      }

      const seatCount = org.seatCount || 1
      totalSeats += seatCount

      const limits = getPlanLimits(plan as any)
      totalStorageLimit += limits.storageGb * seatCount * 1024 * 1024 * 1024
      totalPULimit += calculateOrgProcessingUnits(plan, seatCount) + (org.bonusProcessingUnits || 0)

      // Track highest tier plan for display
      const planTiers = ['business_starter', 'business_growth', 'business_pro', 'business_enterprise']
      if (planTiers.indexOf(plan) > planTiers.indexOf(primaryPlan)) {
        primaryPlan = plan
      }
    }

    // If user has no orgs, use personal plan limits
    if (userOrgs.length === 0) {
      const limits = getPlanLimits('starter')
      totalStorageLimit = limits.storageGb * 1024 * 1024 * 1024
      totalPULimit += limits.processingUnitsPerMonth
    }

    // ALWAYS add personal bonus units (purchased top-ups)
    totalPULimit += personalBonusUnits

    // Calculate billing cycle end (first of next month)
    const now = new Date()
    const billingCycleEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1)

    console.log('[/api/user/account-usage] Account-wide usage:', {
      userId,
      orgCount: userOrgs.length,
      totalSeats,
      totalStorageBytes,
      totalPUUsed,
      totalPULimit,
    })

    return NextResponse.json({
      success: true,
      plan: primaryPlan,
      orgCount: userOrgs.length,
      totalSeats,
      billingCycleEnd: billingCycleEnd.toISOString(),
      storage: {
        used: totalStorageBytes,
        limit: totalStorageLimit,
        percentage: totalStorageLimit > 0
          ? (totalStorageBytes / totalStorageLimit) * 100
          : 0,
      },
      processing: {
        used: totalPUUsed,
        limit: totalPULimit,
        percentage: totalPULimit > 0
          ? (totalPUUsed / totalPULimit) * 100
          : 0,
      },
    })
  } catch (error: any) {
    console.error('Error in GET /api/user/account-usage:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get account usage' },
      { status: 500 }
    )
  }
}
