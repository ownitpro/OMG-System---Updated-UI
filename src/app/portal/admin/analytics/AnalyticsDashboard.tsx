"use client";

import * as React from "react";
import {
  ChartBarIcon,
  UsersIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  CalendarDaysIcon,
  UserIcon,
  CursorArrowRaysIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  getPageStats,
  getClientActivity,
  getRecentActivity,
  getAnalyticsSummary,
  getViewsByDay,
  resetAnalytics,
  type PageStats,
  type ClientActivity,
  type PageView,
  type DateFilter,
} from "@/lib/admin/analyticsStore";

// Date filter options
const DATE_FILTERS: { label: string; value: DateFilter }[] = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Last year", value: "1y" },
  { label: "All time", value: "all" },
];

// Stat card component
function StatCard({
  label,
  value,
  icon: Icon,
  color,
  trend,
  suffix,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  trend?: number;
  suffix?: string;
}) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
      style={{ boxShadow: `0 0 20px ${color}10` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Icon className="w-4 h-4" />
          {label}
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              trend >= 0 ? "text-[#47BD79]" : "text-red-400"
            }`}
          >
            {trend >= 0 ? (
              <ArrowTrendingUpIcon className="w-3.5 h-3.5" />
            ) : (
              <ArrowTrendingDownIcon className="w-3.5 h-3.5" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="mt-1 text-2xl font-bold" style={{ color }}>
        {value}
        {suffix && <span className="text-sm font-normal text-white/40 ml-1">{suffix}</span>}
      </div>
    </div>
  );
}

// Progress bar for page stats
function PageProgressBar({
  page,
  views,
  percentage,
  uniqueVisitors,
  avgDuration,
  color,
  maxPercentage,
}: PageStats & { color: string; maxPercentage: number }) {
  const normalizedWidth = maxPercentage > 0 ? (percentage / maxPercentage) * 100 : 0;

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">{page}</span>
          <span className="text-xs text-white/40">
            {uniqueVisitors} visitors • {formatDuration(avgDuration)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold" style={{ color }}>
            {views.toLocaleString()}
          </span>
          <span className="text-xs text-white/50 w-10 text-right">{percentage}%</span>
        </div>
      </div>
      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${normalizedWidth}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}50`,
          }}
        />
      </div>
    </div>
  );
}

// Format duration in seconds to readable format
function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

// Format relative time
function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

// Mini chart for daily views
function MiniChart({ data }: { data: { date: string; views: number }[] }) {
  if (data.length === 0) return null;

  const maxViews = Math.max(...data.map((d) => d.views));
  const lastN = data.slice(-30); // Last 30 days

  return (
    <div className="flex items-end gap-0.5 h-12">
      {lastN.map((day, i) => {
        const height = maxViews > 0 ? (day.views / maxViews) * 100 : 0;
        return (
          <div
            key={day.date}
            className="flex-1 rounded-t transition-all hover:opacity-80"
            style={{
              height: `${Math.max(height, 4)}%`,
              backgroundColor: i === lastN.length - 1 ? "#47BD79" : "#3B82F6",
              opacity: 0.6 + (i / lastN.length) * 0.4,
            }}
            title={`${day.date}: ${day.views} views`}
          />
        );
      })}
    </div>
  );
}

// Page color palette
const PAGE_COLORS = [
  "#47BD79",
  "#3B82F6",
  "#A855F7",
  "#F59E0B",
  "#EC4899",
  "#06B6D4",
  "#8B5CF6",
  "#F97316",
  "#10B981",
  "#6366F1",
];

export function AnalyticsDashboard() {
  const [dateFilter, setDateFilter] = React.useState<DateFilter>("30d");
  const [pageStats, setPageStats] = React.useState<PageStats[]>([]);
  const [clientActivity, setClientActivity] = React.useState<ClientActivity[]>([]);
  const [recentActivity, setRecentActivity] = React.useState<PageView[]>([]);
  const [summary, setSummary] = React.useState<ReturnType<typeof getAnalyticsSummary> | null>(null);
  const [dailyViews, setDailyViews] = React.useState<{ date: string; views: number }[]>([]);
  const [activeTab, setActiveTab] = React.useState<"pages" | "clients" | "activity">("pages");

  const loadData = React.useCallback(() => {
    setPageStats(getPageStats(dateFilter));
    setClientActivity(getClientActivity(dateFilter));
    setRecentActivity(getRecentActivity(50));
    setSummary(getAnalyticsSummary(dateFilter));
    setDailyViews(getViewsByDay(dateFilter));
  }, [dateFilter]);

  React.useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener("omg-analytics-updated", handleUpdate);
    return () => window.removeEventListener("omg-analytics-updated", handleUpdate);
  }, [loadData]);

  const maxPercentage = pageStats.length > 0 ? pageStats[0].percentage : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
            <ChartBarIcon className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Client Analytics</h1>
            <p className="text-sm text-white/60">
              Track page views, client activity, and engagement metrics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="w-4 h-4 text-white/40" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50"
            >
              {DATE_FILTERS.map((f) => (
                <option key={f.value} value={f.value} className="bg-[#0a0a0a]">
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              resetAnalytics();
              loadData();
            }}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            title="Refresh data"
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      {summary && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Page Views"
            value={summary.totalViews.toLocaleString()}
            icon={EyeIcon}
            color="#3B82F6"
            trend={summary.trend}
          />
          <StatCard
            label="Unique Visitors"
            value={summary.uniqueVisitors.toLocaleString()}
            icon={UsersIcon}
            color="#A855F7"
          />
          <StatCard
            label="Total Sessions"
            value={summary.totalSessions.toLocaleString()}
            icon={CursorArrowRaysIcon}
            color="#47BD79"
          />
          <StatCard
            label="Avg. Session Duration"
            value={formatDuration(summary.avgSessionDuration)}
            icon={ClockIcon}
            color="#F59E0B"
          />
        </div>
      )}

      {/* Daily Views Chart */}
      <div
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-white">Daily Page Views</div>
          <div className="text-sm text-white/40">
            {summary?.viewsLast7Days.toLocaleString()} views this week
          </div>
        </div>
        <MiniChart data={dailyViews} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-2">
        {[
          { id: "pages", label: "Top Pages", icon: ChartBarIcon },
          { id: "clients", label: "Client Activity", icon: UsersIcon },
          { id: "activity", label: "Recent Activity", icon: ClockIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[#3B82F6] text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "pages" && (
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="text-lg font-semibold text-white">Page Performance</div>
            <div className="text-sm text-white/40">{pageStats.length} pages tracked</div>
          </div>

          <div className="space-y-4">
            {pageStats.map((stat, index) => (
              <PageProgressBar
                key={stat.page}
                {...stat}
                color={PAGE_COLORS[index % PAGE_COLORS.length]}
                maxPercentage={maxPercentage}
              />
            ))}

            {pageStats.length === 0 && (
              <div className="text-center py-8 text-white/40">
                No page views recorded for this period.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "clients" && (
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-white">Client Activity</div>
              <div className="text-sm text-white/40">{clientActivity.length} active clients</div>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {clientActivity.map((client, index) => (
              <div
                key={client.clientId}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: `${PAGE_COLORS[index % PAGE_COLORS.length]}30` }}
                  >
                    {client.clientName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-white">{client.clientName}</div>
                    <div className="text-xs text-white/50">
                      Last active: {formatRelativeTime(client.lastActive)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">
                      {client.totalPageViews} views
                    </div>
                    <div className="text-xs text-white/50">
                      {client.sessionsThisMonth} sessions
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {client.topPages.slice(0, 3).map((p) => (
                      <span
                        key={p.page}
                        className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60"
                      >
                        {p.page}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {clientActivity.length === 0 && (
              <div className="text-center py-8 text-white/40">
                No client activity recorded for this period.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-white">Recent Activity</div>
              <div className="text-sm text-white/40">Live feed</div>
            </div>
          </div>

          <div className="divide-y divide-white/10 max-h-[600px] overflow-y-auto">
            {recentActivity.map((view) => (
              <div
                key={view.id}
                className="flex items-center justify-between px-6 py-3 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-white/60" />
                  </div>
                  <div>
                    <div className="text-sm text-white">
                      <span className="font-medium">{view.clientName}</span>
                      <span className="text-white/50"> viewed </span>
                      <span className="font-medium text-[#3B82F6]">{view.page}</span>
                    </div>
                    <div className="text-xs text-white/40">{view.pagePath}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {view.duration && (
                    <span className="text-xs text-white/40">
                      {formatDuration(view.duration)}
                    </span>
                  )}
                  <span className="text-xs text-white/50">
                    {formatRelativeTime(view.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {recentActivity.length === 0 && (
              <div className="text-center py-8 text-white/40">
                No recent activity recorded.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
