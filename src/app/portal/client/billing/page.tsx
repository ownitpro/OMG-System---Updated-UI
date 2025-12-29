"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import Link from "next/link";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useState } from "react";
import {
  CreditCardIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  SparklesIcon,
  ArrowPathIcon,
  PlusIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Mock data - in real app, fetch from API
const mockInvoices = [
  {
    id: "INV-001",
    amount: 1000.00,
    status: "PAID",
    dueDate: "2024-12-15",
    createdAt: "2024-12-01",
    description: "OMG-CRM Pro Plan - December 2024",
  },
  {
    id: "INV-002",
    amount: 499.00,
    status: "SENT",
    dueDate: "2025-01-15",
    createdAt: "2024-12-27",
    description: "SecureVault Docs - Annual Subscription",
  },
  {
    id: "INV-003",
    amount: 299.00,
    status: "OVERDUE",
    dueDate: "2024-12-20",
    createdAt: "2024-12-05",
    description: "OMG-Leads Starter Plan",
  },
];

const mockSubscriptions = [
  {
    id: "SUB-001",
    name: "OMG-CRM Pro",
    status: "ACTIVE",
    amount: 99.00,
    interval: "month",
    nextBilling: "2025-01-15",
    startDate: "2024-06-15",
  },
  {
    id: "SUB-002",
    name: "SecureVault Docs",
    status: "ACTIVE",
    amount: 499.00,
    interval: "year",
    nextBilling: "2025-12-01",
    startDate: "2024-12-01",
  },
  {
    id: "SUB-003",
    name: "OMG-IQ Analytics",
    status: "TRIAL",
    amount: 149.00,
    interval: "month",
    nextBilling: "2025-01-10",
    trialEnds: "2025-01-10",
    startDate: "2024-12-27",
  },
];

const mockPaymentMethods = [
  {
    id: "PM-001",
    type: "card",
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2026,
    isDefault: true,
  },
  {
    id: "PM-002",
    type: "card",
    brand: "Mastercard",
    last4: "8888",
    expMonth: 6,
    expYear: 2025,
    isDefault: false,
  },
];

export default function ClientBillingPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;
  const [activeTab, setActiveTab] = useState<"overview" | "invoices" | "subscriptions" | "payment">("overview");

  // Calculate stats
  const stats = {
    totalInvoices: mockInvoices.length,
    paidInvoices: mockInvoices.filter(i => i.status === "PAID").length,
    pendingInvoices: mockInvoices.filter(i => i.status === "SENT").length,
    overdueInvoices: mockInvoices.filter(i => i.status === "OVERDUE").length,
    totalAmount: mockInvoices.reduce((sum, i) => sum + i.amount, 0),
    paidAmount: mockInvoices.filter(i => i.status === "PAID").reduce((sum, i) => sum + i.amount, 0),
    activeSubscriptions: mockSubscriptions.filter(s => s.status === "ACTIVE").length,
    trialSubscriptions: mockSubscriptions.filter(s => s.status === "TRIAL").length,
    monthlySpend: mockSubscriptions
      .filter(s => s.status === "ACTIVE" && s.interval === "month")
      .reduce((sum, s) => sum + s.amount, 0),
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#47BD79]/20 border border-[#47BD79]/30 px-2.5 py-1 text-xs font-medium text-[#47BD79]">
            <CheckCircleIcon className="w-3 h-3" />
            {status === "PAID" ? "Paid" : "Active"}
          </span>
        );
      case "SENT":
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-medium text-amber-400">
            <ClockIcon className="w-3 h-3" />
            Pending
          </span>
        );
      case "OVERDUE":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-1 text-xs font-medium text-red-400">
            <ExclamationTriangleIcon className="w-3 h-3" />
            Overdue
          </span>
        );
      case "TRIAL":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#A855F7]/20 border border-[#A855F7]/30 px-2.5 py-1 text-xs font-medium text-[#A855F7]">
            <SparklesIcon className="w-3 h-3" />
            Trial
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/20 px-2.5 py-1 text-xs font-medium text-white/50">
            <XMarkIcon className="w-3 h-3" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <PortalShellV2 role="client" title="Billing" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl border border-[#47BD79]/30 bg-gradient-to-br from-[#47BD79]/10 via-transparent to-[#3B82F6]/10 p-6 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#47BD79]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#47BD79]/20 flex items-center justify-center">
                <CreditCardIcon className="w-7 h-7 text-[#47BD79]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Billing & Subscriptions</h1>
                <p className="text-white/60">Manage your invoices, subscriptions, and payment methods</p>
              </div>
            </div>
            <Link
              href="/products/plans"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#47BD79] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all shadow-lg shadow-[#47BD79]/30"
            >
              <SparklesIcon className="w-4 h-4" />
              Upgrade Plan
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
                <BanknotesIcon className="w-5 h-5 text-[#47BD79]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{formatCurrency(stats.paidAmount)}</div>
            <div className="text-sm text-white/50">Total Paid</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
                <ArrowPathIcon className="w-5 h-5 text-[#3B82F6]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{stats.activeSubscriptions}</div>
            <div className="text-sm text-white/50">Active Subscriptions</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{stats.pendingInvoices}</div>
            <div className="text-sm text-white/50">Pending Invoices</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
                <CalendarDaysIcon className="w-5 h-5 text-[#A855F7]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{formatCurrency(stats.monthlySpend)}</div>
            <div className="text-sm text-white/50">Monthly Spend</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/10 pb-4 overflow-x-auto">
          {[
            { id: "overview", label: "Overview" },
            { id: "invoices", label: `Invoices (${mockInvoices.length})` },
            { id: "subscriptions", label: `Subscriptions (${mockSubscriptions.length})` },
            { id: "payment", label: "Payment Methods" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#47BD79] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Invoices */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Recent Invoices</h3>
                <button
                  onClick={() => setActiveTab("invoices")}
                  className="text-sm text-[#47BD79] hover:text-[#5ed492] transition-colors"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-3">
                {mockInvoices.slice(0, 3).map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <DocumentTextIcon className="w-5 h-5 text-white/50" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{invoice.id}</div>
                        <div className="text-xs text-white/50">{formatDate(invoice.createdAt)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">{formatCurrency(invoice.amount)}</div>
                      {getStatusBadge(invoice.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Subscriptions */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Active Subscriptions</h3>
                <button
                  onClick={() => setActiveTab("subscriptions")}
                  className="text-sm text-[#47BD79] hover:text-[#5ed492] transition-colors"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-3">
                {mockSubscriptions.slice(0, 3).map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#47BD79]/20 flex items-center justify-center">
                        <SparklesIcon className="w-5 h-5 text-[#47BD79]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{sub.name}</div>
                        <div className="text-xs text-white/50">
                          Next billing: {formatDate(sub.nextBilling)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">
                        {formatCurrency(sub.amount)}/{sub.interval === "month" ? "mo" : "yr"}
                      </div>
                      {getStatusBadge(sub.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === "invoices" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 text-xs font-medium text-white/50 uppercase tracking-wider">Invoice</th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-white/50 uppercase tracking-wider">Description</th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-white/50 uppercase tracking-wider">Date</th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-white/50 uppercase tracking-wider">Amount</th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-white/50 uppercase tracking-wider">Status</th>
                    <th className="text-right py-4 px-6 text-xs font-medium text-white/50 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {mockInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-white">{invoice.id}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-white/70">{invoice.description}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-white/70">{formatDate(invoice.createdAt)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm font-medium text-white">{formatCurrency(invoice.amount)}</span>
                      </td>
                      <td className="py-4 px-6">{getStatusBadge(invoice.status)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                            <ArrowDownTrayIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === "subscriptions" && (
          <div className="space-y-4">
            {mockSubscriptions.map((sub) => (
              <div
                key={sub.id}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
                      <SparklesIcon className="w-6 h-6 text-[#47BD79]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">{sub.name}</h3>
                        {getStatusBadge(sub.status)}
                      </div>
                      <p className="text-sm text-white/50 mt-1">
                        Started {formatDate(sub.startDate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {formatCurrency(sub.amount)}
                      <span className="text-sm font-normal text-white/50">
                        /{sub.interval === "month" ? "mo" : "yr"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-white/50">Next billing:</span>
                      <span className="ml-2 text-white">{formatDate(sub.nextBilling)}</span>
                    </div>
                    {sub.status === "TRIAL" && sub.trialEnds && (
                      <div>
                        <span className="text-white/50">Trial ends:</span>
                        <span className="ml-2 text-[#A855F7]">{formatDate(sub.trialEnds)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                      Manage
                    </button>
                    {sub.status === "TRIAL" && (
                      <button className="px-4 py-2 rounded-xl bg-[#47BD79] text-sm font-semibold text-white hover:bg-[#3da86a] transition-colors">
                        Upgrade Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === "payment" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Payment Methods</h3>
              <button className="inline-flex items-center gap-2 rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da86a] transition-all">
                <PlusIcon className="w-4 h-4" />
                Add Payment Method
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockPaymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`rounded-2xl border p-5 ${
                    method.isDefault
                      ? "border-[#47BD79]/30 bg-[#47BD79]/5"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        method.isDefault ? "bg-[#47BD79]/20" : "bg-white/10"
                      }`}>
                        <CreditCardIcon className={`w-6 h-6 ${
                          method.isDefault ? "text-[#47BD79]" : "text-white/50"
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">
                            {method.brand} •••• {method.last4}
                          </span>
                          {method.isDefault && (
                            <span className="rounded-full bg-[#47BD79]/20 border border-[#47BD79]/30 px-2 py-0.5 text-xs text-[#47BD79]">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-white/50 mt-1">
                          Expires {method.expMonth}/{method.expYear}
                        </div>
                      </div>
                    </div>
                    <button className="text-sm text-white/50 hover:text-white transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Billing Address */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Billing Address</h3>
                <button className="text-sm text-[#47BD79] hover:text-[#5ed492] transition-colors">
                  Edit
                </button>
              </div>
              <div className="text-sm text-white/70 space-y-1">
                <p>John Doe</p>
                <p>123 Business Street</p>
                <p>Suite 100</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalShellV2>
  );
}
