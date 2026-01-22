/**
 * Account Type Guard Utilities
 *
 * Server-side utilities for checking account types and protecting API routes.
 * Use these to ensure proper access control at the API level.
 */

import { query, queryOne } from '@/lib/db'
import { getTableName } from '@/lib/db-utils'

export type AccountType = 'personal' | 'business'

interface UserAccountInfo {
  id: string
  accountType: AccountType
}

/**
 * Get the account type for a user by their ID
 */
export async function getUserAccountType(userId: string): Promise<AccountType | null> {
  try {
    const user = await queryOne<{ accountType: string }>(
      `SELECT "accountType" FROM ${getTableName('User')} WHERE id = $1`,
      [userId]
    )

    if (!user) {
      return null
    }

    // Default to 'personal' if not set
    return (user.accountType as AccountType) || 'personal'
  } catch (error) {
    console.error('Error getting user account type:', error)
    return null
  }
}

/**
 * Check if a user has a business account
 */
export async function isBusinessAccount(userId: string): Promise<boolean> {
  const accountType = await getUserAccountType(userId)
  return accountType === 'business'
}

/**
 * Check if a user has a personal account
 */
export async function isPersonalAccount(userId: string): Promise<boolean> {
  const accountType = await getUserAccountType(userId)
  return accountType === 'personal'
}

/**
 * Require a business account for an API route
 * Returns true if allowed, false if blocked
 */
export async function requireBusinessAccount(userId: string): Promise<boolean> {
  const accountType = await getUserAccountType(userId)
  if (accountType !== 'business') {
    console.warn(`[ACCOUNT GUARD] User ${userId} attempted to access business-only feature with ${accountType} account`)
    return false
  }
  return true
}

/**
 * Require a personal account for an API route
 * Returns true if allowed, false if blocked
 */
export async function requirePersonalAccount(userId: string): Promise<boolean> {
  const accountType = await getUserAccountType(userId)
  if (accountType !== 'personal') {
    console.warn(`[ACCOUNT GUARD] User ${userId} attempted to access personal-only feature with ${accountType} account`)
    return false
  }
  return true
}

/**
 * Create a 403 Forbidden response for account type violations
 */
export function createAccountTypeError(requiredType: AccountType): Response {
  return new Response(
    JSON.stringify({
      error: 'Access denied',
      message: `This feature requires a ${requiredType} account`,
      requiredAccountType: requiredType,
    }),
    {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
