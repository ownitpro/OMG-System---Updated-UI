'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import {
  User,
  Building2,
  AlertTriangle,
  Check,
  Loader2,
  FileText,
  Shield,
  Users,
  ArrowRight,
} from 'lucide-react'

interface AccountTypeMigrationModalProps {
  isOpen: boolean
  onComplete: () => void
  hasPersonalVault: boolean
  hasOrganizations: boolean
  documentCounts: {
    personalVault: number
    organizations: number
  }
}

type AccountChoice = 'personal' | 'business' | null

export function AccountTypeMigrationModal({
  isOpen,
  onComplete,
  hasPersonalVault,
  hasOrganizations,
  documentCounts,
}: AccountTypeMigrationModalProps) {
  const router = useRouter()
  const { user, refreshUser } = useAuth()
  const { isDarkMode } = useTheme()
  const [choice, setChoice] = useState<AccountChoice>(null)
  const [isMigrating, setIsMigrating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleMigration = async () => {
    if (!choice) return

    setError(null)
    setIsMigrating(true)

    try {
      const response = await fetch('/api/account/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id || '',
        },
        body: JSON.stringify({
          targetAccountType: choice,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to migrate account')
      }

      setSuccess(true)

      // Refresh user data to get new accountType
      if (refreshUser) {
        await refreshUser()
      }

      // Redirect after short delay
      setTimeout(() => {
        onComplete()
        router.push('/dashboard')
        router.refresh()
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Failed to migrate account')
    } finally {
      setIsMigrating(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop - no click to close since this is mandatory */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className={`relative w-full max-w-2xl mx-4 rounded-2xl shadow-2xl ${
        isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`px-6 py-5 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
              <AlertTriangle className={`w-5 h-5 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
            <div>
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Account Migration Required
              </h2>
              <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Please choose your preferred account type to continue
              </p>
            </div>
          </div>
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
                Migration Successful!
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Your account has been set up. Redirecting...
              </p>
            </div>
          ) : (
            <>
              {/* Explanation */}
              <div className={`flex items-start gap-3 p-4 rounded-xl mb-6 ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
              }`}>
                <FileText className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-500'
                }`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    We've updated SecureVault Docs to offer separate Personal and Business accounts.
                    Your current setup has both personal vault and organization data. Please choose which
                    account type you'd like to keep.
                  </p>
                </div>
              </div>

              {/* Options */}
              <div className="grid gap-4 mb-6 sm:grid-cols-2">
                {/* Personal Account Option */}
                <button
                  onClick={() => setChoice('personal')}
                  disabled={isMigrating}
                  className={`relative p-5 rounded-xl border-2 text-left transition-all ${
                    choice === 'personal'
                      ? isDarkMode
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-blue-500 bg-blue-50'
                      : isDarkMode
                        ? 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                  } disabled:opacity-50`}
                >
                  {choice === 'personal' && (
                    <div className="absolute top-3 right-3">
                      <Check className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                  )}

                  <div className={`inline-flex p-2.5 rounded-xl mb-3 ${
                    isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                  }`}>
                    <User className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>

                  <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Personal Account
                  </h3>
                  <p className={`text-sm mb-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    For individual document management
                  </p>

                  <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      Personal Vault
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      Secure document storage
                    </li>
                  </ul>

                  {hasPersonalVault && documentCounts.personalVault > 0 && (
                    <p className={`text-xs mt-3 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                      {documentCounts.personalVault} documents in Personal Vault
                    </p>
                  )}
                </button>

                {/* Business Account Option */}
                <button
                  onClick={() => setChoice('business')}
                  disabled={isMigrating}
                  className={`relative p-5 rounded-xl border-2 text-left transition-all ${
                    choice === 'business'
                      ? isDarkMode
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-purple-500 bg-purple-50'
                      : isDarkMode
                        ? 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                  } disabled:opacity-50`}
                >
                  {choice === 'business' && (
                    <div className="absolute top-3 right-3">
                      <Check className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                  )}

                  <div className={`inline-flex p-2.5 rounded-xl mb-3 ${
                    isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
                  }`}>
                    <Building2 className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>

                  <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Business Account
                  </h3>
                  <p className={`text-sm mb-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    For teams and client management
                  </p>

                  <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      Client Portals
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      Team collaboration
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      Organization management
                    </li>
                  </ul>

                  {hasOrganizations && documentCounts.organizations > 0 && (
                    <p className={`text-xs mt-3 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                      {documentCounts.organizations} documents in Organizations
                    </p>
                  )}
                </button>
              </div>

              {/* Warning about data */}
              {choice && (
                <div className={`flex items-start gap-3 p-4 rounded-xl mb-6 ${
                  isDarkMode ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'
                }`}>
                  <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  }`} />
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>
                      What happens to your data
                    </p>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-amber-400/80' : 'text-amber-700'}`}>
                      {choice === 'personal'
                        ? 'Your Personal Vault data will be kept. Organization data will be archived but not deleted.'
                        : 'Your Organization data will be kept. Personal Vault data will be archived but not deleted.'}
                    </p>
                  </div>
                </div>
              )}

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
              onClick={handleMigration}
              disabled={!choice || isMigrating}
              className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-xl transition-colors disabled:opacity-50 ${
                choice === 'business'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isMigrating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Migrating...
                </>
              ) : (
                <>
                  Continue with {choice === 'personal' ? 'Personal' : choice === 'business' ? 'Business' : '...'}
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
