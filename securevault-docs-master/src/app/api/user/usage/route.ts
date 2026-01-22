// GET /api/user/usage
// Returns current usage data for the authenticated user
// Includes: Processing Units, Storage, Egress, Share Links, Quick Store

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { getPlanLimits } from '@/lib/plan-limits'
import { getUserPlan } from '@/lib/plan-utils-server'

export async function GET(request: NextRequest) {
  try {
    // Support both session-based auth and header-based auth for backward compatibility
    const session = await getServerSession(authOptions)
    const headerUserId = request.headers.get('x-user-id') || request.nextUrl.searchParams.get('userId')
    const userId = session?.user?.id || headerUserId

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(userId)) {
      console.warn('[/api/user/usage] Invalid user ID format:', userId)
      return NextResponse.json({
        storageBytes: 0,
        storageGb: 0,
        ocrPagesUsedThisMonth: 0,
        usage: null,
      })
    }

    const userTable = getTableName('User')
    const docTable = getTableName('Document')
    const shareTable = getTableName('ShareLink')

    // Get user's plan
    let plan = 'free'
    try {
      plan = await getUserPlan(userId)
    } catch {
      console.warn('[/api/user/usage] Could not get user plan, using free')
    }
    const limits = getPlanLimits(plan as any)

    // Get user settings and usage counters
    let user: any = null
    try {
      user = await queryOne<{
        autoTopUpEnabled?: boolean
        autoTopUpPack?: string
        bonusProcessingUnits?: number
        processingUnitsUsedThisMonth?: number
        processingUnitsUsedToday?: number
        egressBytesUsedThisMonth?: string
      }>(
        `SELECT "autoTopUpEnabled", "autoTopUpPack", "bonusProcessingUnits",
                "processingUnitsUsedThisMonth", "processingUnitsUsedToday",
                "egressBytesUsedThisMonth"
         FROM ${userTable} WHERE id = $1`,
        [userId]
      )
    } catch (err) {
      console.warn('[/api/user/usage] Could not get user data:', err)
    }

    // Get storage usage
    let storageBytes = 0
    try {
      const storageResult = await queryOne<{ total: string }>(
        `SELECT COALESCE(SUM("sizeBytes"), 0) as total FROM ${docTable}
         WHERE "uploadedById" = $1`,
        [userId]
      )
      storageBytes = parseInt(storageResult?.total || '0', 10)
    } catch (err) {
      console.warn('[/api/user/usage] Could not calculate storage:', err)
    }

    // Get active share links count
    let activeShareLinks = 0
    try {
      const shareResult = await queryOne<{ count: string }>(
        `SELECT COUNT(*) as count FROM ${shareTable}
         WHERE "createdById" = $1 AND ("expiresAt" IS NULL OR "expiresAt" > NOW())`,
        [userId]
      )
      activeShareLinks = parseInt(shareResult?.count || '0', 10)
    } catch (err) {
      console.warn('[/api/user/usage] Could not count share links:', err)
    }

    // Get Quick Store document count
    let quickStoreCount = 0
    try {
      const quickStoreResult = await queryOne<{ count: string }>(
        `SELECT COUNT(*) as count FROM ${docTable} WHERE "uploadedById" = $1 AND "quickStore" = true`,
        [userId]
      )
      quickStoreCount = parseInt(quickStoreResult?.count || '0', 10)
    } catch {
      // Column might not exist
    }

    // Calculate usage values
    const processingMonthlyUsed = user?.processingUnitsUsedThisMonth || 0
    const processingDailyUsed = user?.processingUnitsUsedToday || 0
    const egressBytesUsed = parseInt(user?.egressBytesUsedThisMonth || '0', 10)
    const bonusUnits = user?.bonusProcessingUnits || 0

    const storageGb = storageBytes / (1024 * 1024 * 1024)

    // Return both legacy format and new detailed format
    return NextResponse.json({
      // Legacy fields for backward compatibility
      storageBytes,
      storageGb,
      ocrPagesUsedThisMonth: processingMonthlyUsed,

      // New detailed usage format
      success: true,
      plan,
      autoTopUpEnabled: user?.autoTopUpEnabled || false,
      autoTopUpPack: user?.autoTopUpPack || 'pu_pack_medium',
      usage: {
        processing: {
          monthlyUsed: processingMonthlyUsed,
          monthlyLimit: limits.processingUnitsPerMonth,
          dailyUsed: processingDailyUsed,
          dailyLimit: limits.dailyProcessingLimit,
          bonusUnits,
          percentage: limits.processingUnitsPerMonth > 0
            ? (processingMonthlyUsed / limits.processingUnitsPerMonth) * 100
            : 0,
        },
        storage: {
          used: storageBytes,
          limit: limits.storageGb * 1024 * 1024 * 1024,
          percentage: limits.storageGb > 0
            ? (storageGb / limits.storageGb) * 100
            : 0,
        },
        egress: {
          used: egressBytesUsed,
          limit: limits.egressGbPerMonth * 1024 * 1024 * 1024,
          percentage: limits.egressGbPerMonth > 0
            ? (egressBytesUsed / (limits.egressGbPerMonth * 1024 * 1024 * 1024)) * 100
            : 0,
        },
        shareLinks: {
          active: activeShareLinks,
          limit: limits.activeShareLinks,
          percentage: limits.activeShareLinks > 0
            ? (activeShareLinks / limits.activeShareLinks) * 100
            : 0,
        },
        quickStoreCount,
      },
    })
  } catch (error: any) {
    console.error('Error in GET /api/user/usage:', error)
    // Return zero usage instead of error to prevent blocking uploads
    return NextResponse.json({
      storageBytes: 0,
      storageGb: 0,
      ocrPagesUsedThisMonth: 0,
      usage: null,
    })
  }
}
