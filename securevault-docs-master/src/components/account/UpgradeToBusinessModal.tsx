'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { Building2, ArrowRight, AlertTriangle, Check, X, Loader2 } from 'lucide-react'

interface UpgradeToBusinessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UpgradeToBusinessModal({ isOpen, onClose }: UpgradeToBusinessModalProps) {
  const router = useRouter()
  const { user, refreshUser } = useAuth()
  const { isDarkMode } = useTheme()
  const [organizationName, setOrganizationName] = useState('')
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleUpgrade = async () => {
    setError(null)
    setIsUpgrading(true)

    try {
      const response = await fetch('/api/account/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id || '',
        },
        body: JSON.stringify({
          organizationName: organizationName.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upgrade account')
      }

      setSuccess(true)

      // Refresh user data to get new accountType
      if (refreshUser) {
        await refreshUser()
      }

      // Redirect to dashboard after short delay
      setTimeout(() => {
        onClose()
        router.push('/dashboard')
        router.refresh()
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Failed to upgrade account')
    } finally {
      setIsUpgrading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-lg mx-4 rounded-2xl shadow-2xl ${
        isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
              <Building2 className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Upgrade to Business
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isUpgrading}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            } disabled:opacity-50`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {success ? (
            <div className="text-center py-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
              }`}>
                <Check className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Upgrade Successful!
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Your account has been upgraded to Business. Redirecting...
              </p>
            </div>
          ) : (
            <>
              {/* Warning */}
              <div className={`flex items-start gap-3 p-4 rounded-xl mb-6 ${
                isDarkMode ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'
              }`}>
                <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  isDarkMode ? 'text-amber-400' : 'text-amber-600'
                }`} />
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>
                    Important Changes
                  </p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-amber-400/80' : 'text-amber-700'}`}>
                    Upgrading to Business will:
                  </p>
                  <ul className={`text-sm mt-2 space-y-1 ${isDarkMode ? 'text-amber-400/80' : 'text-amber-700'}`}>
                    <li>• Move your documents to your new organization</li>
                    <li>• Archive your Personal Vault</li>
                    <li>• Enable Client Portal features</li>
                    <li>• Allow team member management</li>
                  </ul>
                </div>
              </div>

              {/* Organization Name Input */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Organization Name
                </label>
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="My Business"
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode
                      ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-purple-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
                <p className={`text-xs mt-2 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                  This will be your default organization name. You can change it later.
                </p>
              </div>

              {/* Benefits */}
              <div className={`p-4 rounded-xl mb-6 ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
              }`}>
                <p className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  What you'll get:
                </p>
                <ul className="space-y-2">
                  {[
                    'Client Portal - Share secure upload links with clients',
                    'Team Members - Invite colleagues to collaborate',
                    'Organizations - Manage multiple business vaults',
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`} />
                      <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Error */}
              {error && (
                <div className={`p-4 rounded-xl mb-6 ${
                  isDarkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                    {error}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <button
              onClick={onClose}
              disabled={isUpgrading}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                isDarkMode
                  ? 'text-slate-300 hover:bg-slate-700'
                  : 'text-gray-600 hover:bg-gray-100'
              } disabled:opacity-50`}
            >
              Cancel
            </button>
            <button
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors disabled:opacity-50"
            >
              {isUpgrading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Upgrading...
                </>
              ) : (
                <>
                  Upgrade Now
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
