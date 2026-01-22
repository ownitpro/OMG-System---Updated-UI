'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { User, Mail, Calendar, Shield, AlertCircle, CheckCircle, X, Camera, Sparkles, Crown, Save, Trash2, Bell, BellOff } from 'lucide-react'
import ProfileImageModal from '@/components/profile/ProfileImageModal'

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading, refreshUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true)
  const [savingEmailPref, setSavingEmailPref] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch profile image URL
  const fetchProfileImage = useCallback(async () => {
    if (!user?.id) return
    try {
      const response = await fetch('/api/user/profile/image', {
        headers: { 'x-user-id': user.id },
      })
      if (response.ok) {
        const data = await response.json()
        setProfileImageUrl(data.imageUrl)
      }
    } catch (err) {
      console.error('Error fetching profile image:', err)
    }
  }, [user?.id])

  useEffect(() => {
    fetchProfileImage()
  }, [fetchProfileImage])

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [authLoading, user, router])

  // Load user data
  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setEmail(user.email || '')
      // Default to true if not set
      setEmailNotificationsEnabled(user.emailNotificationsEnabled !== false)
    }
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id || '',
        },
        body: JSON.stringify({ name }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      // Refresh user data in context to reflect the updated name
      await refreshUser()
      setSuccess('Profile updated successfully')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleEmailNotifications = async () => {
    setSavingEmailPref(true)
    setError(null)

    const newValue = !emailNotificationsEnabled

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id || '',
        },
        body: JSON.stringify({ emailNotificationsEnabled: newValue }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update email preferences')
      }

      setEmailNotificationsEnabled(newValue)
      await refreshUser()
      setSuccess(newValue ? 'Email notifications enabled' : 'Email notifications disabled')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to update email preferences')
    } finally {
      setSavingEmailPref(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  const formatPlanDisplay = (plan: string | undefined, accountType: 'personal' | 'business' | undefined) => {
    const planValue = plan || 'free'

    // Map plan values to display names
    const planDisplayNames: Record<string, string> = {
      'free': 'Trial',
      'trial': 'Trial',
      'starter': 'Starter',
      'growth': 'Growth',
      'pro': 'Pro',
      'business_starter': 'Starter',
      'business_growth': 'Growth',
      'business_pro': 'Pro',
      'enterprise': 'Enterprise'
    }

    const tierName = planDisplayNames[planValue] || planValue
    const isBusinessPlan = planValue.startsWith('business_') || planValue === 'enterprise'
    const accountTypeLabel = accountType === 'business' || isBusinessPlan ? 'Business' : 'Personal'

    return `${accountTypeLabel} ${tierName}`
  }

  if (authLoading || !user) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500/20 border-t-teal-600"></div>
            <User className="absolute inset-0 m-auto w-5 h-5 text-teal-600" />
          </div>
          <p className="text-sm text-white/70 dark:text-slate-200 font-medium">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className={`flex items-center gap-3 mb-8 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="p-3 rounded-xl bg-teal-500/10 shadow-lg shadow-teal-500/10">
          <User className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white dark:text-white font-display">
            Profile Settings
          </h2>
          <p className="text-sm mt-0.5 text-white/80 dark:text-slate-200 font-medium">
            Manage your personal information and account details
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Avatar Card */}
        <div className={`lg:col-span-1 ${mounted ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '50ms' }}>
          <div className="p-6 rounded-3xl glass-card text-center border-white/20">
            {/* Avatar */}
            <div className="relative inline-block mb-4">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt={name || 'Profile'}
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-white/50 shadow-xl"
                />
              ) : (
                <div className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-teal-500 to-emerald-600 text-white ring-4 ring-white/50 shadow-xl">
                  {getInitials(name || user.email)}
                </div>
              )}
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute bottom-0 right-0 p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 bg-white text-slate-600 hover:text-teal-600 border border-slate-200"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Name */}
            <h3 className="text-xl font-black mb-1 text-white dark:text-white font-display">
              {name || 'User'}
            </h3>
            <p className="text-sm mb-4 text-white/90 dark:text-slate-200 font-medium">
              {email}
            </p>

            {/* Plan Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
              (user.plan || 'free') === 'pro'
                ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600 ring-1 ring-amber-500/20'
                : 'bg-white/90 text-slate-700 ring-1 ring-slate-200'
            }`}>
              {(user.plan || 'free') === 'pro' && <Crown className="w-3 h-3" />}
              <span className="capitalize">{user.plan || 'free'} Plan</span>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-slate-100/50">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl text-center bg-white/90 border border-white/30">
                  <p className="text-xl font-black text-navy font-display">--</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 leading-tight">Docs</p>
                </div>
                <div className="p-3 rounded-xl text-center bg-white/90 border border-white/30">
                  <p className="text-xl font-black text-navy font-display">--</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 leading-tight">Orgs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className={`lg:col-span-2 space-y-6 ${mounted ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
          {/* Profile Form */}
          <div className="p-6 rounded-3xl glass-card border-white/20">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white dark:text-white font-display">
              <Sparkles className="w-5 h-5 text-teal-600" />
              Personal Information
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-white dark:text-white mb-2">
                  Display Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 text-white dark:text-white placeholder:text-slate-400"
                    placeholder="Your name"
                  />
                </div>
                <p className="mt-2 text-sm text-white/70 dark:text-slate-200 font-medium">
                  This is the name that will be displayed across the application
                </p>
              </div>

              {/* Email (Read-only) */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-white dark:text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    disabled
                    className="block w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 dark:text-slate-200 cursor-not-allowed transition-all duration-300 font-medium"
                  />
                </div>
                <p className="mt-2 text-sm text-white/70 dark:text-slate-200 font-medium">
                  Contact support to change your email address
                </p>
              </div>

              {/* Success/Error Messages */}
              {success && (
                <div className="flex items-center gap-3 p-4 rounded-xl border bg-green-500/10 border-green-500/20 animate-fadeIn">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                  <p className="text-sm text-green-700 font-medium">{success}</p>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-3 p-4 rounded-xl border bg-red-500/10 border-red-500/20 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto btn-enhanced-primary rounded-xl shadow-lg shadow-teal-500/25 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Save className="w-4 h-4" />
                  <span className="font-bold">{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Email Notifications */}
          <div className="p-6 rounded-3xl glass-card border-white/20">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white dark:text-white font-display">
              <Bell className="w-5 h-5 text-teal-600" />
              Email Notifications
            </h3>

            <div className="space-y-4">
              {/* Toggle row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                    {emailNotificationsEnabled ? (
                      <Bell className="h-5 w-5 text-teal-600" />
                    ) : (
                      <BellOff className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm sm:text-base text-white dark:text-white">
                      {emailNotificationsEnabled ? 'Email notifications enabled' : 'Email notifications disabled'}
                    </p>
                    <p className="text-xs sm:text-sm text-white/70 dark:text-slate-200 font-medium">
                      Receive email alerts for document expirations and due dates
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleToggleEmailNotifications}
                  disabled={savingEmailPref}
                  className={`
                    relative inline-flex h-7 w-12 sm:h-6 sm:w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                    transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                    self-start sm:self-center
                    ${emailNotificationsEnabled ? 'bg-teal-600' : 'bg-slate-200'}
                    ${savingEmailPref ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  role="switch"
                  aria-checked={emailNotificationsEnabled}
                  aria-label="Toggle email notifications"
                >
                  <span
                    className={`
                      pointer-events-none inline-block h-6 w-6 sm:h-5 sm:w-5 transform rounded-full bg-white shadow ring-0
                      transition duration-200 ease-in-out
                      ${emailNotificationsEnabled ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>

              {/* Info box */}
              <div className="p-4 rounded-xl border bg-teal-500/5 border-teal-500/10">
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 mt-0.5 flex-shrink-0 text-teal-600" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white dark:text-white">
                      In-app notifications are always on
                    </p>
                    <p className="text-xs mt-1 text-white/70 dark:text-slate-200">
                      You will always receive notifications in the app (bell icon). This setting only controls email notifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="p-6 rounded-3xl glass-card border-white/20">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white dark:text-white font-display">
              <Shield className="w-5 h-5 text-teal-600" />
              Account Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-0.5">Created</p>
                    <p className="text-sm font-bold text-white dark:text-white">
                      {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-0.5">User ID</p>
                    <p className="text-xs font-mono font-bold text-white dark:text-white truncate">
                      {user.id?.slice(0, 8)}...
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-0.5">Plan</p>
                    <p className="text-sm font-bold text-white dark:text-white">
                      {formatPlanDisplay(user.plan, user.accountType)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-6 rounded-3xl bg-red-50/50 border border-red-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-3 rounded-xl bg-red-100 text-red-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-red-700">
                    Danger Zone
                  </h3>
                  <p className="text-sm mt-0.5 text-red-600/80 font-medium">
                    Permanently delete your account and all data
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-red-500/40 hover:scale-[1.02]"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm font-bold">Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy/20 backdrop-blur-sm animate-fadeIn"
            onClick={() => setShowDeleteModal(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scaleIn glass-card bg-white/95">
            {/* Header */}
            <div className="relative px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-100 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white dark:text-white font-display">
                  Delete Account
                </h3>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl transition-colors hover:bg-slate-100 text-slate-400 hover:text-white dark:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm mb-4 text-white/70 dark:text-slate-200 font-medium">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="p-4 rounded-xl border bg-red-50 border-red-100">
                <p className="text-sm text-red-700 font-medium">
                  All of your data, including documents, settings, and organization memberships will be permanently deleted.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl font-bold transition-all duration-300 bg-white border border-slate-200 text-white/70 dark:text-slate-200 hover:bg-slate-50 hover:text-white dark:text-white hover:border-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setError('Account deletion functionality coming soon')
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/25 transition-all duration-300 font-bold"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Image Modal */}
      <ProfileImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        userId={user.id}
        currentImage={profileImageUrl}
        onImageUpdated={(imageUrl) => {
          setProfileImageUrl(imageUrl)
          refreshUser()
        }}
      />

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
