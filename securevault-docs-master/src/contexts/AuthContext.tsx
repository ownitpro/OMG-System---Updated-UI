'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react'
import { Session } from 'next-auth'

// User interface matching the core.User table structure
interface User {
  id: string
  email: string | null
  name: string | null
  emailVerified: Date | null
  image: string | null
  plan: string
  accountType?: 'personal' | 'business'
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  stripeSubscriptionStatus: string | null
  stripePriceId: string | null
  subscriptionPeriodEnd: string | null
  trialStartedAt: string | null
  trialExpiresAt: string | null
  emailNotificationsEnabled?: boolean
  createdAt: Date
  updatedAt: Date
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, name?: string, accountType?: 'personal' | 'business') => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithMicrosoft: () => Promise<void>
  signInWithCognito: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: nextAuthSession, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Track if user data has been loaded to prevent re-fetching on tab visibility change
  const hasLoadedUserRef = useRef(false)
  const lastUserIdRef = useRef<string | null>(null)

  // Fetch user data from User table via API route
  const fetchUserData = useCallback(async (userId: string) => {
    try {
      // Validate user ID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      const demoIdRegex = /^demo-/

      if (!uuidRegex.test(userId) && !demoIdRegex.test(userId)) {
        console.error('[AUTH] Invalid user ID format detected:', userId)
        await nextAuthSignOut({ redirect: false })
        setUser(null)
        return
      }

      const response = await fetch(`/api/users/${userId}`)
      const data = await response.json()

      if (response.ok && data.user) {
        setUser(data.user as User)
      } else if (response.status === 400 && data.error?.includes('Invalid user ID')) {
        console.error('[AUTH] Corrupted session detected, signing out')
        await nextAuthSignOut({ redirect: false })
        setUser(null)
      } else {
        console.error('[AUTH] Error fetching user data:', data.error || 'Unknown error')
        // Create a basic user object from session if API fails
        if (nextAuthSession?.user) {
          setUser({
            id: userId,
            email: nextAuthSession.user.email || null,
            name: nextAuthSession.user.name || null,
            emailVerified: null,
            image: nextAuthSession.user.image || null,
            plan: 'free',
            accountType: nextAuthSession.user.accountType,
            stripeCustomerId: null,
            stripeSubscriptionId: null,
            stripeSubscriptionStatus: null,
            stripePriceId: null,
            subscriptionPeriodEnd: null,
            trialStartedAt: null,
            trialExpiresAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        }
      }
    } catch (error) {
      console.error('[AUTH] Error fetching user data:', error)
    }
  }, [nextAuthSession])

  // Handle session changes - only fetch when user actually changes
  useEffect(() => {
    if (status === 'loading') {
      setLoading(true)
      return
    }

    const currentUserId = nextAuthSession?.user?.id || null
    const userIdChanged = currentUserId !== lastUserIdRef.current

    // Skip if user hasn't changed and we already loaded data (prevents re-fetch on tab switch)
    if (!userIdChanged && hasLoadedUserRef.current && user) {
      console.log('[AUTH] Skipping user fetch - no actual change (tab visibility?)')
      setLoading(false)
      return
    }

    if (nextAuthSession?.user?.id) {
      // Validate user ID format before proceeding
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      const demoIdRegex = /^demo-/
      const userId = nextAuthSession.user.id

      if (!uuidRegex.test(userId) && !demoIdRegex.test(userId)) {
        // Corrupted session - auto sign out
        console.error('[AUTH] Corrupted user ID detected, forcing sign out:', userId)
        nextAuthSignOut({ redirect: true, callbackUrl: '/login?error=session_corrupted' })
        return
      }

      // Keep loading true until user data is fetched
      setLoading(true)
      lastUserIdRef.current = userId
      fetchUserData(userId).finally(() => {
        hasLoadedUserRef.current = true
        setLoading(false)
      })
    } else if (nextAuthSession && !nextAuthSession.user?.id) {
      // Session exists but no valid user ID - sign out
      console.error('[AUTH] Session exists but user ID is empty, forcing sign out')
      nextAuthSignOut({ redirect: true, callbackUrl: '/login?error=session_corrupted' })
      return
    } else {
      setUser(null)
      setLoading(false)
      // Reset tracking refs when user logs out
      hasLoadedUserRef.current = false
      lastUserIdRef.current = null
    }
  }, [nextAuthSession, status, fetchUserData, user])

  // Refresh user data
  const refreshUser = async () => {
    if (nextAuthSession?.user?.id) {
      await fetchUserData(nextAuthSession.user.id)
    }
  }

  // Sign up with email/password
  const signUp = async (email: string, password: string, name?: string, accountType: 'personal' | 'business' = 'personal') => {
    try {
      // Call signup API to create user in Cognito and database
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, accountType }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: { message: data.error || 'Failed to create account' } }
      }

      // Now sign in with the credentials
      const result = await nextAuthSignIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        // Account created but login failed - user may need to verify email
        console.log('[AUTH] Account created, but login failed:', result.error)
        return { error: { message: 'Account created! Please check your email to verify, then sign in.' } }
      }

      return { error: null }
    } catch (error) {
      console.error('[AUTH] Sign up error:', error)
      return { error }
    }
  }

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    try {
      const result = await nextAuthSignIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        return { error: { message: result.error } }
      }

      return { error: null }
    } catch (error) {
      console.error('[AUTH] Sign in error:', error)
      return { error }
    }
  }

  // Sign out
  const signOut = async () => {
    await nextAuthSignOut({ redirect: true, callbackUrl: '/login' })
    setUser(null)
  }

  // Sign in with Google (via Cognito or direct)
  const signInWithGoogle = async () => {
    await nextAuthSignIn('google', {
      callbackUrl: '/dashboard',
    })
  }

  // Sign in with Microsoft (via Cognito)
  const signInWithMicrosoft = async () => {
    // Microsoft auth is typically configured through Cognito
    await nextAuthSignIn('cognito', {
      callbackUrl: '/dashboard',
    })
  }

  // Sign in with Cognito hosted UI
  const signInWithCognito = async () => {
    await nextAuthSignIn('cognito', {
      callbackUrl: '/dashboard',
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session: nextAuthSession,
        loading,
        signUp,
        signIn,
        signOut,
        signInWithGoogle,
        signInWithMicrosoft,
        signInWithCognito,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
