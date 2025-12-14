import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  memberships: Array<{
    user: { name: string | null; email: string };
  }>;
  invoices: Array<{ status: string; amount: any }>;
  projects: Array<{ status: string }>;
}

interface OrganizationsListProps {
  organizations: Organization[];
}

export function OrganizationsList({ organizations }: OrganizationsListProps) {
  const getStatusBadge = (org: Organization) => {
    const hasActiveSubscription = org.invoices.some(inv => inv.status === "PAID");
    const hasOpenInvoices = org.invoices.some(inv => inv.status === "OPEN");
    
    if (hasActiveSubscription) {
      return <Badge variant="success">Active</Badge>;
    } else if (hasOpenInvoices) {
      return <Badge variant="warning">Past Due</Badge>;
    } else {
      return <Badge variant="secondary">No Subscription</Badge>;
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {organizations.map((org) => (
          <li key={org.id}>
            <Link href={`/admin/orgs/${org.slug}`} className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {org.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {org.name}
                        </p>
                        <p className="ml-2 text-sm text-gray-500">
                          /{org.slug}
                        </p>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <p>
                          {org.memberships.length} member{org.memberships.length !== 1 ? 's' : ''}
                        </p>
                        <span className="mx-2">•</span>
                        <p>
                          {org.projects.length} project{org.projects.length !== 1 ? 's' : ''}
                        </p>
                        <span className="mx-2">•</span>
                        <p>
                          {org.invoices.length} invoice{org.invoices.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(org)}
                    <div className="text-sm text-gray-500">
                      Created {new Date(org.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
