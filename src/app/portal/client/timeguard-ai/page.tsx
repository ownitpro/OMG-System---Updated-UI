"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useTimeEntries } from "@/hooks/useTimeEntries";
import Link from "next/link";
import React from "react";
import {
  ClockIcon,
  ChartBarIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  PlayIcon,
  PauseIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { formatDuration, calculateRunningDuration, isEntryRunning, formatDate } from "@/lib/client/formatters";

// Updated to match API response structure
const TIME_ENTRIES = [
  {
    id: "1",
    project: "Website Redesign",
    description: "Homepage wireframes and development",
    startTime: new Date(Date.now() - 2.75 * 60 * 60 * 1000).toISOString(), // 2h 45m ago
    endTime: null, // null = currently running
    duration: null, // calculated when stopped
    billable: true,
    tags: ['design', 'development'],
    color: "#47BD79",
  },
  {
    id: "2",
    project: "Client Onboarding",
    description: "Documentation review and setup",
    startTime: "2025-01-10T09:00:00Z",
    endTime: "2025-01-10T10:30:00Z",
    duration: 90, // minutes
    billable: true,
    tags: ['onboarding', 'documentation'],
    color: "#3B82F6",
  },
  {
    id: "3",
    project: "Marketing Campaign",
    description: "Social media content creation",
    startTime: "2025-01-10T11:00:00Z",
    endTime: "2025-01-10T14:15:00Z",
    duration: 195, // minutes
    billable: true,
    tags: ['marketing', 'content'],
    color: "#A855F7",
  },
  {
    id: "4",
    project: "Product Development",
    description: "Feature planning meeting",
    startTime: "2025-01-10T14:30:00Z",
    endTime: "2025-01-10T15:15:00Z",
    duration: 45,
    billable: false,
    tags: ['planning', 'meeting'],
    color: "#F59E0B",
  },
];

const WEEKLY_STATS = [
  { day: "Mon", hours: 7.5, color: "#47BD79" },
  { day: "Tue", hours: 8.2, color: "#3B82F6" },
  { day: "Wed", hours: 6.8, color: "#A855F7" },
  { day: "Thu", hours: 8.0, color: "#F59E0B" },
  { day: "Fri", hours: 4.5, color: "#EC4899" },
];

// Helper function to get color by project
const getProjectColor = (project: string) => {
  const colors = ['#47BD79', '#3B82F6', '#A855F7', '#F59E0B', '#EC4899'];
  const hash = project.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return colors[hash % colors.length];
};

export default function TimeguardAIPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();
  const { entries, isLoading, error, startTimer, stopTimer } = useTimeEntries();
  const [currentTime, setCurrentTime] = React.useState(Date.now());

  // Update current time every second for running timers
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate stats from real data
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayEntries = entries.filter(e => new Date(e.startTime) >= today);

  const totalMinutesToday = todayEntries.reduce((sum, e) => {
    if (isEntryRunning(e)) {
      return sum + calculateRunningDuration(e, currentTime);
    }
    return sum + (e.duration || 0);
  }, 0);
  const totalHoursToday = (totalMinutesToday / 60).toFixed(1);

  // Get unique projects
  const activeProjects = new Set(entries.map(e => e.project)).size;

  const totalHoursWeek = WEEKLY_STATS.reduce((sum, d) => sum + d.hours, 0);
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  // Handle play/pause button click
  const handleToggleTimer = async (entry: any) => {
    try {
      if (isEntryRunning(entry)) {
        await stopTimer(entry.id);
      } else {
        // For stopped entries, we could implement resume functionality
        // For now, just show a message or start a new timer
        await startTimer({
          project: entry.project,
          description: entry.description || undefined,
          billable: entry.billable,
          tags: entry.tags,
        });
      }
    } catch (err) {
      console.error('Failed to toggle timer:', err);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <PortalShellV2 role="client" title="Timeguard-AI" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5CF6]"></div>
        </div>
      </PortalShellV2>
    );
  }

  // Error state
  if (error) {
    return (
      <PortalShellV2 role="client" title="Timeguard-AI" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
          Failed to load time entries: {error.message}
        </div>
      </PortalShellV2>
    );
  }

  return (
    <PortalShellV2 role="client" title="Timeguard-AI" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Timeguard-AI</h1>
              <p className="text-sm text-white/60">
                AI-powered time tracking and productivity management.
              </p>
            </div>
          </div>

          <button
            onClick={() => startTimer({ project: 'New Project', billable: true, tags: [] })}
            className="rounded-xl bg-[#8B5CF6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7C3AED] transition-colors flex items-center gap-2"
          >
            <PlayIcon className="w-4 h-4" />
            Start Timer
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ClockIcon className="w-4 h-4" />
              Today
            </div>
            <div className="mt-1 text-2xl font-bold text-[#8B5CF6]">{totalHoursToday}h</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CalendarDaysIcon className="w-4 h-4" />
              This Week
            </div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">{totalHoursWeek.toFixed(1)}h</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ChartBarIcon className="w-4 h-4" />
              Productivity
            </div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">92%</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <UserGroupIcon className="w-4 h-4" />
              Active Projects
            </div>
            <div className="mt-1 text-2xl font-bold text-[#F59E0B]">{activeProjects}</div>
          </div>
        </div>

        {/* Weekly Overview */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.05)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ArrowTrendingUpIcon className="w-5 h-5 text-[#8B5CF6]" />
              <div className="text-lg font-semibold text-white">Weekly Overview</div>
            </div>
            <div className="text-sm text-white/60">Goal: 40h/week</div>
          </div>
          <div className="flex items-end justify-between gap-2 h-32">
            {WEEKLY_STATS.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-24">
                  <div
                    className="w-full max-w-12 rounded-t-lg transition-all"
                    style={{
                      height: `${(day.hours / 10) * 100}%`,
                      backgroundColor: day.color,
                    }}
                  />
                </div>
                <div className="text-xs text-white/60">{day.day}</div>
                <div className="text-xs font-medium text-white">{day.hours}h</div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Entries */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="text-lg font-semibold text-white">Today's Time Entries</div>
          </div>

          <div className="divide-y divide-white/10">
            {todayEntries.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <ClockIcon className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/60 mb-4">No time entries today</p>
                <button
                  onClick={() => startTimer({ project: 'New Project', billable: true, tags: [] })}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7C3AED] transition-colors"
                >
                  <PlayIcon className="w-4 h-4" />
                  Start Your First Timer
                </button>
              </div>
            ) : (
              todayEntries.map((entry) => {
                const color = getProjectColor(entry.project);
                const running = isEntryRunning(entry);
                const duration = running
                  ? calculateRunningDuration(entry, currentTime)
                  : entry.duration || 0;
                const formattedDuration = formatDuration(duration);

                return (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <ClockIcon className="w-5 h-5" style={{ color }} />
                      </div>
                      <div>
                        <div className="font-medium text-white">{entry.project}</div>
                        <div className="text-sm text-white/60">{entry.description || 'No description'}</div>
                        {entry.tags.length > 0 && (
                          <div className="mt-1 flex gap-1">
                            {entry.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-md bg-white/5 px-2 py-0.5 text-xs text-white/60"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-white">{formattedDuration}</div>
                        {entry.billable && (
                          <div className="text-xs text-white/50">Billable</div>
                        )}
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                          running
                            ? "bg-[#47BD79]/20 text-[#47BD79]"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {running && <span className="w-2 h-2 rounded-full bg-[#47BD79] animate-pulse" />}
                        {running ? 'Running' : 'Completed'}
                      </span>
                      <button
                        onClick={() => handleToggleTimer(entry)}
                        className="rounded-lg bg-white/5 border border-white/10 p-2 text-white hover:bg-white/10 transition-colors"
                      >
                        {running ? (
                          <PauseIcon className="w-4 h-4" />
                        ) : (
                          <PlayIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.05)" }}
        >
          <div className="text-lg font-semibold text-white mb-4">Quick Actions</div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl bg-[#8B5CF6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#7C3AED] transition-colors">
              Start New Timer
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              View Reports
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Manage Projects
            </button>
            <Link
              href="/products/timeguard-ai"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
