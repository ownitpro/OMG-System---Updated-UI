'use client'

import { useState, useEffect } from 'react'
import {
  Bell,
  BellOff,
  Loader2,
  AlertCircle,
  CheckCircle,
  Smartphone,
  Wifi,
  WifiOff,
  HardDrive,
  Trash2,
} from 'lucide-react'
import {
  isPushSupported,
  getNotificationPermission,
  subscribeToPush,
  unsubscribeFromPush,
  getPushSubscription,
} from '@/lib/pwa/push-notifications'
import {
  getOfflineSettings,
  updateOfflineSettings,
  getCacheSize,
  clearDocumentCache,
  getSyncStatus,
  type OfflineSettings,
  type SyncStatus,
} from '@/lib/pwa/offline-storage'

// PostgreSQL returns BIGINT as string, so we handle both number and string inputs
function formatBytes(bytes: number | string): string {
  const numBytes = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes
  if (!numBytes || numBytes === 0 || isNaN(numBytes)) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.min(Math.floor(Math.log(numBytes) / Math.log(k)), sizes.length - 1)
  return parseFloat((numBytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function NotificationSettings() {
  const [settings, setSettings] = useState<OfflineSettings | null>(null)
  const [isSupported, setIsSupported] = useState(true)
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cacheSize, setCacheSize] = useState(0)
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null)

  useEffect(() => {
    loadSettings()
    loadCacheInfo()
  }, [])

  const loadSettings = async () => {
    const supported = isPushSupported()
    setIsSupported(supported)
    setPermission(getNotificationPermission())

    const currentSettings = await getOfflineSettings()
    setSettings(currentSettings)
  }

  const loadCacheInfo = async () => {
    const size = await getCacheSize()
    setCacheSize(size)

    const status = await getSyncStatus()
    setSyncStatus(status)
  }

  const handleToggleNotifications = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (settings?.notificationsEnabled) {
        await unsubscribeFromPush()
        setSettings((prev) => prev ? { ...prev, notificationsEnabled: false } : null)
      } else {
        const subscription = await subscribeToPush()
        if (subscription || getNotificationPermission() === 'granted') {
          setSettings((prev) => prev ? { ...prev, notificationsEnabled: true } : null)
        }
        setPermission(getNotificationPermission())
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update notification settings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleAutoCache = async () => {
    if (!settings) return

    const newValue = !settings.autoCache
    await updateOfflineSettings({ autoCache: newValue })
    setSettings((prev) => prev ? { ...prev, autoCache: newValue } : null)
  }

  const handleClearCache = async () => {
    if (!confirm('This will remove all cached documents. Continue?')) return

    setIsLoading(true)
    try {
      await clearDocumentCache()
      setCacheSize(0)
    } catch (err) {
      setError('Failed to clear cache')
    } finally {
      setIsLoading(false)
    }
  }

  if (!settings) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Push Notifications Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Get notified about expiring documents and important updates
          </p>
        </div>

        <div className="p-4 space-y-4">
          {!isSupported && (
            <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-800 dark:text-amber-200">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">Push notifications are not supported in this browser.</p>
            </div>
          )}

          {permission === 'denied' && (
            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-800 dark:text-red-200">
              <BellOff className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Notifications blocked</p>
                <p className="text-xs mt-0.5">
                  Please enable notifications in your browser settings.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-800 dark:text-red-200">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.notificationsEnabled ? (
                <Bell className="h-5 w-5 text-blue-600" />
              ) : (
                <BellOff className="h-5 w-5 text-gray-400" />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {settings.notificationsEnabled ? 'Notifications enabled' : 'Notifications disabled'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive alerts for document expirations
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleNotifications}
              disabled={isLoading || !isSupported || permission === 'denied'}
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${settings.notificationsEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}
                ${(isLoading || !isSupported || permission === 'denied') ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                  transition duration-200 ease-in-out
                  ${settings.notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          {settings.notificationsEnabled && (
            <div className="pl-8 space-y-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Document expiration reminders</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Shared document notifications</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Upload completion alerts</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Offline Storage Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Offline Storage
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage cached documents for offline access
          </p>
        </div>

        <div className="p-4 space-y-4">
          {/* Cache Size */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Cached Documents</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatBytes(cacheSize)} used
              </p>
            </div>
            <button
              onClick={handleClearCache}
              disabled={isLoading || cacheSize === 0}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="h-4 w-4" />
              Clear Cache
            </button>
          </div>

          {/* Auto-cache toggle */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Auto-cache documents</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Automatically cache recently viewed documents
              </p>
            </div>
            <button
              onClick={handleToggleAutoCache}
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${settings.autoCache ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}
              `}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                  transition duration-200 ease-in-out
                  ${settings.autoCache ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          {/* Sync Status */}
          {syncStatus && (
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                {syncStatus.isOnline ? (
                  <>
                    <Wifi className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-300">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4 text-amber-500" />
                    <span className="text-gray-600 dark:text-gray-300">Offline</span>
                  </>
                )}
              </div>

              {syncStatus.pendingUploads > 0 && (
                <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {syncStatus.pendingUploads} upload(s) pending
                </div>
              )}

              {syncStatus.pendingChanges > 0 && (
                <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {syncStatus.pendingChanges} change(s) pending sync
                </div>
              )}

              {syncStatus.lastSync && (
                <p className="text-xs text-gray-400">
                  Last synced: {new Date(syncStatus.lastSync).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Install App Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Install App
          </h3>
        </div>

        <div className="p-4">
          {typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches ? (
            <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span>SecureVault is installed as an app</span>
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Install SecureVault as an app for quick access and offline functionality.
              Look for the install button in your browser&apos;s address bar or the prompt at the bottom of the screen.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
