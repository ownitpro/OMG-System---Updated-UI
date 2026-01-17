"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useCustomProjects } from "@/hooks/useCustomProjects";
import Link from "next/link";
import {
  WrenchScrewdriverIcon,
  ClockIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  PlusIcon,
  ArrowPathIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency, formatDate, safeJsonParse, PROJECT_STATUS } from "@/lib/client/formatters";

// Removed mock data - will use API data from useCustomProjects hook
const COMPLETED_PROJECTS_MOCK = [
  {
    id: "1",
    name: "CRM Integration",
    description: "Custom API integration with existing CRM system",
    type: "Integration",
    status: "IN_PROGRESS", // API: PLANNING, IN_PROGRESS, REVIEW, COMPLETED, ON_HOLD
    progress: 65,
    startDate: "2024-12-01",
    targetEndDate: "2025-01-30",
    completedAt: null,
    // JSON fields from API - will be parsed
    milestones: JSON.stringify([
      { name: "Discovery", completed: true },
      { name: "Design", completed: true },
      { name: "Development", completed: false },
      { name: "Testing", completed: false },
    ]),
    deliverables: JSON.stringify([
      "API Documentation",
      "Integration Code",
      "Test Suite",
    ]),
    nextDeliverable: "API Documentation",
    assignedTeam: JSON.stringify(["Backend Dev", "QA Engineer"]),
    estimatedHours: 120,
    actualHours: 78,
    budget: 15000,
    spent: 9750,
    currency: "CAD",
    repositoryUrl: "https://github.com/client/crm-integration",
    color: "#47BD79",
  },
  {
    id: "2",
    name: "Custom Dashboard",
    description: "Executive reporting dashboard with real-time analytics",
    type: "Development",
    status: "REVIEW",
    progress: 90,
    startDate: "2024-11-15",
    targetEndDate: "2025-01-10",
    completedAt: null,
    milestones: JSON.stringify([
      { name: "Requirements", completed: true },
      { name: "UI Design", completed: true },
      { name: "Development", completed: true },
      { name: "User Testing", completed: false },
    ]),
    deliverables: JSON.stringify([
      "Dashboard UI",
      "Real-time Data API",
      "User Manual",
    ]),
    nextDeliverable: "User Manual",
    assignedTeam: JSON.stringify(["Frontend Dev", "UX Designer", "Backend Dev"]),
    estimatedHours: 200,
    actualHours: 185,
    budget: 25000,
    spent: 23125,
    currency: "CAD",
    repositoryUrl: "https://github.com/client/executive-dashboard",
    color: "#3B82F6",
  },
  {
    id: "3",
    name: "Workflow Automation",
    description: "Custom approval workflow for purchase orders",
    type: "Automation",
    status: "PLANNING",
    progress: 15,
    startDate: "2025-01-05",
    targetEndDate: "2025-02-28",
    completedAt: null,
    milestones: JSON.stringify([
      { name: "Requirements Gathering", completed: true },
      { name: "Workflow Design", completed: false },
      { name: "Implementation", completed: false },
    ]),
    deliverables: JSON.stringify([
      "Workflow Diagram",
      "Approval System",
      "Email Notifications",
    ]),
    nextDeliverable: "Workflow Diagram",
    assignedTeam: JSON.stringify(["Solutions Architect", "Backend Dev"]),
    estimatedHours: 80,
    actualHours: 12,
    budget: 10000,
    spent: 1500,
    currency: "CAD",
    repositoryUrl: null,
    color: "#A855F7",
  },
];

// Helper function to assign colors by status
const getProjectColor = (status: string) => {
  switch (status) {
    case 'COMPLETED': return '#47BD79';
    case 'IN_PROGRESS': return '#3B82F6';
    case 'REVIEW': return '#A855F7';
    case 'PLANNING': return '#F59E0B';
    case 'ON_HOLD': return '#9CA3AF';
    default: return '#9CA3AF';
  }
};

export default function CustomSolutionsPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();
  const { projects, isLoading, error } = useCustomProjects();
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  // Loading state
  if (isLoading) {
    return (
      <PortalShellV2 role="client" title="Custom Solutions" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6]"></div>
        </div>
      </PortalShellV2>
    );
  }

  // Error state
  if (error) {
    return (
      <PortalShellV2 role="client" title="Custom Solutions" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
          Failed to load custom projects: {error.message}
        </div>
      </PortalShellV2>
    );
  }

  const activeProjects = projects.filter(p => p.status !== 'COMPLETED').length;
  const completedProjects = projects.filter(p => p.status === 'COMPLETED').length;
  const avgProgress = projects.length > 0
    ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
    : 0;
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);

  return (
    <PortalShellV2 role="client" title="Custom Solutions" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center">
              <WrenchScrewdriverIcon className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Custom Solutions</h1>
              <p className="text-sm text-white/60">
                Request and track your custom solution development.
              </p>
            </div>
          </div>

          <Link
            href="/contact?solution=custom"
            className="rounded-xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Request Solution
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ArrowPathIcon className="w-4 h-4" />
              Active Projects
            </div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">{activeProjects}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircleIcon className="w-4 h-4" />
              Completed
            </div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">{completedProjects}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ClockIcon className="w-4 h-4" />
              Avg. Progress
            </div>
            <div className="mt-1 text-2xl font-bold text-[#A855F7]">{avgProgress}%</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ChatBubbleLeftRightIcon className="w-4 h-4" />
              Total Budget
            </div>
            <div className="mt-1 text-2xl font-bold text-[#F59E0B]">{formatCurrency(totalBudget, 'CAD')}</div>
          </div>
        </div>

        {/* Project Pipeline */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <ArrowPathIcon className="w-5 h-5 text-[#3B82F6]" />
            <div className="text-lg font-semibold text-white">Current Project Pipeline</div>
          </div>
          <div className="flex items-center justify-between">
            {PROJECT_MILESTONES.map((milestone, index) => (
              <div key={milestone.phase} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      milestone.status === "completed"
                        ? "bg-[#47BD79]"
                        : milestone.status === "active"
                        ? "bg-[#3B82F6]"
                        : "bg-white/10"
                    }`}
                  >
                    {milestone.status === "completed" ? (
                      <CheckCircleIcon className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-sm font-medium text-white">{index + 1}</span>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-white/60">{milestone.phase}</div>
                </div>
                {index < PROJECT_MILESTONES.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded ${
                      milestone.status === "completed" ? "bg-[#47BD79]" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
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
            {projects.filter(p => p.status !== 'COMPLETED').length === 0 ? (
              <div className="px-6 py-12 text-center">
                <WrenchScrewdriverIcon className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/60 mb-4">No active projects yet</p>
                <Link
                  href="/contact?solution=custom"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  Request Custom Solution
                </Link>
              </div>
            ) : (
              projects
                .filter(p => p.status !== 'COMPLETED')
                .map((project) => {
                  const color = getProjectColor(project.status);
                  return (
                    <div
                      key={project.id}
                      className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          <WrenchScrewdriverIcon className="w-5 h-5" style={{ color }} />
                        </div>
                        <div>
                          <div className="font-medium text-white">{project.name}</div>
                          <div className="text-sm text-white/60">{project.description || 'No description'}</div>
                          <div className="mt-1 flex items-center gap-3 text-xs text-white/50">
                            {project.startDate && <span>Started: {formatDate(project.startDate)}</span>}
                            {project.startDate && project.targetEndDate && <span>|</span>}
                            {project.targetEndDate && <span>Est. Completion: {formatDate(project.targetEndDate)}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-2 text-sm text-white">
                            <span>{project.progress}%</span>
                          </div>
                          <div className="mt-1 w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${project.progress}%`, backgroundColor: color }}
                            />
                          </div>
                        </div>
                        <span
                          className="inline-flex rounded-full px-3 py-1 text-xs font-medium"
                          style={{ backgroundColor: `${color}20`, color }}
                        >
                          {project.status.replace('_', ' ')}
                        </span>
                        <button className="rounded-lg bg-white/5 border border-white/10 p-2 text-white hover:bg-white/10 transition-colors">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Completed Projects */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <CheckCircleIcon className="w-5 h-5 text-[#47BD79]" />
            <div className="text-lg font-semibold text-white">Recently Completed</div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {projects.filter(p => p.status === 'COMPLETED').length === 0 ? (
              <div className="col-span-full text-center text-white/60 py-6">
                No completed projects yet
              </div>
            ) : (
              projects
                .filter(p => p.status === 'COMPLETED')
                .slice(0, 4)
                .map((project) => {
                  const color = getProjectColor(project.status);
                  return (
                    <div
                      key={project.id}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          <CheckCircleIcon className="w-4 h-4" style={{ color }} />
                        </div>
                        <div>
                          <div className="font-medium text-white">{project.name}</div>
                          <div className="text-xs text-white/50">
                            Completed {project.completedAt ? formatDate(project.completedAt) : 'recently'}
                          </div>
                        </div>
                      </div>
                      {project.documentationUrl && (
                        <a
                          href={project.documentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/10 transition-colors flex items-center gap-1"
                        >
                          <DocumentTextIcon className="w-3.5 h-3.5" />
                          Docs
                        </a>
                      )}
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
        >
          <div className="text-lg font-semibold text-white mb-4">Quick Actions</div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?solution=custom"
              className="rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
            >
              Submit New Request
            </Link>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Contact Support
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
