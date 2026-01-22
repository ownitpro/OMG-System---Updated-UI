// SecureVault PWA Service Worker
// Handles offline caching, push notifications, and background sync
/// <reference lib="webworker" />

import { defaultCache } from '@serwist/next/worker'
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
import { Serwist, NetworkFirst, CacheFirst, ExpirationPlugin, CacheableResponsePlugin } from 'serwist'

// Service Worker globals
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope & typeof globalThis

// Initialize Serwist with default caching
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
})

// Register additional runtime caching rules
serwist.registerCapture(
  ({ url }) => url.pathname.startsWith('/api/documents'),
  new NetworkFirst({
    cacheName: 'documents-api-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
    networkTimeoutSeconds: 10,
  })
)

serwist.registerCapture(
  ({ url }) => url.pathname.startsWith('/api/folders'),
  new NetworkFirst({
    cacheName: 'folders-api-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
    networkTimeoutSeconds: 10,
  })
)

serwist.registerCapture(
  ({ url }) => url.pathname.startsWith('/api/users'),
  new NetworkFirst({
    cacheName: 'users-api-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 60 * 60 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
    networkTimeoutSeconds: 5,
  })
)

serwist.registerCapture(
  ({ url }) => url.pathname.startsWith('/api/notifications'),
  new NetworkFirst({
    cacheName: 'notifications-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 60 * 30 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
    networkTimeoutSeconds: 5,
  })
)

serwist.registerCapture(
  ({ url }) => url.pathname.startsWith('/api/expirations'),
  new NetworkFirst({
    cacheName: 'expirations-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 60 * 60 * 4 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
    networkTimeoutSeconds: 10,
  })
)

// Cache S3 images
serwist.registerCapture(
  ({ url }) => url.hostname.includes('s3') && url.hostname.includes('amazonaws.com'),
  new CacheFirst({
    cacheName: 's3-images-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  })
)

// Cache Google Fonts
serwist.registerCapture(
  ({ url }) => url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  })
)

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received:', event)

  if (!event.data) {
    console.log('[SW] No data in push event')
    return
  }

  try {
    const data = event.data.json()

    const options: NotificationOptions = {
      body: data.body || 'You have a new notification',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/dashboard',
        type: data.type || 'general',
        documentId: data.documentId,
      },
      actions: data.actions || [
        { action: 'view', title: 'View' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
      tag: data.tag || 'securevault-notification',
      renotify: true,
      requireInteraction: data.requireInteraction || false,
    }

    event.waitUntil(
      self.registration.showNotification(data.title || 'SecureVault Docs', options)
    )
  } catch (error) {
    console.error('[SW] Error parsing push data:', error)
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event)

  event.notification.close()

  const url = event.notification.data?.url || '/dashboard'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      // Check if a window is already open
      for (const client of clients) {
        if (client.url.includes(url) && 'focus' in client) {
          return client.focus()
        }
      }
      // Open new window if none exists
      if (self.clients.openWindow) {
        return self.clients.openWindow(url)
      }
    })
  )
})

// Background sync for offline uploads
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag)

  if (event.tag === 'upload-documents') {
    event.waitUntil(processOfflineUploads())
  }

  if (event.tag === 'sync-pending-changes') {
    event.waitUntil(syncPendingChanges())
  }
})

// Process offline document uploads
async function processOfflineUploads(): Promise<void> {
  console.log('[SW] Processing offline uploads...')

  try {
    // Get pending uploads from IndexedDB
    const pendingUploads = await getPendingUploads()

    for (const upload of pendingUploads) {
      try {
        // Attempt to upload
        const response = await fetch('/api/personal/upload/presign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: upload.fileName,
            contentType: upload.contentType,
            fileSize: upload.fileSize,
          }),
        })

        if (response.ok) {
          const { uploadUrl, key } = await response.json()

          // Upload to S3
          await fetch(uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': upload.contentType },
            body: upload.fileData,
          })

          // Create document record
          await fetch('/api/documents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: upload.fileName,
              s3Key: key,
              mimeType: upload.contentType,
              size: upload.fileSize,
              personalVaultId: upload.personalVaultId,
            }),
          })

          // Remove from pending
          await removePendingUpload(upload.id)

          // Notify user
          await self.registration.showNotification('Upload Complete', {
            body: `${upload.fileName} has been uploaded successfully`,
            icon: '/icons/icon-192x192.png',
            tag: 'upload-complete',
          })
        }
      } catch (error) {
        console.error('[SW] Failed to process upload:', upload.fileName, error)
      }
    }
  } catch (error) {
    console.error('[SW] Error processing offline uploads:', error)
  }
}

// Sync pending document changes
async function syncPendingChanges(): Promise<void> {
  console.log('[SW] Syncing pending changes...')

  try {
    const pendingChanges = await getPendingChanges()

    for (const change of pendingChanges) {
      try {
        const response = await fetch(change.url, {
          method: change.method,
          headers: change.headers,
          body: change.body,
        })

        if (response.ok) {
          await removePendingChange(change.id)
        }
      } catch (error) {
        console.error('[SW] Failed to sync change:', change.id, error)
      }
    }
  } catch (error) {
    console.error('[SW] Error syncing pending changes:', error)
  }
}

// IndexedDB helpers (simplified - full implementation in lib/offline-storage.ts)
async function getPendingUploads(): Promise<any[]> {
  // This will be implemented via postMessage to the main thread
  return []
}

async function removePendingUpload(id: string): Promise<void> {
  // Remove from IndexedDB
}

async function getPendingChanges(): Promise<any[]> {
  return []
}

async function removePendingChange(id: string): Promise<void> {
  // Remove from IndexedDB
}

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data)

  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  if (event.data?.type === 'CACHE_DOCUMENT') {
    // Cache a specific document for offline access
    event.waitUntil(cacheDocument(event.data.url, event.data.documentId))
  }

  if (event.data?.type === 'CLEAR_DOCUMENT_CACHE') {
    event.waitUntil(clearDocumentCache(event.data.documentId))
  }
})

// Cache a document for offline access
async function cacheDocument(url: string, documentId: string): Promise<void> {
  try {
    const cache = await caches.open('offline-documents')
    await cache.add(url)
    console.log('[SW] Cached document:', documentId)
  } catch (error) {
    console.error('[SW] Failed to cache document:', error)
  }
}

// Clear document from cache
async function clearDocumentCache(documentId: string): Promise<void> {
  try {
    const cache = await caches.open('offline-documents')
    const keys = await cache.keys()

    for (const request of keys) {
      if (request.url.includes(documentId)) {
        await cache.delete(request)
        console.log('[SW] Removed cached document:', documentId)
      }
    }
  } catch (error) {
    console.error('[SW] Failed to clear document cache:', error)
  }
}

// Initialize Serwist
serwist.addEventListeners()
