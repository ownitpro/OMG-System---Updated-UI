"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import Link from "next/link";
import { useState } from "react";
import {
  BoltIcon,
  PlayIcon,
  PauseIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { formatTimeAgo, calculateSuccessRate, AUTOMATION_RUN_STATUS } from "@/lib/client/formatters";
import { useAutomations, useCreateAutomation } from "@/hooks/useClientData";

// Updated to match API response structure
const SAMPLE_AUTOMATIONS = [
  {
    id: "1",
    name: "Lead Follow-up Sequence",
    description: "Automatically send follow-up emails to new leads after 24, 48, and 72 hours.",
    status: "active",
    type: "Email Sequence",
    // API fields: totalRuns, successfulRuns, failedRuns
    totalRuns: 45,
    successfulRuns: 42,
    failedRuns: 3,
    // API fields: lastRunAt (ISO date), lastRunStatus (SUCCESS/FAILED/PARTIAL)
    lastRunAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    lastRunStatus: "SUCCESS",
    color: "#47BD79",
  },
  {
    id: "2",
    name: "Client Onboarding",
    description: "Trigger welcome email and create task list when a new client is added.",
    status: "active",
    type: "Workflow",
    totalRuns: 8,
    successfulRuns: 7,
    failedRuns: 1,
    lastRunAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    lastRunStatus: "SUCCESS",
    color: "#3B82F6",
  },
  {
    id: "3",
    name: "Invoice Reminder",
    description: "Send payment reminders 7 days before and on the due date.",
    status: "paused",
    type: "Email Sequence",
    totalRuns: 124,
    successfulRuns: 118,
    failedRuns: 6,
    lastRunAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    lastRunStatus: "PARTIAL",
    color: "#F59E0B",
  },
  {
    id: "4",
    name: "Weekly Report Generator",
    description: "Compile and send weekly performance reports every Monday.",
    status: "active",
    type: "Report",
    totalRuns: 52,
    successfulRuns: 50,
    failedRuns: 2,
    lastRunAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    lastRunStatus: "SUCCESS",
    color: "#A855F7",
  },
];

export default function AutomationsPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();

  // 🔌 CONNECTED TO API - Fetch real automations from database
  const { data: automationsData, loading, error, refetch } = useAutomations();
  const automations = automationsData?.automations || SAMPLE_AUTOMATIONS;

  // 🔌 CRUD - Create automation
  const { mutate: createAutomation, loading: creating } = useCreateAutomation();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "Email Sequence",
  });
  const [formError, setFormError] = useState("");

  console.log('[AUTOMATIONS DEBUG] Automations to display:', automations?.length, automations);

  const activeCount = automations.filter((a) => a.status === "ACTIVE" || a.status === "active").length;
  const totalRuns = automations.reduce((sum, a) => sum + a.totalRuns, 0);
  const totalSuccessful = automations.reduce((sum, a) => sum + a.successfulRuns, 0);
  const successRate = calculateSuccessRate(totalSuccessful, totalRuns);
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  const handleCreateAutomation = async () => {
    if (!formData.name || !formData.description) {
      setFormError("Name and description are required");
      return;
    }

    try {
      await createAutomation({
        name: formData.name,
        description: formData.description,
        type: formData.type,
        status: "INACTIVE",
        trigger: JSON.stringify({ event: "manual" }),
        actions: JSON.stringify([{ type: "log", message: "Automation triggered" }]),
      });

      // Success!
      setShowModal(false);
      setFormData({ name: "", description: "", type: "Email Sequence" });
      setFormError("");
      refetch(); // Refresh list
    } catch (err) {
      setFormError("Failed to create automation");
      console.error(err);
    }
  };

  return (
    <PortalShellV2 role="client" title="Automations" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
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

          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl bg-[#A855F7] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9333EA] transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            New Automation
          </button>
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
            <div className="text-sm text-white/60">Total Runs</div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">{totalRuns}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="text-sm text-white/60">Success Rate</div>
            <div className="mt-1 text-2xl font-bold text-[#A855F7]">{successRate}%</div>
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
            {automations.map((automation) => (
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
                        Last run: {formatTimeAgo(automation.lastRunAt)}
                      </span>
                      <span>|</span>
                      <span>{automation.totalRuns} total runs</span>
                      <span>|</span>
                      <span className={automation.lastRunStatus === "SUCCESS" ? "text-[#47BD79]" : automation.lastRunStatus === "FAILED" ? "text-red-400" : "text-amber-400"}>
                        {calculateSuccessRate(automation.successfulRuns, automation.totalRuns)}% success
                      </span>
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

      {/* Create Automation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#1e293b] rounded-2xl border border-white/10 p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Create New Automation</h3>
              <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/30">
                <p className="text-sm text-red-400">{formError}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#A855F7] focus:outline-none focus:ring-1 focus:ring-[#A855F7] transition-colors"
                  placeholder="My Automation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-[#A855F7] focus:outline-none focus:ring-1 focus:ring-[#A855F7] transition-colors resize-none"
                  placeholder="What does this automation do?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[#A855F7] focus:outline-none focus:ring-1 focus:ring-[#A855F7] transition-colors"
                >
                  <option value="Email Sequence" className="bg-[#1e293b]">Email Sequence</option>
                  <option value="Workflow" className="bg-[#1e293b]">Workflow</option>
                  <option value="Notification" className="bg-[#1e293b]">Notification</option>
                  <option value="Report" className="bg-[#1e293b]">Report</option>
                  <option value="Data Sync" className="bg-[#1e293b]">Data Sync</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAutomation}
                  disabled={creating}
                  className="flex-1 rounded-xl bg-[#A855F7] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#9333EA] disabled:opacity-50 transition-colors"
                >
                  {creating ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PortalShellV2>
  );
}
