'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Bell, X, Check, CheckCheck, FileWarning, Calendar, ExternalLink, Clock, AlertCircle, Upload, HardDrive, AlertTriangle, Cpu } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  documentId?: string
  readAt: string | null
  createdAt: string
}

interface NotificationBellProps {
  className?: string
}

export default function NotificationBell({ className = '' }: NotificationBellProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return

    try {
      setIsLoading(true)
      const res = await fetch(`/api/notifications?userId=${user.id}&limit=10`)
      if (res.ok) {
        const data = await res.json()
        setNotifications(data.notifications || [])
        setUnreadCount(data.unreadCount || 0)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user?.id])

  // Fetch on mount and periodically
  useEffect(() => {
    fetchNotifications()

    // Poll every 60 seconds
    const interval = setInterval(fetchNotifications, 60000)

    // Listen for notification updates from useNotificationCheck hook
    const handleNotificationUpdate = () => {
      fetchNotifications()
    }
    window.addEventListener('notifications-updated', handleNotificationUpdate)

    return () => {
      clearInterval(interval)
      window.removeEventListener('notifications-updated', handleNotificationUpdate)
    }
  }, [fetchNotifications])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    if (!user?.id) return

    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, notificationId }),
      })

      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, readAt: new Date().toISOString() } : n
        )
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }, [user?.id])

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    if (!user?.id) return

    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, markAllAsRead: true }),
      })

      setNotifications(prev =>
        prev.map(n => ({ ...n, readAt: new Date().toISOString() }))
      )
      setUnreadCount(0)
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }, [user?.id])

  // Navigate to document
  const navigateToDocument = useCallback((documentId: string) => {
    setIsOpen(false)
    // Navigate to documents page with the document selected
    router.push(`/documents?doc=${documentId}`)
  }, [router])

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    // Expiration notifications (90/60/30/15/7/2/1 days before)
    if (type === 'expiration_today') {
      return <FileWarning className="w-5 h-5 text-red-500" />
    }
    if (type === 'document_expired') {
      return <FileWarning className="w-5 h-5 text-red-600" />
    }
    if (type === 'expiration_1d' || type === 'expiration_2d') {
      return <AlertTriangle className="w-5 h-5 text-red-500" />
    }
    if (type === 'expiration_7d' || type === 'expiration_15d') {
      return <Calendar className="w-5 h-5 text-orange-500" />
    }
    if (type.startsWith('expiration_')) {
      return <Calendar className="w-5 h-5 text-yellow-500" />
    }

    // Due date notifications
    if (type === 'due_date_today') {
      return <Clock className="w-5 h-5 text-red-500" />
    }
    if (type === 'past_due') {
      return <AlertCircle className="w-5 h-5 text-red-600" />
    }
    if (type === 'due_date_1d') {
      return <Clock className="w-5 h-5 text-orange-500" />
    }
    if (type.startsWith('due_date_')) {
      return <Clock className="w-5 h-5 text-blue-500" />
    }

    // Client upload notifications
    if (type === 'client_upload') {
      return <Upload className="w-5 h-5 text-green-500" />
    }

    // Storage notifications
    if (type === 'storage_full' || type === 'storage_warning_90') {
      return <HardDrive className="w-5 h-5 text-red-500" />
    }
    if (type === 'storage_warning_75') {
      return <HardDrive className="w-5 h-5 text-orange-500" />
    }

    // Processing Units / Usage alert notifications
    if (type === 'usage_alert') {
      return <Cpu className="w-5 h-5 text-orange-500" />
    }
    if (type === 'pu_exhausted' || type === 'processing_limit') {
      return <Cpu className="w-5 h-5 text-red-500" />
    }

    // Legacy types
    if (type === 'expiration_warning') {
      return <Calendar className="w-5 h-5 text-orange-500" />
    }

    // Default
    return <Bell className="w-5 h-5 text-blue-500" />
  }

  // Format time ago
  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-teal-100 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <CheckCheck className="w-3 h-3" />
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading && notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400 mx-auto mb-2" />
                Loading...
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <ul>
                {notifications.map(notification => (
                  <li
                    key={notification.id}
                    className={`px-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                      !notification.readAt ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {formatTimeAgo(notification.createdAt)}
                          </span>
                          {notification.documentId && (
                            <button
                              onClick={() => navigateToDocument(notification.documentId!)}
                              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              View document
                            </button>
                          )}
                          {!notification.readAt && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push('/notifications')
                }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline w-full text-center"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
