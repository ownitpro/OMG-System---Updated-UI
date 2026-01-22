'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useOrganization } from '@/contexts/OrganizationContext'
import {
  FileText,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Loader2,
  Shield,
  User,
  Activity,
  Clock
} from 'lucide-react'

interface AuditLog {
  id: string
  timestamp: string
  action: string
  userType: string
  userEmail?: string
  resourceType: string
  resourceId?: string
  portalId?: string
  clientName?: string
  success: boolean
  ipAddress?: string
  details: Record<string, unknown>
}

export default function AuditLogsSettingsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  // const { isDarkMode } = useTheme() // Removed legacy theme
  const { activeOrg } = useOrganization()
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [authLoading, user, router])

  useEffect(() => {
    if (activeOrg) {
      loadAuditLogs()
    }
  }, [activeOrg])

  const loadAuditLogs = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/org/${activeOrg?.id}/audit-logs?range=7d`)
      if (res.ok) {
        const data = await res.json()
        // Only take the last 10 entries
        setLogs((data.logs || []).slice(0, 10))
      }
    } catch (error) {
      console.error('Error loading audit logs:', error)
    } finally {
      setLoading(false)
    }
  }

  // Format timestamp as mm/dd/yyyy - HH:mm
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${month}/${day}/${year} - ${hours}:${minutes}`
  }

  const formatAction = (action: string) => {
    return action
      .replace(/\./g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getActionIcon = (action: string) => {
    if (action.startsWith('auth.')) return <Shield className="w-4 h-4" />
    if (action.startsWith('document.')) return <FileText className="w-4 h-4" />
    if (action.startsWith('portal.')) return <User className="w-4 h-4" />
    if (action.startsWith('request.')) return <Activity className="w-4 h-4" />
    return <Activity className="w-4 h-4" />
  }

  const getActionColor = (action: string) => {
    if (action.startsWith('auth.login_failed') || action.startsWith('auth.rate_limited')) {
      return 'text-red-600 bg-red-50'
    }
    if (action.includes('deleted')) {
      return 'text-orange-600 bg-orange-50'
    }
    if (action.includes('created') || action.startsWith('auth.login_success')) {
      return 'text-emerald-600 bg-emerald-50'
    }
    if (action.includes('updated') || action.includes('uploaded')) {
      return 'text-teal-600 bg-teal-50'
    }
    return 'text-slate-600 bg-slate-50'
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    )
  }

  return (
    <div className={`p-4 sm:p-8 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-teal-50 text-teal-600 shadow-sm shadow-teal-100">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-navy font-display">
              Audit Logs
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Recent security and activity events
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push('/settings/auditlogs/all')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all bg-teal-50 text-teal-700 hover:bg-teal-100 hover:shadow-sm active:scale-95"
        >
          View All Logs
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl glass-card border-teal-100/50">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Total Events</p>
          <p className="text-3xl font-black mt-1 text-navy font-display">{logs.length}</p>
        </div>
        <div className="p-4 rounded-2xl glass-card border-emerald-100/50">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Successful</p>
          <p className="text-3xl font-black mt-1 text-emerald-600 font-display">
            {logs.filter(l => l.success).length}
          </p>
        </div>
        <div className="p-4 rounded-2xl glass-card border-red-100/50">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Failed</p>
          <p className="text-3xl font-black mt-1 text-red-600 font-display">
            {logs.filter(l => !l.success).length}
          </p>
        </div>
        <div className="p-4 rounded-2xl glass-card border-amber-100/50">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Auth Events</p>
          <p className="text-3xl font-black mt-1 text-amber-600 font-display">
            {logs.filter(l => l.action.startsWith('auth.')).length}
          </p>
        </div>
      </div>

      {/* Recent Logs List */}
      <div className="rounded-3xl glass-card border-white/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-teal-100/50 bg-teal-50/30">
          <h3 className="text-base font-bold text-navy font-display">
            Last 10 Events
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="p-4 rounded-full bg-slate-50 mb-4">
              <FileText className="w-10 h-10 text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-500">
              No audit logs found
            </p>
          </div>
        ) : (
          <div className="divide-y divide-teal-100/30">
            {logs.map((log) => (
              <div
                key={log.id}
                className="px-6 py-4 flex items-center gap-4 transition-colors hover:bg-white/50"
              >
                {/* Action Icon */}
                <div className={`p-2 rounded-lg ${getActionColor(log.action)}`}>
                  {getActionIcon(log.action)}
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-navy">
                      {formatAction(log.action)}
                    </span>
                    {log.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-xs truncate text-slate-600 font-medium mt-0.5">
                    {log.userEmail || log.clientName || log.userType}
                  </p>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {formatTimestamp(log.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View All Link */}
      <div className="mt-8 text-center">
        <button
          onClick={() => router.push('/settings/auditlogs/all')}
          className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center justify-center gap-1 mx-auto"
        >
          View complete audit log history
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
