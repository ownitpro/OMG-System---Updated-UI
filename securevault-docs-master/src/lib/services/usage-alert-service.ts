// Usage Alert Service
// Monitors usage across Processing Units, Storage, Egress
// Sends alerts at 40%, 70%, 90%, 95%, 100% thresholds

import { USAGE_ALERT_THRESHOLDS, type UsageAlertThreshold, shouldTriggerAutoTopUp } from '@/lib/plan-limits'

// ============================================================================
// TYPES
// ============================================================================

export type UsageType = 'processing' | 'storage' | 'egress' | 'share_links'

export interface UsageAlertData {
  userId: string
  orgId?: string
  usageType: UsageType
  currentUsage: number
  limit: number
  percentage: number
  threshold: UsageAlertThreshold
  previousThreshold: UsageAlertThreshold | null
}

export interface UsageAlertResult {
  shouldAlert: boolean
  alertData?: UsageAlertData
  shouldAutoTopUp: boolean
}

// ============================================================================
// ALERT STATE TRACKING
// ============================================================================

// In-memory cache for tracking last alerted threshold per user/org/type
// In production, this should be stored in Redis or the database
const alertedThresholds: Map<string, UsageAlertThreshold> = new Map()

function getAlertKey(userId: string, orgId: string | undefined, usageType: UsageType): string {
  const month = new Date().toISOString().substring(0, 7) // YYYY-MM
  return `${userId}-${orgId || 'personal'}-${usageType}-${month}`
}

function getLastAlertedThreshold(key: string): UsageAlertThreshold | null {
  return alertedThresholds.get(key) || null
}

function setLastAlertedThreshold(key: string, threshold: UsageAlertThreshold): void {
  alertedThresholds.set(key, threshold)
}

// ============================================================================
// ALERT CHECK FUNCTIONS
// ============================================================================

/**
 * Check if a usage alert should be sent
 * Only alerts once per threshold level per billing period
 */
export function checkUsageAlert(
  userId: string,
  orgId: string | undefined,
  usageType: UsageType,
  currentUsage: number,
  limit: number
): UsageAlertResult {
  if (limit <= 0) {
    return { shouldAlert: false, shouldAutoTopUp: false }
  }

  const percentage = (currentUsage / limit) * 100
  const key = getAlertKey(userId, orgId, usageType)
  const lastThreshold = getLastAlertedThreshold(key)

  // Find the highest threshold that's been crossed
  let currentThreshold: UsageAlertThreshold | null = null
  for (let i = USAGE_ALERT_THRESHOLDS.length - 1; i >= 0; i--) {
    if (percentage >= USAGE_ALERT_THRESHOLDS[i]!) {
      currentThreshold = USAGE_ALERT_THRESHOLDS[i]!
      break
    }
  }

  // No threshold crossed
  if (!currentThreshold) {
    return { shouldAlert: false, shouldAutoTopUp: false }
  }

  // Already alerted at this threshold
  if (lastThreshold && currentThreshold <= lastThreshold) {
    return {
      shouldAlert: false,
      shouldAutoTopUp: shouldTriggerAutoTopUp(percentage),
    }
  }

  // New threshold crossed - send alert
  setLastAlertedThreshold(key, currentThreshold)

  return {
    shouldAlert: true,
    alertData: {
      userId,
      orgId,
      usageType,
      currentUsage,
      limit,
      percentage,
      threshold: currentThreshold,
      previousThreshold: lastThreshold,
    },
    shouldAutoTopUp: shouldTriggerAutoTopUp(percentage),
  }
}

/**
 * Get user-friendly message for usage alert
 */
export function getAlertMessage(alertData: UsageAlertData): {
  title: string
  message: string
  severity: 'info' | 'warning' | 'critical'
} {
  const { usageType, percentage, threshold } = alertData
  const usageLabel = getUsageLabel(usageType)

  let severity: 'info' | 'warning' | 'critical'
  if (threshold >= 95) {
    severity = 'critical'
  } else if (threshold >= 70) {
    severity = 'warning'
  } else {
    severity = 'info'
  }

  const titles: Record<UsageAlertThreshold, string> = {
    40: `${usageLabel} Usage at 40%`,
    70: `${usageLabel} Usage at 70%`,
    90: `${usageLabel} Usage at 90%`,
    95: `${usageLabel} Almost Exhausted`,
    100: `${usageLabel} Limit Reached`,
  }

  const messages: Record<UsageAlertThreshold, string> = {
    40: `You've used 40% of your monthly ${usageLabel.toLowerCase()} allowance.`,
    70: `You've used 70% of your monthly ${usageLabel.toLowerCase()} allowance. Consider monitoring your usage.`,
    90: `You've used 90% of your monthly ${usageLabel.toLowerCase()} allowance. You may want to upgrade or reduce usage.`,
    95: `You've used 95% of your monthly ${usageLabel.toLowerCase()} allowance. Consider enabling Auto Top-Up or upgrading your plan.`,
    100: `You've reached your monthly ${usageLabel.toLowerCase()} limit. Upgrade your plan or wait for your billing cycle to reset.`,
  }

  return {
    title: titles[threshold],
    message: messages[threshold],
    severity,
  }
}

function getUsageLabel(usageType: UsageType): string {
  switch (usageType) {
    case 'processing':
      return 'Processing Units'
    case 'storage':
      return 'Storage'
    case 'egress':
      return 'Download'
    case 'share_links':
      return 'Share Link'
    default:
      return 'Usage'
  }
}

// ============================================================================
// DATABASE ALERT LOGGING
// ============================================================================

/**
 * Log an alert to the database for audit purposes
 */
export async function logUsageAlert(alertData: UsageAlertData): Promise<void> {
  try {
    const { query } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    // Check if UsageAlert table exists (it might not on first deployment)
    const tableExists = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'securevault' AND table_name = 'UsageAlert'
      )
    `)

    if (!tableExists?.[0]?.exists) {
      console.log('[UsageAlert] UsageAlert table does not exist, skipping log')
      return
    }

    await query(
      `INSERT INTO ${getTableName('UsageAlert')}
       ("id", "userId", "orgId", "usageType", "threshold", "percentage", "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW())`,
      [
        alertData.userId,
        alertData.orgId || null,
        alertData.usageType,
        alertData.threshold,
        alertData.percentage,
      ]
    )
  } catch (error) {
    // Log but don't throw - alerts are not critical
    console.error('[UsageAlert] Failed to log alert:', error)
  }
}

// ============================================================================
// EMAIL NOTIFICATIONS
// ============================================================================

/**
 * Send email notification for usage alert
 */
export async function sendUsageAlertEmail(
  userId: string,
  alertData: UsageAlertData
): Promise<void> {
  try {
    // Only send emails for 70%+ thresholds
    if (alertData.threshold < 70) {
      return
    }

    const { queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    // Get user email
    const user = await queryOne<{ email: string; name?: string }>(
      `SELECT email, name FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    if (!user?.email) {
      return
    }

    const { title, message } = getAlertMessage(alertData)

    // TODO: Integrate with actual email service (SES, SendGrid, etc.)
    console.log('[UsageAlert] Would send email:', {
      to: user.email,
      subject: title,
      body: message,
    })
  } catch (error) {
    console.error('[UsageAlert] Failed to send email:', error)
  }
}

// ============================================================================
// BATCH ALERT CHECKING
// ============================================================================

/**
 * Check all usage types for a user and return any alerts
 */
export async function checkAllUsageAlerts(
  userId: string,
  orgId: string | undefined,
  usage: {
    processing?: { current: number; limit: number }
    storage?: { current: number; limit: number }
    egress?: { current: number; limit: number }
    shareLinks?: { current: number; limit: number }
  }
): Promise<UsageAlertResult[]> {
  const results: UsageAlertResult[] = []

  if (usage.processing) {
    results.push(
      checkUsageAlert(userId, orgId, 'processing', usage.processing.current, usage.processing.limit)
    )
  }

  if (usage.storage) {
    results.push(
      checkUsageAlert(userId, orgId, 'storage', usage.storage.current, usage.storage.limit)
    )
  }

  if (usage.egress) {
    results.push(
      checkUsageAlert(userId, orgId, 'egress', usage.egress.current, usage.egress.limit)
    )
  }

  if (usage.shareLinks) {
    results.push(
      checkUsageAlert(userId, orgId, 'share_links', usage.shareLinks.current, usage.shareLinks.limit)
    )
  }

  return results.filter(r => r.shouldAlert)
}

// ============================================================================
// IN-APP NOTIFICATION CREATION
// ============================================================================

/**
 * Create an in-app notification for the user
 */
export async function createUsageNotification(alertData: UsageAlertData): Promise<void> {
  try {
    const { query } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const { title, message, severity } = getAlertMessage(alertData)

    // Check if Notification table exists
    const tableExists = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'securevault' AND table_name = 'Notification'
      )
    `)

    if (!tableExists?.[0]?.exists) {
      console.log('[UsageAlert] Notification table does not exist, skipping')
      return
    }

    await query(
      `INSERT INTO ${getTableName('Notification')}
       ("id", "userId", "type", "title", "message", "severity", "read", "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, false, NOW())`,
      [alertData.userId, 'usage_alert', title, message, severity]
    )
  } catch (error) {
    console.error('[UsageAlert] Failed to create notification:', error)
  }
}

// ============================================================================
// RESET ALERT STATE
// ============================================================================

/**
 * Reset alert state for a user (called at start of new billing period)
 */
export function resetAlertState(userId: string, orgId?: string): void {
  const types: UsageType[] = ['processing', 'storage', 'egress', 'share_links']
  const month = new Date().toISOString().substring(0, 7)

  types.forEach(type => {
    const key = `${userId}-${orgId || 'personal'}-${type}-${month}`
    alertedThresholds.delete(key)
  })
}

/**
 * Clean up old alert state entries (call periodically)
 */
export function cleanupOldAlertState(): void {
  const currentMonth = new Date().toISOString().substring(0, 7)

  for (const key of alertedThresholds.keys()) {
    const keyMonth = key.split('-').pop()
    if (keyMonth && keyMonth !== currentMonth) {
      alertedThresholds.delete(key)
    }
  }
}
