"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import Link from "next/link";
import {
  ClockIcon,
  ChartBarIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  PlayIcon,
  PauseIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const TIME_ENTRIES = [
  {
    id: "1",
    project: "Website Redesign",
    task: "Homepage Development",
    duration: "2h 45m",
    status: "running",
    color: "#47BD79",
  },
  {
    id: "2",
    project: "Client Onboarding",
    task: "Documentation Review",
    duration: "1h 30m",
    status: "completed",
    color: "#3B82F6",
  },
  {
    id: "3",
    project: "Marketing Campaign",
    task: "Content Creation",
    duration: "3h 15m",
    status: "completed",
    color: "#A855F7",
  },
  {
    id: "4",
    project: "Product Development",
    task: "Feature Planning",
    duration: "45m",
    status: "paused",
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

export default function TimeguardAIPage() {
  const nav = getClientNavV2();

  const totalHoursToday = 8.5;
  const totalHoursWeek = WEEKLY_STATS.reduce((sum, d) => sum + d.hours, 0);

  return (
    <PortalShellV2 role="client" title="Timeguard-AI" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
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

          <button className="rounded-xl bg-[#8B5CF6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7C3AED] transition-colors flex items-center gap-2">
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
            <div className="mt-1 text-2xl font-bold text-[#F59E0B]">4</div>
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
            {TIME_ENTRIES.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${entry.color}20` }}
                  >
                    <ClockIcon className="w-5 h-5" style={{ color: entry.color }} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{entry.project}</div>
                    <div className="text-sm text-white/60">{entry.task}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-white">{entry.duration}</div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      entry.status === "running"
                        ? "bg-[#47BD79]/20 text-[#47BD79]"
                        : entry.status === "paused"
                        ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {entry.status === "running" && <span className="w-2 h-2 rounded-full bg-[#47BD79] animate-pulse" />}
                    {entry.status}
                  </span>
                  <button className="rounded-lg bg-white/5 border border-white/10 p-2 text-white hover:bg-white/10 transition-colors">
                    {entry.status === "running" ? (
                      <PauseIcon className="w-4 h-4" />
                    ) : (
                      <PlayIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
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
