"use client";

import { PortalShellV2 } from "@/components/portal/PortalShellV2";
import { getClientNavV2 } from "@/config/portalNav";
import { useEntitlements } from "@/hooks/useEntitlements";
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

const CONTENT_ITEMS = [
  {
    id: "1",
    title: "Q1 Marketing Blog Series",
    type: "Blog Posts",
    status: "In Progress",
    dueDate: "Jan 20, 2025",
    items: 5,
    completed: 2,
    color: "#47BD79",
  },
  {
    id: "2",
    title: "Product Launch Copy",
    type: "Website Copy",
    status: "Review",
    dueDate: "Jan 10, 2025",
    items: 8,
    completed: 7,
    color: "#3B82F6",
  },
  {
    id: "3",
    title: "Email Newsletter Templates",
    type: "Email",
    status: "Draft",
    dueDate: "Jan 25, 2025",
    items: 4,
    completed: 0,
    color: "#A855F7",
  },
  {
    id: "4",
    title: "Social Media Calendar",
    type: "Social",
    status: "Scheduled",
    dueDate: "Ongoing",
    items: 30,
    completed: 12,
    color: "#F59E0B",
  },
];

const CONTENT_CALENDAR = [
  { day: "Mon", content: "Blog post", color: "#47BD79" },
  { day: "Tue", content: "Email newsletter", color: "#3B82F6" },
  { day: "Wed", content: "Social posts", color: "#A855F7" },
  { day: "Thu", content: "Case study", color: "#F59E0B" },
  { day: "Fri", content: "Video script", color: "#EC4899" },
];

export default function ContentDevelopmentPage() {
  const nav = getClientNavV2();
  const entitlements = useEntitlements();

  const totalItems = CONTENT_ITEMS.reduce((sum, c) => sum + c.items, 0);
  const totalCompleted = CONTENT_ITEMS.reduce((sum, c) => sum + c.completed, 0);
  const lockedCount = Object.values(entitlements).filter((s) => s === "locked").length;

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

          <Link
            href="/contact?solution=content"
            className="rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            New Content
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
            {CONTENT_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <PencilSquareIcon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{item.title}</div>
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <span>{item.type}</span>
                      <span>|</span>
                      <span>Due: {item.dueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-white">{item.completed}/{item.items} items</div>
                    <div className="mt-1 w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(item.completed / item.items) * 100}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-xs font-medium"
                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                  >
                    {item.status}
                  </span>
                  <button className="rounded-lg bg-white/5 border border-white/10 p-2 text-white hover:bg-white/10 transition-colors">
                    <EyeIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
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
              <div
                key={day.day}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
              >
                <div className="text-sm font-medium text-white/60">{day.day}</div>
                <div
                  className="mt-2 rounded-lg px-2 py-1 text-xs font-medium"
                  style={{ backgroundColor: `${day.color}20`, color: day.color }}
                >
                  {day.content}
                </div>
              </div>
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
            <Link
              href="/contact?solution=content"
              className="rounded-xl bg-[#47BD79] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3da968] transition-colors"
            >
              Request New Content
            </Link>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              View Content Library
            </button>
            <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Download Assets
            </button>
          </div>
        </div>
      </div>
    </PortalShellV2>
  );
}
