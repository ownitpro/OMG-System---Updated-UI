// Push Notification Utilities
// Handles push subscription, permission management, and notification sending

import { updateOfflineSettings, getOfflineSettings } from './offline-storage'

// VAPID public key (should be in environment variable in production)
// Generate with: npx web-push generate-vapid-keys
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''

// Convert base64 string to Uint8Array for VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// Check if push notifications are supported
export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  )
}

// Get current notification permission status
export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isPushSupported()) return 'unsupported'
  return Notification.permission
}

// Request notification permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isPushSupported()) {
    console.warn('[PUSH] Push notifications not supported')
    throw new Error('Push notifications not supported')
  }

  const permission = await Notification.requestPermission()
  console.log('[PUSH] Permission result:', permission)
  return permission
}

// Subscribe to push notifications
export async function subscribeToPush(): Promise<PushSubscription | null> {
  if (!isPushSupported()) {
    console.warn('[PUSH] Push notifications not supported')
    return null
  }

  try {
    // Check permission first
    if (Notification.permission !== 'granted') {
      const permission = await requestNotificationPermission()
      if (permission !== 'granted') {
        console.log('[PUSH] Permission denied')
        return null
      }
    }

    // Get service worker registration
    const registration = await navigator.serviceWorker.ready
    console.log('[PUSH] Service worker ready')

    // Check for existing subscription
    let subscription = await registration.pushManager.getSubscription()

    if (subscription) {
      console.log('[PUSH] Already subscribed')
      return subscription
    }

    // Create new subscription
    if (!VAPID_PUBLIC_KEY) {
      console.warn('[PUSH] VAPID public key not configured')
      // For development, we can still enable in-app notifications
      await updateOfflineSettings({ notificationsEnabled: true })
      return null
    }

    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as any,
    })

    console.log('[PUSH] Subscribed successfully')

    // Save subscription to settings
    await updateOfflineSettings({
      notificationsEnabled: true,
      pushSubscription: subscription.toJSON(),
    })

    // Send subscription to server
    await saveSubscriptionToServer(subscription)

    return subscription
  } catch (error) {
    console.error('[PUSH] Failed to subscribe:', error)
    throw error
  }
}

// Unsubscribe from push notifications
export async function unsubscribeFromPush(): Promise<boolean> {
  if (!isPushSupported()) return false

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()

    if (subscription) {
      await subscription.unsubscribe()

      // Remove from server
      await removeSubscriptionFromServer(subscription)

      console.log('[PUSH] Unsubscribed successfully')
    }

    // Update settings
    await updateOfflineSettings({
      notificationsEnabled: false,
      pushSubscription: undefined,
    })

    return true
  } catch (error) {
    console.error('[PUSH] Failed to unsubscribe:', error)
    throw error
  }
}

// Get current push subscription
export async function getPushSubscription(): Promise<PushSubscription | null> {
  if (!isPushSupported()) return null

  try {
    const registration = await navigator.serviceWorker.ready
    return await registration.pushManager.getSubscription()
  } catch (error) {
    console.error('[PUSH] Failed to get subscription:', error)
    return null
  }
}

// Save subscription to server
async function saveSubscriptionToServer(subscription: PushSubscription): Promise<void> {
  try {
    const response = await fetch('/api/notifications/push-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to save subscription')
    }

    console.log('[PUSH] Subscription saved to server')
  } catch (error) {
    console.error('[PUSH] Failed to save subscription to server:', error)
    // Don't throw - subscription is still valid locally
  }
}

// Remove subscription from server
async function removeSubscriptionFromServer(subscription: PushSubscription): Promise<void> {
  try {
    await fetch('/api/notifications/push-subscription', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
      }),
    })

    console.log('[PUSH] Subscription removed from server')
  } catch (error) {
    console.error('[PUSH] Failed to remove subscription from server:', error)
  }
}

// Show local notification (when app is in foreground)
export async function showLocalNotification(
  title: string,
  options?: NotificationOptions
): Promise<void> {
  if (!isPushSupported() || Notification.permission !== 'granted') {
    console.log('[PUSH] Cannot show notification - not permitted')
    return
  }

  try {
    const registration = await navigator.serviceWorker.ready
    await registration.showNotification(title, {
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      ...options,
    } as any)
  } catch (error) {
    console.error('[PUSH] Failed to show notification:', error)
  }
}

// Notification types for the app
export interface ExpirationNotification {
  type: 'expiration'
  documentId: string
  documentName: string
  expirationDate: string
  daysRemaining: number
}

export interface SharedDocumentNotification {
  type: 'shared'
  documentId: string
  documentName: string
  sharedBy: string
}

export interface UploadCompleteNotification {
  type: 'upload_complete'
  documentId: string
  documentName: string
}

export type AppNotification =
  | ExpirationNotification
  | SharedDocumentNotification
  | UploadCompleteNotification

// Send app-specific notifications
export async function sendAppNotification(notification: AppNotification): Promise<void> {
  const settings = await getOfflineSettings()
  if (!settings.notificationsEnabled) return

  switch (notification.type) {
    case 'expiration':
      await showLocalNotification('Document Expiring Soon', {
        body: `${notification.documentName} expires in ${notification.daysRemaining} days`,
        data: {
          type: 'expiration',
          documentId: notification.documentId,
          url: `/documents?id=${notification.documentId}`,
        },
        tag: `expiration-${notification.documentId}`,
        requireInteraction: notification.daysRemaining <= 7,
      })
      break

    case 'shared':
      await showLocalNotification('Document Shared With You', {
        body: `${notification.sharedBy} shared "${notification.documentName}" with you`,
        data: {
          type: 'shared',
          documentId: notification.documentId,
          url: `/documents?id=${notification.documentId}`,
        },
        tag: `shared-${notification.documentId}`,
      })
      break

    case 'upload_complete':
      await showLocalNotification('Upload Complete', {
        body: `${notification.documentName} has been uploaded successfully`,
        data: {
          type: 'upload_complete',
          documentId: notification.documentId,
          url: `/documents?id=${notification.documentId}`,
        },
        tag: `upload-${notification.documentId}`,
      })
      break
  }
}

// Check and notify about expiring documents
export async function checkExpiringDocuments(expirations: any[]): Promise<void> {
  const settings = await getOfflineSettings()
  if (!settings.notificationsEnabled) return

  // Get notified document IDs from localStorage to avoid duplicate notifications
  const notifiedKey = 'notified-expirations'
  const notifiedStr = localStorage.getItem(notifiedKey) || '[]'
  const notifiedIds = new Set(JSON.parse(notifiedStr))

  for (const doc of expirations) {
    // Skip if already notified
    if (notifiedIds.has(doc.id)) continue

    const expirationDate = new Date(doc.expirationDate)
    const now = new Date()
    const daysRemaining = Math.ceil(
      (expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    )

    // Notify for documents expiring within 30 days
    if (daysRemaining <= 30 && daysRemaining > 0) {
      await sendAppNotification({
        type: 'expiration',
        documentId: doc.id,
        documentName: doc.name,
        expirationDate: doc.expirationDate,
        daysRemaining,
      })

      // Mark as notified
      notifiedIds.add(doc.id)
    }
  }

  // Save notified IDs
  localStorage.setItem(notifiedKey, JSON.stringify([...notifiedIds]))
}
