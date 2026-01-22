'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Shield, Key, Smartphone, Monitor, AlertCircle, CheckCircle, X, Lock, Eye, EyeOff, Fingerprint, LogOut, Info } from 'lucide-react'

export default function SecurityPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Password change modal
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // 2FA toggle state (simulated)
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [authLoading, user, router])

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      // Call AWS Cognito change password API
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password')
      }

      setSuccess('Password changed successfully')
      setShowPasswordModal(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const getDeviceInfo = () => {
    if (typeof window === 'undefined') return 'Loading...'
    const ua = window.navigator.userAgent
    const match = ua.match(/\(([^)]+)\)/)
    return match ? match[1] : 'Unknown Device'
  }

  if (authLoading || !user) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500/20 border-t-teal-600"></div>
            <Shield className="absolute inset-0 m-auto w-5 h-5 text-teal-600" />
          </div>
          <p className="text-sm text-white/70 dark:text-slate-200 font-medium">Loading security settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 overflow-x-hidden">
      {/* Header */}
      <div className={`flex items-center gap-3 mb-8 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="p-3 rounded-xl bg-teal-500/10 shadow-lg shadow-teal-500/10">
          <Shield className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white dark:text-white font-display">
            Security Settings
          </h2>
          <p className="text-sm mt-0.5 text-white/70 dark:text-slate-200 font-medium">
            Manage your account security and authentication methods
          </p>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 flex items-center gap-3 p-4 rounded-xl border animate-fadeIn bg-green-50 border-green-200">
          <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-center gap-3 p-4 rounded-xl border animate-fadeIn bg-red-500/10 border-red-500/20">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Password Section */}
        <div className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 glass-card bg-white/40 border-white/20 hover:border-white/40 ${
          mounted ? 'animate-slideUp' : 'opacity-0'
        }`} style={{ animationDelay: '50ms' }}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-xl flex-shrink-0 bg-teal-500/10 text-teal-600">
                <Key className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-white dark:text-white font-display">
                  Password
                </h3>
                <p className="text-xs sm:text-sm mt-1 text-white/90 dark:text-slate-200 font-medium">
                  Change your password to keep your account secure
                </p>
                <p className="text-xs mt-2 text-white/70 font-medium">
                  Last changed: Never
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex-shrink-0 bg-white/50 text-slate-700 hover:bg-white/80 hover:text-white dark:text-white hover:shadow-lg"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Two-Factor Authentication Section */}
        <div className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 glass-card bg-white/40 border-white/20 hover:border-white/40 ${
          mounted ? 'animate-slideUp' : 'opacity-0'
        }`} style={{ animationDelay: '100ms' }}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-xl flex-shrink-0 bg-emerald-500/10 text-emerald-600">
                <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-white dark:text-white font-display">
                  Two-Factor Authentication
                </h3>
                <p className="text-xs sm:text-sm mt-1 text-white/70 dark:text-slate-200">
                  Add an extra layer of security to your account
                </p>
                <div className="mt-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    twoFAEnabled
                      ? 'bg-green-100 text-green-700'
                      : 'bg-white/50 text-white/70 dark:text-slate-200'
                  }`}>
                    {twoFAEnabled ? 'Enabled' : 'Not Enabled'}
                  </span>
                </div>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => {
                setTwoFAEnabled(!twoFAEnabled)
                if (!twoFAEnabled) {
                  setError('Two-factor authentication coming soon')
                  setTimeout(() => setError(null), 3000)
                  setTwoFAEnabled(false)
                }
              }}
              className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 self-start sm:self-auto focus:ring-offset-white ${
                twoFAEnabled
                  ? 'bg-emerald-600 focus:ring-emerald-500'
                  : 'bg-slate-200 focus:ring-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${
                  twoFAEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Active Sessions Section */}
        <div className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 glass-card bg-white/40 border-white/20 hover:border-white/40 ${
          mounted ? 'animate-slideUp' : 'opacity-0'
        }`} style={{ animationDelay: '150ms' }}>
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="p-2.5 sm:p-3 rounded-xl flex-shrink-0 bg-cyan-500/10 text-cyan-600">
              <Monitor className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-bold text-white dark:text-white font-display">
                Active Sessions
              </h3>
              <p className="text-xs sm:text-sm mt-1 text-white/70 dark:text-slate-200">
                Manage your active sessions across devices
              </p>
            </div>
          </div>

          {/* Current Session Card */}
          <div className="p-3 sm:p-4 rounded-xl border mb-4 bg-white/50 border-white/30">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg flex-shrink-0 bg-emerald-100 text-emerald-600">
                  <Monitor className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm sm:text-base text-white dark:text-white">
                    Current Session
                  </p>
                  <p className="text-xs mt-1 break-all text-white/70 dark:text-slate-200">
                    {getDeviceInfo()}
                  </p>
                  <p className="text-xs mt-1 text-slate-400">
                    Active now
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium self-start flex-shrink-0 bg-green-100 text-green-700">
                <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>
                Active
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setError('Session management coming soon')
              setTimeout(() => setError(null), 3000)
            }}
            className="flex items-center gap-2 text-sm font-medium transition-colors text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4" />
            Sign out all other sessions
          </button>
        </div>

        {/* Security Recommendations */}
        <div className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 glass-card bg-white/40 border-white/20 hover:border-white/40 ${
          mounted ? 'animate-slideUp' : 'opacity-0'
        } bg-gradient-to-br from-teal-50/30 to-emerald-50/30`} style={{ animationDelay: '200ms' }}>
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 rounded-xl flex-shrink-0 bg-teal-500/10 text-teal-600">
              <Info className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-bold text-teal-900 font-display">
                Security Recommendations
              </h3>
              <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
                {[
                  'Use a strong, unique password for your account',
                  'Enable two-factor authentication for additional security',
                  'Regularly review your active sessions',
                  'Never share your password with anyone'
                ].map((tip, index) => (
                  <li key={index} className="flex items-start gap-2.5 sm:gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-teal-500/10 text-teal-700">
                      {index + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-teal-800">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 overflow-y-auto">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => {
              setShowPasswordModal(false)
              setCurrentPassword('')
              setNewPassword('')
              setConfirmPassword('')
              setError(null)
            }}
          />

          <div className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scaleIn bg-white border border-slate-200 my-8">
            <div className="relative px-6 py-5 bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-slate-200 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-100">
                  <Lock className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    Update your account password
                  </h3>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setCurrentPassword('')
                  setNewPassword('')
                  setConfirmPassword('')
                  setError(null)
                }}
                className="absolute top-4 right-4 p-2 rounded-xl transition-colors hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="p-6 space-y-5 bg-white">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-900">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-slate-900 placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-400 font-medium"
                    disabled
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                    disabled
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs mt-2 text-slate-500 font-medium">
                  Current password verification coming soon
                </p>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-900">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-medium"
                    placeholder="Enter new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-900">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-medium"
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </form>

            <div className="flex gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={() => {
                  setShowPasswordModal(false)
                  setCurrentPassword('')
                  setNewPassword('')
                  setConfirmPassword('')
                  setError(null)
                }}
                className="flex-1 px-4 py-2.5 rounded-xl font-bold transition-all duration-300 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={loading || !newPassword || !confirmPassword}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl hover:from-teal-700 hover:to-teal-600 shadow-lg shadow-teal-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Changing...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    Change Password
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
