"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import Link from "next/link";
import { getAdminNavV2 } from "@/config/portalNav";
import {
  CreditCardIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ClockIcon,
  BanknotesIcon,
  CalendarIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

// Mock billing data
const MOCK_SUBSCRIPTION = {
  plan: "Pro",
  status: "active",
  amount: 99,
  interval: "month",
  nextBillingDate: "2025-01-27",
  cardLast4: "4242",
  cardBrand: "Visa",
};

const MOCK_INVOICES = [
  { id: "INV-001", date: "2024-12-27", amount: 99, status: "paid" },
  { id: "INV-002", date: "2024-11-27", amount: 99, status: "paid" },
  { id: "INV-003", date: "2024-10-27", amount: 99, status: "paid" },
  { id: "INV-004", date: "2024-09-27", amount: 99, status: "paid" },
];

const MOCK_USAGE = {
  storage: { used: 2.4, total: 10, unit: "GB" },
  apiCalls: { used: 8500, total: 10000, unit: "calls" },
  teamMembers: { used: 3, total: 5, unit: "members" },
};

export default function AdminBillingPage() {
  const nav = getAdminNavV2();

  const getStatusBadge = (status: string) => {
    if (status === "paid" || status === "active") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#47BD79]/20 text-[#47BD79] border border-[#47BD79]/30">
          <CheckCircleIcon className="w-3.5 h-3.5" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
        <ClockIcon className="w-3.5 h-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <PortalShellV2 role="admin" title="Billing" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
              <CreditCardIcon className="w-5 h-5 text-[#A855F7]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Billing & Subscription</h1>
              <p className="text-sm text-white/60">
                Manage your subscription, payment methods, and invoices
              </p>
            </div>
          </div>
          <Link
            href="/portal/admin"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Current Plan Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#A855F7] to-[#9333EA] flex items-center justify-center shadow-lg shadow-[#A855F7]/30">
                  <SparklesIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">{MOCK_SUBSCRIPTION.plan} Plan</h2>
                    {getStatusBadge(MOCK_SUBSCRIPTION.status)}
                  </div>
                  <p className="text-sm text-white/60 mt-1">
                    ${MOCK_SUBSCRIPTION.amount}/{MOCK_SUBSCRIPTION.interval} • Renews on {new Date(MOCK_SUBSCRIPTION.nextBillingDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all">
                  Change Plan
                </button>
                <button className="px-4 py-2 rounded-xl bg-[#A855F7] text-sm font-semibold text-white hover:bg-[#9333EA] transition-all shadow-lg shadow-[#A855F7]/30">
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(MOCK_USAGE).map(([key, value]) => {
              const percentage = (value.used / value.total) * 100;
              const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
              return (
                <div key={key} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white/70">{label}</span>
                    <span className="text-sm text-white">
                      {value.used} / {value.total} {value.unit}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        percentage > 80 ? "bg-amber-500" : "bg-[#47BD79]"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Method & Invoices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Method */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Payment Method</h3>
              <button className="text-sm text-[#47BD79] hover:text-[#5fcd8f] transition-colors">
                Update
              </button>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center gap-4">
              <div className="w-12 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <span className="text-xs font-bold text-white">VISA</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {MOCK_SUBSCRIPTION.cardBrand} ending in {MOCK_SUBSCRIPTION.cardLast4}
                </p>
                <p className="text-xs text-white/50">Expires 12/2026</p>
              </div>
              <CheckCircleIcon className="w-5 h-5 text-[#47BD79]" />
            </div>
            <button className="mt-4 w-full py-2.5 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <CreditCardIcon className="w-4 h-4" />
              Add Payment Method
            </button>
          </div>

          {/* Billing Address */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Billing Address</h3>
              <button className="text-sm text-[#47BD79] hover:text-[#5fcd8f] transition-colors">
                Edit
              </button>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
              <p className="text-sm font-medium text-white">Test Organization</p>
              <p className="text-sm text-white/60">123 Business Street</p>
              <p className="text-sm text-white/60">Toronto, ON M5V 1K4</p>
              <p className="text-sm text-white/60">Canada</p>
            </div>
          </div>
        </div>

        {/* Invoices */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <DocumentTextIcon className="w-5 h-5 text-white/60" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Invoice History</h3>
                <p className="text-sm text-white/50">Download your past invoices</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr className="text-xs uppercase tracking-wide text-white/50 border-b border-white/10">
                  <th className="px-6 py-3 text-left">Invoice</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_INVOICES.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{invoice.id}</td>
                    <td className="px-6 py-4 text-white/60">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-white">${invoice.amount}.00</td>
                    <td className="px-6 py-4">{getStatusBadge(invoice.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-1.5 text-sm text-[#47BD79] hover:text-[#5fcd8f] transition-colors">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-white/10 flex justify-center">
            <button className="text-sm text-white/50 hover:text-white transition-colors">
              View All Invoices
            </button>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
