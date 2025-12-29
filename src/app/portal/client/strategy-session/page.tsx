"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import Link from "next/link";
import {
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  VideoCameraIcon,
  UserIcon,
  PlusIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const UPCOMING_SESSIONS = [
  {
    id: "1",
    title: "Q1 Marketing Strategy Review",
    advisor: "Sarah Mitchell",
    date: "Jan 15, 2025",
    time: "10:00 AM EST",
    duration: "60 min",
    type: "Video Call",
    status: "confirmed",
    color: "#47BD79",
  },
  {
    id: "2",
    title: "Product Launch Planning",
    advisor: "James Wilson",
    date: "Jan 22, 2025",
    time: "2:00 PM EST",
    duration: "90 min",
    type: "Video Call",
    status: "pending",
    color: "#3B82F6",
  },
];

const PAST_SESSIONS = [
  {
    id: "3",
    title: "Annual Business Review",
    advisor: "Sarah Mitchell",
    date: "Dec 15, 2024",
    duration: "60 min",
    notes: "Reviewed yearly goals, identified growth areas",
    color: "#A855F7",
  },
  {
    id: "4",
    title: "Brand Strategy Workshop",
    advisor: "Emily Chen",
    date: "Dec 1, 2024",
    duration: "120 min",
    notes: "Developed new brand messaging framework",
    color: "#F59E0B",
  },
];

const AVAILABLE_SLOTS = [
  { day: "Mon", date: "Jan 20", slots: 3 },
  { day: "Tue", date: "Jan 21", slots: 5 },
  { day: "Wed", date: "Jan 22", slots: 2 },
  { day: "Thu", date: "Jan 23", slots: 4 },
  { day: "Fri", date: "Jan 24", slots: 1 },
];

export default function StrategySessionPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();

  const lockedCount = Object.values(entitlements).filter(
    (s) => s === "locked"
  ).length;

  return (
    <PortalShellV2 role="client" title="Strategy Session" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
              <CalendarDaysIcon className="w-5 h-5 text-[#47BD79]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Strategy Session</h1>
              <p className="text-sm text-white/60">
                Book and manage your strategy sessions with our team.
              </p>
            </div>
          </div>

          <Link
            href="/contact?solution=strategy"
            className="rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Book Session
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CalendarDaysIcon className="w-4 h-4" />
              Upcoming
            </div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">{UPCOMING_SESSIONS.length}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircleIcon className="w-4 h-4" />
              Completed
            </div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">{PAST_SESSIONS.length}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ClockIcon className="w-4 h-4" />
              Hours This Year
            </div>
            <div className="mt-1 text-2xl font-bold text-[#A855F7]">12.5</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <UserIcon className="w-4 h-4" />
              Advisors
            </div>
            <div className="mt-1 text-2xl font-bold text-[#F59E0B]">3</div>
          </div>
        </div>

        {/* Available Slots */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="w-5 h-5 text-[#47BD79]" />
              <div className="text-lg font-semibold text-white">Available This Week</div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {AVAILABLE_SLOTS.map((slot) => (
              <button
                key={slot.day}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center hover:border-[#47BD79]/50 hover:bg-[#47BD79]/10 transition-all group"
              >
                <div className="text-sm font-medium text-white/60">{slot.day}</div>
                <div className="text-lg font-semibold text-white mt-1">{slot.date}</div>
                <div className="mt-2 text-xs text-[#47BD79]">{slot.slots} slots</div>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="text-lg font-semibold text-white">Upcoming Sessions</div>
          </div>

          <div className="divide-y divide-white/10">
            {UPCOMING_SESSIONS.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${session.color}20` }}
                  >
                    <VideoCameraIcon className="w-5 h-5" style={{ color: session.color }} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{session.title}</div>
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <UserIcon className="w-3 h-3" />
                        {session.advisor}
                      </span>
                      <span>|</span>
                      <span>{session.date} at {session.time}</span>
                      <span>|</span>
                      <span>{session.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      session.status === "confirmed"
                        ? "bg-[#47BD79]/20 text-[#47BD79]"
                        : "bg-[#F59E0B]/20 text-[#F59E0B]"
                    }`}
                  >
                    {session.status === "confirmed" && <CheckCircleIcon className="w-3.5 h-3.5" />}
                    {session.status}
                  </span>
                  <button className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-1">
                    Join
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Sessions */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="text-lg font-semibold text-white">Past Sessions</div>
          </div>

          <div className="divide-y divide-white/10">
            {PAST_SESSIONS.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${session.color}20` }}
                  >
                    <CheckCircleIcon className="w-5 h-5" style={{ color: session.color }} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{session.title}</div>
                    <div className="text-sm text-white/60">{session.date} • {session.duration}</div>
                    <div className="mt-1 text-xs text-white/50">{session.notes}</div>
                  </div>
                </div>

                <button className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/10 transition-colors">
                  View Notes
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="text-lg font-semibold text-white mb-4">Quick Actions</div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?solution=strategy"
              className="rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors"
            >
              Schedule New Session
            </Link>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              View All Notes
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Download Recordings
            </button>
            <Link
              href="/products/strategy-session"
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
