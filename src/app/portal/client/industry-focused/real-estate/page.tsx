"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import Link from "next/link";
import {
  HomeModernIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const REAL_ESTATE_TOOLS = [
  {
    id: "1",
    name: "Listing Manager",
    description: "MLS sync and listing automation",
    status: "active",
    usage: "24 active listings",
    color: "#47BD79",
  },
  {
    id: "2",
    name: "Lead Tracking CRM",
    description: "Buyer and seller lead management",
    status: "active",
    usage: "156 leads in pipeline",
    color: "#3B82F6",
  },
  {
    id: "3",
    name: "Transaction Coordinator",
    description: "Deal management and closing automation",
    status: "active",
    usage: "8 pending closings",
    color: "#A855F7",
  },
  {
    id: "4",
    name: "Market Analytics",
    description: "Local market trends and pricing data",
    status: "active",
    usage: "Real-time data",
    color: "#F59E0B",
  },
];

const ACTIVE_LISTINGS = [
  {
    id: "1",
    address: "123 Oak Street",
    price: "$450,000",
    type: "Single Family",
    status: "Active",
    daysOnMarket: 12,
    color: "#47BD79",
  },
  {
    id: "2",
    address: "456 Maple Avenue",
    price: "$325,000",
    type: "Condo",
    status: "Under Contract",
    daysOnMarket: 28,
    color: "#3B82F6",
  },
  {
    id: "3",
    address: "789 Pine Road",
    price: "$875,000",
    type: "Luxury Home",
    status: "Active",
    daysOnMarket: 5,
    color: "#A855F7",
  },
];

const UPCOMING_SHOWINGS = [
  { property: "123 Oak Street", time: "Today, 2:00 PM", client: "John Smith" },
  { property: "789 Pine Road", time: "Tomorrow, 10:00 AM", client: "Sarah Johnson" },
  { property: "456 Maple Avenue", time: "Jan 8, 3:30 PM", client: "Mike Davis" },
];

const PIPELINE_STATS = [
  { stage: "New Leads", count: 45, color: "#3B82F6" },
  { stage: "Qualified", count: 28, color: "#A855F7" },
  { stage: "Showing", count: 15, color: "#F59E0B" },
  { stage: "Offer", count: 8, color: "#47BD79" },
  { stage: "Closing", count: 4, color: "#EC4899" },
];

export default function RealEstatePage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  return (
    <PortalShellV2 role="client" title="Real Estate" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
              <HomeModernIcon className="w-5 h-5 text-[#47BD79]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Real Estate Solutions</h1>
              <p className="text-sm text-white/60">
                Industry-specific tools and automations for real estate professionals.
              </p>
            </div>
          </div>

          <Link
            href="/contact?solution=real-estate"
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
              <HomeModernIcon className="w-4 h-4" />
              Active Listings
            </div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">24</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <UserGroupIcon className="w-4 h-4" />
              Total Leads
            </div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">156</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <DocumentTextIcon className="w-4 h-4" />
              Pending Closings
            </div>
            <div className="mt-1 text-2xl font-bold text-[#A855F7]">8</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CurrencyDollarIcon className="w-4 h-4" />
              YTD Volume
            </div>
            <div className="mt-1 text-2xl font-bold text-[#F59E0B]">$4.2M</div>
          </div>
        </div>

        {/* Lead Pipeline */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <ArrowTrendingUpIcon className="w-5 h-5 text-[#3B82F6]" />
            <div className="text-lg font-semibold text-white">Lead Pipeline</div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {PIPELINE_STATS.map((stage) => (
              <div
                key={stage.stage}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
              >
                <div className="text-2xl font-bold" style={{ color: stage.color }}>
                  {stage.count}
                </div>
                <div className="mt-1 text-xs text-white/60">{stage.stage}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Listings */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="text-lg font-semibold text-white">Active Listings</div>
          </div>

          <div className="divide-y divide-white/10">
            {ACTIVE_LISTINGS.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${listing.color}20` }}
                  >
                    <HomeModernIcon className="w-5 h-5" style={{ color: listing.color }} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{listing.address}</div>
                    <div className="text-sm text-white/60">{listing.type}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-white">{listing.price}</div>
                    <div className="text-xs text-white/50">{listing.daysOnMarket} days on market</div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      listing.status === "Active"
                        ? "bg-[#47BD79]/20 text-[#47BD79]"
                        : "bg-[#3B82F6]/20 text-[#3B82F6]"
                    }`}
                  >
                    {listing.status === "Active" ? (
                      <CheckCircleIcon className="w-3.5 h-3.5" />
                    ) : (
                      <ClockIcon className="w-3.5 h-3.5" />
                    )}
                    {listing.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Showings */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Tools */}
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="border-b border-white/10 px-6 py-4">
              <div className="text-lg font-semibold text-white">Your Tools</div>
            </div>
            <div className="divide-y divide-white/10">
              {REAL_ESTATE_TOOLS.map((tool) => (
                <div key={tool.id} className="flex items-center justify-between px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${tool.color}20` }}
                    >
                      <ChartBarIcon className="w-4 h-4" style={{ color: tool.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{tool.name}</div>
                      <div className="text-xs text-white/50">{tool.usage}</div>
                    </div>
                  </div>
                  <CheckCircleIcon className="w-4 h-4 text-[#47BD79]" />
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Showings */}
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="w-5 h-5 text-[#F59E0B]" />
                <div className="text-lg font-semibold text-white">Upcoming Showings</div>
              </div>
            </div>
            <div className="divide-y divide-white/10">
              {UPCOMING_SHOWINGS.map((showing, index) => (
                <div key={index} className="flex items-center justify-between px-6 py-3">
                  <div>
                    <div className="text-sm font-medium text-white">{showing.property}</div>
                    <div className="text-xs text-white/50">Client: {showing.client}</div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#F59E0B]/20 px-2 py-1 text-xs font-medium text-[#F59E0B]">
                    <ClockIcon className="w-3 h-3" />
                    {showing.time}
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
              Add New Listing
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Schedule Showing
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Market Analysis
            </button>
            <Link
              href="/solutions/real-estate"
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
