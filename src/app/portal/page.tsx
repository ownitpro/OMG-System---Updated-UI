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
  const [
    activeProjects,
    recentTickets,
    recentInvoices,
    upcomingTasks
  ] = await Promise.all([
    // Active projects
    prisma.project.findMany({
      where: { 
        organizationId: user.activeOrgId!,
        status: { in: ["PLANNING", "IN_PROGRESS", "REVIEW"] }
      },
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: {
        user: { select: { name: true } }
      }
    }),
    // Recent tickets
    prisma.ticket.findMany({
      where: { organizationId: user.activeOrgId! },
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: {
        user: { select: { name: true } }
      }
    }),
    // Recent invoices
    prisma.invoice.findMany({
      where: { organizationId: user.activeOrgId! },
      take: 5,
      orderBy: { createdAt: "desc" }
    }),
    // Upcoming tasks
    prisma.task.findMany({
      where: {
        project: { organizationId: user.activeOrgId! },
        status: { in: ["TODO", "IN_PROGRESS"] },
        dueDate: { gte: new Date() }
      },
      take: 5,
      orderBy: { dueDate: "asc" },
      include: {
        project: { select: { name: true } },
        user: { select: { name: true } }
      }
    })
  ]);

  const activeOrg = user.memberships.find(m => m.orgId === user.activeOrgId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Portal Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your {activeOrg?.organization.name} portal
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClipboardDocumentListIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Projects
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {activeProjects.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TicketIcon className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Open Tickets
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {recentTickets.filter(t => t.status === "OPEN").length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CreditCardIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Recent Invoices
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {recentInvoices.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Upcoming Tasks
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
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
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Projects
            </h3>
            <div className="space-y-3">
              {activeProjects.length === 0 ? (
                <p className="text-sm text-gray-500">No active projects</p>
              ) : (
                activeProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{project.name}</p>
                      <p className="text-sm text-gray-500">Status: {project.status}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {project.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Support Tickets
            </h3>
            <div className="space-y-3">
              {recentTickets.length === 0 ? (
                <p className="text-sm text-gray-500">No recent tickets</p>
              ) : (
                recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{ticket.subject}</p>
                      <p className="text-sm text-gray-500">Priority: {ticket.priority}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ticket.status === "OPEN" ? "bg-red-100 text-red-800" :
                      ticket.status === "IN_PROGRESS" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
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