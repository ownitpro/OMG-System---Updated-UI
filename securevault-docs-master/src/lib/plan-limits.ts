// Plan limits and tier enforcement utilities
// Updated December 2025 - Processing Units, Egress, Per-Seat Billing

// ============================================================================
// PLAN TYPES
// ============================================================================

export type PersonalPlan = 'trial' | 'starter' | 'growth' | 'pro'
export type BusinessPlan = 'business_starter' | 'business_growth' | 'business_pro' | 'enterprise'
export type Plan = PersonalPlan | BusinessPlan

// Legacy alias for backward compatibility
export type LegacyPlan = 'free' | 'starter' | 'growth' | 'pro'

// ============================================================================
// PLAN LIMITS INTERFACE
// ============================================================================

export interface PlanLimits {
  // Plan metadata
  isBusinessPlan: boolean
  perSeat: boolean

  // Seat limits (for business plans)
  seatMin: number
  seatMax: number | 'unlimited'

  // Storage
  storageGb: number

  // Processing Units (replaces OCR pages)
  // 1 PU = 1 page processed through OCR + AI classification + auto-filing
  processingUnitsPerMonth: number
  dailyProcessingLimit: number // 40% of monthly cap

  // Egress (download bandwidth)
  egressGbPerMonth: number

  // PDF limits
  pdfPageLimit: number // Max pages per PDF file for processing

  // Sharing - now tracks ACTIVE (non-expired) links only
  activeShareLinks: number
  requestFileLinks: boolean

  // Team features
  seats: number // For personal plans, this is max users (family sharing for Pro)
  businessVaults: number

  // Features
  hasEmailToVault: boolean
  hasEmailRules: boolean
  hasAdvancedSearch: boolean
  hasPIIRedaction: boolean
  hasAuditLog: boolean
  hasScheduledExports: boolean
  hasSavedSearches: boolean
  hasLabelRules: boolean
  hasDriveImport: boolean
  hasRecipientBoundLinks: boolean
  hasFamilySharing: boolean // Personal Pro feature
  hasClientPortals: boolean // Business feature
  hasCustomBranding: boolean // Business feature

  // Export options
  exportFormats: string[]

  // Support
  supportLevel: 'email' | 'priority' | 'dedicated'

  // Legacy field for backward compatibility
  ocrPagesPerMonth: number
  secureShareLinks: number | 'unlimited'
}

// ============================================================================
// PERSONAL PLAN LIMITS
// ============================================================================

const PERSONAL_PLAN_LIMITS: Record<PersonalPlan, PlanLimits> = {
  // 14-Day Trial - ~10% of Starter tier
  trial: {
    isBusinessPlan: false,
    perSeat: false,
    seatMin: 1,
    seatMax: 1,

    storageGb: 4, // 10% of 40 GB
    processingUnitsPerMonth: 15, // ~10% of 150
    dailyProcessingLimit: 6, // 40% of 15
    egressGbPerMonth: 1, // Limited
    pdfPageLimit: 10, // Very limited during trial

    activeShareLinks: 2, // Limited
    requestFileLinks: false,
    seats: 1,
    businessVaults: 0,

    hasEmailToVault: true,
    hasEmailRules: false,
    hasAdvancedSearch: false,
    hasPIIRedaction: false,
    hasAuditLog: false,
    hasScheduledExports: false,
    hasSavedSearches: false,
    hasLabelRules: false,
    hasDriveImport: false,
    hasRecipientBoundLinks: false,
    hasFamilySharing: false,
    hasClientPortals: false,
    hasCustomBranding: false,

    exportFormats: ['zip'],
    supportLevel: 'email',

    // Legacy compatibility
    ocrPagesPerMonth: 15,
    secureShareLinks: 2,
  },

  // Personal Starter - $9.99/mo
  starter: {
    isBusinessPlan: false,
    perSeat: false,
    seatMin: 1,
    seatMax: 1,

    storageGb: 40,
    processingUnitsPerMonth: 150,
    dailyProcessingLimit: 60, // 40% of 150
    egressGbPerMonth: 8,
    pdfPageLimit: 25,

    activeShareLinks: 5,
    requestFileLinks: false,
    seats: 1,
    businessVaults: 0,

    hasEmailToVault: true,
    hasEmailRules: false,
    hasAdvancedSearch: false,
    hasPIIRedaction: false,
    hasAuditLog: false,
    hasScheduledExports: false,
    hasSavedSearches: false,
    hasLabelRules: false,
    hasDriveImport: false,
    hasRecipientBoundLinks: false,
    hasFamilySharing: false,
    hasClientPortals: false,
    hasCustomBranding: false,

    exportFormats: ['zip'],
    supportLevel: 'email',

    // Legacy compatibility
    ocrPagesPerMonth: 150,
    secureShareLinks: 5,
  },

  // Personal Growth - $14.99/mo
  growth: {
    isBusinessPlan: false,
    perSeat: false,
    seatMin: 1,
    seatMax: 1,

    storageGb: 90,
    processingUnitsPerMonth: 450,
    dailyProcessingLimit: 180, // 40% of 450
    egressGbPerMonth: 15,
    pdfPageLimit: 50,

    activeShareLinks: 25,
    requestFileLinks: true,
    seats: 1,
    businessVaults: 0,

    hasEmailToVault: true,
    hasEmailRules: false,
    hasAdvancedSearch: false,
    hasPIIRedaction: false,
    hasAuditLog: false,
    hasScheduledExports: false,
    hasSavedSearches: true,
    hasLabelRules: true,
    hasDriveImport: true,
    hasRecipientBoundLinks: false,
    hasFamilySharing: false,
    hasClientPortals: false,
    hasCustomBranding: false,

    exportFormats: ['zip', 'csv', 'pdf'],
    supportLevel: 'priority',

    // Legacy compatibility
    ocrPagesPerMonth: 450,
    secureShareLinks: 25,
  },

  // Personal Pro - $24.99/mo - Family Sharing (1 owner + 2 invites)
  pro: {
    isBusinessPlan: false,
    perSeat: false,
    seatMin: 1,
    seatMax: 3,

    storageGb: 180,
    processingUnitsPerMonth: 1350,
    dailyProcessingLimit: 540, // 40% of 1350
    egressGbPerMonth: 30,
    pdfPageLimit: 100,

    activeShareLinks: 75,
    requestFileLinks: true,
    seats: 3, // Family sharing: 1 owner + 2 invites
    businessVaults: 0,

    hasEmailToVault: true,
    hasEmailRules: true,
    hasAdvancedSearch: true,
    hasPIIRedaction: true,
    hasAuditLog: true,
    hasScheduledExports: true,
    hasSavedSearches: true,
    hasLabelRules: true,
    hasDriveImport: true,
    hasRecipientBoundLinks: true,
    hasFamilySharing: true, // Key Pro feature
    hasClientPortals: false,
    hasCustomBranding: false,

    exportFormats: ['zip', 'csv', 'pdf'],
    supportLevel: 'priority',

    // Legacy compatibility
    ocrPagesPerMonth: 1350,
    secureShareLinks: 75,
  },
}

// ============================================================================
// BUSINESS PLAN LIMITS
// ============================================================================

export const BUSINESS_PLAN_LIMITS: Record<BusinessPlan, PlanLimits> = {
  // Business Starter - $59.99/seat/mo, 1-3 seats
  business_starter: {
    isBusinessPlan: true,
    perSeat: true,
    seatMin: 1,
    seatMax: 3,

    storageGb: 300, // Shared org storage
    processingUnitsPerMonth: 6750, // Per seat - multiply by seat count
    dailyProcessingLimit: 2700, // 40% of 6750
    egressGbPerMonth: 50, // Shared org egress
    pdfPageLimit: 25,

    activeShareLinks: 25,
    requestFileLinks: true,
    seats: 3, // Max seats for this tier
    businessVaults: 3,

    hasEmailToVault: true,
    hasEmailRules: true,
    hasAdvancedSearch: true,
    hasPIIRedaction: false,
    hasAuditLog: true,
    hasScheduledExports: true,
    hasSavedSearches: true,
    hasLabelRules: true,
    hasDriveImport: true,
    hasRecipientBoundLinks: true,
    hasFamilySharing: false,
    hasClientPortals: true,
    hasCustomBranding: false,

    exportFormats: ['zip', 'csv', 'pdf'],
    supportLevel: 'priority',

    // Legacy compatibility
    ocrPagesPerMonth: 6750,
    secureShareLinks: 25,
  },

  // Business Growth - $109.99/seat/mo, 3-10 seats
  business_growth: {
    isBusinessPlan: true,
    perSeat: true,
    seatMin: 3,
    seatMax: 10,

    storageGb: 500, // Shared org storage
    processingUnitsPerMonth: 19500, // Per seat
    dailyProcessingLimit: 7800, // 40% of 19500
    egressGbPerMonth: 90, // Shared org egress
    pdfPageLimit: 50,

    activeShareLinks: 100,
    requestFileLinks: true,
    seats: 10, // Max seats for this tier
    businessVaults: 10,

    hasEmailToVault: true,
    hasEmailRules: true,
    hasAdvancedSearch: true,
    hasPIIRedaction: true,
    hasAuditLog: true,
    hasScheduledExports: true,
    hasSavedSearches: true,
    hasLabelRules: true,
    hasDriveImport: true,
    hasRecipientBoundLinks: true,
    hasFamilySharing: false,
    hasClientPortals: true,
    hasCustomBranding: true,

    exportFormats: ['zip', 'csv', 'pdf'],
    supportLevel: 'priority',

    // Legacy compatibility
    ocrPagesPerMonth: 19500,
    secureShareLinks: 100,
  },

  // Business Pro - $219.99/seat/mo, 10-20 seats
  business_pro: {
    isBusinessPlan: true,
    perSeat: true,
    seatMin: 10,
    seatMax: 20,

    storageGb: 1000, // 1 TB shared org storage
    processingUnitsPerMonth: 36000, // Per seat
    dailyProcessingLimit: 14400, // 40% of 36000
    egressGbPerMonth: 110, // Shared org egress
    pdfPageLimit: 100,

    activeShareLinks: 250,
    requestFileLinks: true,
    seats: 20, // Max seats for this tier
    businessVaults: 50,

    hasEmailToVault: true,
    hasEmailRules: true,
    hasAdvancedSearch: true,
    hasPIIRedaction: true,
    hasAuditLog: true,
    hasScheduledExports: true,
    hasSavedSearches: true,
    hasLabelRules: true,
    hasDriveImport: true,
    hasRecipientBoundLinks: true,
    hasFamilySharing: false,
    hasClientPortals: true,
    hasCustomBranding: true,

    exportFormats: ['zip', 'csv', 'pdf'],
    supportLevel: 'dedicated',

    // Legacy compatibility
    ocrPagesPerMonth: 36000,
    secureShareLinks: 250,
  },

  // Enterprise - Custom pricing, 20+ seats
  enterprise: {
    isBusinessPlan: true,
    perSeat: true,
    seatMin: 20,
    seatMax: 'unlimited',

    storageGb: 10000, // 10 TB, customizable
    processingUnitsPerMonth: 100000, // Customizable
    dailyProcessingLimit: 40000, // Customizable
    egressGbPerMonth: 500, // Customizable
    pdfPageLimit: 500, // Customizable

    activeShareLinks: 1000, // Customizable
    requestFileLinks: true,
    seats: 1000, // Customizable
    businessVaults: 500,

    hasEmailToVault: true,
    hasEmailRules: true,
    hasAdvancedSearch: true,
    hasPIIRedaction: true,
    hasAuditLog: true,
    hasScheduledExports: true,
    hasSavedSearches: true,
    hasLabelRules: true,
    hasDriveImport: true,
    hasRecipientBoundLinks: true,
    hasFamilySharing: false,
    hasClientPortals: true,
    hasCustomBranding: true,

    exportFormats: ['zip', 'csv', 'pdf'],
    supportLevel: 'dedicated',

    // Legacy compatibility
    ocrPagesPerMonth: 100000,
    secureShareLinks: 1000,
  },
}

// ============================================================================
// COMBINED PLAN LIMITS
// ============================================================================

const ALL_PLAN_LIMITS: Record<Plan, PlanLimits> = {
  ...PERSONAL_PLAN_LIMITS,
  ...BUSINESS_PLAN_LIMITS,
}

// Legacy plan mapping for backward compatibility
const LEGACY_PLAN_MAP: Record<LegacyPlan, Plan> = {
  free: 'trial',
  starter: 'starter',
  growth: 'growth',
  pro: 'pro',
}

// ============================================================================
// PLAN UTILITIES
// ============================================================================

/**
 * Normalize legacy plan names to new plan names
 */
export function normalizePlan(plan: string): Plan {
  if (plan in ALL_PLAN_LIMITS) {
    return plan as Plan
  }
  if (plan in LEGACY_PLAN_MAP) {
    return LEGACY_PLAN_MAP[plan as LegacyPlan]
  }
  return 'trial'
}

/**
 * Get the limits for a specific plan
 */
export function getPlanLimits(plan: Plan | LegacyPlan | string = 'trial'): PlanLimits {
  const normalizedPlan = normalizePlan(plan)
  return ALL_PLAN_LIMITS[normalizedPlan] || ALL_PLAN_LIMITS.trial
}

/**
 * Get personal plan limits only
 */
export function getPersonalPlanLimits(plan: PersonalPlan): PlanLimits {
  return PERSONAL_PLAN_LIMITS[plan] || PERSONAL_PLAN_LIMITS.trial
}

/**
 * Get business plan limits only
 */
export function getBusinessPlanLimits(plan: BusinessPlan): PlanLimits {
  return BUSINESS_PLAN_LIMITS[plan] || BUSINESS_PLAN_LIMITS.business_starter
}

/**
 * Check if a plan is a business plan
 */
export function isBusinessPlan(plan: Plan | string): boolean {
  const normalizedPlan = normalizePlan(plan)
  return ALL_PLAN_LIMITS[normalizedPlan]?.isBusinessPlan || false
}

/**
 * Check if a plan has per-seat billing
 */
export function isPerSeatPlan(plan: Plan | string): boolean {
  const normalizedPlan = normalizePlan(plan)
  return ALL_PLAN_LIMITS[normalizedPlan]?.perSeat || false
}

/**
 * Check if a plan has access to a specific feature
 */
export function hasFeature(plan: Plan | string, feature: keyof PlanLimits): boolean {
  const limits = getPlanLimits(plan)
  const value = limits[feature]

  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return value > 0
  }

  if (value === 'unlimited') {
    return true
  }

  if (Array.isArray(value)) {
    return value.length > 0
  }

  return false
}

// ============================================================================
// PROCESSING UNIT UTILITIES
// ============================================================================

/**
 * Calculate total processing units for an organization based on seat count
 */
export function calculateOrgProcessingUnits(plan: Plan | string, seatCount: number): number {
  const limits = getPlanLimits(plan)
  if (limits.isBusinessPlan && limits.perSeat) {
    return limits.processingUnitsPerMonth * seatCount
  }
  return limits.processingUnitsPerMonth
}

/**
 * Calculate daily processing limit for an organization based on seat count
 */
export function calculateOrgDailyLimit(plan: Plan | string, seatCount: number): number {
  const limits = getPlanLimits(plan)
  if (limits.isBusinessPlan && limits.perSeat) {
    return limits.dailyProcessingLimit * seatCount
  }
  return limits.dailyProcessingLimit
}

/**
 * Check if processing is within monthly limit
 */
export function isWithinMonthlyProcessingLimit(
  plan: Plan | string,
  currentUsage: number,
  seatCount: number = 1
): boolean {
  const totalLimit = calculateOrgProcessingUnits(plan, seatCount)
  return currentUsage < totalLimit
}

/**
 * Check if processing is within daily limit
 */
export function isWithinDailyProcessingLimit(
  plan: Plan | string,
  currentDailyUsage: number,
  seatCount: number = 1
): boolean {
  const dailyLimit = calculateOrgDailyLimit(plan, seatCount)
  return currentDailyUsage < dailyLimit
}

// ============================================================================
// USAGE LIMIT UTILITIES
// ============================================================================

/**
 * Check if usage is within plan limits
 */
export function isWithinLimit(
  plan: Plan | string,
  limitType: 'storageGb' | 'processingUnitsPerMonth' | 'activeShareLinks' | 'egressGbPerMonth' | 'seats' | 'businessVaults',
  currentUsage: number,
  seatCount: number = 1
): boolean {
  const limits = getPlanLimits(plan)

  // For processing units, multiply by seat count for business plans
  if (limitType === 'processingUnitsPerMonth' && limits.isBusinessPlan && limits.perSeat) {
    return currentUsage <= limits.processingUnitsPerMonth * seatCount
  }

  const limit = limits[limitType]

  if (limit === 'unlimited') {
    return true
  }

  if (typeof limit === 'number') {
    return currentUsage <= limit
  }

  return false
}

/**
 * Get the usage percentage for a specific limit
 */
export function getUsagePercentage(
  plan: Plan | string,
  limitType: 'storageGb' | 'processingUnitsPerMonth' | 'activeShareLinks' | 'egressGbPerMonth' | 'seats' | 'businessVaults',
  currentUsage: number,
  seatCount: number = 1
): number {
  const limits = getPlanLimits(plan)
  let limit = limits[limitType]

  // For processing units, multiply by seat count for business plans
  if (limitType === 'processingUnitsPerMonth' && limits.isBusinessPlan && limits.perSeat) {
    limit = (limit as number) * seatCount
  }

  if (limit === 'unlimited') {
    return 0
  }

  if (typeof limit === 'number' && limit > 0) {
    return Math.min((currentUsage / limit) * 100, 100)
  }

  return 0
}

// ============================================================================
// USAGE ALERT THRESHOLDS
// ============================================================================

export const USAGE_ALERT_THRESHOLDS = [40, 70, 90, 95, 100] as const
export type UsageAlertThreshold = typeof USAGE_ALERT_THRESHOLDS[number]

/**
 * Get the appropriate alert level based on usage percentage
 */
export function getUsageAlertLevel(usagePercentage: number): UsageAlertThreshold | null {
  // Return the highest threshold that's been crossed
  for (let i = USAGE_ALERT_THRESHOLDS.length - 1; i >= 0; i--) {
    if (usagePercentage >= USAGE_ALERT_THRESHOLDS[i]) {
      return USAGE_ALERT_THRESHOLDS[i]
    }
  }
  return null
}

/**
 * Check if auto top-up should be triggered (95% threshold)
 */
export function shouldTriggerAutoTopUp(usagePercentage: number): boolean {
  return usagePercentage >= 95
}

// ============================================================================
// ACTION VALIDATION
// ============================================================================

export type ActionType =
  | 'create_share_link'
  | 'upload_file'
  | 'process_page' // Renamed from ocr_page
  | 'add_seat'
  | 'create_vault'
  | 'download_file' // New for egress tracking

interface ActionResult {
  allowed: boolean
  reason?: string
  shouldQuickStore?: boolean // For files that exceed limits
}

/**
 * Check if a plan can perform an action based on current usage
 */
export function canPerformAction(
  plan: Plan | string,
  action: {
    type: ActionType
    currentCount: number
    seatCount?: number
    additionalBytes?: number // For egress tracking
  }
): ActionResult {
  const limits = getPlanLimits(plan)
  const seatCount = action.seatCount || 1

  switch (action.type) {
    case 'create_share_link': {
      const limit = limits.activeShareLinks
      if (action.currentCount >= limit) {
        return {
          allowed: false,
          reason: `You've reached your plan limit of ${limit} active share links. Remove expired links or upgrade to create more.`,
        }
      }
      return { allowed: true }
    }

    case 'upload_file': {
      // Storage limit check would need storage usage tracking
      return { allowed: true }
    }

    case 'process_page': {
      const monthlyLimit = calculateOrgProcessingUnits(plan, seatCount)
      if (action.currentCount >= monthlyLimit) {
        return {
          allowed: false,
          reason: `You've reached your monthly Processing Unit limit of ${monthlyLimit.toLocaleString()}. Files will be saved to Quick Store.`,
          shouldQuickStore: true,
        }
      }
      return { allowed: true }
    }

    case 'add_seat': {
      const maxSeats = limits.seatMax === 'unlimited' ? Infinity : limits.seatMax
      if (action.currentCount >= maxSeats) {
        return {
          allowed: false,
          reason: `You've reached your plan limit of ${maxSeats} seat(s). Upgrade to add more team members.`,
        }
      }
      return { allowed: true }
    }

    case 'create_vault': {
      if (action.currentCount >= limits.businessVaults) {
        return {
          allowed: false,
          reason: `You've reached your plan limit of ${limits.businessVaults} business vault(s). Upgrade to create more.`,
        }
      }
      return { allowed: true }
    }

    case 'download_file': {
      // Egress limit check - we throttle rather than block
      const egressLimitBytes = limits.egressGbPerMonth * 1024 * 1024 * 1024
      if (action.currentCount >= egressLimitBytes) {
        return {
          allowed: true, // Allow but throttle
          reason: `You've reached your monthly download limit of ${limits.egressGbPerMonth} GB. Downloads will be throttled.`,
        }
      }
      return { allowed: true }
    }

    default:
      return { allowed: true }
  }
}

/**
 * Check if a PDF can be processed based on page count and plan limit
 */
export function canProcessPdf(plan: Plan | string, pageCount: number): ActionResult {
  const limits = getPlanLimits(plan)

  if (pageCount > limits.pdfPageLimit) {
    return {
      allowed: false,
      reason: `This PDF has ${pageCount} pages, exceeding your plan limit of ${limits.pdfPageLimit} pages per file. It will be saved to Quick Store.`,
      shouldQuickStore: true,
    }
  }

  return { allowed: true }
}

// ============================================================================
// UPGRADE SUGGESTIONS
// ============================================================================

const PERSONAL_PLAN_ORDER: PersonalPlan[] = ['trial', 'starter', 'growth', 'pro']
const BUSINESS_PLAN_ORDER: BusinessPlan[] = ['business_starter', 'business_growth', 'business_pro', 'enterprise']

/**
 * Get upgrade suggestions based on current usage and needs
 */
export function getUpgradeSuggestion(
  currentPlan: Plan | string,
  reason: 'storage' | 'processing' | 'egress' | 'share_links' | 'seats' | 'vaults' | 'features' | 'pdf_limit'
): { suggestedPlan: Plan; benefits: string[] } | null {
  const normalizedPlan = normalizePlan(currentPlan)
  const currentLimits = getPlanLimits(normalizedPlan)

  // Determine plan order based on current plan type
  const isCurrentBusiness = currentLimits.isBusinessPlan
  const planOrder = isCurrentBusiness ? BUSINESS_PLAN_ORDER : PERSONAL_PLAN_ORDER
  const currentIndex = planOrder.indexOf(normalizedPlan as any)

  if (currentIndex === -1 || currentIndex === planOrder.length - 1) {
    // If on personal pro, suggest business starter
    if (normalizedPlan === 'pro' && (reason === 'seats' || reason === 'vaults' || reason === 'features')) {
      return {
        suggestedPlan: 'business_starter',
        benefits: [
          'Business vaults with client portals',
          `${BUSINESS_PLAN_LIMITS.business_starter.processingUnitsPerMonth.toLocaleString()} Processing Units/seat/month`,
          `${BUSINESS_PLAN_LIMITS.business_starter.storageGb} GB shared storage`,
        ],
      }
    }
    return null // Already on highest plan in tier
  }

  const nextPlan = planOrder[currentIndex + 1] as Plan
  const nextLimits = getPlanLimits(nextPlan)
  const benefits: string[] = []

  switch (reason) {
    case 'storage':
      benefits.push(`${nextLimits.storageGb} GB storage (from ${currentLimits.storageGb} GB)`)
      break
    case 'processing':
      benefits.push(`${nextLimits.processingUnitsPerMonth.toLocaleString()} Processing Units/month (from ${currentLimits.processingUnitsPerMonth.toLocaleString()})`)
      break
    case 'egress':
      benefits.push(`${nextLimits.egressGbPerMonth} GB downloads/month (from ${currentLimits.egressGbPerMonth} GB)`)
      break
    case 'share_links':
      benefits.push(`${nextLimits.activeShareLinks} active share links (from ${currentLimits.activeShareLinks})`)
      break
    case 'seats':
      benefits.push(`Up to ${nextLimits.seats} team members`)
      break
    case 'vaults':
      benefits.push(`Up to ${nextLimits.businessVaults} business vaults`)
      break
    case 'pdf_limit':
      benefits.push(`Process PDFs up to ${nextLimits.pdfPageLimit} pages (from ${currentLimits.pdfPageLimit})`)
      break
  }

  return {
    suggestedPlan: nextPlan,
    benefits,
  }
}

// ============================================================================
// SEAT VALIDATION
// ============================================================================

/**
 * Check if a seat count is valid for a business plan
 */
export function isValidSeatCount(plan: BusinessPlan, seatCount: number): boolean {
  const limits = getBusinessPlanLimits(plan)
  const maxSeats = limits.seatMax === 'unlimited' ? Infinity : limits.seatMax
  return seatCount >= limits.seatMin && seatCount <= maxSeats
}

/**
 * Get the appropriate business plan for a seat count
 */
export function getBusinessPlanForSeatCount(seatCount: number): BusinessPlan {
  if (seatCount >= 20) return 'enterprise'
  if (seatCount >= 10) return 'business_pro'
  if (seatCount >= 3) return 'business_growth'
  return 'business_starter'
}

// ============================================================================
// TRIAL UTILITIES
// ============================================================================

export const TRIAL_DURATION_DAYS = 14

/**
 * Check if a user's trial has expired
 */
export function isTrialExpired(trialExpiresAt: string | null | undefined): boolean {
  if (!trialExpiresAt) {
    return false
  }

  const expiryDate = new Date(trialExpiresAt)
  const now = new Date()

  return now > expiryDate
}

/**
 * Get the number of days remaining in the trial
 */
export function getTrialDaysRemaining(trialExpiresAt: string | null | undefined): number {
  if (!trialExpiresAt) {
    return 0
  }

  const expiryDate = new Date(trialExpiresAt)
  const now = new Date()

  if (now > expiryDate) {
    return 0
  }

  const diffTime = expiryDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

/**
 * Check if user should be shown upgrade prompts
 */
export function shouldShowUpgradePrompt(
  plan: Plan | string,
  trialExpiresAt: string | null | undefined
): boolean {
  const normalizedPlan = normalizePlan(plan)

  if (normalizedPlan === 'trial') {
    const daysRemaining = getTrialDaysRemaining(trialExpiresAt)
    // Show upgrade prompt when 3 days or less remaining, or trial expired
    return daysRemaining <= 3
  }

  return false
}

// ============================================================================
// ANNUAL PRICING
// ============================================================================

export const ANNUAL_DISCOUNT_PERCENT = 10

/**
 * Calculate annual price with discount
 */
export function calculateAnnualPrice(monthlyPrice: number): number {
  const annualWithoutDiscount = monthlyPrice * 12
  const discount = annualWithoutDiscount * (ANNUAL_DISCOUNT_PERCENT / 100)
  return annualWithoutDiscount - discount
}

/**
 * Calculate monthly equivalent of annual price
 */
export function calculateMonthlyFromAnnual(annualPrice: number): number {
  return annualPrice / 12
}

// ============================================================================
// EXPORTS FOR BACKWARD COMPATIBILITY
// ============================================================================

// Alias for legacy code using 'ocrPagesPerMonth'
export function getOcrLimit(plan: Plan | string): number {
  return getPlanLimits(plan).ocrPagesPerMonth
}

// Alias for legacy code using 'secureShareLinks'
export function getShareLinkLimit(plan: Plan | string): number | 'unlimited' {
  return getPlanLimits(plan).secureShareLinks
}

// ============================================================================
// NOTE: getUserPlan and getOrgPlan are in plan-utils-server.ts
// These require database access and should only be used in server components
// ============================================================================
