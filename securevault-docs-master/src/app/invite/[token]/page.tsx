'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Building2, Shield, UserCheck, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { use } from 'react'

interface InviteDetails {
  id: string
  organizationId: string
  email: string
  role: string
  expiresAt: string
  Organization: {
    name: string
  }
  InvitedBy: {
    name: string
    email: string
  }
}

export default function AcceptInvitePage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { user } = useAuth()
  const [invite, setInvite] = useState<InviteDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [accepting, setAccepting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchInviteDetails()
  }, [resolvedParams.token])

  const fetchInviteDetails = async () => {
    try {
      const response = await fetch(`/api/invites/${resolvedParams.token}`)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Invalid or expired invitation')
      }

      const data = await response.json()
      setInvite(data.invite)

      // Check if invite is expired
      if (new Date(data.invite.expiresAt) < new Date()) {
        setError('This invitation has expired')
      }
    } catch (error: any) {
      console.error('Error fetching invite:', error)
      setError(error.message || 'Failed to load invitation')
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async () => {
    if (!user) {
      // Redirect to login/signup with return URL
      router.push(`/login?redirect=/invite/${resolvedParams.token}`)
      return
    }

    // Check if user email matches invite email
    if (user.email !== invite?.email) {
      setError(`This invitation is for ${invite?.email}. You are signed in as ${user.email}. Please sign in with the correct account.`)
      return
    }

    setAccepting(true)

    try {
      const response = await fetch(`/api/invites/${resolvedParams.token}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to accept invitation')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/settings/members')
      }, 2000)
    } catch (error: any) {
      console.error('Error accepting invite:', error)
      setError(error.message || 'Failed to accept invitation')
    } finally {
      setAccepting(false)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-5 h-5 text-purple-600" />
      case 'member':
        return <UserCheck className="w-5 h-5 text-blue-600" />
      case 'viewer':
        return <Mail className="w-5 h-5 text-gray-600" />
      default:
        return null
    }
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Full access to manage organization, members, and documents'
      case 'member':
        return 'Can view, create, and edit documents'
      case 'viewer':
        return 'Can view documents only'
      default:
        return ''
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error && !invite) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Invalid Invitation
          </h1>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Welcome to {invite?.Organization.name}!
          </h1>
          <p className="text-gray-600 text-center mb-6">
            You've successfully joined the organization. Redirecting...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
          <Building2 className="w-8 h-8 text-blue-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          You've Been Invited!
        </h1>

        <p className="text-gray-600 text-center mb-6">
          {invite?.InvitedBy.name || invite?.InvitedBy.email} has invited you to join
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-500">Organization</p>
              <p className="font-semibold text-gray-900">{invite?.Organization.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-5 h-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-500">Invited Email</p>
              <p className="font-semibold text-gray-900">{invite?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {invite && getRoleIcon(invite.role)}
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold text-gray-900 capitalize">{invite?.role}</p>
              <p className="text-xs text-gray-500 mt-1">
                {invite && getRoleDescription(invite.role)}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {!user ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 text-center mb-4">
              Sign in or create an account to accept this invitation
            </p>
            <button
              onClick={() => router.push(`/login?redirect=/invite/${resolvedParams.token}`)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push(`/signup?redirect=/invite/${resolvedParams.token}`)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Create Account
            </button>
          </div>
        ) : user.email === invite?.email ? (
          <button
            onClick={handleAccept}
            disabled={accepting}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {accepting ? 'Accepting...' : 'Accept Invitation'}
          </button>
        ) : (
          <div>
            <p className="text-sm text-gray-600 text-center mb-4">
              You're signed in as <strong>{user.email}</strong>. Please sign in with <strong>{invite?.email}</strong> to accept this invitation.
            </p>
            <button
              onClick={() => router.push('/auth/logout')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Sign Out
            </button>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          This invitation expires on {invite && new Date(invite.expiresAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
