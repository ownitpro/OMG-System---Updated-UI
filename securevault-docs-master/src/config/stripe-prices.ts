// Stripe Price IDs Configuration
// Updated December 2025 - Personal and Business Plans with Per-Seat Billing
// These will be replaced with actual Stripe price IDs after creating products in Stripe Dashboard

// ============================================================================
// PERSONAL PLAN PRICES
// ============================================================================

export const STRIPE_PRICES_PERSONAL = {
  starter: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_STARTER_MONTHLY || 'price_personal_starter_monthly',
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_STARTER_YEARLY || 'price_personal_starter_yearly',
  },
  growth: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_GROWTH_MONTHLY || 'price_personal_growth_monthly',
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_GROWTH_YEARLY || 'price_personal_growth_yearly',
  },
  pro: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_PRO_MONTHLY || 'price_personal_pro_monthly',
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PERSONAL_PRO_YEARLY || 'price_personal_pro_yearly',
  },
} as const

// ============================================================================
// BUSINESS PLAN PRICES (Per-Seat Billing)
// ============================================================================

export const STRIPE_PRICES_BUSINESS = {
  starter: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_STARTER_MONTHLY || 'price_business_starter_monthly',
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_STARTER_YEARLY || 'price_business_starter_yearly',
    // Per-seat pricing: $59.99/seat/month
    perSeat: true,
    seatMin: 1,
    seatMax: 3,
  },
  growth: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_GROWTH_MONTHLY || 'price_business_growth_monthly',
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_GROWTH_YEARLY || 'price_business_growth_yearly',
    // Per-seat pricing: $109.99/seat/month
    perSeat: true,
    seatMin: 3,
    seatMax: 10,
  },
  pro: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_PRO_MONTHLY || 'price_business_pro_monthly',
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_PRO_YEARLY || 'price_business_pro_yearly',
    // Per-seat pricing: $219.99/seat/month
    perSeat: true,
    seatMin: 10,
    seatMax: 20,
  },
  enterprise: {
    // Enterprise uses custom pricing - contact sales
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_ENTERPRISE_MONTHLY || 'price_business_enterprise_monthly',
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_ENTERPRISE_YEARLY || 'price_business_enterprise_yearly',
    perSeat: true,
    seatMin: 20,
    seatMax: Infinity,
  },
} as const

// ============================================================================
// PROCESSING UNIT TOP-UP PACKS
// ============================================================================

export const STRIPE_PRICES_TOPUP = {
  pu_pack_small: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PU_SMALL || 'price_pu_pack_small',
    units: 100,
    amountUsd: 4.99,
  },
  pu_pack_medium: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PU_MEDIUM || 'price_pu_pack_medium',
    units: 500,
    amountUsd: 19.99,
  },
  pu_pack_large: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PU_LARGE || 'price_pu_pack_large',
    units: 1500,
    amountUsd: 49.99,
  },
} as const

// ============================================================================
// LEGACY SUPPORT
// ============================================================================

// Legacy alias for backward compatibility with existing code
export const STRIPE_PRICES = STRIPE_PRICES_PERSONAL

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export type PlanType = 'personal' | 'business'
export type PlanTier = 'starter' | 'growth' | 'pro' | 'enterprise'
export type BillingCycle = 'monthly' | 'yearly'

/**
 * Get price ID for a plan and billing cycle
 */
export function getPriceId(
  planType: PlanType,
  tier: PlanTier,
  cycle: BillingCycle
): string | null {
  if (planType === 'personal') {
    const prices = STRIPE_PRICES_PERSONAL[tier as keyof typeof STRIPE_PRICES_PERSONAL]
    if (!prices) return null
    return prices[cycle]
  } else {
    const prices = STRIPE_PRICES_BUSINESS[tier as keyof typeof STRIPE_PRICES_BUSINESS]
    if (!prices) return null
    return prices[cycle]
  }
}

/**
 * Map price ID back to plan details
 */
export function getPlanFromPriceId(priceId: string): {
  planType: PlanType
  tier: PlanTier
  cycle: BillingCycle
  perSeat: boolean
} | null {
  // Check personal plans
  for (const [tier, prices] of Object.entries(STRIPE_PRICES_PERSONAL)) {
    if (prices.monthly === priceId) {
      return { planType: 'personal', tier: tier as PlanTier, cycle: 'monthly', perSeat: false }
    }
    if (prices.yearly === priceId) {
      return { planType: 'personal', tier: tier as PlanTier, cycle: 'yearly', perSeat: false }
    }
  }

  // Check business plans
  for (const [tier, prices] of Object.entries(STRIPE_PRICES_BUSINESS)) {
    if (prices.monthly === priceId) {
      return { planType: 'business', tier: tier as PlanTier, cycle: 'monthly', perSeat: true }
    }
    if (prices.yearly === priceId) {
      return { planType: 'business', tier: tier as PlanTier, cycle: 'yearly', perSeat: true }
    }
  }

  return null
}

/**
 * Check if a price ID is for a per-seat plan
 */
export function isPerSeatPriceId(priceId: string): boolean {
  const plan = getPlanFromPriceId(priceId)
  return plan?.perSeat || false
}

/**
 * Get seat limits for a business plan tier
 */
export function getSeatLimits(tier: PlanTier): { min: number; max: number } | null {
  const prices = STRIPE_PRICES_BUSINESS[tier as keyof typeof STRIPE_PRICES_BUSINESS]
  if (!prices || !prices.perSeat) return null
  return { min: prices.seatMin, max: prices.seatMax }
}

/**
 * Validate seat count for a business plan tier
 */
export function isValidSeatCount(tier: PlanTier, seatCount: number): boolean {
  const limits = getSeatLimits(tier)
  if (!limits) return false
  return seatCount >= limits.min && seatCount <= limits.max
}
