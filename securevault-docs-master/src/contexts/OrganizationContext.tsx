'use client'

import { createContext, useContext, useState, useEffect, useRef, useMemo, ReactNode } from 'react'
import { useAuth } from './AuthContext'

interface Organization {
  id: string
  name: string
  description: string | null
  userRole: string
  createdAt: string
}

// Active organization (can be personal vault or business org)
export interface ActiveOrganization {
  id: string
  name: string
  type: 'personal' | 'business'
}

interface OrganizationContextType {
  organizations: Organization[]
  selectedOrganization: Organization | null
  setSelectedOrganization: (org: Organization | null) => void
  isPersonalVault: boolean
  setIsPersonalVault: (isPersonal: boolean) => void
  loading: boolean
  refetchOrganizations: () => Promise<void>
  // New: Active organization for simple context access
  activeOrg: ActiveOrganization | null
  setActiveOrg: (org: ActiveOrganization | null) => void
  // Business account without organizations (showing personal vault as fallback)
  isBusinessFallbackMode: boolean
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

const STORAGE_KEY = 'svd_active_org'

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeOrg, setActiveOrgState] = useState<ActiveOrganization | null>(null)
  const [personalVaultId, setPersonalVaultId] = useState<string | null>(null)

  // Track if data has been loaded to prevent re-fetching on tab visibility change
  const hasLoadedDataRef = useRef(false)
  const lastUserIdRef = useRef<string | null>(null)
  const lastAccountTypeRef = useRef<string | null>(null)

  // Determine account type - personal accounts use personal vault, business uses organizations
  const accountType = user?.accountType || 'personal'
  const isPersonalAccount = accountType === 'personal'
  const isBusinessAccount = accountType === 'business'

  // Personal vault state depends on account type
  // Business accounts should default to false (org vault), personal accounts to true
  const [isPersonalVault, setIsPersonalVault] = useState(() => {
    // Use accountType from user if available to set correct initial value
    return user?.accountType !== 'business'
  })

  // CRITICAL: Sync isPersonalVault immediately when accountType changes
  // This ensures the upload modal gets the correct value before any data fetch
  useEffect(() => {
    if (isBusinessAccount) {
      setIsPersonalVault(false)
    } else {
      setIsPersonalVault(true)
    }
  }, [isBusinessAccount])

  // Initialize active org from localStorage - but wait for personalVaultId to load
  // Also respects account type restrictions
  useEffect(() => {
    if (typeof window === 'undefined') return

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // If it's the old "personal" string, remove it immediately
        if (parsed.id === 'personal' && parsed.type === 'personal') {
          console.log('Removing old "personal" value from localStorage')
          localStorage.removeItem(STORAGE_KEY)
          // Don't set activeOrg, wait for fetchPersonalVault
          return
        }

        // Enforce account type on restore
        // Personal accounts can only restore personal vault
        if (isPersonalAccount && parsed.type === 'business') {
          console.log('[ORG CONTEXT] Personal account - ignoring saved business org')
          localStorage.removeItem(STORAGE_KEY)
          return
        }
        // Business accounts can only restore organizations
        if (isBusinessAccount && parsed.type === 'personal') {
          console.log('[ORG CONTEXT] Business account - ignoring saved personal vault')
          localStorage.removeItem(STORAGE_KEY)
          return
        }

        // Validate org ID format before restoring
        // Allow: UUIDs, demo org IDs (org_demo_*)
        // Block: Corrupted timestamp IDs (org_[timestamp]_[random])
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        const demoOrgRegex = /^org_demo(_\w+)?$/
        const isValidOrgId = (id: string) => uuidRegex.test(id) || demoOrgRegex.test(id)

        if (parsed.id && !isValidOrgId(parsed.id)) {
          console.warn('[ORG CONTEXT] Invalid org ID format detected - auto-cleaning:', parsed.id.slice(0, 30))
          localStorage.removeItem(STORAGE_KEY)
          return
        }

        // Only restore if it's a valid organization or personal vault with UUID
        if (parsed.type === 'business' || (parsed.type === 'personal' && parsed.id !== 'personal')) {
          console.log('[ORG CONTEXT] Restoring from localStorage:', parsed.id, 'type:', parsed.type)
          setActiveOrgState(parsed)
          // Sync with existing state
          if (parsed.type === 'personal') {
            setIsPersonalVault(true)
            setSelectedOrganization(null)
          }
        }
      } catch {
        // Invalid JSON, clear it
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    // Don't set a default - wait for fetchPersonalVault to run
  }, [accountType])

  useEffect(() => {
    // Skip if user and account type haven't actually changed (prevents re-fetch on tab switch)
    const userChanged = user?.id !== lastUserIdRef.current
    const accountTypeChanged = accountType !== lastAccountTypeRef.current

    if (!userChanged && !accountTypeChanged && hasLoadedDataRef.current) {
      console.log('[ORG CONTEXT] Skipping data fetch - no actual change (tab visibility?)')
      return
    }

    console.log('[ORG CONTEXT] User changed:', user ? user.id : 'null', 'accountType:', accountType)

    if (user) {
      // Update refs to track current values
      lastUserIdRef.current = user.id
      lastAccountTypeRef.current = accountType
      hasLoadedDataRef.current = true

      // Fetch based on account type
      if (isPersonalAccount) {
        // Personal accounts only use personal vault
        console.log('[ORG CONTEXT] Personal account - fetching personal vault only')
        fetchPersonalVault()
        setOrganizations([]) // Clear any orgs
        setSelectedOrganization(null)
        setIsPersonalVault(true)
      } else if (isBusinessAccount) {
        // Business accounts only use organizations
        console.log('[ORG CONTEXT] Business account - fetching organizations only')
        fetchOrganizations()
        setPersonalVaultId(null) // Clear personal vault
        setIsPersonalVault(false)
      }
    } else {
      console.log('[ORG CONTEXT] No user, resetting state')
      setOrganizations([])
      setSelectedOrganization(null)
      setIsPersonalVault(true)
      setPersonalVaultId(null)
      setActiveOrgState(null)
      // Reset tracking refs when user logs out
      hasLoadedDataRef.current = false
      lastUserIdRef.current = null
      lastAccountTypeRef.current = null
    }
  }, [user, accountType])

  const fetchPersonalVault = async () => {
    if (!user) return

    try {
      const response = await fetch(`/api/personal-vault?userId=${user.id}`)
      if (response.ok) {
        const data = await response.json()
        if (data.personalVault) {
          const vaultId = data.personalVault.id
          setPersonalVaultId(vaultId)

          // Always set the activeOrg when in personal mode, regardless of current value
          if (isPersonalVault) {
            const personalVault: ActiveOrganization = {
              id: vaultId,
              name: 'Personal',
              type: 'personal',
            }
            setActiveOrgState(personalVault)
            if (typeof window !== 'undefined') {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(personalVault))
            }
            console.log('PersonalVault loaded and set as activeOrg:', vaultId)
          }
        }
      } else {
        // API failed - log error but still set a placeholder to prevent infinite loading
        const errorData = await response.json()
        console.error('PersonalVault API failed:', errorData)
        console.error('User may not exist in User table. User ID:', user.id)

        // Set a placeholder activeOrg so the UI doesn't hang
        // This will cause API calls to fail but at least show an error instead of infinite loading
        if (isPersonalVault) {
          const fallbackVault: ActiveOrganization = {
            id: 'error-no-vault',
            name: 'Personal (Error)',
            type: 'personal',
          }
          setActiveOrgState(fallbackVault)
        }
      }
    } catch (error) {
      console.error('Error fetching personal vault:', error)
      // Set placeholder on exception too
      if (isPersonalVault) {
        const fallbackVault: ActiveOrganization = {
          id: 'error-no-vault',
          name: 'Personal (Error)',
          type: 'personal',
        }
        setActiveOrgState(fallbackVault)
      }
    }
  }

  const fetchOrganizations = async () => {
    if (!user) return

    setLoading(true)
    try {
      const response = await fetch('/api/organizations', {
        headers: { 'x-user-id': user.id },
      })

      if (response.ok) {
        const data = await response.json()
        const orgs = data.organizations || []
        setOrganizations(orgs)

        // For business accounts, auto-select the first organization if none selected
        if (isBusinessAccount && orgs.length > 0 && !activeOrg) {
          const firstOrg = orgs[0]
          const activeOrgData: ActiveOrganization = {
            id: firstOrg.id,
            name: firstOrg.name,
            type: 'business',
          }
          setActiveOrgState(activeOrgData)
          setSelectedOrganization(firstOrg)
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activeOrgData))
          }
          console.log('[ORG CONTEXT] Business account - auto-selected first org:', firstOrg.name)
        } else if (isBusinessAccount && orgs.length === 0) {
          // FALLBACK: Business account with no organizations
          // Allow them to access their personal vault until they create an organization
          // This prevents files from "disappearing" after upgrade
          console.log('[ORG CONTEXT] Business account has no organizations - falling back to personal vault')
          fetchPersonalVault()
          setIsPersonalVault(true) // Temporarily allow personal vault access
        }
      }
    } catch (error) {
      console.error('Error fetching organizations:', error)
    } finally {
      setLoading(false)
    }
  }

  const refetchOrganizations = async () => {
    await fetchOrganizations()
  }

  // When switching to an organization, disable personal vault
  // Enforces account type rules
  const handleSetSelectedOrganization = (org: Organization | null) => {
    // Personal accounts cannot select organizations
    if (org && isPersonalAccount) {
      console.warn('[ORG CONTEXT] Personal account cannot select organizations')
      return
    }

    setSelectedOrganization(org)
    if (org) {
      setIsPersonalVault(false)
      // Update active org
      const activeOrgData: ActiveOrganization = {
        id: org.id,
        name: org.name,
        type: 'business',
      }
      setActiveOrgState(activeOrgData)
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activeOrgData))
      }
    }
  }

  // When switching to personal vault, clear selected organization
  // Enforces account type rules (with fallback for business accounts without orgs)
  const handleSetIsPersonalVault = (isPersonal: boolean) => {
    // Business accounts cannot switch to personal vault (unless they have no orgs - fallback mode)
    const hasNoOrganizations = organizations.length === 0
    if (isPersonal && isBusinessAccount && !hasNoOrganizations) {
      console.warn('[ORG CONTEXT] Business account cannot use personal vault (has organizations)')
      return
    }
    // Personal accounts cannot switch to organization mode
    if (!isPersonal && isPersonalAccount) {
      console.warn('[ORG CONTEXT] Personal account cannot use organizations')
      return
    }

    setIsPersonalVault(isPersonal)
    if (isPersonal) {
      setSelectedOrganization(null)
      // Only update active org if we have the actual vault ID loaded
      if (personalVaultId) {
        const personalVault: ActiveOrganization = {
          id: personalVaultId,
          name: 'Personal',
          type: 'personal',
        }
        setActiveOrgState(personalVault)
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(personalVault))
        }
      } else {
        // If vault ID not loaded yet, clear activeOrg and it will be set when vault loads
        setActiveOrgState(null)
      }
    }
  }

  // New: Direct setter for active org (for new components)
  // Enforces account type rules - personal can't switch to org, business can't switch to personal
  // Exception: business accounts without orgs can use personal vault as fallback
  const setActiveOrg = (org: ActiveOrganization | null) => {
    // Enforce account type restrictions
    const hasNoOrganizations = organizations.length === 0
    if (org) {
      // Validate org ID format - allow UUIDs and demo org IDs
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      const demoOrgRegex = /^org_demo(_\w+)?$/
      const isValidOrgId = uuidRegex.test(org.id) || demoOrgRegex.test(org.id)
      if (!isValidOrgId) {
        console.warn('[ORG CONTEXT] Blocked invalid org ID format:', org.id.slice(0, 30))
        return // Block setting corrupted ID
      }

      // Personal accounts can only use personal vault
      if (isPersonalAccount && org.type === 'business') {
        console.warn('[ORG CONTEXT] Personal account cannot switch to organization')
        return // Block the switch
      }
      // Business accounts can only use organizations (unless they have none - fallback mode)
      if (isBusinessAccount && org.type === 'personal' && !hasNoOrganizations) {
        console.warn('[ORG CONTEXT] Business account cannot switch to personal vault (has organizations)')
        return // Block the switch
      }
    }

    console.log('[ORG CONTEXT] Setting activeOrg:', org?.id, 'type:', org?.type)
    setActiveOrgState(org)
    if (org) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(org))
      }
      // Sync with existing state
      if (org.type === 'personal') {
        setIsPersonalVault(true)
        setSelectedOrganization(null)
      } else {
        setIsPersonalVault(false)
        // Try to find the org in the organizations list
        const fullOrg = organizations.find(o => o.id === org.id)
        if (fullOrg) {
          setSelectedOrganization(fullOrg)
        }
      }
    } else {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  // Final validation: ensure activeOrg.id is valid before exposing to consumers
  // This is the last line of defense against corrupted IDs
  const validatedActiveOrg = useMemo(() => {
    if (!activeOrg) return null
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    const demoOrgRegex = /^org_demo(_\w+)?$/
    const isValid = uuidRegex.test(activeOrg.id) || demoOrgRegex.test(activeOrg.id)
    if (!isValid) {
      console.warn('[ORG CONTEXT] Filtering out corrupted activeOrg ID:', activeOrg.id.slice(0, 30))
      return null
    }
    return activeOrg
  }, [activeOrg])

  // Clean up localStorage if activeOrg was invalidated
  useEffect(() => {
    if (activeOrg && !validatedActiveOrg) {
      console.log('[ORG CONTEXT] Cleaning up corrupted activeOrg from localStorage')
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY)
      }
      // Reset the internal state to trigger a fresh fetch
      setActiveOrgState(null)
    }
  }, [activeOrg, validatedActiveOrg])

  // Business account in fallback mode (no orgs, using personal vault temporarily)
  const isBusinessFallbackMode = isBusinessAccount && organizations.length === 0 && isPersonalVault

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        selectedOrganization,
        setSelectedOrganization: handleSetSelectedOrganization,
        isPersonalVault,
        setIsPersonalVault: handleSetIsPersonalVault,
        loading,
        refetchOrganizations,
        activeOrg: validatedActiveOrg,
        setActiveOrg,
        isBusinessFallbackMode,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider')
  }
  return context
}
