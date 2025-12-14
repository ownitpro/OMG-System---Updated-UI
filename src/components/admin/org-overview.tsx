import React from "react";
import { Badge } from "@/components/ui/badge";
import { ClockIcon, UserIcon, DocumentTextIcon, CogIcon } from "@heroicons/react/24/outline";

interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  memberships: Array<{
    id: string;
    role: string;
    user: { id: string; name: string | null; email: string };
  }>;
  projects: Array<{
    id: string;
    name: string;
    status: string;
    tasks: Array<{
      id: string;
      title: string;
      status: string;
    }>;
  }>;
  invoices: Array<{
    id: string;
    number: string;
    status: string;
    amount: number;
    currency: string;
    createdAt: Date;
  }>;
  auditLogs: Array<{
    id: string;
    action: string;
    resourceType: string | null;
    createdAt: Date;
    user: { name: string | null; email: string } | null;
  }>;
}

interface OrgOverviewProps {
  org: Organization;
}

export function OrgOverview({ org }: OrgOverviewProps) {
  // Calculate onboarding progress
  const onboardingProject = org.projects.find(p => p.name.toLowerCase().includes("onboarding"));
  const totalTasks = onboardingProject?.tasks.length || 0;
  const completedTasks = onboardingProject?.tasks.filter(t => t.status === "COMPLETED").length || 0;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get subscription info (mock for now)
  const hasActiveSubscription = org.invoices.some(inv => inv.status === "PAID");
  const subscriptionStatus = hasActiveSubscription ? "Active" : "No Subscription";

  return (
    <div className="space-y-6">
      {/* Subscription Snapshot */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription Snapshot</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <Badge variant={hasActiveSubscription ? "success" : "secondary"}>
                {subscriptionStatus}
              </Badge>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Product</dt>
            <dd className="mt-1 text-sm text-gray-900">OMG CRM</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Package</dt>
            <dd className="mt-1 text-sm text-gray-900">Professional</dd>
          </div>
        </div>
      </div>

      {/* Onboarding Progress */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Onboarding Progress</h3>
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Members</dt>
                  <dd className="text-lg font-medium text-gray-900">{org.memberships.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CogIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Projects</dt>
                  <dd className="text-lg font-medium text-gray-900">{org.projects.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Invoices</dt>
                  <dd className="text-lg font-medium text-gray-900">{org.invoices.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Created</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {new Date(org.createdAt).toLocaleDateString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {org.auditLogs.slice(0, 10).map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== org.auditLogs.slice(0, 10).length - 1 ? (
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
                              {activity.user?.name || activity.user?.email || "System"}
                            </span>{" "}
                            performed{" "}
                            <span className="font-medium text-gray-900">
                              {activity.action}
                            </span>{" "}
                            {activity.resourceType && (
                              <>
                                on{" "}
                                <span className="font-medium text-gray-900">
                                  {activity.resourceType}
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
