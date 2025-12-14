import React from "react";
import { Badge } from "@/components/ui/badge";

interface Organization {
  memberships: Array<{
    id: string;
    role: string;
    user: { id: string; name: string | null; email: string };
  }>;
}

interface OrgPeopleProps {
  org: Organization;
}

export function OrgPeople({ org }: OrgPeopleProps) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Badge variant="warning">Admin</Badge>;
      case "STAFF":
        return <Badge variant="secondary">Staff</Badge>;
      case "CLIENT":
        return <Badge variant="success">Client</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">People</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage team members and their roles
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Invite User
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {org.memberships.map((membership) => (
            <li key={membership.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {membership.user.name?.charAt(0) || membership.user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">
                          {membership.user.name || "No name"}
                        </p>
                        <span className="ml-2">
                          {getRoleBadge(membership.role)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{membership.user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Resend Welcome
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
