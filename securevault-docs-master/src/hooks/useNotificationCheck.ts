'use client'

import { useEffect, useRef } from 'react'

/**
 * Hook to check for urgent notifications on dashboard load.
 * This ensures users see important notifications even if the cron job hasn't run.
 *
 * Usage:
 * ```tsx
 * function Dashboard() {
 *   const { user } = useAuth()
 *   useNotificationCheck(user?.id)
 *   // ...
 * }
 * ```
 */
export function useNotificationCheck(userId: string | undefined | null) {
  const hasChecked = useRef(false)

  useEffect(() => {
    // Only check once per session and only if we have a userId
    if (!userId || hasChecked.current) {
      return
    }

    hasChecked.current = true

    const checkUrgentNotifications = async () => {
      try {
        const response = await fetch('/api/notifications/check-urgent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        })

        if (response.ok) {
          const data = await response.json()
          if (data.created > 0) {
            console.log(`[NotificationCheck] Created ${data.created} urgent notifications`)
            // Optionally trigger a refetch of notifications
            // This could dispatch an event or use a callback
            window.dispatchEvent(new CustomEvent('notifications-updated'))
          }
        }
      } catch (error) {
        console.error('[NotificationCheck] Error checking notifications:', error)
      }
    }

    // Check after a short delay to not block initial render
    const timeoutId = setTimeout(checkUrgentNotifications, 1000)

    return () => clearTimeout(timeoutId)
  }, [userId])
}

/**
 * Hook to listen for notification updates
 * Use this in components that need to refresh when notifications are created
 *
 * Usage:
 * ```tsx
 * function NotificationBell() {
 *   useNotificationUpdateListener(() => {
 *     fetchNotifications()
 *   })
 * }
 * ```
 */
export function useNotificationUpdateListener(callback: () => void) {
  useEffect(() => {
    const handleUpdate = () => callback()

    window.addEventListener('notifications-updated', handleUpdate)

    return () => {
      window.removeEventListener('notifications-updated', handleUpdate)
    }
  }, [callback])
}
