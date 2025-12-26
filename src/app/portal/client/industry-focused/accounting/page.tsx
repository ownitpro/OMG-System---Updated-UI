"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import Link from "next/link";
import {
  CalculatorIcon,
  DocumentTextIcon,
  ClockIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

const ACCOUNTING_TOOLS = [
  {
    id: "1",
    name: "Client Invoice Generator",
    description: "Automated invoice creation and delivery",
    status: "active",
    usage: "156 invoices this month",
    color: "#47BD79",
  },
  {
    id: "2",
    name: "Tax Document Organizer",
    description: "AI-powered document classification",
    status: "active",
    usage: "1,240 documents processed",
    color: "#3B82F6",
  },
  {
    id: "3",
    name: "Expense Categorization",
    description: "Smart expense tracking and reporting",
    status: "active",
    usage: "$45,230 categorized",
    color: "#A855F7",
  },
  {
    id: "4",
    name: "Financial Reports",
    description: "Automated P&L and balance sheets",
    status: "active",
    usage: "12 reports generated",
    color: "#F59E0B",
  },
];

const RECENT_ACTIVITY = [
  { action: "Invoice #1042 sent", client: "ABC Corp", time: "2 hours ago", color: "#47BD79" },
  { action: "Tax docs processed", client: "XYZ Ltd", time: "4 hours ago", color: "#3B82F6" },
  { action: "Q4 Report generated", client: "Internal", time: "1 day ago", color: "#A855F7" },
];

const UPCOMING_DEADLINES = [
  { task: "Q4 Tax Filing", date: "Jan 31, 2025", priority: "high" },
  { task: "Monthly Reconciliation", date: "Jan 15, 2025", priority: "medium" },
  { task: "Client Audit Prep", date: "Feb 1, 2025", priority: "low" },
];

export default function AccountingPage() {
  const nav = getClientNavV2();

  return (
    <PortalShellV2 role="client" title="Accounting" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
              <CalculatorIcon className="w-5 h-5 text-[#47BD79]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Accounting Solutions</h1>
              <p className="text-sm text-white/60">
                Tools and automations designed for accounting firms.
              </p>
            </div>
          </div>

          <Link
            href="/contact?solution=accounting"
            className="rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors"
          >
            Get Support
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <DocumentTextIcon className="w-4 h-4" />
              Invoices Sent
            </div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">156</div>
            <div className="mt-1 text-xs text-[#47BD79]">+12% this month</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CurrencyDollarIcon className="w-4 h-4" />
              Revenue Tracked
            </div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">$124K</div>
            <div className="mt-1 text-xs text-[#3B82F6]">+8% this month</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ClockIcon className="w-4 h-4" />
              Hours Saved
            </div>
            <div className="mt-1 text-2xl font-bold text-[#A855F7]">42</div>
            <div className="mt-1 text-xs text-[#A855F7]">This month</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ChartBarIcon className="w-4 h-4" />
              Accuracy Rate
            </div>
            <div className="mt-1 text-2xl font-bold text-[#F59E0B]">99.2%</div>
            <div className="mt-1 text-xs text-[#F59E0B]">AI-powered</div>
          </div>
        </div>

        {/* Accounting Tools */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="text-lg font-semibold text-white">Your Accounting Tools</div>
          </div>

          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
            {ACCOUNTING_TOOLS.map((tool) => (
              <div
                key={tool.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${tool.color}20` }}
                    >
                      <CalculatorIcon className="w-5 h-5" style={{ color: tool.color }} />
                    </div>
                    <div>
                      <div className="font-medium text-white">{tool.name}</div>
                      <div className="text-sm text-white/60">{tool.description}</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#47BD79]/20 px-2 py-1 text-xs font-medium text-[#47BD79]">
                    <CheckCircleIcon className="w-3 h-3" />
                    Active
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="text-xs text-white/50">{tool.usage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity & Deadlines */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <ArrowTrendingUpIcon className="w-5 h-5 text-[#3B82F6]" />
                <div className="text-lg font-semibold text-white">Recent Activity</div>
              </div>
            </div>
            <div className="divide-y divide-white/10">
              {RECENT_ACTIVITY.map((activity, index) => (
                <div key={index} className="flex items-center justify-between px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activity.color }}
                    />
                    <div>
                      <div className="text-sm text-white">{activity.action}</div>
                      <div className="text-xs text-white/50">{activity.client}</div>
                    </div>
                  </div>
                  <div className="text-xs text-white/50">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="w-5 h-5 text-[#F59E0B]" />
                <div className="text-lg font-semibold text-white">Upcoming Deadlines</div>
              </div>
            </div>
            <div className="divide-y divide-white/10">
              {UPCOMING_DEADLINES.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between px-6 py-3">
                  <div>
                    <div className="text-sm text-white">{deadline.task}</div>
                    <div className="text-xs text-white/50">{deadline.date}</div>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      deadline.priority === "high"
                        ? "bg-red-500/20 text-red-400"
                        : deadline.priority === "medium"
                        ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {deadline.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="text-lg font-semibold text-white mb-4">Quick Actions</div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors">
              Generate Invoice
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Run Financial Report
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Process Documents
            </button>
            <Link
              href="/solutions/accounting"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              View All Tools
            </Link>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
