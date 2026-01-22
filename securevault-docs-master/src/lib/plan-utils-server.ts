// Server-only plan utilities that require database access
// These functions should only be imported in API routes and server components

import { queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'
import { normalizePlan, type Plan, type BusinessPlan } from '@/lib/plan-limits'

/**
 * Get the current plan for a user from database
 * Returns 'trial' if no plan found or on error
 *
 * SERVER-ONLY: Do not import in client components
 */
export async function getUserPlan(userId: string): Promise<Plan> {
  try {
    const userTable = getTableName('User')
    // Use SELECT * as 'plan' column may not exist and queryOne might throw or return undefined for it
    const user = await queryOne<any>(
      `SELECT * FROM ${userTable} WHERE id = $1`,
      [userId]
    )

    if (user?.plan && user.plan !== 'free') {
      return normalizePlan(user.plan)
    }

    // Fallback: Get from Subscription table
    const subTable = getTableName('Subscription')
    const subscription = await queryOne<{ plan: string }>(
      `SELECT plan FROM ${subTable}
       WHERE "userId" = $1 AND "appId" = 'app_securevault' AND status IN ('active', 'trialing')
       ORDER BY "updatedAt" DESC LIMIT 1`,
      [userId]
    )

    if (subscription?.plan) {
      return normalizePlan(subscription.plan)
    }

    return 'trial'
  } catch (error) {
    console.error('[getUserPlan] Error fetching user plan:', error)
    return 'trial'
  }
}


/**
 * Get the current plan for an organization from database
 * Returns 'business_starter' if no plan found or on error
 *
 * SERVER-ONLY: Do not import in client components
 */
export async function getOrgPlan(orgId: string): Promise<BusinessPlan> {
  try {
    const orgTable = getTableName('Organization')
    const org = await queryOne<{ plan?: string }>(
      `SELECT plan FROM ${orgTable} WHERE id = $1`,
      [orgId]
    )

    if (!org?.plan) {
      return 'business_starter'
    }

    const normalized = normalizePlan(org.plan)
    // Ensure it's a business plan
    if (normalized.startsWith('business_') || normalized === 'enterprise') {
      return normalized as BusinessPlan
    }

    return 'business_starter'
  } catch (error) {
    console.error('[getOrgPlan] Error fetching org plan:', error)
    return 'business_starter'
  }
}
