// Processing Unit tracking utilities
// Updated December 2025 - Replaces OCR tracking
// 1 PU = 1 page processed through OCR + AI classification + auto-filing

import { getPlanLimits, calculateOrgProcessingUnits, calculateOrgDailyLimit, getUsageAlertLevel, shouldTriggerAutoTopUp, type Plan } from './plan-limits'

// ============================================================================
// TYPES
// ============================================================================

export interface ProcessingUsage {
  monthlyUsed: number
  dailyUsed: number
  monthlyLimit: number
  dailyLimit: number
  monthlyPercentage: number
  dailyPercentage: number
  lastDailyReset: Date | null
  monthResetDate: Date | null
}

export interface ProcessingLimitCheck {
  allowed: boolean
  currentMonthlyUsage: number
  currentDailyUsage: number
  newMonthlyTotal: number
  newDailyTotal: number
  monthlyLimit: number
  dailyLimit: number
  shouldQuickStore: boolean
  reason?: string
}

// ============================================================================
// USER PROCESSING TRACKING
// ============================================================================

/**
 * Get processing usage for a personal user
 */
export async function getUserProcessingUsage(userId: string, plan: Plan | string = 'trial'): Promise<ProcessingUsage> {
  await checkAndResetUserProcessing(userId)

  const { queryOne } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const user = await queryOne<{
    processingUnitsUsedThisMonth?: number
    processingUnitsUsedToday?: number
    bonusProcessingUnits?: number
    processingMonthResetDate?: string
    lastDailyResetDate?: string
  }>(
    `SELECT "processingUnitsUsedThisMonth", "processingUnitsUsedToday", "bonusProcessingUnits",
            "processingMonthResetDate", "lastDailyResetDate"
     FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )

  const limits = getPlanLimits(plan)
  const monthlyUsed = user?.processingUnitsUsedThisMonth || 0
  const dailyUsed = user?.processingUnitsUsedToday || 0
  const bonusUnits = user?.bonusProcessingUnits || 0

  return {
    monthlyUsed,
    dailyUsed,
    monthlyLimit: limits.processingUnitsPerMonth + bonusUnits,
    dailyLimit: limits.dailyProcessingLimit,
    monthlyPercentage: limits.processingUnitsPerMonth > 0
      ? Math.min((monthlyUsed / limits.processingUnitsPerMonth) * 100, 100)
      : 0,
    dailyPercentage: limits.dailyProcessingLimit > 0
      ? Math.min((dailyUsed / limits.dailyProcessingLimit) * 100, 100)
      : 0,
    lastDailyReset: user?.lastDailyResetDate ? new Date(user.lastDailyResetDate) : null,
    monthResetDate: user?.processingMonthResetDate ? new Date(user.processingMonthResetDate) : null,
  }
}

/**
 * Increment processing usage for a personal user
 */
export async function incrementUserProcessingUsage(userId: string, pageCount: number): Promise<{
  newMonthlyTotal: number
  newDailyTotal: number
}> {
  await checkAndResetUserProcessing(userId)

  const { queryOne, query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const user = await queryOne<{
    processingUnitsUsedThisMonth?: number
    processingUnitsUsedToday?: number
  }>(
    `SELECT "processingUnitsUsedThisMonth", "processingUnitsUsedToday"
     FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )

  const newMonthlyTotal = (user?.processingUnitsUsedThisMonth || 0) + pageCount
  const newDailyTotal = (user?.processingUnitsUsedToday || 0) + pageCount

  await query(
    `UPDATE ${getTableName('User')}
     SET "processingUnitsUsedThisMonth" = $1,
         "processingUnitsUsedToday" = $2,
         "updatedAt" = NOW()
     WHERE id = $3`,
    [newMonthlyTotal, newDailyTotal, userId]
  )

  return { newMonthlyTotal, newDailyTotal }
}

/**
 * Check if user can process pages within their limits
 */
export async function checkUserProcessingLimit(
  userId: string,
  pageCount: number,
  plan: Plan | string = 'trial'
): Promise<ProcessingLimitCheck> {
  const usage = await getUserProcessingUsage(userId, plan)
  const limits = getPlanLimits(plan)

  const newMonthlyTotal = usage.monthlyUsed + pageCount
  const newDailyTotal = usage.dailyUsed + pageCount

  const monthlyExceeded = newMonthlyTotal > limits.processingUnitsPerMonth
  const dailyExceeded = newDailyTotal > limits.dailyProcessingLimit

  let reason: string | undefined
  if (monthlyExceeded) {
    reason = `Monthly Processing Unit limit of ${limits.processingUnitsPerMonth.toLocaleString()} exceeded. Files will be saved to Quick Store.`
  } else if (dailyExceeded) {
    reason = `Daily Processing Unit limit of ${limits.dailyProcessingLimit.toLocaleString()} exceeded. Try again tomorrow or upgrade your plan.`
  }

  return {
    allowed: !monthlyExceeded && !dailyExceeded,
    currentMonthlyUsage: usage.monthlyUsed,
    currentDailyUsage: usage.dailyUsed,
    newMonthlyTotal,
    newDailyTotal,
    monthlyLimit: limits.processingUnitsPerMonth,
    dailyLimit: limits.dailyProcessingLimit,
    shouldQuickStore: monthlyExceeded,
    reason,
  }
}

/**
 * Check and reset user processing counters if needed
 */
async function checkAndResetUserProcessing(userId: string): Promise<void> {
  const { queryOne, query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const user = await queryOne<{
    processingMonthResetDate?: string
    lastDailyResetDate?: string
  }>(
    `SELECT "processingMonthResetDate", "lastDailyResetDate"
     FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )

  const now = new Date()
  const updates: string[] = []
  const params: any[] = []
  let paramIdx = 1

  // Check monthly reset
  if (!user?.processingMonthResetDate) {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    updates.push(`"processingMonthResetDate" = $${paramIdx++}`)
    params.push(monthStart.toISOString())
    updates.push(`"processingUnitsUsedThisMonth" = 0`)
  } else {
    const resetDate = new Date(user.processingMonthResetDate)
    if (resetDate.getMonth() !== now.getMonth() || resetDate.getFullYear() !== now.getFullYear()) {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      updates.push(`"processingMonthResetDate" = $${paramIdx++}`)
      params.push(monthStart.toISOString())
      updates.push(`"processingUnitsUsedThisMonth" = 0`)
    }
  }

  // Check daily reset
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  if (!user?.lastDailyResetDate) {
    updates.push(`"lastDailyResetDate" = $${paramIdx++}`)
    params.push(today.toISOString())
    updates.push(`"processingUnitsUsedToday" = 0`)
  } else {
    const lastReset = new Date(user.lastDailyResetDate)
    const lastResetDay = new Date(lastReset.getFullYear(), lastReset.getMonth(), lastReset.getDate())
    if (today.getTime() > lastResetDay.getTime()) {
      updates.push(`"lastDailyResetDate" = $${paramIdx++}`)
      params.push(today.toISOString())
      updates.push(`"processingUnitsUsedToday" = 0`)
    }
  }

  if (updates.length > 0) {
    params.push(userId)
    await query(
      `UPDATE ${getTableName('User')}
       SET ${updates.join(', ')}, "updatedAt" = NOW()
       WHERE id = $${paramIdx}`,
      params
    )
  }
}

// ============================================================================
// ORGANIZATION PROCESSING TRACKING
// ============================================================================

/**
 * Get processing usage for an organization
 */
export async function getOrgProcessingUsage(
  orgId: string,
  plan: Plan | string = 'business_starter',
  seatCount: number = 1
): Promise<ProcessingUsage> {
  await checkAndResetOrgProcessing(orgId)

  const { queryOne } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const org = await queryOne<{
    processingUnitsUsedThisMonth?: number
    processingUnitsUsedToday?: number
    bonusProcessingUnits?: number
    processingMonthResetDate?: string
    lastDailyResetDate?: string
  }>(
    `SELECT "processingUnitsUsedThisMonth", "processingUnitsUsedToday", "bonusProcessingUnits",
            "processingMonthResetDate", "lastDailyResetDate"
     FROM ${getTableName('Organization')} WHERE id = $1`,
    [orgId]
  )

  const limitBase = calculateOrgProcessingUnits(plan, seatCount)
  const bonusUnits = org?.bonusProcessingUnits || 0
  const monthlyLimit = limitBase + bonusUnits
  
  const dailyLimit = calculateOrgDailyLimit(plan, seatCount)
  const monthlyUsed = org?.processingUnitsUsedThisMonth || 0
  const dailyUsed = org?.processingUnitsUsedToday || 0

  return {
    monthlyUsed,
    dailyUsed,
    monthlyLimit,
    dailyLimit,
    monthlyPercentage: monthlyLimit > 0
      ? Math.min((monthlyUsed / monthlyLimit) * 100, 100)
      : 0,
    dailyPercentage: dailyLimit > 0
      ? Math.min((dailyUsed / dailyLimit) * 100, 100)
      : 0,
    lastDailyReset: org?.lastDailyResetDate ? new Date(org.lastDailyResetDate) : null,
    monthResetDate: org?.processingMonthResetDate ? new Date(org.processingMonthResetDate) : null,
  }
}

/**
 * Increment processing usage for an organization
 */
export async function incrementOrgProcessingUsage(orgId: string, pageCount: number): Promise<{
  newMonthlyTotal: number
  newDailyTotal: number
}> {
  await checkAndResetOrgProcessing(orgId)

  const { queryOne, query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const org = await queryOne<{
    processingUnitsUsedThisMonth?: number
    processingUnitsUsedToday?: number
  }>(
    `SELECT "processingUnitsUsedThisMonth", "processingUnitsUsedToday"
     FROM ${getTableName('Organization')} WHERE id = $1`,
    [orgId]
  )

  const newMonthlyTotal = (org?.processingUnitsUsedThisMonth || 0) + pageCount
  const newDailyTotal = (org?.processingUnitsUsedToday || 0) + pageCount

  await query(
    `UPDATE ${getTableName('Organization')}
     SET "processingUnitsUsedThisMonth" = $1,
         "processingUnitsUsedToday" = $2,
         "updatedAt" = NOW()
     WHERE id = $3`,
    [newMonthlyTotal, newDailyTotal, orgId]
  )

  return { newMonthlyTotal, newDailyTotal }
}

/**
 * Check if organization can process pages within their limits
 */
export async function checkOrgProcessingLimit(
  orgId: string,
  pageCount: number,
  plan: Plan | string = 'business_starter',
  seatCount: number = 1
): Promise<ProcessingLimitCheck> {
  const usage = await getOrgProcessingUsage(orgId, plan, seatCount)

  const newMonthlyTotal = usage.monthlyUsed + pageCount
  const newDailyTotal = usage.dailyUsed + pageCount

  const monthlyExceeded = newMonthlyTotal > usage.monthlyLimit
  const dailyExceeded = newDailyTotal > usage.dailyLimit

  let reason: string | undefined
  if (monthlyExceeded) {
    reason = `Organization monthly Processing Unit limit of ${usage.monthlyLimit.toLocaleString()} exceeded. Files will be saved to Quick Store.`
  } else if (dailyExceeded) {
    reason = `Organization daily Processing Unit limit of ${usage.dailyLimit.toLocaleString()} exceeded. Try again tomorrow or add more seats.`
  }

  return {
    allowed: !monthlyExceeded && !dailyExceeded,
    currentMonthlyUsage: usage.monthlyUsed,
    currentDailyUsage: usage.dailyUsed,
    newMonthlyTotal,
    newDailyTotal,
    monthlyLimit: usage.monthlyLimit,
    dailyLimit: usage.dailyLimit,
    shouldQuickStore: monthlyExceeded,
    reason,
  }
}

/**
 * Check and reset org processing counters if needed
 */
async function checkAndResetOrgProcessing(orgId: string): Promise<void> {
  const { queryOne, query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const org = await queryOne<{
    processingMonthResetDate?: string
    lastDailyResetDate?: string
  }>(
    `SELECT "processingMonthResetDate", "lastDailyResetDate"
     FROM ${getTableName('Organization')} WHERE id = $1`,
    [orgId]
  )

  const now = new Date()
  const updates: string[] = []
  const params: any[] = []
  let paramIdx = 1

  // Check monthly reset
  if (!org?.processingMonthResetDate) {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    updates.push(`"processingMonthResetDate" = $${paramIdx++}`)
    params.push(monthStart.toISOString())
    updates.push(`"processingUnitsUsedThisMonth" = 0`)
  } else {
    const resetDate = new Date(org.processingMonthResetDate)
    if (resetDate.getMonth() !== now.getMonth() || resetDate.getFullYear() !== now.getFullYear()) {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      updates.push(`"processingMonthResetDate" = $${paramIdx++}`)
      params.push(monthStart.toISOString())
      updates.push(`"processingUnitsUsedThisMonth" = 0`)
    }
  }

  // Check daily reset
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  if (!org?.lastDailyResetDate) {
    updates.push(`"lastDailyResetDate" = $${paramIdx++}`)
    params.push(today.toISOString())
    updates.push(`"processingUnitsUsedToday" = 0`)
  } else {
    const lastReset = new Date(org.lastDailyResetDate)
    const lastResetDay = new Date(lastReset.getFullYear(), lastReset.getMonth(), lastReset.getDate())
    if (today.getTime() > lastResetDay.getTime()) {
      updates.push(`"lastDailyResetDate" = $${paramIdx++}`)
      params.push(today.toISOString())
      updates.push(`"processingUnitsUsedToday" = 0`)
    }
  }

  if (updates.length > 0) {
    params.push(orgId)
    await query(
      `UPDATE ${getTableName('Organization')}
       SET ${updates.join(', ')}, "updatedAt" = NOW()
       WHERE id = $${paramIdx}`,
      params
    )
  }
}

// ============================================================================
// TOP-UP PROCESSING UNITS
// ============================================================================

/**
 * Add purchased processing units to a user
 */
export async function addPurchasedProcessingUnits(userId: string, units: number): Promise<void> {
  const { query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  await query(
    `UPDATE ${getTableName('User')}
     SET "bonusProcessingUnits" = COALESCE("bonusProcessingUnits", 0) + $1,
         "updatedAt" = NOW()
     WHERE id = $2`,
    [units, userId]
  )
}

/**
 * Add purchased processing units to an organization
 */
export async function addOrgPurchasedProcessingUnits(orgId: string, units: number): Promise<void> {
  const { query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  await query(
    `UPDATE ${getTableName('Organization')}
     SET "bonusProcessingUnits" = COALESCE("bonusProcessingUnits", 0) + $1,
         "updatedAt" = NOW()
     WHERE id = $2`,
    [units, orgId]
  )
}

// ============================================================================
// USAGE ALERTS
// ============================================================================

/**
 * Check if usage alerts should be triggered
 */
export function checkUsageAlerts(usage: ProcessingUsage): {
  monthlyAlert: number | null
  dailyAlert: number | null
  shouldAutoTopUp: boolean
} {
  return {
    monthlyAlert: getUsageAlertLevel(usage.monthlyPercentage),
    dailyAlert: getUsageAlertLevel(usage.dailyPercentage),
    shouldAutoTopUp: shouldTriggerAutoTopUp(usage.monthlyPercentage),
  }
}

// ============================================================================
// LEGACY COMPATIBILITY
// ============================================================================

/**
 * Legacy function for backward compatibility with existing OCR tracking code
 * Maps to new processing unit tracking
 */
export async function getUserOCRUsage(userId: string): Promise<number> {
  const { queryOne } = await import('./db')
  const { getTableName } = await import('./db-utils')

  // First try new field, fall back to old field
  const user = await queryOne<{
    processingUnitsUsedThisMonth?: number
    ocrPagesUsedThisMonth?: number
  }>(
    `SELECT "processingUnitsUsedThisMonth", "ocrPagesUsedThisMonth"
     FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )

  return user?.processingUnitsUsedThisMonth ?? user?.ocrPagesUsedThisMonth ?? 0
}

/**
 * Legacy function for backward compatibility
 */
export async function incrementOCRUsage(userId: string, pageCount: number): Promise<number> {
  const result = await incrementUserProcessingUsage(userId, pageCount)
  return result.newMonthlyTotal
}

/**
 * Legacy function for backward compatibility
 */
export async function checkOCRLimit(
  userId: string,
  pageCount: number,
  limitPages: number
): Promise<{ allowed: boolean; currentUsage: number; newTotal: number }> {
  const usage = await getUserProcessingUsage(userId)
  const newTotal = usage.monthlyUsed + pageCount
  return {
    allowed: newTotal <= limitPages,
    currentUsage: usage.monthlyUsed,
    newTotal,
  }
}
