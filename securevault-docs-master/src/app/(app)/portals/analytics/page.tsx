'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  ArrowLeft,
  Calendar,
  Activity,
  Loader2
} from 'lucide-react';

interface AnalyticsData {
  // Portal metrics
  totalPortals: number;
  activePortals: number;
  expiredPortals: number;

  // Upload metrics
  totalUploads: number;
  uploadsThisMonth: number;
  uploadsLastMonth: number;

  // Request metrics
  totalRequests: number;
  completedRequests: number;
  pendingRequests: number;
  avgCompletionTime: number; // in days

  // Document types
  topDocumentTypes: { type: string; count: number }[];

  // Time series data
  uploadsByDate: { date: string; count: number }[];

  // Portal performance
  portalPerformance: {
    portalId: string;
    clientName: string;
    totalRequests: number;
    completedRequests: number;
    completionRate: number;
    avgResponseTime: number; // in hours
  }[];
}

export default function AnalyticsPage() {
  const router = useRouter();
  const { activeOrg } = useOrganization();
  const { isDarkMode } = useTheme();

  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  useEffect(() => {
    if (activeOrg) {
      loadAnalytics();
    }
  }, [activeOrg, dateRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/org/${activeOrg?.id}/analytics?range=${dateRange}`);
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUploadTrend = () => {
    if (!analytics) return { direction: 'neutral', percentage: 0 };

    const current = analytics.uploadsThisMonth;
    const previous = analytics.uploadsLastMonth;

    if (previous === 0) return { direction: 'up', percentage: 100 };

    const change = ((current - previous) / previous) * 100;

    return {
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      percentage: Math.abs(Math.round(change))
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <AlertCircle className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`} />
        <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>Failed to load analytics data</p>
        <button
          onClick={loadAnalytics}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const trend = getUploadTrend();
  const completionRate = analytics.totalRequests > 0
    ? Math.round((analytics.completedRequests / analytics.totalRequests) * 100)
    : 0;

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <button
          onClick={() => router.push('/portals')}
          className="flex items-center gap-2 text-sm mb-4 transition-colors text-slate-500 hover:text-navy font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portals
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white text-shadow-md font-display">Portal Analytics</h1>
            <p className="mt-2 text-white text-shadow-sm font-semibold">
              Insights and metrics for {activeOrg?.name || 'your organization'}
            </p>
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center gap-1 rounded-xl p-1.5 bg-white/40 border border-white/40 backdrop-blur-md">
            {(['7d', '30d', '90d', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  dateRange === range
                    ? 'bg-gradient-to-r from-teal-mid to-teal-bright text-white shadow-lg shadow-teal-mid/20'
                    : 'text-slate-500 hover:text-navy hover:bg-white/40'
                }`}
              >
                {range === '7d' && 'Last 7 days'}
                {range === '30d' && 'Last 30 days'}
                {range === '90d' && 'Last 90 days'}
                {range === 'all' && 'All time'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Portals */}
        <div className="glass-card relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-green-500/10 text-xs font-bold text-green-600 uppercase tracking-wide">
              {analytics.activePortals} active
            </span>
          </div>
          <h3 className="text-3xl font-black text-navy font-display">{analytics.totalPortals}</h3>
          <p className="text-base mt-1 text-white text-shadow-sm font-semibold">Total Portals</p>
          <p className="text-sm mt-2 text-white/80 text-shadow-sm font-medium">
            {analytics.expiredPortals} expired
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
        </div>

        {/* Total Uploads */}
        <div className="glass-card relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-500/10">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            {trend.percentage > 0 && (
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-500/10 px-2.5 py-1 rounded-lg">
                <TrendingUp className="w-3.5 h-3.5" />
                {trend.percentage}%
              </div>
            )}
          </div>
          <h3 className="text-3xl font-black text-navy font-display">{analytics.totalUploads}</h3>
          <p className="text-base mt-1 text-white text-shadow-sm font-semibold">Total Uploads</p>
          <p className="text-sm mt-2 text-white/80 text-shadow-sm font-medium">
            {analytics.uploadsThisMonth} this month
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600" />
        </div>

        {/* Request Completion Rate */}
        <div className="glass-card relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-500/10">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-xs font-bold text-purple-600 uppercase tracking-wide">
              {completionRate}% Rate
            </span>
          </div>
          <h3 className="text-3xl font-black text-navy font-display">
            {analytics.completedRequests}<span className="text-white/60 text-xl">/{analytics.totalRequests}</span>
          </h3>
          <p className="text-base mt-1 text-white text-shadow-sm font-semibold">Requests Completed</p>
          <p className="text-sm mt-2 text-white/80 text-shadow-sm font-medium">
            {analytics.pendingRequests} pending
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600" />
        </div>

        {/* Average Completion Time */}
        <div className="glass-card relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-amber-500/10">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <Activity className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-3xl font-black text-navy font-display">
            {analytics.avgCompletionTime.toFixed(1)}
          </h3>
          <p className="text-base mt-1 text-white text-shadow-sm font-semibold">Avg. Days to Complete</p>
          <p className="text-sm mt-2 text-white/80 text-shadow-sm font-medium">Per request</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Uploads Over Time */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-navy font-display">Uploads Over Time</h2>
            <div className="p-2 rounded-lg bg-teal-mid/10">
              <Calendar className="w-5 h-5 text-teal-dark" />
            </div>
          </div>
          <div className="space-y-4">
            {analytics.uploadsByDate.length > 0 ? (
              analytics.uploadsByDate.map((item, idx) => {
                const maxCount = Math.max(...analytics.uploadsByDate.map(d => d.count));
                const barWidth = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white text-shadow-sm font-semibold text-base">{item.date}</span>
                      <span className="font-bold text-white text-shadow-sm">{item.count}</span>
                    </div>
                    <div className="w-full rounded-full h-2.5 bg-white/20 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-teal-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center py-8 text-slate-500 font-medium">No upload data available</p>
            )}
          </div>
        </div>

        {/* Top Document Types */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-navy font-display">Top Document Types</h2>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-4">
            {analytics.topDocumentTypes.length > 0 ? (
              analytics.topDocumentTypes.map((item, idx) => {
                const colors = [
                  'from-blue-500 to-blue-400',
                  'from-green-500 to-green-400',
                  'from-purple-500 to-purple-400',
                  'from-amber-500 to-amber-400',
                  'from-pink-500 to-pink-400'
                ];
                const maxCount = Math.max(...analytics.topDocumentTypes.map(d => d.count));
                const barWidth = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-bold text-navy">{item.type}</span>
                      <span className="text-slate-500 font-medium">{item.count} requests</span>
                    </div>
                    <div className="w-full rounded-full h-2.5 bg-slate-100 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${colors[idx % colors.length]} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center py-8 text-slate-500 font-medium">No document type data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Portal Performance Table */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-navy font-display">Portal Performance</h2>
          <button
            onClick={() => {
              // Export CSV functionality
              const csv = [
                ['Portal ID', 'Client Name', 'Total Requests', 'Completed', 'Completion Rate', 'Avg Response Time (hrs)'],
                ...analytics.portalPerformance.map(p => [
                  p.portalId,
                  p.clientName,
                  p.totalRequests,
                  p.completedRequests,
                  `${p.completionRate}%`,
                  p.avgResponseTime.toFixed(1)
                ])
              ].map(row => row.join(',')).join('\n');

              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `portal-performance-${new Date().toISOString().split('T')[0]}.csv`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-colors bg-white/40 hover:bg-white/60 text-navy border border-white/20"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/20">
          <table className="w-full text-sm">
            <thead className="bg-white/50 border-b border-white/20">
              <tr>
                <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">Client Name</th>
                <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">Total Requests</th>
                <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">Completed</th>
                <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">Completion Rate</th>
                <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">Avg Response Time</th>
                <th className="text-left p-4 font-bold text-navy font-display uppercase tracking-wider text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {analytics.portalPerformance.length > 0 ? (
                analytics.portalPerformance.map((portal, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-white/30">
                    <td className="p-4">
                      <button
                        onClick={() => router.push(`/portals/${portal.portalId}`)}
                        className="font-bold text-teal-dark hover:text-teal-bright hover:underline"
                      >
                        {portal.clientName}
                      </button>
                    </td>
                    <td className="p-4 font-medium text-navy">{portal.totalRequests}</td>
                    <td className="p-4 font-medium text-navy">{portal.completedRequests}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[100px] rounded-full h-1.5 bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              portal.completionRate >= 80
                                ? 'bg-green-500'
                                : portal.completionRate >= 50
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${portal.completionRate}%` }}
                          />
                        </div>
                        <span className="font-bold text-navy text-xs">
                          {portal.completionRate}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-500">
                      {portal.avgResponseTime.toFixed(1)} hrs
                    </td>
                    <td className="p-4">
                      {portal.completionRate === 100 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-green-500/10 text-green-700 uppercase tracking-wide">
                          <CheckCircle2 className="w-3 h-3" />
                          Complete
                        </span>
                      ) : portal.completionRate > 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-blue-500/10 text-blue-700 uppercase tracking-wide">
                          <Activity className="w-3 h-3" />
                          In Progress
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-slate-100 text-slate-500 uppercase tracking-wide">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-medium font-outfit">
                    No portal performance data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Insights */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
        <h2 className="text-xl font-black text-navy font-display mb-6">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="backdrop-blur-md rounded-xl p-5 bg-white/40 border border-white/20">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Most Active Portal</p>
            <p className="text-xl font-bold text-navy font-display">
              {analytics.portalPerformance.length > 0
                ? analytics.portalPerformance.reduce((prev, current) =>
                    prev.totalRequests > current.totalRequests ? prev : current
                  ).clientName
                : 'N/A'}
            </p>
          </div>
          <div className="backdrop-blur-md rounded-xl p-5 bg-white/40 border border-white/20">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Fastest Response</p>
            <p className="text-xl font-bold text-navy font-display">
              {analytics.portalPerformance.length > 0
                ? `${analytics.portalPerformance.reduce((prev, current) =>
                    prev.avgResponseTime < current.avgResponseTime ? prev : current
                  ).avgResponseTime.toFixed(1)} hrs`
                : 'N/A'}
            </p>
          </div>
          <div className="backdrop-blur-md rounded-xl p-5 bg-white/40 border border-white/20">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Overall Health</p>
            <p className="text-xl font-bold text-navy font-display">
              {completionRate >= 80 ? (
                <span className="text-green-600">Excellent</span>
              ) : completionRate >= 50 ? (
                <span className="text-amber-600">Good</span>
              ) : (
                <span className="text-red-600">Needs Attention</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
