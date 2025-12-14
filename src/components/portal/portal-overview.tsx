import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/lib/utils";
import Link from "next/link";
import { BuildingOfficeIcon, FolderIcon, CreditCardIcon, LifebuoyIcon } from "@heroicons/react/24/outline";

interface PortalOverviewProps {
  stats: {
    totalProjects: number;
    totalTasks: number;
    pendingInvoices: number;
    openTickets: number;
  };
  recentActivity: Array<{
    id: string;
    action: string;
    resourceType: string | null;
    createdAt: Date;
    user: { name: string | null; email: string } | null;
    organization: { name: string; slug: string } | null;
  }>;
  organizations: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export function PortalOverview({ stats, recentActivity, organizations }: PortalOverviewProps) {
  const statItems = [
    {
      id: 1,
      name: "Active Projects",
      stat: stats.totalProjects,
      icon: FolderIcon,
      change: "2.1%",
      changeType: "increase",
      href: "/portal/projects",
    },
    {
      id: 2,
      name: "Pending Tasks",
      stat: stats.totalTasks,
      icon: BuildingOfficeIcon,
      change: "1.2%",
      changeType: "increase",
      href: "/portal/tasks",
    },
    {
      id: 3,
      name: "Pending Invoices",
      stat: stats.pendingInvoices,
      icon: CreditCardIcon,
      change: "0.8%",
      changeType: "decrease",
      href: "/portal/billing",
    },
    {
      id: 4,
      name: "Open Tickets",
      stat: stats.openTickets,
      icon: LifebuoyIcon,
      change: "0.3%",
      changeType: "increase",
      href: "/portal/support",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-900">Overview</h2>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statItems.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                <p
                  className={classNames(
                    item.changeType === "increase" ? "text-green-600" : "text-red-600",
                    "ml-2 flex items-baseline text-sm font-semibold"
                  )}
                >
                  {item.changeType === "increase" ? (
                    <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                  ) : (
                    <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {" "}
                    {item.changeType === "increase" ? "Increased" : "Decreased"} by{" "}
                  </span>
                  {item.change}
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link href={item.href} className="font-medium text-blue-600 hover:text-blue-500">
                      View all<span className="sr-only"> {item.name} stats</span>
                    </Link>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Organizations */}
      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-900">Your Organizations</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => (
            <div key={org.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BuildingOfficeIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Organization
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {org.name}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link
                    href={`/portal/org/${org.slug}`}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h2>
        <ul role="list" className="divide-y divide-gray-200 rounded-lg bg-white shadow mt-5">
          {recentActivity.length === 0 ? (
            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
              No recent activity
            </li>
          ) : (
            recentActivity.map((activity) => (
              <li key={activity.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <BuildingOfficeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-medium text-gray-900">
                        {activity.user?.name || activity.user?.email}
                      </span>{" "}
                      performed{" "}
                      <span className="font-medium text-gray-900">
                        {activity.action}
                      </span>
                      {activity.resourceType && (
                        <>
                          {" "}on{" "}
                          <span className="font-medium text-gray-900">
                            {activity.resourceType}
                          </span>
                        </>
                      )}
                      {activity.organization && (
                        <>
                          {" "}for{" "}
                          <span className="font-medium text-blue-600">
                            {activity.organization.name}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={activity.createdAt.toISOString()}>
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}