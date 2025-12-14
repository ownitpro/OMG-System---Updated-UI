import React from "react";
import {
  BuildingOfficeIcon,
  PlayIcon,
  DocumentTextIcon,
  TicketIcon,
  ClockIcon,
  UserGroupIcon,
  CreditCardIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface AdminOverviewProps {
  stats: {
    newLeads: number;
    demosBooked: number;
    unpaidInvoices: number;
    openTickets: number;
    activeSubscriptions: number;
    pastDueSubscriptions: number;
    trialSubscriptions: number;
    averageOnboardingProgress: number;
    undeliveredWebhooks: number;
    lastWebhookDelivery: Date | null;
  };
  recentActivity: Array<{
    id: string;
    action: string;
    resourceType: string | null;
    createdAt: Date;
    user: { name: string | null; email: string } | null;
    organization: { name: string; slug: string } | null;
  }>;
}

export function AdminOverview({ stats, recentActivity }: AdminOverviewProps) {
  // Today at a glance cards
  const todayCards = [
    {
      name: "New Leads",
      value: stats.newLeads,
      icon: UserGroupIcon,
      color: "bg-blue-500",
      href: "/admin/leads",
    },
    {
      name: "Demos Booked",
      value: stats.demosBooked,
      icon: PlayIcon,
      color: "bg-green-500",
      href: "/admin/demos",
    },
    {
      name: "Unpaid Invoices",
      value: stats.unpaidInvoices,
      icon: DocumentTextIcon,
      color: "bg-yellow-500",
      href: "/admin/invoices",
    },
    {
      name: "Open Tickets",
      value: stats.openTickets,
      icon: TicketIcon,
      color: "bg-red-500",
      href: "/admin/tickets",
    },
  ];

  // Subscription status cards
  const subscriptionCards = [
    {
      name: "Active",
      value: stats.activeSubscriptions,
      icon: CheckCircleIcon,
      color: "bg-green-500",
    },
    {
      name: "Past Due",
      value: stats.pastDueSubscriptions,
      icon: ExclamationTriangleIcon,
      color: "bg-red-500",
    },
    {
      name: "Trial",
      value: stats.trialSubscriptions,
      icon: ClockIcon,
      color: "bg-blue-500",
    },
  ];

  // Automation health status
  const automationHealth = {
    undeliveredWebhooks: stats.undeliveredWebhooks,
    lastDelivery: stats.lastWebhookDelivery,
    isHealthy: stats.undeliveredWebhooks === 0 && 
               (stats.lastWebhookDelivery ? 
                 (Date.now() - new Date(stats.lastWebhookDelivery).getTime()) < 24 * 60 * 60 * 1000 : 
                 false)
  };

  return (
    <div className="space-y-6">
      {/* Today at a glance - 4-up grid */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Today at a glance</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {todayCards.map((item) => (
            <div
              key={item.name}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = item.href}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${item.color} p-3 rounded-md`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {item.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Status */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Subscription Status</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {subscriptionCards.map((item) => (
            <div
              key={item.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${item.color} p-3 rounded-md`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {item.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Onboarding Progress & Automation Health */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Onboarding Progress */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Onboarding Progress
            </h3>
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Average completion</span>
                  <span>{stats.averageOnboardingProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stats.averageOnboardingProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Automation Health */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Automation Health
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Webhook Status</span>
                <div className="flex items-center">
                  {automationHealth.isHealthy ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-red-500" />
                  )}
                  <span className={`ml-2 text-sm font-medium ${
                    automationHealth.isHealthy ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {automationHealth.isHealthy ? 'Healthy' : 'Issues'}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div>Undelivered: {automationHealth.undeliveredWebhooks}</div>
                {automationHealth.lastDelivery && (
                  <div>Last delivery: {new Date(automationHealth.lastDelivery).toLocaleString()}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="flow-root">
            <ul className="-mb-8" role="list">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activity.id} role="listitem">
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                          <ClockIcon className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
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
                                <span className="font-medium text-gray-900">
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
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
