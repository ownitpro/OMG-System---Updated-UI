'use client'

import { useState, useEffect, useCallback } from 'react'
import { Calendar, AlertTriangle, Clock, ChevronRight, FileText, RefreshCw } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface ExpiringDocument {
  id: string
  name: string
  expirationDate: string
  daysUntilExpiration: number
  status: 'expired' | 'expiring_today' | 'expiring_soon' | 'upcoming'
  category?: string
  subtype?: string
}

interface ExpirationSummary {
  total: number
  expired: number
  expiringToday: number
  expiringSoon: number
  upcoming: number
}

interface ExpirationWidgetProps {
  personalVaultId?: string
  organizationId?: string
  className?: string
  maxItems?: number
}

export default function ExpirationWidget({
  personalVaultId,
  organizationId,
  className = '',
  maxItems = 5,
}: ExpirationWidgetProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [expirations, setExpirations] = useState<ExpiringDocument[]>([])
  const [summary, setSummary] = useState<ExpirationSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch expirations
  const fetchExpirations = useCallback(async () => {
    if (!user?.id) return

    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams({
        userId: user.id,
        limit: String(maxItems),
        days: '90',
        includeExpired: 'true',
      })

      if (personalVaultId) params.set('personalVaultId', personalVaultId)
      if (organizationId) params.set('organizationId', organizationId)

      const res = await fetch(`/api/expirations?${params.toString()}`)

      if (!res.ok) throw new Error('Failed to fetch expirations')

      const data = await res.json()
      setExpirations(data.expirations || [])
      setSummary(data.summary || null)
    } catch (err: any) {
      console.error('Error fetching expirations:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [user?.id, personalVaultId, organizationId, maxItems])

  useEffect(() => {
    fetchExpirations()
  }, [fetchExpirations])

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'expired':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
      case 'expiring_today':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
      case 'expiring_soon':
        return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30'
      case 'upcoming':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30'
    }
  }

  // Get status label
  const getStatusLabel = (doc: ExpiringDocument) => {
    if (doc.status === 'expired') {
      const daysAgo = Math.abs(doc.daysUntilExpiration)
      return daysAgo === 1 ? 'Expired yesterday' : `Expired ${daysAgo} days ago`
    }
    if (doc.status === 'expiring_today') return 'Expires today!'
    if (doc.daysUntilExpiration === 1) return 'Expires tomorrow'
    return `Expires in ${doc.daysUntilExpiration} days`
  }

  // Navigate to document
  const navigateToDocument = (documentId: string) => {
    router.push(`/documents?doc=${documentId}`)
  }

  // Render loading state
  if (isLoading) {
    return (
      <div className={`h-full flex items-center justify-center p-6 ${className}`}>
        <div className="w-full animate-pulse space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/10 rounded-xl"></div>
            <div className="space-y-2">
              <div className="h-4 bg-white/10 rounded w-32"></div>
              <div className="h-3 bg-white/10 rounded w-24"></div>
            </div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-14 bg-white/5 rounded-xl border border-white/5"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className={`h-full flex items-center justify-center p-6 ${className}`}>
        <div className="text-center text-slate-500">
          <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-teal-600" />
          <p className="text-sm font-medium">Failed to load expirations</p>
          <button
            onClick={fetchExpirations}
            className="mt-3 px-4 py-2 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className="w-3 h-3" />
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
           <div className="p-3.5 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-lg shadow-teal-500/20">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-navy tracking-tight font-display text-readability-shadow">Document Expirations</h3>
              {summary && summary.total > 0 ? (
                 <p className="text-slate-500 font-medium text-sm mt-0.5">
                  {summary.expired > 0 && <span className="text-red-600 font-bold">{summary.expired} expired</span>}
                  {summary.expired > 0 && (summary.expiringToday + summary.expiringSoon) > 0 && ' · '}
                  {(summary.expiringToday + summary.expiringSoon) > 0 && (
                    <span className="text-amber-600 font-bold">
                      {summary.expiringToday + summary.expiringSoon} expiring soon
                    </span>
                  )}
                </p>
              ) : (
                <p className="text-slate-600 font-semibold text-sm mt-0.5">Track document validity</p>
              )}
            </div>
        </div>
        <button
          onClick={fetchExpirations}
          className="p-2 text-slate-400 hover:text-teal-600 hover:bg-white/50 rounded-xl transition-all active:scale-95"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {expirations.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
               <Clock className="w-8 h-8 text-slate opacity-50" />
            </div>
            <p className="text-navy font-bold text-lg font-display">No expiring documents</p>
            <p className="text-sm text-slate-600 font-semibold font-outfit mt-1 max-w-xs mx-auto">
              Upload documents with expiration dates to track them here automatically.
            </p>
          </div>
        ) : (
          <ul className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {expirations.map(doc => (
              <li key={doc.id}>
                <button
                  onClick={() => navigateToDocument(doc.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/40 hover:bg-white/60 border border-white/40 transition-all duration-300 text-left group hover:translate-x-1 hover:shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-navy truncate font-display">
                      {doc.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getStatusColor(doc.status)}`}>
                        {getStatusLabel(doc)}
                      </span>
                      {doc.category && (
                        <span className="text-xs font-semibold text-slate-600 capitalize">
                           • {doc.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      {expirations.length > 0 && summary && summary.total > maxItems && (
        <div className="pt-4 mt-auto border-t border-white/20">
          <button
            onClick={() => router.push('/expirations')}
            className="text-sm font-bold text-teal-600 hover:text-teal-700 w-full text-center flex items-center justify-center gap-1 group"
          >
            View all {summary.total} documents
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  )
}

