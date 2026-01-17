"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
import { useContentProjects } from "@/hooks/useContentProjects";
import { useContentRequests } from "@/hooks/useContentRequests";
import { ContentRequestModal } from "@/components/portal/ContentRequestModal";
import React from "react";
import Link from "next/link";
import {
  DocumentTextIcon,
  PencilSquareIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { formatDate, safeJsonParse, CONTENT_STATUS } from "@/lib/client/formatters";

const CONTENT_CALENDAR = [
  { day: "Mon", content: "Blog post", color: "#47BD79" },
  { day: "Tue", content: "Email newsletter", color: "#3B82F6" },
  { day: "Wed", content: "Social posts", color: "#A855F7" },
  { day: "Thu", content: "Case study", color: "#F59E0B" },
  { day: "Fri", content: "Video script", color: "#EC4899" },
];

// Helper function to assign colors to projects
const getProjectColor = (status: string) => {
  switch (status) {
    case 'PUBLISHED': return '#47BD79';
    case 'IN_PROGRESS': return '#3B82F6';
    case 'REVIEW': return '#A855F7';
    case 'DRAFT': return '#F59E0B';
    default: return '#9CA3AF';
  }
};

export default function ContentDevelopmentPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();
  const { projects, isLoading, error, refetch } = useContentProjects();
  const { createRequest } = useContentRequests();
  const [isNewContentModalOpen, setIsNewContentModalOpen] = React.useState(false);
  const [viewingProject, setViewingProject] = React.useState<any>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

  // Loading state
  if (isLoading) {
    return (
      <PortalShellV2 role="client" title="Content Development" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#47BD79]"></div>
        </div>
      </PortalShellV2>
    );
  }

  // Error state
  if (error) {
    return (
      <PortalShellV2 role="client" title="Content Development" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
          Failed to load content projects: {error.message}
        </div>
      </PortalShellV2>
    );
  }

  const totalItems = projects.length;
  const totalCompleted = projects.filter(c => c.status === "PUBLISHED").length;
  const inProgress = projects.filter(c => c.status === "IN_PROGRESS").length;
  const inReview = projects.filter(c => c.status === "REVIEW").length;

  return (
    <PortalShellV2 role="client" title="Content Development" nav={nav} upgradeHref="/products/plans" lockedCount={lockedCount} entitlements={entitlements}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#47BD79]/20 flex items-center justify-center">
              <DocumentTextIcon className="w-5 h-5 text-[#47BD79]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Content Development</h1>
              <p className="text-sm text-white/60">
                Create and manage your content marketing materials.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNewContentModalOpen(true)}
            className="rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            New Content
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <DocumentTextIcon className="w-4 h-4" />
              Total Content
            </div>
            <div className="mt-1 text-2xl font-bold text-[#47BD79]">{totalItems}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CheckCircleIcon className="w-4 h-4" />
              Completed
            </div>
            <div className="mt-1 text-2xl font-bold text-[#3B82F6]">{totalCompleted}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <ClockIcon className="w-4 h-4" />
              In Progress
            </div>
            <div className="mt-1 text-2xl font-bold text-[#A855F7]">{totalItems - totalCompleted}</div>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5"
            style={{ boxShadow: "0 0 20px rgba(245, 158, 11, 0.05)" }}
          >
            <div className="flex items-center gap-2 text-sm text-white/60">
              <CalendarIcon className="w-4 h-4" />
              This Week
            </div>
            <div className="mt-1 text-2xl font-bold text-[#F59E0B]">5</div>
          </div>
        </div>

        {/* Content Projects */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="border-b border-white/10 px-6 py-4">
            <div className="text-lg font-semibold text-white">Content Projects</div>
          </div>

          <div className="divide-y divide-white/10">
            {projects.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <DocumentTextIcon className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/60 mb-4">No content projects yet</p>
                <Link
                  href="/contact?solution=content"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  Create Your First Project
                </Link>
              </div>
            ) : (
              projects.map((item) => {
                const color = getProjectColor(item.status);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <PencilSquareIcon className="w-5 h-5" style={{ color }} />
                      </div>
                      <div>
                        <div className="font-medium text-white">{item.title}</div>
                        <div className="flex items-center gap-3 text-sm text-white/60">
                          <span>{item.type}</span>
                          {item.dueDate && (
                            <>
                              <span>|</span>
                              <span>Due: {formatDate(item.dueDate)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-white">
                          {item.wordCount ? `${item.wordCount.toLocaleString()} words` : item.type}
                        </div>
                        <div className="text-xs text-white/50">
                          {item.assignedTo || 'Unassigned'}
                        </div>
                      </div>
                      {(() => {
                        const statusKey = item.status as keyof typeof CONTENT_STATUS;
                        const config = CONTENT_STATUS[statusKey] || CONTENT_STATUS.DRAFT;
                        return (
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${config.bgColor} ${config.textColor}`}>
                            {config.label}
                          </span>
                        );
                      })()}
                      <button
                        onClick={() => {
                          if (item.draftUrl) {
                            window.open(item.draftUrl, '_blank');
                          } else if (item.finalUrl) {
                            window.open(item.finalUrl, '_blank');
                          } else {
                            setViewingProject(item);
                          }
                        }}
                        className="rounded-lg bg-white/5 border border-white/10 p-2 text-white hover:bg-white/10 transition-colors"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Weekly Calendar */}
        <div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.05)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <CalendarIcon className="w-5 h-5 text-[#47BD79]" />
            <div className="text-lg font-semibold text-white">This Week's Schedule</div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {CONTENT_CALENDAR.map((day) => (
              <button
                key={day.day}
                onClick={() => {
                  // Find projects scheduled for this day (could be enhanced with actual date matching)
                  console.log(`Schedule content for ${day.day}: ${day.content}`);
                  // For now, just open the new content modal
                  setIsNewContentModalOpen(true);
                }}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="text-sm font-medium text-white/60">{day.day}</div>
                <div
                  className="mt-2 rounded-lg px-2 py-1 text-xs font-medium"
                  style={{ backgroundColor: `${day.color}20`, color: day.color }}
                >
                  {day.content}
                </div>
              </button>
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
            <button
              onClick={() => setIsNewContentModalOpen(true)}
              className="rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors"
            >
              Request New Content
            </button>
            <button
              onClick={() => {
                // TODO: Open content library view
                console.log('View Content Library clicked');
              }}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              View Content Library
            </button>
            <button
              onClick={() => {
                // TODO: Download all content assets
                console.log('Download Assets clicked');
                projects.forEach(project => {
                  if (project.finalUrl) {
                    console.log(`Downloading: ${project.title}`);
                  }
                });
              }}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Download Assets
            </button>
          </div>
        </div>
      </div>

      {/* New Content Modal */}
      <ContentRequestModal
        isOpen={isNewContentModalOpen}
        onClose={() => setIsNewContentModalOpen(false)}
        onSubmit={async (data) => {
          try {
            setIsSubmitting(true);

            // Submit to API
            const result = await createRequest(data);

            // Refresh the projects list
            await refetch();

            console.log("✅ Content request created:", result);
          } catch (error) {
            console.error("❌ Failed to create content request:", error);
            // Re-throw so modal can show error state
            throw error;
          } finally {
            setIsSubmitting(false);
          }
        }}
      />
    </PortalShellV2>
  );
}
