'use client'

import { useState, useEffect, useCallback } from 'react'
import { Bell, Check, CheckCheck, FileWarning, Calendar, ExternalLink, Clock, AlertCircle, Upload, HardDrive, AlertTriangle, Cpu, Trash2, Filter, Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'

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

export default function NotificationList() {
  const { user } = useAuth()
  const router = useRouter()
  const { isDarkMode } = useTheme()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const LIMIT = 20

  const fetchNotifications = useCallback(async (reset = false) => {
    if (!user?.id) return

    try {
      setIsLoading(true)
      const currentPage = reset ? 0 : page
      const offset = currentPage * LIMIT
      const res = await fetch(`/api/notifications?userId=${user.id}&limit=${LIMIT}&offset=${offset}&unreadOnly=${filter === 'unread'}`)
      
      if (res.ok) {
        const data = await res.json()
        if (reset) {
          setNotifications(data.notifications || [])
        } else {
          setNotifications(prev => [...prev, ...(data.notifications || [])])
        }
        setUnreadCount(data.unreadCount || 0)
        setHasMore(data.hasMore || false)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user?.id, filter, page])

  useEffect(() => {
    fetchNotifications(true)
  }, [filter, user?.id])

  const loadMore = () => {
    setPage(prev => prev + 1)
  }

  useEffect(() => {
    if (page > 0) {
      fetchNotifications()
    }
  }, [page])

  const markAsRead = async (notificationId: string) => {
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
      
      // Update bell icon unread count globally
      window.dispatchEvent(new CustomEvent('notifications-updated'))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
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
      
      // Update bell icon unread count globally
      window.dispatchEvent(new CustomEvent('notifications-updated'))
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const getNotificationIcon = (type: string) => {
    if (type === 'expiration_today' || type === 'document_expired') return <FileWarning className="w-5 h-5 text-red-500" />
    if (type.startsWith('expiration_')) return <Calendar className="w-5 h-5 text-orange-500" />
    if (type === 'due_date_today' || type === 'past_due') return <Clock className="w-5 h-5 text-red-500" />
    if (type.startsWith('due_date_')) return <Clock className="w-5 h-5 text-blue-500" />
    if (type === 'client_upload') return <Upload className="w-5 h-5 text-green-500" />
    if (type.startsWith('storage_')) return <HardDrive className="w-5 h-5 text-red-500" />
    if (type.startsWith('pu_') || type === 'usage_alert') return <Cpu className="w-5 h-5 text-orange-500" />
    return <Bell className="w-5 h-5 text-blue-500" />
  }

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
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h1>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Stay updated with your document expirations and system alerts
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </div>

      <div className={`rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} overflow-hidden shadow-sm`}>
        {/* Filters */}
        <div className={`px-4 py-3 border-b flex items-center gap-4 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
          <button
            onClick={() => { setFilter('all'); setPage(0); }}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              filter === 'all'
                ? isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900'
                : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => { setFilter('unread'); setPage(0); }}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              filter === 'unread'
                ? isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900'
                : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100 dark:divide-slate-700">
          {isLoading && notifications.length === 0 ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
              <p className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className={`w-12 h-12 mx-auto mb-4 opacity-20 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
              <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No notifications</h3>
              <p className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>
                {filter === 'unread' ? "You've read all your notifications!" : "We'll let you know when something happens."}
              </p>
            </div>
          ) : (
            <>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 flex gap-4 transition-colors ${
                    !n.readAt ? isDarkMode ? 'bg-blue-900/10' : 'bg-blue-50/50' : ''
                  } hover:bg-gray-50 dark:hover:bg-slate-700/50`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {n.title}
                        </h4>
                        <p className={`text-sm mt-1 mb-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                          {n.message}
                        </p>
                      </div>
                      <span className={`text-xs whitespace-nowrap ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                        {formatTimeAgo(n.createdAt)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2">
                      {n.documentId && (
                        <button
                          onClick={() => router.push(`/documents?doc=${n.documentId}`)}
                          className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Document
                        </button>
                      )}
                      {!n.readAt && (
                        <button
                          onClick={() => markAsRead(n.id)}
                          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {hasMore && (
                <div className="p-4 text-center">
                  <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                      isDarkMode 
                        ? 'border-slate-600 text-slate-300 hover:bg-slate-700' 
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    } transition-colors disabled:opacity-50`}
                  >
                    {isLoading ? 'Loading...' : 'Load more notifications'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
