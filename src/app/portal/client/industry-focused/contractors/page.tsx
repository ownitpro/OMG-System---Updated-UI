"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import Link from "next/link";
import {
  WrenchIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const CONTRACTOR_TOOLS = [
  {
    id: "1",
    name: "Project Estimator",
    description: "AI-powered cost estimation for bids",
    status: "active",
    usage: "24 estimates this month",
    color: "#3B82F6",
  },
  {
    id: "2",
    name: "Job Scheduler",
    description: "Crew and equipment scheduling",
    status: "active",
    usage: "156 jobs scheduled",
    color: "#47BD79",
  },
  {
    id: "3",
    name: "Material Tracker",
    description: "Inventory and supply chain management",
    status: "active",
    usage: "$12,450 materials tracked",
    color: "#A855F7",
  },
  {
    id: "4",
    name: "Client Portal",
    description: "Customer-facing project updates",
    status: "active",
    usage: "18 active projects",
    color: "#F59E0B",
  },
];

const ACTIVE_PROJECTS = [
  {
    id: "1",
    name: "Office Building Renovation",
    client: "ABC Properties",
    progress: 75,
    deadline: "Feb 15, 2025",
    value: "$85,000",
    color: "#47BD79",
  },
  {
    id: "2",
    name: "Residential Kitchen Remodel",
    client: "Johnson Family",
    progress: 40,
    deadline: "Jan 30, 2025",
    value: "$24,500",
    color: "#3B82F6",
  },
  {
    id: "3",
    name: "Commercial HVAC Install",
    client: "TechCorp Inc",
    progress: 90,
    deadline: "Jan 10, 2025",
    value: "$156,000",
    color: "#A855F7",
  },
];

const CREW_AVAILABILITY = [
  { name: "Team A - Electrical", status: "On Job", location: "Site 1", color: "#47BD79" },
  { name: "Team B - Plumbing", status: "Available", location: "HQ", color: "#3B82F6" },
  { name: "Team C - General", status: "On Job", location: "Site 3", color: "#F59E0B" },
];

export default function ContractorsPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  return (
    <PortalShellV2 role="client" title="Contractors" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
              <WrenchIcon className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Contractor Solutions</h1>
              <p className="text-sm text-white/60">
                Industry-specific tools and automations for contractors.
              </p>
            </div>
          </div>

          <Link
            href="/contact?solution=contractors"
            className="rounded-xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
          >
            Get Support
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ClipboardDocumentListIcon className="w-4 h-4" />
              Active Projects
            </div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">18</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CurrencyDollarIcon className="w-4 h-4" />
              Pipeline Value
            </div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">$1.2M</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <UserGroupIcon className="w-4 h-4" />
              Crew Members
            </div>
            <div className="mt-1 text-2xl font-bold text-[#A855F7]">24</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CalendarDaysIcon className="w-4 h-4" />
              Jobs This Week
            </div>
            <div className="mt-1 text-2xl font-bold text-[#F59E0B]">12</div>
          </div>
        </div>

        {/* Active Projects */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="text-lg font-semibold text-white">Active Projects</div>
          </div>

          <div className="divide-y divide-white/10">
            {ACTIVE_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}20` }}
                  >
                    <WrenchIcon className="w-5 h-5" style={{ color: project.color }} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{project.name}</div>
                    <div className="text-sm text-white/60">{project.client}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{project.value}</div>
                    <div className="text-xs text-white/50">Due: {project.deadline}</div>
                  </div>
                  <div className="w-24">
                    <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${project.progress}%`, backgroundColor: project.color }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contractor Tools & Crew */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Tools */}
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="border-b border-white/10 px-6 py-4">
              <div className="text-lg font-semibold text-white">Your Tools</div>
            </div>
            <div className="divide-y divide-white/10">
              {CONTRACTOR_TOOLS.map((tool) => (
                <div key={tool.id} className="flex items-center justify-between px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${tool.color}20` }}
                    >
                      <WrenchIcon className="w-4 h-4" style={{ color: tool.color }} />
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

          {/* Crew Availability */}
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <UserGroupIcon className="w-5 h-5 text-[#A855F7]" />
                <div className="text-lg font-semibold text-white">Crew Status</div>
              </div>
            </div>
            <div className="divide-y divide-white/10">
              {CREW_AVAILABILITY.map((crew, index) => (
                <div key={index} className="flex items-center justify-between px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${crew.color}20` }}
                    >
                      <UserGroupIcon className="w-4 h-4" style={{ color: crew.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{crew.name}</div>
                      <div className="flex items-center gap-1 text-xs text-white/50">
                        <MapPinIcon className="w-3 h-3" />
                        {crew.location}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                      crew.status === "Available"
                        ? "bg-[#47BD79]/20 text-[#47BD79]"
                        : "bg-[#F59E0B]/20 text-[#F59E0B]"
                    }`}
                  >
                    {crew.status === "Available" ? (
                      <CheckCircleIcon className="w-3 h-3" />
                    ) : (
                      <ClockIcon className="w-3 h-3" />
                    )}
                    {crew.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
        >
          <div className="text-lg font-semibold text-white mb-4">Quick Actions</div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors">
              Create Estimate
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Schedule Job
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Manage Inventory
            </button>
            <Link
              href="/solutions/contractors"
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
