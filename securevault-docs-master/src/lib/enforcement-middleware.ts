// Enforcement middleware - PostgreSQL ONLY
// Updated December 2025 - Processing Units, Egress, Active Share Links, PDF Limits

import { NextResponse } from 'next/server'
import {
  getPlanLimits,
  isTrialExpired,
  normalizePlan,
  canProcessPdf,
  type Plan,
  type PlanLimits,
} from '@/lib/plan-limits'
import {
  checkUserProcessingLimit,
  checkOrgProcessingLimit,
  type ProcessingLimitCheck,
} from '@/lib/processing-tracking'
import {
  checkUserEgressLimit,
  checkOrgEgressLimit,
  type EgressCheck,
} from '@/lib/egress-tracking'

// ============================================================================
// TYPES
// ============================================================================

export interface EnforcementContext {
  userId: string
  plan: Plan
  limits: PlanLimits
  trialExpired: boolean
  seatCount?: number // For business plans
  orgId?: string
}

export interface LimitCheckResult {
  allowed: boolean
  currentCount: number
  error: NextResponse | null
}

// ============================================================================
// CONTEXT GETTERS
// ============================================================================

export async function getPersonalEnforcementContext(
  userId: string
): Promise<{ context: EnforcementContext | null; error: NextResponse | null }> {
  const { queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  const user = await queryOne<{
    id: string
    plan?: string
    trialExpiresAt?: string
  }>(
    `SELECT id, plan, "trialExpiresAt" FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )

  if (!user) {
    return {
      context: null,
      error: NextResponse.json({ error: 'User not found' }, { status: 404 }),
    }
  }

  const plan = normalizePlan(user.plan || 'trial')
  return {
    context: {
      userId,
      plan,
      limits: getPlanLimits(plan),
      trialExpired: user.trialExpiresAt ? isTrialExpired(user.trialExpiresAt) : false,
    },
    error: null,
  }
}

export async function getOrgEnforcementContext(
  orgId: string
): Promise<{ context: EnforcementContext | null; error: NextResponse | null }> {
  const { queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  const org = await queryOne<{
    ownerId: string
    plan?: string
    seatCount?: number
  }>(
    `SELECT "ownerId", plan, "seatCount" FROM ${getTableName('Organization')} WHERE id = $1`,
    [orgId]
  )

  if (!org) {
    return {
      context: null,
      error: NextResponse.json({ error: 'Organization not found' }, { status: 404 }),
    }
  }

  const owner = await queryOne<{
    id: string
    plan?: string
    trialExpiresAt?: string
  }>(
    `SELECT id, plan, "trialExpiresAt" FROM ${getTableName('User')} WHERE id = $1`,
    [org.ownerId]
  )

  if (!owner) {
    return {
      context: null,
      error: NextResponse.json({ error: 'Organization owner not found' }, { status: 404 }),
    }
  }

  // Use org plan if set, otherwise fall back to owner's plan
  const plan = normalizePlan(org.plan || owner.plan || 'business_starter')
  const seatCount = org.seatCount || 1

  return {
    context: {
      userId: owner.id,
      plan,
      limits: getPlanLimits(plan),
      trialExpired: owner.trialExpiresAt ? isTrialExpired(owner.trialExpiresAt) : false,
      seatCount,
      orgId,
    },
    error: null,
  }
}

// ============================================================================
// TRIAL CHECK
// ============================================================================

export function checkTrialExpired(
  context: EnforcementContext,
  operation: string
): NextResponse | null {
  if (context.trialExpired) {
    return NextResponse.json(
      {
        error: `Your trial has expired. Please upgrade to continue ${operation}.`,
        code: 'TRIAL_EXPIRED',
      },
      { status: 402 }
    )
  }
  return null
}

// ============================================================================
// STORAGE LIMIT
// ============================================================================

export async function checkStorageLimit(
  userId: string,
  fileSizeBytes: number,
  limitGb: number
): Promise<LimitCheckResult & { currentGb: number }> {
  const { queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  const result = await queryOne<{ total: string }>(
    `SELECT COALESCE(SUM("sizeBytes"), 0) as total FROM ${getTableName('Document')} WHERE "uploadedById" = $1`,
    [userId]
  )

  const currentBytes = parseInt(result?.total || '0', 10)
  const currentGb = currentBytes / (1024 * 1024 * 1024)
  const newTotal = currentGb + fileSizeBytes / (1024 * 1024 * 1024)

  if (newTotal > limitGb) {
    return {
      allowed: false,
      currentCount: currentBytes,
      currentGb,
      error: NextResponse.json(
        {
          error: `This upload would exceed your ${limitGb} GB storage limit.`,
          code: 'STORAGE_LIMIT_EXCEEDED',
        },
        { status: 402 }
      ),
    }
  }
  return { allowed: true, currentCount: currentBytes, currentGb, error: null }
}

export async function checkOrgStorageLimit(
  orgId: string,
  fileSizeBytes: number,
  limitGb: number
): Promise<LimitCheckResult & { currentGb: number }> {
  const { queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  const result = await queryOne<{ total: string }>(
    `SELECT COALESCE(SUM("sizeBytes"), 0) as total FROM ${getTableName('Document')} WHERE "organizationId" = $1`,
    [orgId]
  )

  const currentBytes = parseInt(result?.total || '0', 10)
  const currentGb = currentBytes / (1024 * 1024 * 1024)
  const newTotal = currentGb + fileSizeBytes / (1024 * 1024 * 1024)

  if (newTotal > limitGb) {
    return {
      allowed: false,
      currentCount: currentBytes,
      currentGb,
      error: NextResponse.json(
        {
          error: `This upload would exceed your organization's ${limitGb} GB storage limit.`,
          code: 'STORAGE_LIMIT_EXCEEDED',
        },
        { status: 402 }
      ),
    }
  }
  return { allowed: true, currentCount: currentBytes, currentGb, error: null }
}

// ============================================================================
// PROCESSING UNIT LIMITS (Replaces OCR Limit)
// ============================================================================

export async function checkProcessingLimit(
  userId: string | null,
  orgId: string | null,
  pageCount: number,
  plan: Plan | string,
  seatCount: number = 1
): Promise<ProcessingLimitCheck & { error: NextResponse | null }> {
  let check: ProcessingLimitCheck

  if (orgId) {
    check = await checkOrgProcessingLimit(orgId, pageCount, plan, seatCount)
  } else if (userId) {
    check = await checkUserProcessingLimit(userId, pageCount, plan)
  } else {
    return {
      allowed: false,
      currentMonthlyUsage: 0,
      currentDailyUsage: 0,
      newMonthlyTotal: 0,
      newDailyTotal: 0,
      monthlyLimit: 0,
      dailyLimit: 0,
      shouldQuickStore: false,
      error: NextResponse.json(
        { error: 'User or organization ID required', code: 'INVALID_REQUEST' },
        { status: 400 }
      ),
    }
  }

  if (!check.allowed) {
    return {
      ...check,
      error: NextResponse.json(
        {
          error: check.reason || 'Processing limit exceeded',
          code: check.shouldQuickStore ? 'QUICK_STORE' : 'PROCESSING_LIMIT_EXCEEDED',
          shouldQuickStore: check.shouldQuickStore,
        },
        { status: 402 }
      ),
    }
  }

  return { ...check, error: null }
}

// Legacy function for backward compatibility
export async function checkOcrLimit(
  userId: string | null,
  orgId: string | null,
  limit: number
): Promise<LimitCheckResult> {
  const { queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  let sql = `SELECT COUNT(*) as count FROM ${getTableName('Document')} WHERE "ocrProcessed" = true AND "createdAt" >= $1`
  const params: any[] = [monthStart]

  if (userId) {
    sql += ` AND "uploadedById" = $2`
    params.push(userId)
  } else if (orgId) {
    sql += ` AND "organizationId" = $2`
    params.push(orgId)
  }

  const result = await queryOne<{ count: string }>(sql, params)
  const currentCount = parseInt(result?.count || '0', 10)

  if (currentCount >= limit) {
    return {
      allowed: false,
      currentCount,
      error: NextResponse.json(
        {
          error: `You've reached your processing limit of ${limit} pages per month.`,
          code: 'PROCESSING_LIMIT_EXCEEDED',
        },
        { status: 402 }
      ),
    }
  }
  return { allowed: true, currentCount, error: null }
}

// ============================================================================
// PDF PAGE LIMIT
// ============================================================================

export function checkPdfPageLimit(
  pageCount: number,
  plan: Plan | string
): { allowed: boolean; shouldQuickStore: boolean; error: NextResponse | null; reason?: string } {
  const check = canProcessPdf(plan, pageCount)

  if (!check.allowed) {
    return {
      allowed: false,
      shouldQuickStore: check.shouldQuickStore || false,
      reason: check.reason,
      error: NextResponse.json(
        {
          error: check.reason || 'PDF page limit exceeded',
          code: 'PDF_PAGE_LIMIT_EXCEEDED',
          shouldQuickStore: check.shouldQuickStore,
        },
        { status: 402 }
      ),
    }
  }

  return { allowed: true, shouldQuickStore: false, error: null }
}

// ============================================================================
// ACTIVE SHARE LINK LIMIT (Updated to count only non-expired links)
// ============================================================================

export async function checkShareLinkLimit(
  userId: string | null,
  orgId: string | null,
  limit: number
): Promise<LimitCheckResult> {
  if (limit === 0) {
    return {
      allowed: false,
      currentCount: 0,
      error: NextResponse.json(
        {
          error: 'Share links are not available on your current plan.',
          code: 'FEATURE_NOT_AVAILABLE',
        },
        { status: 403 }
      ),
    }
  }

  const { queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  // Count only ACTIVE (non-expired) share links
  // A link is active if: expiresAt IS NULL (never expires) OR expiresAt > NOW()
  let sql: string
  let params: any[]

  if (orgId) {
    sql = `
      SELECT COUNT(DISTINCT s.id) as count
      FROM ${getTableName('ShareLink')} s
      JOIN ${getTableName('Document')} d ON d.id = s."documentId"
      WHERE d."organizationId" = $1
        AND (s."expiresAt" IS NULL OR s."expiresAt" > NOW())
    `
    params = [orgId]
  } else if (userId) {
    sql = `
      SELECT COUNT(DISTINCT s.id) as count
      FROM ${getTableName('ShareLink')} s
      JOIN ${getTableName('Document')} d ON d.id = s."documentId"
      WHERE d."uploadedById" = $1
        AND d."personalVaultId" IS NOT NULL
        AND (s."expiresAt" IS NULL OR s."expiresAt" > NOW())
    `
    params = [userId]
  } else {
    return {
      allowed: false,
      currentCount: 0,
      error: NextResponse.json(
        { error: 'User or organization ID required', code: 'INVALID_REQUEST' },
        { status: 400 }
      ),
    }
  }

  const result = await queryOne<{ count: string }>(sql, params)
  const currentCount = parseInt(result?.count || '0', 10)

  if (currentCount >= limit) {
    return {
      allowed: false,
      currentCount,
      error: NextResponse.json(
        {
          error: `You've reached your limit of ${limit} active share links. Remove or let existing links expire to create new ones.`,
          code: 'SHARE_LINK_LIMIT_EXCEEDED',
        },
        { status: 402 }
      ),
    }
  }

  return { allowed: true, currentCount, error: null }
}

// ============================================================================
// EGRESS LIMIT
// ============================================================================

export async function checkEgressLimit(
  userId: string | null,
  orgId: string | null,
  downloadBytes: number,
  plan: Plan | string
): Promise<EgressCheck & { error: NextResponse | null }> {
  let check: EgressCheck

  if (orgId) {
    check = await checkOrgEgressLimit(orgId, downloadBytes, plan)
  } else if (userId) {
    check = await checkUserEgressLimit(userId, downloadBytes, plan)
  } else {
    return {
      allowed: true,
      shouldThrottle: false,
      currentUsageBytes: 0,
      limitBytes: 0,
      percentage: 0,
      error: null,
    }
  }

  // Egress is always allowed, but we may throttle
  // No error response for throttling - just a warning
  return { ...check, error: null }
}

// ============================================================================
// SEAT LIMIT
// ============================================================================

export async function checkSeatLimit(
  orgId: string,
  limit: number
): Promise<LimitCheckResult> {
  const { queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  const result = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1`,
    [orgId]
  )

  const currentCount = parseInt(result?.count || '0', 10)
  if (currentCount >= limit) {
    return {
      allowed: false,
      currentCount,
      error: NextResponse.json(
        {
          error: `You've reached your seat limit of ${limit}. Upgrade your plan to add more team members.`,
          code: 'SEAT_LIMIT_EXCEEDED',
        },
        { status: 402 }
      ),
    }
  }
  return { allowed: true, currentCount, error: null }
}

// ============================================================================
// BUSINESS VAULT LIMIT
// ============================================================================

export async function checkBusinessVaultLimit(
  userId: string,
  limit: number
): Promise<LimitCheckResult> {
  const { queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  const result = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM ${getTableName('Organization')} WHERE "ownerId" = $1`,
    [userId]
  )

  const currentCount = parseInt(result?.count || '0', 10)
  if (currentCount >= limit) {
    return {
      allowed: false,
      currentCount,
      error: NextResponse.json(
        {
          error: `You've reached your business vault limit of ${limit}. Upgrade your plan to create more.`,
          code: 'BUSINESS_VAULT_LIMIT_EXCEEDED',
        },
        { status: 402 }
      ),
    }
  }
  return { allowed: true, currentCount, error: null }
}

// ============================================================================
// FEATURE ACCESS CHECK
// ============================================================================

export function checkFeatureAccess(
  context: EnforcementContext,
  feature: keyof PlanLimits,
  featureName: string
): NextResponse | null {
  const value = context.limits[feature]
  if (typeof value === 'boolean' && !value) {
    return NextResponse.json(
      {
        error: `${featureName} is not available on your current plan.`,
        code: 'FEATURE_NOT_AVAILABLE',
        feature,
      },
      { status: 403 }
    )
  }
  return null
}

// ============================================================================
// QUICK STORE UTILITIES
// ============================================================================

export interface QuickStoreDecision {
  shouldQuickStore: boolean
  reason?: string
}

/**
 * Determine if a document should go to Quick Store
 * based on processing limits and PDF page count
 */
export async function shouldQuickStore(
  userId: string | null,
  orgId: string | null,
  pageCount: number,
  plan: Plan | string,
  seatCount: number = 1
): Promise<QuickStoreDecision> {
  // Check PDF page limit
  const pdfCheck = checkPdfPageLimit(pageCount, plan)
  if (pdfCheck.shouldQuickStore) {
    return { shouldQuickStore: true, reason: pdfCheck.reason }
  }

  // Check processing unit limit
  const processingCheck = await checkProcessingLimit(userId, orgId, pageCount, plan, seatCount)
  if (processingCheck.shouldQuickStore) {
    return { shouldQuickStore: true, reason: processingCheck.reason }
  }

  return { shouldQuickStore: false }
}
