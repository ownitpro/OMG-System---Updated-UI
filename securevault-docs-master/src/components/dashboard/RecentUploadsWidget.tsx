'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Inbox, ArrowUpRight, FolderOpen, Clock, ExternalLink } from 'lucide-react';

interface PortalGroup {
  value: string;      // portalId
  label: string;      // portalName
  count: number;      // pending count
}

interface SubmissionForDate {
  portalId: string;
  createdAt: string;
}

interface RecentUploadsWidgetProps {
  className?: string;
  maxItems?: number;
}

export default function RecentUploadsWidget({ className = '', maxItems = 5 }: RecentUploadsWidgetProps) {
  const { activeOrg, isPersonalVault } = useOrganization();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [portalGroups, setPortalGroups] = useState<PortalGroup[]>([]);
  const [latestDates, setLatestDates] = useState<Record<string, string>>({});
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeOrg || !user?.id) return;

    const fetchRecentUploads = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          limit: maxItems.toString(),
          status: 'pending',
        });

        if (isPersonalVault) {
          params.set('personalVaultId', activeOrg.id);
        } else {
          params.set('organizationId', activeOrg.id);
        }

        const res = await fetch(`/api/admin/submissions?${params}`, {
          headers: {
            'x-user-id': user.id,
          },
        });
        if (res.ok) {
          const data = await res.json();
          // Use the pre-grouped portals from API
          setPortalGroups(data.filters?.portals || []);
          setPendingCount(data.total || 0);

          // Get latest date per portal from submissions
          const dates: Record<string, string> = {};
          (data.submissions || []).forEach((s: SubmissionForDate) => {
            const existing = dates[s.portalId];
            if (s.portalId && (!existing || s.createdAt > existing)) {
              dates[s.portalId] = s.createdAt;
            }
          });
          setLatestDates(dates);
        }
      } catch (error) {
        console.error('Error fetching recent uploads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentUploads();
  }, [activeOrg, isPersonalVault, maxItems, user?.id]);

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) return `${diffDay}d ago`;
    if (diffHour > 0) return `${diffHour}h ago`;
    if (diffMin > 0) return `${diffMin}m ago`;
    return 'Just now';
  };

  // Theme classes
  const theme = {
    card: isDarkMode
      ? 'bg-slate-800 border-slate-700'
      : 'bg-white border-gray-200',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-gray-500',
    textSecondary: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    hover: isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50',
    badge: isDarkMode ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700',
  };

  if (loading) {
    return (
      <div className={`${theme.card} backdrop-blur-sm border rounded-2xl sm:rounded-3xl p-5 sm:p-8 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-xl`}></div>
            <div className="flex-1">
              <div className={`h-5 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded w-1/2 mb-2`}></div>
              <div className={`h-4 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded w-1/3`}></div>
            </div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-16 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-xl`}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme.card} backdrop-blur-sm border rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:shadow-2xl transition-all duration-300 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg sm:rounded-xl">
            <Inbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`text-base sm:text-xl font-bold ${theme.text}`}>Client Uploads</h2>
              {pendingCount > 0 && (
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${theme.badge}`}>
                  {pendingCount}
                </span>
              )}
            </div>
            <p className={`text-xs sm:text-sm ${theme.textMuted}`}>Pending review</p>
          </div>
        </div>
        <Link
          href="/dashboard/client-uploads"
          className="text-xs sm:text-sm text-blue-500 hover:text-blue-400 font-medium flex items-center gap-1 hover:gap-2 transition-all min-h-[44px] px-2"
        >
          View all <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      </div>

      {/* Portal List */}
      {portalGroups.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
          {portalGroups.map((portal) => (
            <Link
              key={portal.value}
              href={`/dashboard/client-uploads?portalId=${portal.value}`}
              className={`group flex items-center gap-3 p-3 sm:p-4 ${theme.hover} rounded-xl transition-all duration-200 cursor-pointer`}
            >
              <div className={`flex-shrink-0 p-2 ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'} rounded-lg group-hover:bg-blue-500 transition-colors`}>
                <FolderOpen className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} group-hover:text-white transition-colors`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${theme.text} truncate group-hover:text-blue-500 transition-colors`}>
                  {portal.label}
                </p>
                {latestDates[portal.value] && (
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className={`w-3 h-3 ${theme.textMuted}`} />
                    <span className={`text-xs ${theme.textMuted}`}>
                      {formatTimeAgo(latestDates[portal.value] as string)}
                    </span>
                  </div>
                )}
              </div>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${theme.badge}`}>
                {portal.count}
              </span>
              <ExternalLink className={`w-4 h-4 flex-shrink-0 ${theme.textMuted} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className={`w-14 h-14 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-3`}>
            <Inbox className={`w-7 h-7 ${theme.textMuted}`} />
          </div>
          <p className={`${theme.textSecondary} font-medium`}>No pending uploads</p>
          <p className={`text-xs sm:text-sm ${theme.textMuted} mt-1`}>
            Client uploads will appear here
          </p>
        </div>
      )}
    </div>
  );
}
