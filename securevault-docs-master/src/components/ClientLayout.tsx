'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { OrganizationProvider } from '@/contexts/OrganizationContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ToastProvider } from '@/components/shared/ToastContainer'
import { PWAInstallPrompt } from '@/components/pwa/PWAInstallPrompt'

// One-time cleanup of corrupted localStorage data on app load
// This runs immediately before React hydration to prevent errors
if (typeof window !== 'undefined') {
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const DEMO_ORG_REGEX = /^org_demo(_\w+)?$/
  const isValidOrgId = (id: string) => UUID_REGEX.test(id) || DEMO_ORG_REGEX.test(id)

  // Clean up corrupted org ID from svd_active_org
  try {
    const activeOrg = localStorage.getItem('svd_active_org')
    if (activeOrg) {
      const parsed = JSON.parse(activeOrg)
      if (parsed.id && !isValidOrgId(parsed.id)) {
        console.log('[CLEANUP] Removing corrupted org ID from localStorage:', parsed.id.slice(0, 30))
        localStorage.removeItem('svd_active_org')
      }
    }
  } catch {
    localStorage.removeItem('svd_active_org')
  }

  // Also check for any other keys that might have corrupted org IDs
  const keysToCheck = ['svd_selected_org', 'selectedOrganization', 'activeOrganization']
  keysToCheck.forEach(key => {
    try {
      const value = localStorage.getItem(key)
      if (value) {
        const parsed = JSON.parse(value)
        const id = parsed.id || parsed.organizationId || parsed
        if (typeof id === 'string' && !isValidOrgId(id)) {
          console.log(`[CLEANUP] Removing corrupted data from ${key}`)
          localStorage.removeItem(key)
        }
      }
    } catch {
      // Ignore parse errors
    }
  })
}

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/pricing',
  '/features',
  '/docs',
  '/privacy',
  '/terms',
  '/support',
  '/contact-sales',
  '/community',
  '/faq',
  '/marketplace',
  '/install',
  '/try-demo',
  '/sales',
  '/demo',
  '/beta-terms',
]

// Routes that start with these paths are public
const PUBLIC_PATH_PREFIXES = [
  '/demo/',
  '/s/',           // Share links
  '/p/',           // Public portal links
  '/portal/',      // Guest portal access
  '/invite/',      // Invite links
]

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    // Don't redirect if still loading auth
    if (authLoading) return

    // Check if current route is public
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname) ||
      PUBLIC_PATH_PREFIXES.some(prefix => pathname?.startsWith(prefix))

    // Redirect to login if not authenticated and not on a public route
    if (!user && !isPublicRoute) {
      router.push('/login')
    }
  }, [authLoading, user, pathname, router])

  // Show loading spinner while checking auth on protected routes
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname) ||
    PUBLIC_PATH_PREFIXES.some(prefix => pathname?.startsWith(prefix))

  if (!isPublicRoute && (authLoading || !user)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <>{children}</>
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <AuthProvider>
          <AuthGuard>
            <OrganizationProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </OrganizationProvider>
          </AuthGuard>
          {/* PWA Install Prompt - outside AuthGuard so it shows on all pages */}
          <PWAInstallPrompt />
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
