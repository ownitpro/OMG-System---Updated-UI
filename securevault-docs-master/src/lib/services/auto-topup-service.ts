// Auto Top-Up Service
// Automatically purchases Processing Unit packs when usage reaches 95%

import { STRIPE_PRICES_TOPUP } from '@/config/stripe-prices'
import { addPurchasedProcessingUnits, addOrgPurchasedProcessingUnits } from '@/lib/processing-tracking'

// ============================================================================
// TYPES
// ============================================================================

export type TopUpPack = 'pu_pack_small' | 'pu_pack_medium' | 'pu_pack_large'

export interface TopUpPackInfo {
  id: TopUpPack
  name: string
  units: number
  priceUsd: number
  priceId: string
}

export interface AutoTopUpSettings {
  enabled: boolean
  defaultPack: TopUpPack
  maxTopUpsPerMonth: number
  topUpsThisMonth: number
}

export interface TopUpResult {
  success: boolean
  unitsAdded?: number
  amountCharged?: number
  error?: string
}

// ============================================================================
// PACK DEFINITIONS
// ============================================================================

export const TOP_UP_PACKS: Record<TopUpPack, TopUpPackInfo> = {
  pu_pack_small: {
    id: 'pu_pack_small',
    name: 'Small Pack',
    units: STRIPE_PRICES_TOPUP.pu_pack_small.units,
    priceUsd: STRIPE_PRICES_TOPUP.pu_pack_small.amountUsd,
    priceId: STRIPE_PRICES_TOPUP.pu_pack_small.priceId,
  },
  pu_pack_medium: {
    id: 'pu_pack_medium',
    name: 'Medium Pack',
    units: STRIPE_PRICES_TOPUP.pu_pack_medium.units,
    priceUsd: STRIPE_PRICES_TOPUP.pu_pack_medium.amountUsd,
    priceId: STRIPE_PRICES_TOPUP.pu_pack_medium.priceId,
  },
  pu_pack_large: {
    id: 'pu_pack_large',
    name: 'Large Pack',
    units: STRIPE_PRICES_TOPUP.pu_pack_large.units,
    priceUsd: STRIPE_PRICES_TOPUP.pu_pack_large.amountUsd,
    priceId: STRIPE_PRICES_TOPUP.pu_pack_large.priceId,
  },
}

// ============================================================================
// AUTO TOP-UP SETTINGS
// ============================================================================

/**
 * Get auto top-up settings for a user
 */
export async function getAutoTopUpSettings(userId: string): Promise<AutoTopUpSettings> {
  const { queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  const user = await queryOne<{
    autoTopUpEnabled?: boolean
    autoTopUpPack?: string
    autoTopUpsThisMonth?: number
  }>(
    `SELECT "autoTopUpEnabled", "autoTopUpPack", "autoTopUpsThisMonth"
     FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )

  return {
    enabled: user?.autoTopUpEnabled || false,
    defaultPack: (user?.autoTopUpPack as TopUpPack) || 'pu_pack_medium',
    maxTopUpsPerMonth: 5, // Limit to prevent runaway charges
    topUpsThisMonth: user?.autoTopUpsThisMonth || 0,
  }
}

/**
 * Update auto top-up settings for a user
 */
export async function updateAutoTopUpSettings(
  userId: string,
  settings: Partial<AutoTopUpSettings>
): Promise<void> {
  const { query } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  const updates: string[] = []
  const params: any[] = []
  let paramIdx = 1

  if (settings.enabled !== undefined) {
    updates.push(`"autoTopUpEnabled" = $${paramIdx++}`)
    params.push(settings.enabled)
  }

  if (settings.defaultPack) {
    updates.push(`"autoTopUpPack" = $${paramIdx++}`)
    params.push(settings.defaultPack)
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
// AUTO TOP-UP EXECUTION
// ============================================================================

/**
 * Execute an auto top-up for a user
 * Called when usage reaches 95%
 */
export async function executeAutoTopUp(
  userId: string,
  orgId?: string
): Promise<TopUpResult> {
  const settings = await getAutoTopUpSettings(userId)

  // Check if auto top-up is enabled
  if (!settings.enabled) {
    return { success: false, error: 'Auto top-up is not enabled' }
  }

  // Check monthly limit
  if (settings.topUpsThisMonth >= settings.maxTopUpsPerMonth) {
    return {
      success: false,
      error: `Monthly auto top-up limit (${settings.maxTopUpsPerMonth}) reached`,
    }
  }

  const pack = TOP_UP_PACKS[settings.defaultPack]
  if (!pack) {
    return { success: false, error: 'Invalid top-up pack' }
  }

  try {
    // Charge the customer
    const chargeResult = await chargeForTopUp(userId, pack)
    if (!chargeResult.success) {
      return { success: false, error: chargeResult.error }
    }

    // Add processing units
    if (orgId) {
      await addOrgPurchasedProcessingUnits(orgId, pack.units)
    } else {
      await addPurchasedProcessingUnits(userId, pack.units)
    }

    // Increment top-up counter
    await incrementTopUpCounter(userId)

    // Log the top-up
    await logTopUp(userId, orgId, pack, 'auto')

    return {
      success: true,
      unitsAdded: pack.units,
      amountCharged: pack.priceUsd,
    }
  } catch (error: any) {
    console.error('[AutoTopUp] Error:', error)
    return { success: false, error: error.message || 'Top-up failed' }
  }
}

/**
 * Execute a manual top-up purchase
 */
export async function purchaseTopUp(
  userId: string,
  packId: TopUpPack,
  orgId?: string
): Promise<TopUpResult> {
  const pack = TOP_UP_PACKS[packId]
  if (!pack) {
    return { success: false, error: 'Invalid top-up pack' }
  }

  try {
    // Charge the customer
    const chargeResult = await chargeForTopUp(userId, pack)
    if (!chargeResult.success) {
      return { success: false, error: chargeResult.error }
    }

    // Add processing units
    if (orgId) {
      await addOrgPurchasedProcessingUnits(orgId, pack.units)
    } else {
      await addPurchasedProcessingUnits(userId, pack.units)
    }

    // Log the top-up
    await logTopUp(userId, orgId, pack, 'manual')

    return {
      success: true,
      unitsAdded: pack.units,
      amountCharged: pack.priceUsd,
    }
  } catch (error: any) {
    console.error('[TopUp] Error:', error)
    return { success: false, error: error.message || 'Top-up failed' }
  }
}

// ============================================================================
// STRIPE INTEGRATION
// ============================================================================

interface ChargeResult {
  success: boolean
  chargeId?: string
  error?: string
}

/**
 * Charge the customer for a top-up pack
 */
async function chargeForTopUp(userId: string, pack: TopUpPackInfo): Promise<ChargeResult> {
  const { queryOne } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  // Get user's Stripe customer ID
  const user = await queryOne<{ stripeCustomerId?: string }>(
    `SELECT "stripeCustomerId" FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )

  if (!user?.stripeCustomerId) {
    return { success: false, error: 'No payment method on file' }
  }

  try {
    // Initialize Stripe
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-11-17.clover',
    })

    // Get default payment method
    const customer = await stripe.customers.retrieve(user.stripeCustomerId)
    if (customer.deleted) {
      return { success: false, error: 'Customer not found' }
    }

    const defaultPaymentMethod = customer.invoice_settings?.default_payment_method
    if (!defaultPaymentMethod) {
      return { success: false, error: 'No default payment method' }
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(pack.priceUsd * 100), // Convert to cents
      currency: 'usd',
      customer: user.stripeCustomerId,
      payment_method: typeof defaultPaymentMethod === 'string' ? defaultPaymentMethod : defaultPaymentMethod.id,
      off_session: true,
      confirm: true,
      description: `Processing Units Top-Up: ${pack.name} (${pack.units} PU)`,
      metadata: {
        userId,
        packId: pack.id,
        units: pack.units.toString(),
        type: 'processing_unit_topup',
      },
    })

    if (paymentIntent.status === 'succeeded') {
      return { success: true, chargeId: paymentIntent.id }
    } else {
      return { success: false, error: `Payment status: ${paymentIntent.status}` }
    }
  } catch (error: any) {
    console.error('[TopUp] Stripe error:', error)

    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return { success: false, error: error.message }
    }

    return { success: false, error: 'Payment failed' }
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Increment the monthly top-up counter
 */
async function incrementTopUpCounter(userId: string): Promise<void> {
  const { query } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  await query(
    `UPDATE ${getTableName('User')}
     SET "autoTopUpsThisMonth" = COALESCE("autoTopUpsThisMonth", 0) + 1,
         "updatedAt" = NOW()
     WHERE id = $1`,
    [userId]
  )
}

/**
 * Log top-up for audit purposes
 */
export async function logTopUp(
  userId: string,
  orgId: string | undefined,
  pack: TopUpPackInfo,
  type: 'auto' | 'manual' | 'purchase'
): Promise<void> {
  try {
    const { query } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    // Check if TopUpLog table exists
    const tableExists = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'securevault' AND table_name = 'TopUpLog'
      )
    `)

    if (!tableExists?.[0]?.exists) {
      console.log('[TopUp] TopUpLog table does not exist, skipping log')
      return
    }

    await query(
      `INSERT INTO ${getTableName('TopUpLog')}
       ("id", "userId", "orgId", "packId", "units", "amountUsd", "type", "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW())`,
      [userId, orgId || null, pack.id, pack.units, pack.priceUsd, type]
    )
  } catch (error) {
    console.error('[TopUp] Failed to log top-up:', error)
  }
}

/**
 * Reset monthly top-up counter (called at start of billing period)
 */
export async function resetMonthlyTopUpCounter(userId: string): Promise<void> {
  const { query } = await import('@/lib/db')
  const { getTableName } = await import('@/lib/db-utils')

  await query(
    `UPDATE ${getTableName('User')}
     SET "autoTopUpsThisMonth" = 0, "updatedAt" = NOW()
     WHERE id = $1`,
    [userId]
  )
}

// ============================================================================
// ELIGIBILITY CHECK
// ============================================================================

/**
 * Check if auto top-up should be triggered
 */
export function shouldAutoTopUp(usagePercentage: number, settings: AutoTopUpSettings): boolean {
  return (
    settings.enabled &&
    usagePercentage >= 95 &&
    settings.topUpsThisMonth < settings.maxTopUpsPerMonth
  )
}

/**
 * Get formatted top-up pack options for UI
 */
export function getTopUpPackOptions(): TopUpPackInfo[] {
  return Object.values(TOP_UP_PACKS).sort((a, b) => a.units - b.units)
}
