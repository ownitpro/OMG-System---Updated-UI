import { useAuth } from '@/contexts/AuthContext'
import { getPlanLimits, isTrialExpired, canPerformAction, type Plan } from '@/lib/plan-limits'
import { useState, useEffect } from 'react'

export interface EnforcementResult {
  allowed: boolean
  reason?: string
  showUpgradePrompt?: boolean
  suggestedPlan?: string
}

export function usePlanEnforcement() {
  const { user } = useAuth()
  const [currentUsage, setCurrentUsage] = useState({
    storageUsedGb: 0,
    ocrPagesUsedThisMonth: 0,
    shareLinksCount: 0,
    seatsCount: 1,
    businessVaultsCount: 0,
  })
  const [loading, setLoading] = useState(true)

  const plan = (user?.plan || 'free') as Plan
  const limits = getPlanLimits(plan)
  const trialExpired = user?.trialExpiresAt ? isTrialExpired(user.trialExpiresAt) : false

  // Fetch real usage data via API (not direct database access - pg doesn't work in browser)
  useEffect(() => {
    async function fetchUsageData() {
      if (!user?.id) {
        setLoading(false)
        return
      }

      // Validate user ID format before making request
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(user.id)) {
        console.warn('[usePlanEnforcement] Invalid user ID format, skipping usage fetch:', user.id)
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const response = await fetch(`/api/user/usage?userId=${encodeURIComponent(user.id)}`)
        if (response.ok) {
          const data = await response.json()
          setCurrentUsage(prev => ({
            ...prev,
            storageUsedGb: data.storageGb || 0,
            ocrPagesUsedThisMonth: data.ocrPagesUsedThisMonth || 0,
          }))
        } else {
          // Don't block uploads if usage fetch fails - just log it
          console.warn('[usePlanEnforcement] Failed to fetch usage data:', response.status)
        }
      } catch (error) {
        // Don't block uploads if usage fetch fails - just log it
        console.error('[usePlanEnforcement] Failed to fetch usage data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsageData()
  }, [user?.id])

  // Check if user can upload a file
  const canUploadFile = (fileSizeBytes: number): EnforcementResult => {
    if (trialExpired) {
      return {
        allowed: false,
        reason: 'Your trial has expired. Please upgrade to continue uploading files.',
        showUpgradePrompt: true,
        suggestedPlan: 'starter',
      }
    }

    const fileSizeGb = fileSizeBytes / (1024 * 1024 * 1024)
    const newTotal = currentUsage.storageUsedGb + fileSizeGb

    if (newTotal > limits.storageGb) {
      return {
        allowed: false,
        reason: `This upload would exceed your ${limits.storageGb} GB storage limit. You're currently using ${currentUsage.storageUsedGb.toFixed(2)} GB.`,
        showUpgradePrompt: true,
        suggestedPlan: plan === 'free' ? 'starter' : plan === 'starter' ? 'growth' : 'pro',
      }
    }

    return { allowed: true }
  }

  // Check if user can perform OCR
  const canPerformOCR = (pageCount: number = 1): EnforcementResult => {
    if (trialExpired) {
      return {
        allowed: false,
        reason: 'Your trial has expired. Please upgrade to continue using OCR.',
        showUpgradePrompt: true,
        suggestedPlan: 'starter',
      }
    }

    const result = canPerformAction(plan, {
      type: 'ocr_page',
      currentCount: currentUsage.ocrPagesUsedThisMonth + pageCount - 1,
    })

    if (!result.allowed) {
      return {
        ...result,
        showUpgradePrompt: true,
        suggestedPlan: plan === 'free' ? 'starter' : plan === 'starter' ? 'growth' : 'pro',
      }
    }

    return { allowed: true }
  }

  // Check if user can create a share link
  const canCreateShareLink = (): EnforcementResult => {
    if (trialExpired) {
      return {
        allowed: false,
        reason: 'Your trial has expired. Please upgrade to continue creating share links.',
        showUpgradePrompt: true,
        suggestedPlan: 'starter',
      }
    }

    const result = canPerformAction(plan, {
      type: 'create_share_link',
      currentCount: currentUsage.shareLinksCount,
    })

    if (!result.allowed) {
      return {
        ...result,
        showUpgradePrompt: true,
        suggestedPlan: plan === 'free' || plan === 'starter' ? 'growth' : 'pro',
      }
    }

    return { allowed: true }
  }

  // Check if user can add a team seat
  const canAddSeat = (): EnforcementResult => {
    if (trialExpired) {
      return {
        allowed: false,
        reason: 'Your trial has expired. Please upgrade to continue.',
        showUpgradePrompt: true,
        suggestedPlan: 'pro',
      }
    }

    const result = canPerformAction(plan, {
      type: 'add_seat',
      currentCount: currentUsage.seatsCount,
    })

    if (!result.allowed) {
      return {
        ...result,
        showUpgradePrompt: true,
        suggestedPlan: 'pro',
      }
    }

    return { allowed: true }
  }

  // Check if user can create a business vault
  const canCreateBusinessVault = (): EnforcementResult => {
    if (trialExpired) {
      return {
        allowed: false,
        reason: 'Your trial has expired. Please upgrade to Pro to create business vaults.',
        showUpgradePrompt: true,
        suggestedPlan: 'pro',
      }
    }

    const result = canPerformAction(plan, {
      type: 'create_vault',
      currentCount: currentUsage.businessVaultsCount,
    })

    if (!result.allowed) {
      return {
        ...result,
        showUpgradePrompt: true,
        suggestedPlan: 'pro',
      }
    }

    return { allowed: true }
  }

  // Update usage counts (this would be called after successful operations)
  const updateUsage = (updates: Partial<typeof currentUsage>) => {
    setCurrentUsage((prev) => ({ ...prev, ...updates }))
  }

  return {
    plan,
    limits,
    trialExpired,
    currentUsage,
    canUploadFile,
    canPerformOCR,
    canCreateShareLink,
    canAddSeat,
    canCreateBusinessVault,
    updateUsage,
  }
}
