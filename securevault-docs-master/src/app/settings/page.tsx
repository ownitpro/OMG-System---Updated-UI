'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccountAccess } from '@/hooks/useAccountAccess'
import { useAuth } from '@/contexts/AuthContext'

export default function SettingsPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { isPersonalAccount, isBusinessAccount } = useAccountAccess()

  useEffect(() => {
    // Wait for auth to load before redirecting
    if (loading) return

    // Redirect based on account type
    if (isPersonalAccount) {
      router.replace('/settings/profile')
    } else if (isBusinessAccount) {
      router.replace('/settings/organization')
    } else {
      // Default fallback
      router.replace('/settings/profile')
    }
  }, [router, loading, isPersonalAccount, isBusinessAccount])

  return null
}
