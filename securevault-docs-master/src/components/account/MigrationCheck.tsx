'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { AccountTypeMigrationModal } from './AccountTypeMigrationModal'

interface MigrationStatus {
  needsMigration: boolean
  hasPersonalVault: boolean
  hasOrganizations: boolean
  documentCounts: {
    personalVault: number
    organizations: number
  }
}

export function MigrationCheck() {
  const { user } = useAuth()
  const [migrationStatus, setMigrationStatus] = useState<MigrationStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const checkMigration = async () => {
      if (!user?.id) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/account/migrate', {
          method: 'GET',
          headers: {
            'x-user-id': user.id,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setMigrationStatus(data)
        }
      } catch (error) {
        console.error('Error checking migration status:', error)
      } finally {
        setLoading(false)
      }
    }

    checkMigration()
  }, [user?.id])

  // Don't show anything while loading or if no migration needed
  if (loading || !migrationStatus || !migrationStatus.needsMigration || dismissed) {
    return null
  }

  return (
    <AccountTypeMigrationModal
      isOpen={true}
      onComplete={() => setDismissed(true)}
      hasPersonalVault={migrationStatus.hasPersonalVault}
      hasOrganizations={migrationStatus.hasOrganizations}
      documentCounts={migrationStatus.documentCounts}
    />
  )
}
