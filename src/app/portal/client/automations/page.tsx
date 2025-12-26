"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import Link from "next/link";
import {
  BoltIcon,
  PlayIcon,
  PauseIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const SAMPLE_AUTOMATIONS = [
  {
    id: "1",
    name: "Lead Follow-up Sequence",
    description: "Automatically send follow-up emails to new leads after 24, 48, and 72 hours.",
    status: "active",
    lastRun: "2 hours ago",
    runsToday: 12,
    color: "#47BD79",
  },
  {
    id: "2",
    name: "Client Onboarding",
    description: "Trigger welcome email and create task list when a new client is added.",
    status: "active",
    lastRun: "5 hours ago",
    runsToday: 3,
    color: "#3B82F6",
  },
  {
    id: "3",
    name: "Invoice Reminder",
    description: "Send payment reminders 7 days before and on the due date.",
    status: "paused",
    lastRun: "1 day ago",
    runsToday: 0,
    color: "#F59E0B",
  },
  {
    id: "4",
    name: "Weekly Report Generator",
    description: "Compile and send weekly performance reports every Monday.",
    status: "active",
    lastRun: "3 days ago",
    runsToday: 0,
    color: "#A855F7",
  },
];

export default function AutomationsPage() {
  const nav = getClientNavV2();

  const activeCount = SAMPLE_AUTOMATIONS.filter((a) => a.status === "active").length;
  const totalRuns = SAMPLE_AUTOMATIONS.reduce((sum, a) => sum + a.runsToday, 0);

  return (
    <PortalShellV2 role="client" title="Automations" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
              <BoltIcon className="w-5 h-5 text-[#A855F7]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Automations</h1>
              <p className="text-sm text-white/60">
                Run and manage your automated workflows.
              </p>
            </div>
          </div>

          <Link
            href="/solutions/automations"
            className="rounded-xl bg-[#A855F7] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9333EA] transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            New Automation
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="text-sm text-white/60">Active Automations</div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">{activeCount}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="text-sm text-white/60">Total Runs Today</div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">{totalRuns}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="text-sm text-white/60">Time Saved This Week</div>
            <div className="mt-1 text-2xl font-bold text-[#A855F7]">4.5 hrs</div>
          </div>
        </div>

        {/* Automations List */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-white">Your Automations</div>
              <button className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                <ArrowPathIcon className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {SAMPLE_AUTOMATIONS.map((automation) => (
              <div
                key={automation.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${automation.color}20` }}
                  >
                    <BoltIcon className="w-5 h-5" style={{ color: automation.color }} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{automation.name}</div>
                    <div className="text-sm text-white/60">{automation.description}</div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        Last run: {automation.lastRun}
                      </span>
                      <span>|</span>
                      <span>{automation.runsToday} runs today</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {automation.status === "active" ? (
                      <span className="flex items-center gap-1 rounded-full bg-[#47BD79]/20 border border-[#47BD79]/30 px-3 py-1 text-xs font-medium text-[#47BD79]">
                        <CheckCircleIcon className="w-3.5 h-3.5" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/30 px-3 py-1 text-xs font-medium text-[#F59E0B]">
                        <ExclamationCircleIcon className="w-3.5 h-3.5" />
                        Paused
                      </span>
                    )}
                  </div>

                  <button
                    className="rounded-lg bg-white/5 border border-white/10 p-2 text-white hover:bg-white/10 transition-colors"
                    title={automation.status === "active" ? "Pause" : "Play"}
                  >
                    {automation.status === "active" ? (
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
          style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
        >
          <div className="text-lg font-semibold text-white mb-4">Quick Actions</div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/solutions/automations"
              className="rounded-xl bg-[#A855F7] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#9333EA] transition-colors"
            >
              Browse Templates
            </Link>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              View Run History
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Schedule Report
            </button>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
