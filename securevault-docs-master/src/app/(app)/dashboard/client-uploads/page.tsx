'use client';

import { useEffect, useState, useMemo } from 'react';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  FileText,
  Download,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Upload,
  Inbox,
  RefreshCw,
  User,
  Calendar,
  HardDrive,
  Users,
  FolderOpen,
  X,
  ChevronDown,
  Eye
} from 'lucide-react';

interface Submission {
  id: string;
  portalId: string;
  requestId: string | null;
  fileKey: string;
  fileName: string;
  bytes: number;
  formattedSize: string;
  ocrStatus: string;
  status: string;
  createdAt: string;
  reviewedAt: string | null;
  reviewedById: string | null;
  portalName: string;
  clientName: string;
  clientEmail: string;
  organizationId: string;
}

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface SubmissionsResponse {
  submissions: Submission[];
  total: number;
  limit: number;
  offset: number;
  filters: {
    clients: FilterOption[];
    portals: FilterOption[];
  };
}

// Date filter presets
const DATE_PRESETS = [
  { label: 'All Time', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: '7days' },
  { label: 'Last 30 Days', value: '30days' },
  { label: 'This Month', value: 'thisMonth' },
  { label: 'Last Month', value: 'lastMonth' },
];

function getDateRange(preset: string): { from: string | null; to: string | null } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (preset) {
    case 'today':
      return { from: today.toISOString().split('T')[0], to: today.toISOString().split('T')[0] };
    case '7days':
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return { from: sevenDaysAgo.toISOString().split('T')[0], to: today.toISOString().split('T')[0] };
    case '30days':
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return { from: thirtyDaysAgo.toISOString().split('T')[0], to: today.toISOString().split('T')[0] };
    case 'thisMonth':
      const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return { from: firstOfMonth.toISOString().split('T')[0], to: today.toISOString().split('T')[0] };
    case 'lastMonth':
      const firstOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      return { from: firstOfLastMonth.toISOString().split('T')[0], to: lastOfLastMonth.toISOString().split('T')[0] };
    default:
      return { from: null, to: null };
  }
}

export default function ClientUploadsPage() {
  const { activeOrg, isPersonalVault } = useOrganization();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter options from API
  const [clientOptions, setClientOptions] = useState<FilterOption[]>([]);
  const [portalOptions, setPortalOptions] = useState<FilterOption[]>([]);

  // Active filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [selectedPortal, setSelectedPortal] = useState<string>('all');
  const [datePreset, setDatePreset] = useState<string>('all');
  const [page, setPage] = useState(0);
  const limit = 30;

  // Dropdown states
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  // Theme classes
  const theme = {
    card: isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-gray-500',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    hover: isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50',
    input: isDarkMode
      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400',
    badge: isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600',
    tableHeader: isDarkMode ? 'bg-slate-900' : 'bg-gray-50',
    tableRow: isDarkMode ? 'border-slate-700' : 'border-gray-100',
    dropdown: isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200',
    dropdownHover: isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100',
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedClient !== 'all') count++;
    if (selectedPortal !== 'all') count++;
    if (datePreset !== 'all') count++;
    if (searchQuery) count++;
    return count;
  }, [selectedClient, selectedPortal, datePreset, searchQuery]);

  const fetchSubmissions = async (showRefreshing = false) => {
    if (!activeOrg || !user?.id) return;

    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const params = new URLSearchParams();
      if (isPersonalVault) {
        params.set('personalVaultId', activeOrg.id);
      } else {
        params.set('organizationId', activeOrg.id);
      }

      // Apply filters
      if (selectedPortal !== 'all') {
        params.set('portalId', selectedPortal);
      }
      if (selectedClient !== 'all') {
        params.set('clientName', selectedClient);
      }
      if (searchQuery) {
        params.set('search', searchQuery);
      }

      // Apply date filter
      const dateRange = getDateRange(datePreset);
      if (dateRange.from) params.set('dateFrom', dateRange.from);
      if (dateRange.to) params.set('dateTo', dateRange.to);

      params.set('limit', limit.toString());
      params.set('offset', (page * limit).toString());

      const res = await fetch(`/api/admin/submissions?${params.toString()}`, {
        headers: {
          'x-user-id': user.id,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data: SubmissionsResponse = await res.json();

      setSubmissions(data.submissions);
      setTotal(data.total);

      // Update filter options
      if (data.filters) {
        setClientOptions(data.filters.clients || []);
        setPortalOptions(data.filters.portals || []);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load submissions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [activeOrg, selectedClient, selectedPortal, datePreset, page]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (page === 0) {
        fetchSubmissions();
      } else {
        setPage(0);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleDelete = async (submissionId: string) => {
    if (!user?.id) return;

    if (!confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/submissions?id=${submissionId}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': user.id,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete file');
      }

      fetchSubmissions(true);
    } catch (err: any) {
      console.error('Error deleting file:', err);
      alert('Failed to delete file');
    }
  };

  const handleDownload = (submission: Submission) => {
    const downloadUrl = `/api/documents/download?key=${encodeURIComponent(submission.fileKey)}`;
    window.open(downloadUrl, '_blank');
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedClient('all');
    setSelectedPortal('all');
    setDatePreset('all');
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const totalPages = Math.ceil(total / limit);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setClientDropdownOpen(false);
      setPortalDropdownOpen(false);
      setDateDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (loading && submissions.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div
              className={`w-16 h-16 border-4 ${
                isDarkMode ? 'border-slate-600 border-t-blue-400' : 'border-blue-200 border-t-blue-600'
              } rounded-full animate-spin`}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Upload className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} animate-pulse`} />
            </div>
          </div>
          <p className={`${theme.textSecondary} font-medium`}>Loading client uploads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${theme.text}`}>Client Uploads</h1>
          <p className={`${theme.textMuted} mt-1`}>
            View files uploaded by clients through your portals
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Total count badge */}
          <div className={`px-4 py-2 ${theme.card} border rounded-xl`}>
            <span className={`text-sm ${theme.textMuted}`}>Total: </span>
            <span className={`font-semibold ${theme.text}`}>{total.toLocaleString()}</span>
            <span className={`text-sm ${theme.textMuted}`}> files</span>
          </div>
          <button
            onClick={() => fetchSubmissions(true)}
            disabled={refreshing}
            className={`inline-flex items-center gap-2 px-4 py-2 ${theme.card} border rounded-xl ${theme.hover} transition-colors`}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={`${theme.card} border rounded-2xl p-4`}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
            <input
              type="text"
              placeholder="Search by filename, client, or portal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 ${theme.input} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 ${theme.hover} rounded`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap gap-3">
            {/* Client Filter */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setClientDropdownOpen(!clientDropdownOpen);
                  setPortalDropdownOpen(false);
                  setDateDropdownOpen(false);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 ${theme.input} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px]`}
              >
                <Users className="w-4 h-4" />
                <span className="flex-1 text-left truncate">
                  {selectedClient === 'all' ? 'All Clients' : selectedClient}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${clientDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {clientDropdownOpen && (
                <div className={`absolute top-full mt-1 left-0 w-64 max-h-64 overflow-y-auto ${theme.dropdown} border rounded-xl shadow-lg z-20`}>
                  <button
                    onClick={() => { setSelectedClient('all'); setClientDropdownOpen(false); setPage(0); }}
                    className={`w-full px-4 py-2.5 text-left text-sm ${theme.dropdownHover} ${selectedClient === 'all' ? 'bg-blue-500/10 text-blue-500' : ''}`}
                  >
                    All Clients
                  </button>
                  {clientOptions.map((client) => (
                    <button
                      key={client.value}
                      onClick={() => { setSelectedClient(client.value); setClientDropdownOpen(false); setPage(0); }}
                      className={`w-full px-4 py-2.5 text-left text-sm ${theme.dropdownHover} flex items-center justify-between ${selectedClient === client.value ? 'bg-blue-500/10 text-blue-500' : ''}`}
                    >
                      <span className="truncate">{client.label}</span>
                      <span className={`text-xs ${theme.badge} px-2 py-0.5 rounded-full`}>{client.count}</span>
                    </button>
                  ))}
                  {clientOptions.length === 0 && (
                    <p className={`px-4 py-3 text-sm ${theme.textMuted}`}>No clients found</p>
                  )}
                </div>
              )}
            </div>

            {/* Portal Filter */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setPortalDropdownOpen(!portalDropdownOpen);
                  setClientDropdownOpen(false);
                  setDateDropdownOpen(false);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 ${theme.input} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px]`}
              >
                <FolderOpen className="w-4 h-4" />
                <span className="flex-1 text-left truncate">
                  {selectedPortal === 'all' ? 'All Portals' : portalOptions.find(p => p.value === selectedPortal)?.label || 'All Portals'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${portalDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {portalDropdownOpen && (
                <div className={`absolute top-full mt-1 left-0 w-64 max-h-64 overflow-y-auto ${theme.dropdown} border rounded-xl shadow-lg z-20`}>
                  <button
                    onClick={() => { setSelectedPortal('all'); setPortalDropdownOpen(false); setPage(0); }}
                    className={`w-full px-4 py-2.5 text-left text-sm ${theme.dropdownHover} ${selectedPortal === 'all' ? 'bg-blue-500/10 text-blue-500' : ''}`}
                  >
                    All Portals
                  </button>
                  {portalOptions.map((portal) => (
                    <button
                      key={portal.value}
                      onClick={() => { setSelectedPortal(portal.value); setPortalDropdownOpen(false); setPage(0); }}
                      className={`w-full px-4 py-2.5 text-left text-sm ${theme.dropdownHover} flex items-center justify-between ${selectedPortal === portal.value ? 'bg-blue-500/10 text-blue-500' : ''}`}
                    >
                      <span className="truncate">{portal.label}</span>
                      <span className={`text-xs ${theme.badge} px-2 py-0.5 rounded-full`}>{portal.count}</span>
                    </button>
                  ))}
                  {portalOptions.length === 0 && (
                    <p className={`px-4 py-3 text-sm ${theme.textMuted}`}>No portals found</p>
                  )}
                </div>
              )}
            </div>

            {/* Date Filter */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setDateDropdownOpen(!dateDropdownOpen);
                  setClientDropdownOpen(false);
                  setPortalDropdownOpen(false);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 ${theme.input} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]`}
              >
                <Calendar className="w-4 h-4" />
                <span className="flex-1 text-left">
                  {DATE_PRESETS.find(p => p.value === datePreset)?.label || 'All Time'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dateDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dateDropdownOpen && (
                <div className={`absolute top-full mt-1 left-0 w-48 ${theme.dropdown} border rounded-xl shadow-lg z-20`}>
                  {DATE_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => { setDatePreset(preset.value); setDateDropdownOpen(false); setPage(0); }}
                      className={`w-full px-4 py-2.5 text-left text-sm ${theme.dropdownHover} ${datePreset === preset.value ? 'bg-blue-500/10 text-blue-500' : ''}`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-red-500 hover:bg-red-500/10 border border-red-500/30 rounded-xl transition-colors"
              >
                <X className="w-4 h-4" />
                Clear ({activeFilterCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Submissions Table */}
      {submissions.length > 0 ? (
        <div className={`${theme.card} border rounded-2xl overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme.tableHeader}>
                <tr>
                  <th className={`px-6 py-4 text-left text-xs font-semibold ${theme.textMuted} uppercase tracking-wider`}>
                    File
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold ${theme.textMuted} uppercase tracking-wider`}>
                    Client
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold ${theme.textMuted} uppercase tracking-wider`}>
                    Portal
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold ${theme.textMuted} uppercase tracking-wider`}>
                    Size
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-semibold ${theme.textMuted} uppercase tracking-wider`}>
                    Uploaded
                  </th>
                  <th className={`px-6 py-4 text-right text-xs font-semibold ${theme.textMuted} uppercase tracking-wider`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {submissions.map((submission) => (
                  <tr key={submission.id} className={`${theme.hover} transition-colors`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className={`font-medium ${theme.text} truncate max-w-[250px]`} title={submission.fileName}>
                            {submission.fileName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 ${theme.badge} rounded-full`}>
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className={`text-sm ${theme.text}`}>{submission.clientName || 'Guest'}</p>
                          {submission.clientEmail && (
                            <p className={`text-xs ${theme.textMuted}`}>{submission.clientEmail}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-sm ${theme.textSecondary}`}>{submission.portalName || '-'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <HardDrive className={`w-3.5 h-3.5 ${theme.textMuted}`} />
                        <span className={`text-sm ${theme.textSecondary}`}>{submission.formattedSize}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className={`w-3.5 h-3.5 ${theme.textMuted}`} />
                        <span className={`text-sm ${theme.textSecondary}`}>{formatDate(submission.createdAt)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleDownload(submission)}
                          className={`p-2 ${theme.hover} rounded-lg transition-colors`}
                          title="Download"
                        >
                          <Download className={`w-4 h-4 ${theme.textMuted}`} />
                        </button>
                        <button
                          onClick={() => handleDelete(submission.id)}
                          className={`p-2 hover:bg-red-500/10 rounded-lg transition-colors`}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={`px-6 py-4 border-t ${theme.tableRow} flex items-center justify-between`}>
              <p className={`text-sm ${theme.textMuted}`}>
                Showing {page * limit + 1} - {Math.min((page + 1) * limit, total)} of {total.toLocaleString()}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className={`p-2 ${theme.card} border rounded-lg ${
                    page === 0 ? 'opacity-50 cursor-not-allowed' : theme.hover
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className={`text-sm ${theme.textSecondary}`}>
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className={`p-2 ${theme.card} border rounded-lg ${
                    page >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : theme.hover
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={`${theme.card} border rounded-2xl p-12 text-center`}>
          <div className={`w-16 h-16 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Inbox className={`w-8 h-8 ${theme.textMuted}`} />
          </div>
          <h3 className={`text-lg font-semibold ${theme.text} mb-2`}>
            {activeFilterCount > 0 ? 'No files match your filters' : 'No uploads yet'}
          </h3>
          <p className={`${theme.textMuted} max-w-md mx-auto`}>
            {activeFilterCount > 0
              ? 'Try adjusting your filters or search query to find what you\'re looking for.'
              : 'When clients upload files through your portals, they will appear here.'}
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="mt-4 px-4 py-2 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
