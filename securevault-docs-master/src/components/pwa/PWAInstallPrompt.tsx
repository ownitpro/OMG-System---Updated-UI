'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Download, Smartphone, CheckCircle, Wifi, WifiOff, Bell, RefreshCw } from 'lucide-react'

// BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

// Constants for dismiss timing
const DISMISS_DURATION_DAYS = 7 // Show again after 7 days
const PERMANENT_OPT_OUT_KEY = 'pwa-prompt-opted-out'
const DISMISS_TIMESTAMP_KEY = 'pwa-prompt-dismissed'

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [showUpdateBanner, setShowUpdateBanner] = useState(false)
  const [hasNativePrompt, setHasNativePrompt] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    console.log('[PWA] PWAInstallPrompt component mounted')

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('[PWA] Already installed in standalone mode')
      setIsInstalled(true)
      return
    }

    // Check if user permanently opted out
    const optedOut = localStorage.getItem(PERMANENT_OPT_OUT_KEY)
    if (optedOut === 'true') {
      console.log('[PWA] User permanently opted out of install prompt')
      return
    }

    // Check if user dismissed recently (within DISMISS_DURATION_DAYS)
    const dismissed = localStorage.getItem(DISMISS_TIMESTAMP_KEY)
    if (dismissed) {
      const dismissedDate = new Date(dismissed)
      const now = new Date()
      const daysSinceDismiss = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)

      if (daysSinceDismiss < DISMISS_DURATION_DAYS) {
        console.log(`[PWA] Dismissed ${daysSinceDismiss.toFixed(1)} days ago, waiting ${DISMISS_DURATION_DAYS} days`)
        return
      } else {
        console.log('[PWA] Dismiss period expired, can show prompt again')
        localStorage.removeItem(DISMISS_TIMESTAMP_KEY)
      }
    }

    // Track if we got the native prompt
    let gotNativePrompt = false

    // Helper to check if prompt should be shown (re-check localStorage)
    const shouldShowPrompt = () => {
      // Check if permanently opted out
      if (localStorage.getItem(PERMANENT_OPT_OUT_KEY) === 'true') {
        return false
      }
      // Check if dismissed recently
      const dismissed = localStorage.getItem(DISMISS_TIMESTAMP_KEY)
      if (dismissed) {
        const dismissedDate = new Date(dismissed)
        const now = new Date()
        const daysSinceDismiss = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)
        if (daysSinceDismiss < DISMISS_DURATION_DAYS) {
          return false
        }
      }
      return true
    }

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('[PWA] beforeinstallprompt event fired')
      e.preventDefault()
      gotNativePrompt = true
      setHasNativePrompt(true)
      setDeferredPrompt(e)
      // Delay showing prompt for better UX (5 seconds), but re-check if dismissed
      setTimeout(() => {
        if (shouldShowPrompt()) {
          setShowPrompt(true)
        }
      }, 5000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Fallback: Show custom install banner after 8 seconds if no native prompt
    const fallbackTimer = setTimeout(() => {
      if (!gotNativePrompt && shouldShowPrompt()) {
        console.log('[PWA] No beforeinstallprompt event after 8s, showing custom banner')
        setShowPrompt(true)
      }
    }, 8000)

    // Listen for app installed
    const handleAppInstalled = () => {
      console.log('[PWA] App installed!')
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }
    window.addEventListener('appinstalled', handleAppInstalled)

    // Online/offline status
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        console.log('[PWA] Service worker ready')
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setShowUpdateBanner(true)
              }
            })
          }
        })
      })
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearTimeout(fallbackTimer)
    }
  }, []) // Empty dependency array - only run once on mount

  const handleInstall = useCallback(async () => {
    if (deferredPrompt) {
      // Native install prompt available
      try {
        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        if (outcome === 'accepted') {
          setIsInstalled(true)
        }
        setShowPrompt(false)
        setDeferredPrompt(null)
      } catch (error) {
        console.error('Install prompt error:', error)
      }
    } else {
      // No native prompt - show manual instructions
      // For Chrome/Edge: Menu > Install app or Add to Home screen
      // For Safari: Share > Add to Home Screen
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

      if (isIOS || isSafari) {
        alert('To install: Tap the Share button, then "Add to Home Screen"')
      } else {
        alert('To install: Click the browser menu (⋮) and select "Install app" or "Add to Home screen"')
      }
    }
  }, [deferredPrompt])

  const handleDismiss = useCallback(() => {
    setShowPrompt(false)
    if (dontShowAgain) {
      // Permanently opt out
      localStorage.setItem(PERMANENT_OPT_OUT_KEY, 'true')
      localStorage.removeItem(DISMISS_TIMESTAMP_KEY)
    } else {
      // Dismiss for 7 days
      localStorage.setItem(DISMISS_TIMESTAMP_KEY, new Date().toISOString())
    }
  }, [dontShowAgain])

  const handleUpdate = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        }
      })
      window.location.reload()
    }
  }, [])

  // Offline indicator
  if (!isOnline) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
        <div className="bg-amber-500 text-white rounded-lg shadow-lg p-4 flex items-center gap-3">
          <WifiOff className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm">You&apos;re offline</p>
            <p className="text-xs opacity-90">Some features may be limited</p>
          </div>
        </div>
      </div>
    )
  }

  // Update banner
  if (showUpdateBanner) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
        <div className="bg-blue-600 text-white rounded-lg shadow-lg p-4">
          <div className="flex items-start gap-3">
            <RefreshCw className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-sm">Update available</p>
              <p className="text-xs opacity-90 mt-1">
                A new version of SecureVault is available. Reload to update.
              </p>
            </div>
            <button
              onClick={() => setShowUpdateBanner(false)}
              className="p-1 hover:bg-white/10 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-white text-blue-600 text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-50 transition-colors"
            >
              Reload Now
            </button>
            <button
              onClick={() => setShowUpdateBanner(false)}
              className="px-4 py-2 text-sm hover:bg-white/10 rounded-md transition-colors"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Install prompt
  if (!showPrompt || isInstalled) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Install SecureVault</h3>
                <p className="text-xs opacity-90">Add to your home screen</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span>Quick access from your home screen</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <Wifi className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span>Works offline - view documents anywhere</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <Bell className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span>Get notified about expiring documents</span>
          </div>
        </div>

        {/* Opt-out checkbox */}
        <div className="px-4 pb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Don&apos;t show this again
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="p-4 pt-2 flex gap-3">
          <button
            onClick={handleInstall}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            Install App
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  )
}

// Standalone status indicator for app shell
export function PWAStatusIndicator() {
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (!isStandalone) return null

  return (
    <div className="fixed top-2 right-2 z-50 bg-green-500/10 text-green-600 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
      App Mode
    </div>
  )
}
