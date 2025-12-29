import React from "react";
import { requireAuth, requireActiveOrg } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
import { 
  ClipboardDocumentListIcon, 
  DocumentTextIcon, 
  CreditCardIcon, 
  TicketIcon,
  ChartBarIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

export default async function PortalPage() {
  const user = await requireActiveOrg();
  
  // Fetch portal data for the active organization
  // Using try-catch to handle potential database integrity issues
  let activeProjects: any[] = [];
  let recentTickets: any[] = [];
  let recentInvoices: any[] = [];
  let upcomingTasks: any[] = [];

  try {
    [activeProjects, recentTickets, recentInvoices, upcomingTasks] = await Promise.all([
      // Active projects - without user include to avoid null reference errors
      prisma.project.findMany({
        where: {
          organizationId: user.activeOrgId!,
          status: { in: ["PLANNING", "IN_PROGRESS", "REVIEW"] }
        },
        take: 5,
        orderBy: { updatedAt: "desc" }
      }).catch(() => []),
      // Recent tickets - without user include to avoid null reference errors
      prisma.ticket.findMany({
        where: { organizationId: user.activeOrgId! },
        take: 5,
        orderBy: { updatedAt: "desc" }
      }).catch(() => []),
      // Recent invoices
      prisma.invoice.findMany({
        where: { organizationId: user.activeOrgId! },
        take: 5,
        orderBy: { createdAt: "desc" }
      }).catch(() => []),
      // Upcoming tasks - without user include to avoid null reference errors
      prisma.task.findMany({
        where: {
          project: { organizationId: user.activeOrgId! },
          status: { in: ["TODO", "IN_PROGRESS"] },
          dueDate: { gte: new Date() }
        },
        take: 5,
        orderBy: { dueDate: "asc" },
        include: {
          project: { select: { name: true } }
        }
      }).catch(() => [])
    ]);
  } catch (error) {
    console.error("Error fetching portal data:", error);
  }

  const activeOrg = user.memberships.find(m => m.orgId === user.activeOrgId);

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Portal Overview</h1>
        <p className="mt-1 text-sm text-white/60">
          Welcome to your {activeOrg?.organization.name} portal
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClipboardDocumentListIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-white/60 truncate">
                    Active Projects
                  </dt>
                  <dd className="text-lg font-medium text-white">
                    {activeProjects.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TicketIcon className="h-6 w-6 text-amber-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-white/60 truncate">
                    Open Tickets
                  </dt>
                  <dd className="text-lg font-medium text-white">
                    {recentTickets.filter(t => t.status === "OPEN").length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CreditCardIcon className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-white/60 truncate">
                    Recent Invoices
                  </dt>
                  <dd className="text-lg font-medium text-white">
                    {recentInvoices.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-white/60 truncate">
                    Upcoming Tasks
                  </dt>
                  <dd className="text-lg font-medium text-white">
                    {upcomingTasks.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Projects */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-white mb-4">
              Recent Projects
            </h3>
            <div className="space-y-3">
              {activeProjects.length === 0 ? (
                <p className="text-sm text-white/60">No active projects</p>
              ) : (
                activeProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{project.name}</p>
                      <p className="text-sm text-white/60">Status: {project.status}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {project.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-white mb-4">
              Recent Support Tickets
            </h3>
            <div className="space-y-3">
              {recentTickets.length === 0 ? (
                <p className="text-sm text-white/60">No recent tickets</p>
              ) : (
                recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{ticket.subject}</p>
                      <p className="text-sm text-white/60">Priority: {ticket.priority}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      ticket.status === "OPEN" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                      ticket.status === "IN_PROGRESS" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                      "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}