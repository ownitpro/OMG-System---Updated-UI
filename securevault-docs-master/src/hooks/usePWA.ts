'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  isPushSupported,
  getNotificationPermission,
  subscribeToPush,
  unsubscribeFromPush,
  checkExpiringDocuments,
} from '@/lib/pwa/push-notifications'
import {
  getOfflineSettings,
  getCacheSize,
  getSyncStatus,
  cacheDocumentFromUrl,
  getCachedDocument,
  getAllCachedDocuments,
  removeCachedDocument,
  type OfflineSettings,
  type SyncStatus,
  type CachedDocument,
} from '@/lib/pwa/offline-storage'
import {
  setupOnlineSync,
  queueOfflineUpload,
  queueDocumentChange,
  syncAll,
} from '@/lib/pwa/background-sync'

interface UsePWAReturn {
  // Status
  isOnline: boolean
  isInstalled: boolean
  isStandalone: boolean
  isPushEnabled: boolean
  notificationPermission: NotificationPermission | 'unsupported'

  // Settings
  settings: OfflineSettings | null
  cacheSize: number
  syncStatus: SyncStatus | null

  // Actions
  enableNotifications: () => Promise<boolean>
  disableNotifications: () => Promise<boolean>
  cacheDocument: (id: string, url: string, metadata: any) => Promise<void>
  uncacheDocument: (id: string) => Promise<void>
  getCachedDoc: (id: string) => Promise<CachedDocument | undefined>
  getAllCached: () => Promise<CachedDocument[]>
  uploadOffline: (file: File, options: any) => Promise<string>
  queueChange: (type: any, docId: string, request: any) => Promise<string>
  syncNow: () => Promise<any>
  refreshStatus: () => Promise<void>
}

export function usePWA(): UsePWAReturn {
  const [isOnline, setIsOnline] = useState(true)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isPushEnabled, setIsPushEnabled] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | 'unsupported'>('default')
  const [settings, setSettings] = useState<OfflineSettings | null>(null)
  const [cacheSize, setCacheSize] = useState(0)
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null)

  // Initialize
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check online status
    setIsOnline(navigator.onLine)

    // Check if installed/standalone
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
    setIsStandalone(isStandaloneMode)
    setIsInstalled(isStandaloneMode)

    // Check notification permission
    setNotificationPermission(getNotificationPermission())

    // Load settings
    loadSettings()

    // Online/offline listeners
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Setup background sync
    const cleanup = setupOnlineSync()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      cleanup()
    }
  }, [])

  const loadSettings = async () => {
    const currentSettings = await getOfflineSettings()
    setSettings(currentSettings)
    setIsPushEnabled(currentSettings.notificationsEnabled)

    const size = await getCacheSize()
    setCacheSize(size)

    const status = await getSyncStatus()
    setSyncStatus(status)
  }

  const refreshStatus = useCallback(async () => {
    await loadSettings()
  }, [])

  const enableNotifications = useCallback(async (): Promise<boolean> => {
    if (!isPushSupported()) return false

    try {
      await subscribeToPush()
      setIsPushEnabled(true)
      setNotificationPermission(getNotificationPermission())
      await loadSettings()
      return true
    } catch (error) {
      console.error('Failed to enable notifications:', error)
      return false
    }
  }, [])

  const disableNotifications = useCallback(async (): Promise<boolean> => {
    try {
      await unsubscribeFromPush()
      setIsPushEnabled(false)
      await loadSettings()
      return true
    } catch (error) {
      console.error('Failed to disable notifications:', error)
      return false
    }
  }, [])

  const cacheDocument = useCallback(async (
    id: string,
    url: string,
    metadata: { name: string; mimeType: string; size: number; folderId?: string; folderPath?: string; expiresAt?: string }
  ): Promise<void> => {
    await cacheDocumentFromUrl(id, url, metadata)
    const size = await getCacheSize()
    setCacheSize(size)
  }, [])

  const uncacheDocument = useCallback(async (id: string): Promise<void> => {
    await removeCachedDocument(id)
    const size = await getCacheSize()
    setCacheSize(size)
  }, [])

  const getCachedDoc = useCallback(async (id: string): Promise<CachedDocument | undefined> => {
    return getCachedDocument(id)
  }, [])

  const getAllCached = useCallback(async (): Promise<CachedDocument[]> => {
    return getAllCachedDocuments()
  }, [])

  const uploadOffline = useCallback(async (
    file: File,
    options: { personalVaultId?: string; organizationId?: string; folderId?: string }
  ): Promise<string> => {
    const id = await queueOfflineUpload(file, options)
    await refreshStatus()
    return id
  }, [refreshStatus])

  const queueChange = useCallback(async (
    type: 'rename' | 'move' | 'delete' | 'update-expiration',
    documentId: string,
    request: { url: string; method: string; headers?: Record<string, string>; body?: any }
  ): Promise<string> => {
    const id = await queueDocumentChange(type, documentId, request)
    await refreshStatus()
    return id
  }, [refreshStatus])

  const syncNow = useCallback(async () => {
    const result = await syncAll()
    await refreshStatus()
    return result
  }, [refreshStatus])

  return {
    isOnline,
    isInstalled,
    isStandalone,
    isPushEnabled,
    notificationPermission,
    settings,
    cacheSize,
    syncStatus,
    enableNotifications,
    disableNotifications,
    cacheDocument,
    uncacheDocument,
    getCachedDoc,
    getAllCached,
    uploadOffline,
    queueChange,
    syncNow,
    refreshStatus,
  }
}

// Hook specifically for document caching
export function useDocumentCache(documentId: string) {
  const [isCached, setIsCached] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    checkCache()
  }, [documentId])

  const checkCache = async () => {
    const cached = await getCachedDocument(documentId)
    setIsCached(!!cached)
  }

  const cache = async (url: string, metadata: any) => {
    setIsLoading(true)
    try {
      await cacheDocumentFromUrl(documentId, url, metadata)
      setIsCached(true)
    } finally {
      setIsLoading(false)
    }
  }

  const uncache = async () => {
    setIsLoading(true)
    try {
      await removeCachedDocument(documentId)
      setIsCached(false)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isCached,
    isLoading,
    cache,
    uncache,
  }
}

// Hook for checking expiring documents
export function useExpirationNotifications(expirations: any[]) {
  useEffect(() => {
    if (expirations.length > 0) {
      checkExpiringDocuments(expirations)
    }
  }, [expirations])
}
