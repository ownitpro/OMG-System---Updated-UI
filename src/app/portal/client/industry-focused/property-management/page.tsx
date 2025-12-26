"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import Link from "next/link";
import {
  BuildingOffice2Icon,
  HomeIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const PROPERTY_TOOLS = [
  {
    id: "1",
    name: "Tenant Portal",
    description: "Online rent payments and requests",
    status: "active",
    usage: "245 active tenants",
    color: "#A855F7",
  },
  {
    id: "2",
    name: "Maintenance Tracker",
    description: "Work order management system",
    status: "active",
    usage: "18 open tickets",
    color: "#3B82F6",
  },
  {
    id: "3",
    name: "Lease Management",
    description: "Digital lease signing and renewals",
    status: "active",
    usage: "12 pending renewals",
    color: "#47BD79",
  },
  {
    id: "4",
    name: "Financial Reports",
    description: "Property income and expense tracking",
    status: "active",
    usage: "$1.2M monthly revenue",
    color: "#F59E0B",
  },
];

const PROPERTIES = [
  {
    id: "1",
    name: "Sunset Apartments",
    type: "Multi-Family",
    units: 48,
    occupancy: 94,
    revenue: "$52,000/mo",
    color: "#A855F7",
  },
  {
    id: "2",
    name: "Downtown Office Plaza",
    type: "Commercial",
    units: 12,
    occupancy: 100,
    revenue: "$85,000/mo",
    color: "#3B82F6",
  },
  {
    id: "3",
    name: "Oak Street Condos",
    type: "Residential",
    units: 24,
    occupancy: 88,
    revenue: "$36,000/mo",
    color: "#47BD79",
  },
];

const MAINTENANCE_REQUESTS = [
  { issue: "HVAC Repair - Unit 3B", property: "Sunset Apartments", priority: "high", status: "In Progress" },
  { issue: "Plumbing Issue - Suite 201", property: "Downtown Office", priority: "medium", status: "Scheduled" },
  { issue: "Appliance Replacement", property: "Oak Street #12", priority: "low", status: "Pending" },
];

export default function PropertyManagementPage() {
  const nav = getClientNavV2();

  const totalUnits = PROPERTIES.reduce((sum, p) => sum + p.units, 0);
  const avgOccupancy = Math.round(PROPERTIES.reduce((sum, p) => sum + p.occupancy, 0) / PROPERTIES.length);

  return (
    <PortalShellV2 role="client" title="Property Management" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A855F7]/20 flex items-center justify-center">
              <BuildingOffice2Icon className="w-5 h-5 text-[#A855F7]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Property Management Solutions</h1>
              <p className="text-sm text-white/60">
                Tools and automations designed for property management companies.
              </p>
            </div>
          </div>

          <Link
            href="/contact?solution=property"
            className="rounded-xl bg-[#A855F7] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9333EA] transition-colors"
          >
            Get Support
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <BuildingOffice2Icon className="w-4 h-4" />
              Properties
            </div>
            <div className="mt-1 text-2xl font-bold text-[#A855F7]">{PROPERTIES.length}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <HomeIcon className="w-4 h-4" />
              Total Units
            </div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">{totalUnits}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <UserGroupIcon className="w-4 h-4" />
              Occupancy
            </div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">{avgOccupancy}%</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CurrencyDollarIcon className="w-4 h-4" />
              Monthly Revenue
            </div>
            <div className="mt-1 text-2xl font-bold text-[#F59E0B]">$173K</div>
          </div>
        </div>

        {/* Properties */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="text-lg font-semibold text-white">Your Properties</div>
          </div>

          <div className="divide-y divide-white/10">
            {PROPERTIES.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${property.color}20` }}
                  >
                    <BuildingOffice2Icon className="w-5 h-5" style={{ color: property.color }} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{property.name}</div>
                    <div className="text-sm text-white/60">{property.type} • {property.units} units</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{property.revenue}</div>
                    <div className="text-xs text-white/50">Revenue</div>
                  </div>
                  <div className="w-20">
                    <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                      <span>Occupancy</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${property.occupancy}%`, backgroundColor: property.color }}
                      />
                    </div>
                    <div className="text-xs text-right mt-1" style={{ color: property.color }}>
                      {property.occupancy}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Maintenance */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Tools */}
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="border-b border-white/10 px-6 py-4">
              <div className="text-lg font-semibold text-white">Management Tools</div>
            </div>
            <div className="divide-y divide-white/10">
              {PROPERTY_TOOLS.map((tool) => (
                <div key={tool.id} className="flex items-center justify-between px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${tool.color}20` }}
                    >
                      <DocumentTextIcon className="w-4 h-4" style={{ color: tool.color }} />
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

          {/* Maintenance Requests */}
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <WrenchScrewdriverIcon className="w-5 h-5 text-[#F59E0B]" />
                <div className="text-lg font-semibold text-white">Maintenance Requests</div>
              </div>
            </div>
            <div className="divide-y divide-white/10">
              {MAINTENANCE_REQUESTS.map((request, index) => (
                <div key={index} className="flex items-center justify-between px-6 py-3">
                  <div>
                    <div className="text-sm font-medium text-white">{request.issue}</div>
                    <div className="text-xs text-white/50">{request.property}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                        request.priority === "high"
                          ? "bg-red-500/20 text-red-400"
                          : request.priority === "medium"
                          ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {request.priority === "high" && <ExclamationTriangleIcon className="w-3 h-3" />}
                      {request.priority}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs text-white/60">
                      <ClockIcon className="w-3 h-3" />
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
        >
          <div className="text-lg font-semibold text-white mb-4">Quick Actions</div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl bg-[#A855F7] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#9333EA] transition-colors">
              Add New Property
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              View All Tenants
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Generate Reports
            </button>
            <Link
              href="/solutions/property-management"
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
