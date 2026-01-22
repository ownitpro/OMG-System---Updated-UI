'use client'

import { useState, useCallback } from 'react'
import { Calendar, Bell, BellOff, AlertTriangle } from 'lucide-react'
import { getDaysUntilExpiration, getExpirationStatus } from '@/lib/expiration-utils'

interface ExpirationBadgeProps {
  expirationDate: string | null | undefined
  trackingEnabled?: boolean
  documentId?: string
  userId?: string
  onTrackingToggle?: (enabled: boolean) => void
  size?: 'sm' | 'md' | 'lg'
  showToggle?: boolean
  className?: string
}

export default function ExpirationBadge({
  expirationDate,
  trackingEnabled = true,
  documentId,
  userId,
  onTrackingToggle,
  size = 'sm',
  showToggle = false,
  className = '',
}: ExpirationBadgeProps) {
  const [isToggling, setIsToggling] = useState(false)
  const [localTrackingEnabled, setLocalTrackingEnabled] = useState(trackingEnabled)

  // If no expiration date, don't render
  if (!expirationDate) return null

  const expDate = new Date(expirationDate)
  const daysUntil = getDaysUntilExpiration(expDate)
  const status = getExpirationStatus(daysUntil)

  // Get badge colors based on status
  const getBadgeColors = () => {
    switch (status) {
      case 'expired':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
      case 'expiring_today':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
      case 'expiring_soon':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800'
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700'
    }
  }

  // Get icon based on status
  const getIcon = () => {
    if (status === 'expired' || status === 'expiring_today') {
      return <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
    }
    return <Calendar className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
  }

  // Get label text
  const getLabel = () => {
    if (status === 'expired') {
      const daysAgo = Math.abs(daysUntil)
      if (daysAgo === 0) return 'Expired'
      return daysAgo === 1 ? 'Expired 1d ago' : `Expired ${daysAgo}d ago`
    }
    if (status === 'expiring_today') return 'Expires today'
    if (daysUntil === 1) return 'Expires tomorrow'
    if (daysUntil <= 7) return `${daysUntil}d left`
    if (daysUntil <= 30) return `${Math.ceil(daysUntil / 7)}w left`
    return `Exp ${expDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
  }

  // Toggle tracking
  const handleToggleTracking = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (!documentId || !userId || isToggling) return

    setIsToggling(true)
    const newValue = !localTrackingEnabled

    try {
      const res = await fetch(`/api/documents/${documentId}/expiration`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingEnabled: newValue, userId }),
      })

      if (res.ok) {
        setLocalTrackingEnabled(newValue)
        onTrackingToggle?.(newValue)
      }
    } catch (error) {
      console.error('Error toggling tracking:', error)
    } finally {
      setIsToggling(false)
    }
  }, [documentId, userId, isToggling, localTrackingEnabled, onTrackingToggle])

  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-sm px-2.5 py-1.5',
  }

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <span
        className={`inline-flex items-center gap-1 rounded border ${getBadgeColors()} ${sizeClasses[size]}`}
        title={`Expires: ${expDate.toLocaleDateString()}`}
      >
        {getIcon()}
        <span className="font-medium">{getLabel()}</span>
      </span>

      {showToggle && documentId && userId && (
        <button
          onClick={handleToggleTracking}
          disabled={isToggling}
          className={`p-1 rounded-full transition-colors ${
            localTrackingEnabled
              ? 'text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/30'
              : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          } ${isToggling ? 'opacity-50' : ''}`}
          title={localTrackingEnabled ? 'Tracking enabled - click to disable' : 'Tracking disabled - click to enable'}
        >
          {localTrackingEnabled ? (
            <Bell className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
          ) : (
            <BellOff className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
          )}
        </button>
      )}
    </div>
  )
}

// Compact version for table/list views
export function ExpirationBadgeCompact({
  expirationDate,
  className = '',
}: {
  expirationDate: string | null | undefined
  className?: string
}) {
  if (!expirationDate) return null

  const expDate = new Date(expirationDate)
  const daysUntil = getDaysUntilExpiration(expDate)
  const status = getExpirationStatus(daysUntil)

  const getColor = () => {
    switch (status) {
      case 'expired':
      case 'expiring_today':
        return 'text-red-600 dark:text-red-400'
      case 'expiring_soon':
        return 'text-orange-600 dark:text-orange-400'
      case 'upcoming':
        return 'text-yellow-600 dark:text-yellow-400'
      default:
        return 'text-gray-500 dark:text-gray-400'
    }
  }

  const getLabel = () => {
    if (status === 'expired') return 'Expired'
    if (status === 'expiring_today') return 'Today!'
    if (daysUntil <= 7) return `${daysUntil}d`
    return expDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <span className={`inline-flex items-center gap-1 text-xs ${getColor()} ${className}`}>
      {(status === 'expired' || status === 'expiring_today') && (
        <AlertTriangle className="w-3 h-3" />
      )}
      {getLabel()}
    </span>
  )
}
