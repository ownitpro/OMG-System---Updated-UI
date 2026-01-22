'use client'

import { useState, useCallback } from 'react'
import { Clock, Bell, BellOff, AlertTriangle } from 'lucide-react'

interface DueDateBadgeProps {
  dueDate: string | null | undefined
  trackingEnabled?: boolean
  documentId?: string
  userId?: string
  onTrackingToggle?: (enabled: boolean) => void
  size?: 'sm' | 'md' | 'lg'
  showToggle?: boolean
  className?: string
}

// Helper function to get days until due date
function getDaysUntilDue(dueDate: Date): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate)
  due.setHours(0, 0, 0, 0)
  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Helper function to get due date status
type DueDateStatus = 'past_due' | 'due_today' | 'due_soon' | 'upcoming' | 'normal'

function getDueDateStatus(daysUntil: number): DueDateStatus {
  if (daysUntil < 0) return 'past_due'
  if (daysUntil === 0) return 'due_today'
  if (daysUntil <= 3) return 'due_soon'
  if (daysUntil <= 7) return 'upcoming'
  return 'normal'
}

export default function DueDateBadge({
  dueDate,
  trackingEnabled = true,
  documentId,
  userId,
  onTrackingToggle,
  size = 'sm',
  showToggle = false,
  className = '',
}: DueDateBadgeProps) {
  const [isToggling, setIsToggling] = useState(false)
  const [localTrackingEnabled, setLocalTrackingEnabled] = useState(trackingEnabled)

  // If no due date, don't render
  if (!dueDate) return null

  const dueDateObj = new Date(dueDate)
  const daysUntil = getDaysUntilDue(dueDateObj)
  const status = getDueDateStatus(daysUntil)

  // Get badge colors based on status (using blue/purple tones for due dates)
  const getBadgeColors = () => {
    switch (status) {
      case 'past_due':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
      case 'due_today':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800'
      case 'due_soon':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800'
      case 'upcoming':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
    }
  }

  // Get icon based on status
  const getIcon = () => {
    if (status === 'past_due' || status === 'due_today') {
      return <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
    }
    return <Clock className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
  }

  // Get label text
  const getLabel = () => {
    if (status === 'past_due') {
      const daysOverdue = Math.abs(daysUntil)
      if (daysOverdue === 0) return 'Past due'
      return daysOverdue === 1 ? 'Past due 1d' : `Past due ${daysOverdue}d`
    }
    if (status === 'due_today') return 'Due today'
    if (daysUntil === 1) return 'Due tomorrow'
    if (daysUntil <= 7) return `Due in ${daysUntil}d`
    if (daysUntil <= 30) return `Due in ${Math.ceil(daysUntil / 7)}w`
    return `Due ${dueDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
  }

  // Toggle tracking
  const handleToggleTracking = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (!documentId || !userId || isToggling) return

    setIsToggling(true)
    const newValue = !localTrackingEnabled

    try {
      const res = await fetch(`/api/documents/${documentId}/due-date`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingEnabled: newValue, userId }),
      })

      if (res.ok) {
        setLocalTrackingEnabled(newValue)
        onTrackingToggle?.(newValue)
      }
    } catch (error) {
      console.error('Error toggling due date tracking:', error)
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
        title={`Due: ${dueDateObj.toLocaleDateString()}`}
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
          title={localTrackingEnabled ? 'Due date tracking enabled - click to disable' : 'Due date tracking disabled - click to enable'}
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
export function DueDateBadgeCompact({
  dueDate,
  className = '',
}: {
  dueDate: string | null | undefined
  className?: string
}) {
  if (!dueDate) return null

  const dueDateObj = new Date(dueDate)
  const daysUntil = getDaysUntilDue(dueDateObj)
  const status = getDueDateStatus(daysUntil)

  const getColor = () => {
    switch (status) {
      case 'past_due':
        return 'text-red-600 dark:text-red-400'
      case 'due_today':
        return 'text-orange-600 dark:text-orange-400'
      case 'due_soon':
        return 'text-amber-600 dark:text-amber-400'
      case 'upcoming':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return 'text-slate-500 dark:text-slate-400'
    }
  }

  const getLabel = () => {
    if (status === 'past_due') return 'Past due'
    if (status === 'due_today') return 'Today!'
    if (daysUntil <= 7) return `${daysUntil}d`
    return dueDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <span className={`inline-flex items-center gap-1 text-xs ${getColor()} ${className}`}>
      {(status === 'past_due' || status === 'due_today') && (
        <AlertTriangle className="w-3 h-3" />
      )}
      {getLabel()}
    </span>
  )
}
