// src/hooks/useAccountAccess.ts
// Centralized hook for account type access control

'use client'

import { useAuth } from '@/contexts/AuthContext'

export type AccountType = 'personal' | 'business'

export interface AccountAccess {
  accountType: AccountType
  isPersonalAccount: boolean
  isBusinessAccount: boolean
  canAccessPersonalVault: boolean
  canAccessOrganizations: boolean
  canAccessClientPortal: boolean
  canAccessMembers: boolean
  canCreateOrganization: boolean
  allowedSettingsSections: string[]
}

export function useAccountAccess(): AccountAccess {
  const { user } = useAuth()

  // Default to 'personal' if accountType is not set
  const accountType: AccountType = user?.accountType === 'business' ? 'business' : 'personal'

  const isPersonalAccount = accountType === 'personal'
  const isBusinessAccount = accountType === 'business'

  return {
    accountType,
    isPersonalAccount,
    isBusinessAccount,

    // Feature access rules
    canAccessPersonalVault: isPersonalAccount,
    canAccessOrganizations: isBusinessAccount,
    canAccessClientPortal: isBusinessAccount,
    canAccessMembers: isBusinessAccount,
    canCreateOrganization: isBusinessAccount,

    // Settings sections allowed based on account type
    allowedSettingsSections: isPersonalAccount
      ? ['profile', 'security', 'billing']
      : ['profile', 'organization', 'members', 'security', 'billing', 'auditlogs']
  }
}
