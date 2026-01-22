'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Shield,
  Download,
  User,
  FileText,
  Activity,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Loader2,
  Search
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  userType: string;
  userEmail?: string;
  resourceType: string;
  resourceId?: string;
  portalId?: string;
  clientName?: string;
  success: boolean;
  ipAddress?: string;
  details: Record<string, any>;
}

export default function AllAuditLogsPage() {
  const router = useRouter();
  const { activeOrg } = useOrganization();
  const { isDarkMode } = useTheme();

  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterResourceType, setFilterResourceType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<'24h' | '7d' | '30d' | 'all'>('7d');

  useEffect(() => {
    if (activeOrg) {
      loadAuditLogs();
    }
  }, [activeOrg, dateRange]);

  const loadAuditLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/org/${activeOrg?.id}/audit-logs?range=${dateRange}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (error) {
      console.error('Error loading audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch(`/api/org/${activeOrg?.id}/audit-logs/export?range=${dateRange}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error exporting logs:', error);
    }
  };

  // Filter and search logs
  const filteredLogs = logs.filter(log => {
    // Action filter
    if (filterAction !== 'all' && !log.action.startsWith(filterAction)) {
      return false;
    }

    // Resource type filter
    if (filterResourceType !== 'all' && log.resourceType !== filterResourceType) {
      return false;
    }

    // Search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        log.action.toLowerCase().includes(search) ||
        log.userEmail?.toLowerCase().includes(search) ||
        log.clientName?.toLowerCase().includes(search) ||
        log.portalId?.toLowerCase().includes(search) ||
        log.ipAddress?.toLowerCase().includes(search)
      );
    }

    return true;
  });

  const getActionIcon = (action: string) => {
    if (action.startsWith('auth.')) return <Shield className="w-4 h-4" />;
    if (action.startsWith('document.')) return <FileText className="w-4 h-4" />;
    if (action.startsWith('portal.')) return <User className="w-4 h-4" />;
    if (action.startsWith('request.')) return <Activity className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getActionColor = (action: string) => {
    if (action.startsWith('auth.login_failed') || action.startsWith('auth.rate_limited')) {
      return isDarkMode ? 'text-red-400 bg-red-500/20' : 'text-red-600 bg-red-50';
    }
    if (action.includes('deleted')) {
      return isDarkMode ? 'text-orange-400 bg-orange-500/20' : 'text-orange-600 bg-orange-50';
    }
    if (action.includes('created') || action.startsWith('auth.login_success')) {
      return isDarkMode ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-50';
    }
    if (action.includes('updated') || action.includes('uploaded')) {
      return isDarkMode ? 'text-blue-400 bg-blue-500/20' : 'text-blue-600 bg-blue-50';
    }
    return isDarkMode ? 'text-slate-400 bg-slate-700' : 'text-gray-600 bg-gray-50';
  };

  // Format timestamp as mm/dd/yyyy - HH:mm
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day}/${year} - ${hours}:${minutes}`;
  };

  const stats = {
    total: logs.length,
    success: logs.filter(l => l.success).length,
    failed: logs.filter(l => !l.success).length,
    authEvents: logs.filter(l => l.action.startsWith('auth.')).length,
  };

  return (
    <div className="p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => router.push('/settings/auditlogs')}
          className={`flex items-center gap-2 text-sm mb-4 transition-colors ${
            isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Audit Logs Summary
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>All Audit Logs</h1>
            <p className={`mt-1 text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Complete security and activity logs for {activeOrg?.name || 'your organization'}
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-slate-700 border border-slate-600 text-slate-300 hover:bg-slate-600'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`rounded-xl p-4 ${
          isDarkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total Events</p>
              <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
            </div>
            <Activity className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
        </div>

        <div className={`rounded-xl p-4 ${
          isDarkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Successful</p>
              <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{stats.success}</p>
            </div>
            <CheckCircle2 className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          </div>
        </div>

        <div className={`rounded-xl p-4 ${
          isDarkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Failed</p>
              <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{stats.failed}</p>
            </div>
            <XCircle className={`w-8 h-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
          </div>
        </div>

        <div className={`rounded-xl p-4 ${
          isDarkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Auth Events</p>
              <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{stats.authEvents}</p>
            </div>
            <Shield className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-xl p-4 ${
        isDarkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-gray-50 border border-gray-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? 'text-slate-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? 'bg-slate-700 border border-slate-600 text-white placeholder-slate-400'
                  : 'bg-white border border-gray-300 text-gray-900'
              }`}
            />
          </div>

          {/* Action Filter */}
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? 'bg-slate-700 border border-slate-600 text-white'
                : 'bg-white border border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Actions</option>
            <option value="auth">Authentication</option>
            <option value="portal">Portal Actions</option>
            <option value="document">Document Actions</option>
            <option value="request">Request Actions</option>
            <option value="bulk">Bulk Operations</option>
          </select>

          {/* Resource Type Filter */}
          <select
            value={filterResourceType}
            onChange={(e) => setFilterResourceType(e.target.value)}
            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? 'bg-slate-700 border border-slate-600 text-white'
                : 'bg-white border border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Resources</option>
            <option value="auth">Authentication</option>
            <option value="portal">Portals</option>
            <option value="document">Documents</option>
            <option value="request">Requests</option>
          </select>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? 'bg-slate-700 border border-slate-600 text-white'
                : 'bg-white border border-gray-300 text-gray-900'
            }`}
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className={`rounded-xl overflow-hidden ${
        isDarkMode ? 'bg-slate-800/50 border border-slate-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12">
              <Activity className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`} />
              <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>No audit logs found</p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>Try adjusting your filters</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className={`border-b ${
                isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <tr>
                  <th className={`text-left p-4 font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Timestamp</th>
                  <th className={`text-left p-4 font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Action</th>
                  <th className={`text-left p-4 font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>User</th>
                  <th className={`text-left p-4 font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Resource</th>
                  <th className={`text-left p-4 font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Status</th>
                  <th className={`text-left p-4 font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>IP Address</th>
                  <th className={`text-left p-4 font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className={`border-b last:border-b-0 ${
                    isDarkMode
                      ? 'border-slate-700 hover:bg-slate-700/50'
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}>
                    <td className={`p-4 whitespace-nowrap ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getActionColor(log.action)}`}>
                        {getActionIcon(log.action)}
                        <span className="font-medium text-xs">
                          {log.action.replace(/\./g, ' ').replace(/_/g, ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{log.userEmail || log.userType}</p>
                        {log.clientName && (
                          <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>{log.clientName}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className={`capitalize ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{log.resourceType}</p>
                        {log.resourceId && (
                          <p className={`text-xs font-mono ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                            {log.resourceId.substring(0, 16)}...
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {log.success ? (
                        <span className={`inline-flex items-center gap-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                          <CheckCircle2 className="w-4 h-4" />
                          Success
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                          <XCircle className="w-4 h-4" />
                          Failed
                        </span>
                      )}
                    </td>
                    <td className={`p-4 font-mono text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      {log.ipAddress || 'N/A'}
                    </td>
                    <td className="p-4">
                      <details className="cursor-pointer">
                        <summary className={`text-xs ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                          View details
                        </summary>
                        <div className={`mt-2 p-2 rounded text-xs font-mono ${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                          <pre className={`whitespace-pre-wrap ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </div>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={`text-center text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
        Showing {filteredLogs.length} of {logs.length} audit events
      </div>
    </div>
  );
}
