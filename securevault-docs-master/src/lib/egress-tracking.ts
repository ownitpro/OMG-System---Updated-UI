// Egress (download bandwidth) tracking utilities
// New in December 2025 - Tracks download bandwidth per user/organization

import { getPlanLimits, getUsageAlertLevel, type Plan } from './plan-limits'

// ============================================================================
// TYPES
// ============================================================================

export interface EgressUsage {
  bytesUsed: number
  gbUsed: number
  limitGb: number
  percentage: number
  monthResetDate: Date | null
  isThrottled: boolean
}

export interface EgressCheck {
  allowed: boolean // Always true - we throttle, not block
  shouldThrottle: boolean
  currentUsageBytes: number
  limitBytes: number
  percentage: number
  reason?: string
}

// Constants
const BYTES_PER_GB = 1024 * 1024 * 1024

// ============================================================================
// USER EGRESS TRACKING
// ============================================================================

/**
 * Get egress usage for a personal user
 */
export async function getUserEgressUsage(userId: string, plan: Plan | string = 'trial'): Promise<EgressUsage> {
  await checkAndResetUserEgress(userId)

  const { queryOne } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const user = await queryOne<{
    egressBytesUsedThisMonth?: string | number
    egressMonthResetDate?: string
  }>(
    `SELECT "egressBytesUsedThisMonth", "egressMonthResetDate"
     FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )

  const limits = getPlanLimits(plan)
  const bytesUsed = Number(user?.egressBytesUsedThisMonth || 0)
  const gbUsed = bytesUsed / BYTES_PER_GB
  const limitBytes = limits.egressGbPerMonth * BYTES_PER_GB

  return {
    bytesUsed,
    gbUsed,
    limitGb: limits.egressGbPerMonth,
    percentage: limits.egressGbPerMonth > 0
      ? Math.min((bytesUsed / limitBytes) * 100, 100)
      : 0,
    monthResetDate: user?.egressMonthResetDate ? new Date(user.egressMonthResetDate) : null,
    isThrottled: bytesUsed >= limitBytes,
  }
}

/**
 * Increment egress usage for a personal user
 */
export async function incrementUserEgress(userId: string, bytes: number): Promise<number> {
  await checkAndResetUserEgress(userId)

  const { queryOne, query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const user = await queryOne<{
    egressBytesUsedThisMonth?: string | number
  }>(
    `SELECT "egressBytesUsedThisMonth"
     FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )

  const newTotal = Number(user?.egressBytesUsedThisMonth || 0) + bytes

  await query(
    `UPDATE ${getTableName('User')}
     SET "egressBytesUsedThisMonth" = $1,
         "updatedAt" = NOW()
     WHERE id = $2`,
    [newTotal, userId]
  )

  return newTotal
}

/**
 * Check egress limit for a user (throttle, not block)
 */
export async function checkUserEgressLimit(
  userId: string,
  downloadBytes: number,
  plan: Plan | string = 'trial'
): Promise<EgressCheck> {
  const usage = await getUserEgressUsage(userId, plan)
  const limits = getPlanLimits(plan)
  const limitBytes = limits.egressGbPerMonth * BYTES_PER_GB

  const newTotal = usage.bytesUsed + downloadBytes
  const shouldThrottle = newTotal > limitBytes

  return {
    allowed: true, // Always allow, but throttle if over limit
    shouldThrottle,
    currentUsageBytes: usage.bytesUsed,
    limitBytes,
    percentage: usage.percentage,
    reason: shouldThrottle
      ? `Monthly download limit of ${limits.egressGbPerMonth} GB reached. Download speed will be throttled.`
      : undefined,
  }
}

/**
 * Check and reset user egress counter if month changed
 */
async function checkAndResetUserEgress(userId: string): Promise<void> {
  const { queryOne, query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const user = await queryOne<{
    egressMonthResetDate?: string
  }>(
    `SELECT "egressMonthResetDate"
     FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )

  const now = new Date()

  if (!user?.egressMonthResetDate) {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    await query(
      `UPDATE ${getTableName('User')}
       SET "egressMonthResetDate" = $1, "egressBytesUsedThisMonth" = 0, "updatedAt" = NOW()
       WHERE id = $2`,
      [monthStart.toISOString(), userId]
    )
    return
  }

  const resetDate = new Date(user.egressMonthResetDate)
  if (resetDate.getMonth() !== now.getMonth() || resetDate.getFullYear() !== now.getFullYear()) {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    await query(
      `UPDATE ${getTableName('User')}
       SET "egressMonthResetDate" = $1, "egressBytesUsedThisMonth" = 0, "updatedAt" = NOW()
       WHERE id = $2`,
      [monthStart.toISOString(), userId]
    )
  }
}

// ============================================================================
// ORGANIZATION EGRESS TRACKING
// ============================================================================

/**
 * Get egress usage for an organization
 */
export async function getOrgEgressUsage(orgId: string, plan: Plan | string = 'business_starter'): Promise<EgressUsage> {
  await checkAndResetOrgEgress(orgId)

  const { queryOne } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const org = await queryOne<{
    egressBytesUsedThisMonth?: string | number
    egressMonthResetDate?: string
  }>(
    `SELECT "egressBytesUsedThisMonth", "egressMonthResetDate"
     FROM ${getTableName('Organization')} WHERE id = $1`,
    [orgId]
  )

  const limits = getPlanLimits(plan)
  const bytesUsed = Number(org?.egressBytesUsedThisMonth || 0)
  const gbUsed = bytesUsed / BYTES_PER_GB
  const limitBytes = limits.egressGbPerMonth * BYTES_PER_GB

  return {
    bytesUsed,
    gbUsed,
    limitGb: limits.egressGbPerMonth,
    percentage: limits.egressGbPerMonth > 0
      ? Math.min((bytesUsed / limitBytes) * 100, 100)
      : 0,
    monthResetDate: org?.egressMonthResetDate ? new Date(org.egressMonthResetDate) : null,
    isThrottled: bytesUsed >= limitBytes,
  }
}

/**
 * Increment egress usage for an organization
 */
export async function incrementOrgEgress(orgId: string, bytes: number): Promise<number> {
  await checkAndResetOrgEgress(orgId)

  const { queryOne, query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const org = await queryOne<{
    egressBytesUsedThisMonth?: string | number
  }>(
    `SELECT "egressBytesUsedThisMonth"
     FROM ${getTableName('Organization')} WHERE id = $1`,
    [orgId]
  )

  const newTotal = Number(org?.egressBytesUsedThisMonth || 0) + bytes

  await query(
    `UPDATE ${getTableName('Organization')}
     SET "egressBytesUsedThisMonth" = $1,
         "updatedAt" = NOW()
     WHERE id = $2`,
    [newTotal, orgId]
  )

  return newTotal
}

/**
 * Check egress limit for an organization (throttle, not block)
 */
export async function checkOrgEgressLimit(
  orgId: string,
  downloadBytes: number,
  plan: Plan | string = 'business_starter'
): Promise<EgressCheck> {
  const usage = await getOrgEgressUsage(orgId, plan)
  const limits = getPlanLimits(plan)
  const limitBytes = limits.egressGbPerMonth * BYTES_PER_GB

  const newTotal = usage.bytesUsed + downloadBytes
  const shouldThrottle = newTotal > limitBytes

  return {
    allowed: true, // Always allow, but throttle if over limit
    shouldThrottle,
    currentUsageBytes: usage.bytesUsed,
    limitBytes,
    percentage: usage.percentage,
    reason: shouldThrottle
      ? `Organization monthly download limit of ${limits.egressGbPerMonth} GB reached. Download speed will be throttled.`
      : undefined,
  }
}

/**
 * Check and reset org egress counter if month changed
 */
async function checkAndResetOrgEgress(orgId: string): Promise<void> {
  const { queryOne, query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const org = await queryOne<{
    egressMonthResetDate?: string
  }>(
    `SELECT "egressMonthResetDate"
     FROM ${getTableName('Organization')} WHERE id = $1`,
    [orgId]
  )

  const now = new Date()

  if (!org?.egressMonthResetDate) {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    await query(
      `UPDATE ${getTableName('Organization')}
       SET "egressMonthResetDate" = $1, "egressBytesUsedThisMonth" = 0, "updatedAt" = NOW()
       WHERE id = $2`,
      [monthStart.toISOString(), orgId]
    )
    return
  }

  const resetDate = new Date(org.egressMonthResetDate)
  if (resetDate.getMonth() !== now.getMonth() || resetDate.getFullYear() !== now.getFullYear()) {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    await query(
      `UPDATE ${getTableName('Organization')}
       SET "egressMonthResetDate" = $1, "egressBytesUsedThisMonth" = 0, "updatedAt" = NOW()
       WHERE id = $2`,
      [monthStart.toISOString(), orgId]
    )
  }
}

// ============================================================================
// USAGE ALERTS
// ============================================================================

/**
 * Check if egress usage alerts should be triggered
 */
export function checkEgressAlerts(usage: EgressUsage): {
  alertLevel: number | null
  isThrottled: boolean
} {
  return {
    alertLevel: getUsageAlertLevel(usage.percentage),
    isThrottled: usage.isThrottled,
  }
}

// ============================================================================
// THROTTLING UTILITIES
// ============================================================================

/**
 * Calculate throttled download speed based on overage
 * Returns speed limit in bytes per second (0 = no limit)
 */
export function calculateThrottleSpeed(usage: EgressUsage): number {
  if (!usage.isThrottled) {
    return 0 // No throttling, full speed
  }

  // Throttle to 100 KB/s when over limit
  const THROTTLED_SPEED = 100 * 1024 // 100 KB/s
  return THROTTLED_SPEED
}

/**
 * Format egress usage for display
 */
export function formatEgressUsage(usage: EgressUsage): string {
  if (usage.gbUsed < 1) {
    const mbUsed = usage.bytesUsed / (1024 * 1024)
    return `${mbUsed.toFixed(1)} MB / ${usage.limitGb} GB`
  }
  return `${usage.gbUsed.toFixed(2)} GB / ${usage.limitGb} GB`
}
