// GET /api/org/[orgId]/usage
// Returns current usage data for an organization
// Includes: Processing Units, Storage, Egress, Share Links

import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { getPlanLimits, calculateOrgProcessingUnits, calculateOrgDailyLimit } from '@/lib/plan-limits'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params

    if (!orgId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 })
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(orgId)) {
      console.warn('[/api/org/usage] Invalid org ID format:', orgId)
      return NextResponse.json({
        success: false,
        error: 'Invalid organization ID format',
      }, { status: 400 })
    }

    const orgTable = getTableName('Organization')
    const docTable = getTableName('Document')
    const shareTable = getTableName('ShareLink')

    // Get organization data
    const org = await queryOne<{
      plan?: string
      seatCount?: number
      processingUnitsUsedThisMonth?: number
      processingUnitsUsedToday?: number
      processingMonthResetDate?: string
      lastDailyResetDate?: string
      bonusProcessingUnits?: number
      egressBytesUsedThisMonth?: string
    }>(
      `SELECT plan, "seatCount", "processingUnitsUsedThisMonth", "processingUnitsUsedToday",
              "processingMonthResetDate", "lastDailyResetDate", "bonusProcessingUnits",
              "egressBytesUsedThisMonth"
       FROM ${orgTable} WHERE id = $1`,
      [orgId]
    )

    if (!org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
    }

    // Map legacy/personal plans to business plans for organizations
    // Organizations should always use business plans
    let plan = org.plan || 'business_starter'
    const legacyToBusinessMap: Record<string, string> = {
      'free': 'business_starter',
      'trial': 'business_starter',
      'starter': 'business_starter',
      'growth': 'business_growth',
      'pro': 'business_pro',
    }
    if (legacyToBusinessMap[plan]) {
      console.log(`[/api/org/usage] Mapping legacy plan '${plan}' to '${legacyToBusinessMap[plan]}'`)
      plan = legacyToBusinessMap[plan]
    }

    const seatCount = org.seatCount || 1
    const limits = getPlanLimits(plan as any)

    // Calculate org-specific limits (multiplied by seat count)
    const monthlyPULimit = calculateOrgProcessingUnits(plan, seatCount)
    const dailyPULimit = calculateOrgDailyLimit(plan, seatCount)

    // Get storage usage for this organization
    let storageBytes = 0
    try {
      const storageResult = await queryOne<{ total: string }>(
        `SELECT COALESCE(SUM("sizeBytes"), 0) as total FROM ${docTable}
         WHERE "organizationId" = $1`,
        [orgId]
      )
      storageBytes = parseInt(storageResult?.total || '0', 10)
    } catch (err) {
      console.warn('[/api/org/usage] Could not calculate storage:', err)
    }

    // Get document count
    let documentCount = 0
    try {
      const countResult = await queryOne<{ count: string }>(
        `SELECT COUNT(*) as count FROM ${docTable}
         WHERE "organizationId" = $1 AND ("uploadStatus" IS NULL OR "uploadStatus" = 'confirmed')`,
        [orgId]
      )
      documentCount = parseInt(countResult?.count || '0', 10)
    } catch (err) {
      console.warn('[/api/org/usage] Could not count documents:', err)
    }

    // Get active share links count
    let activeShareLinks = 0
    try {
      const shareResult = await queryOne<{ count: string }>(
        `SELECT COUNT(*) as count FROM ${shareTable}
         WHERE "organizationId" = $1 AND ("expiresAt" IS NULL OR "expiresAt" > NOW())`,
        [orgId]
      )
      activeShareLinks = parseInt(shareResult?.count || '0', 10)
    } catch {
      console.warn('[/api/org/usage] Could not count share links')
    }

    // Calculate usage values
    const processingMonthlyUsed = org.processingUnitsUsedThisMonth || 0
    const processingDailyUsed = org.processingUnitsUsedToday || 0
    const egressBytesUsed = parseInt(org.egressBytesUsedThisMonth || '0', 10)
    const bonusUnits = org.bonusProcessingUnits || 0

    const storageGb = storageBytes / (1024 * 1024 * 1024)
    const storageLimitBytes = limits.storageGb * seatCount * 1024 * 1024 * 1024

    // Calculate billing cycle end (first of next month)
    const now = new Date()
    const billingCycleEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1)

    console.log('[/api/org/usage] Org usage:', {
      orgId,
      plan,
      seatCount,
      processingMonthlyUsed,
      monthlyPULimit,
      storageBytes,
      documentCount,
    })

    return NextResponse.json({
      success: true,
      plan,
      seatCount,
      documentCount,
      billingCycleEnd: billingCycleEnd.toISOString(),
      usage: {
        processing: {
          monthlyUsed: processingMonthlyUsed,
          monthlyLimit: monthlyPULimit,
          dailyUsed: processingDailyUsed,
          dailyLimit: dailyPULimit,
          bonusUnits,
          percentage: monthlyPULimit > 0
            ? (processingMonthlyUsed / monthlyPULimit) * 100
            : 0,
        },
        storage: {
          used: storageBytes,
          limit: storageLimitBytes,
          percentage: storageLimitBytes > 0
            ? (storageBytes / storageLimitBytes) * 100
            : 0,
        },
        egress: {
          used: egressBytesUsed,
          limit: limits.egressGbPerMonth * seatCount * 1024 * 1024 * 1024,
          percentage: limits.egressGbPerMonth > 0
            ? (egressBytesUsed / (limits.egressGbPerMonth * seatCount * 1024 * 1024 * 1024)) * 100
            : 0,
        },
        shareLinks: {
          active: activeShareLinks,
          limit: limits.activeShareLinks * seatCount,
          percentage: limits.activeShareLinks > 0
            ? (activeShareLinks / (limits.activeShareLinks * seatCount)) * 100
            : 0,
        },
      },
    })
  } catch (error: any) {
    console.error('Error in GET /api/org/[orgId]/usage:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get organization usage' },
      { status: 500 }
    )
  }
}
