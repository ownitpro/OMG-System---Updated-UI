import React from "react";
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Organization {
  id: string;
  name: string;
  slug: string;
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
}

interface User {
  id: string;
  name: string | null;
  email: string;
}

interface OnboardingPageProps {
  organizations: Organization[];
  user: User;
}

export function OnboardingPage({ organizations, user }: OnboardingPageProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "IN_PROGRESS":
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge variant="success">Completed</Badge>;
      case "IN_PROGRESS":
        return <Badge variant="warning">In Progress</Badge>;
      default:
        return <Badge variant="secondary">Not Started</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Welcome to OMGsystems!
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                We're excited to have you on board. This guide will help you get started with your new account and make the most of our platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Checklist */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Start Checklist</h3>
          <div className="mt-5">
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm text-gray-900">Account created and verified</span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm text-gray-900">Organization access granted</span>
              </li>
              <li className="flex items-center">
                {organizations.length > 0 ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                ) : (
                  <ClockIcon className="h-5 w-5 text-yellow-500 mr-3" />
                )}
                <span className="text-sm text-gray-900">First project setup</span>
              </li>
              <li className="flex items-center">
                <ClockIcon className="h-5 w-5 text-yellow-500 mr-3" />
                <span className="text-sm text-gray-900">Complete profile information</span>
              </li>
              <li className="flex items-center">
                <ClockIcon className="h-5 w-5 text-yellow-500 mr-3" />
                <span className="text-sm text-gray-900">Review billing information</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Organization Overview */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Organizations</h3>
          <div className="mt-5">
            {organizations.length === 0 ? (
              <div className="text-center py-6">
                <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No organizations</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't have access to any organizations yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {organizations.map((org) => (
                  <div key={org.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{org.name}</h4>
                        <p className="text-sm text-gray-500">Slug: {org.slug}</p>
                      </div>
                      <Link
                        href={`/portal/org/${org.slug}`}
                        className="text-sm text-blue-600 hover:text-blue-500"
                      >
                        View Details
                      </Link>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Active Projects:</span>
                        <span className="font-medium text-gray-900">{org.projects.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Pending Tasks:</span>
                        <span className="font-medium text-gray-900">
                          {org.projects.reduce((acc, project) => acc + project.tasks.length, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Next Steps</h3>
          <div className="mt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900">Complete Your Profile</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Add your full name and profile picture to personalize your account.
                </p>
                <div className="mt-3">
                  <Link
                    href="/portal/profile"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Go to Profile →
                  </Link>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900">Review Billing</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Check your billing information and payment methods.
                </p>
                <div className="mt-3">
                  <Link
                    href="/portal/billing"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Go to Billing →
                  </Link>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900">Explore Projects</h4>
                <p className="mt-1 text-sm text-gray-500">
                  View your active projects and tasks.
                </p>
                <div className="mt-3">
                  <Link
                    href="/portal/projects"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Go to Projects →
                  </Link>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900">Get Support</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Need help? Create a support ticket or contact our team.
                </p>
                <div className="mt-3">
                  <Link
                    href="/portal/support"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Go to Support →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}