"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import type { Column } from "@/components/ui/data-table";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BuildingOfficeIcon,
  FunnelIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

// Mock data fallback
const mockOrganizations = [
  {
    id: "1",
    name: "TechCorp Solutions",
    slug: "techcorp-solutions",
    industry: "Technology",
    plan: "Enterprise",
    status: "Active",
    createdAt: "2024-01-15",
    userCount: 5,
    mrr: 999.00,
  },
  {
    id: "2",
    name: "Manufacturing Inc",
    slug: "manufacturing-inc",
    industry: "Manufacturing",
    plan: "Professional",
    status: "Active",
    createdAt: "2024-01-10",
    userCount: 3,
    mrr: 299.00,
  },
  {
    id: "3",
    name: "Retail Plus",
    slug: "retail-plus",
    industry: "Retail",
    plan: "Professional",
    status: "Active",
    createdAt: "2024-01-08",
    userCount: 2,
    mrr: 299.00,
  },
  {
    id: "4",
    name: "Healthcare Systems",
    slug: "healthcare-systems",
    industry: "Healthcare",
    plan: "Starter",
    status: "Active",
    createdAt: "2024-01-05",
    userCount: 1,
    mrr: 99.00,
  },
  {
    id: "5",
    name: "Finance Corp",
    slug: "finance-corp",
    industry: "Finance",
    plan: "Professional",
    status: "Suspended",
    createdAt: "2023-12-20",
    userCount: 4,
    mrr: 299.00,
  },
];

export default function OrganizationsPage() {
  const [organizations] = useState(mockOrganizations);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "Suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "Cancelled":
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return <Badge variant="default">Enterprise</Badge>;
      case "Professional":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Professional</Badge>;
      case "Starter":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Starter</Badge>;
      default:
        return <Badge variant="outline">{plan}</Badge>;
    }
  };

  // Filter organizations
  const filteredOrganizations = organizations.filter((org) => {
    if (statusFilter !== "all" && org.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (planFilter !== "all" && org.plan.toLowerCase() !== planFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  const columns: Column<typeof organizations[0]>[] = [
    {
      key: "name",
      label: "Organization",
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-sm text-gray-500">{row.slug}</div>
        </div>
      ),
    },
    {
      key: "industry",
      label: "Industry",
      sortable: true,
    },
    {
      key: "plan",
      label: "Plan",
      sortable: true,
      render: (value) => getPlanBadge(value),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => getStatusBadge(value),
    },
    {
      key: "userCount",
      label: "Users",
      sortable: true,
      render: (value) => (
        <div className="flex items-center">
          <UserGroupIcon className="h-4 w-4 text-gray-400 mr-1" />
          {value}
        </div>
      ),
    },
    {
      key: "mrr",
      label: "MRR",
      sortable: true,
      render: (value) => <span className="font-semibold">${value}</span>,
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
    },
  ];

  const totalOrgs = organizations.length;
  const activeOrgs = organizations.filter((org) => org.status === "Active").length;
  const totalMRR = organizations.reduce((sum, org) => sum + org.mrr, 0);
  const avgUsers = organizations.reduce((sum, org) => sum + org.userCount, 0) / organizations.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
          <p className="text-gray-600 mt-1">
            Manage client organizations and their settings
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <BuildingOfficeIcon className="mr-2 h-4 w-4" />
            Add Organization
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Organizations"
          value={totalOrgs}
          change={8.2}
          changeLabel="vs last month"
          icon={BuildingOfficeIcon}
          type="default"
          trend="up"
        />
        <MetricCard
          title="Active Organizations"
          value={activeOrgs}
          change={5.5}
          changeLabel={`${Math.round((activeOrgs / totalOrgs) * 100)}% of total`}
          icon={BuildingOfficeIcon}
          type="success"
          trend="up"
        />
        <MetricCard
          title="Total MRR"
          value={totalMRR}
          change={12.5}
          changeLabel="vs last month"
          icon={CurrencyDollarIcon}
          type="revenue"
          trend="up"
        />
        <MetricCard
          title="Avg Users per Org"
          value={avgUsers.toFixed(1)}
          change={3.2}
          changeLabel="vs last month"
          icon={UserGroupIcon}
          type="users"
          trend="up"
        />
      </div>

      {/* Filters */}
      <Card variant="default">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <FunnelIcon className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Organizations Table */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>All Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredOrganizations}
            columns={columns}
            keyExtractor={(row) => row.id}
            searchable={true}
            searchPlaceholder="Search organizations..."
            pagination={true}
            pageSize={10}
            selectable={true}
            actions={(row) => (
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" title="View">
                  <EyeIcon className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" title="Edit">
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" title="More">
                  <EllipsisHorizontalIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
            emptyMessage="No organizations found"
          />
        </CardContent>
      </Card>
    </div>
  );
}
