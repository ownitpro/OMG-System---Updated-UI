"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import type { Column } from "@/components/ui/data-table";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  CreditCardIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface Subscription {
  id: string;
  organization: string;
  organizationId: string;
  plan: string;
  status: "active" | "trial" | "past_due" | "cancelled" | "expired";
  amount: number;
  interval: "monthly" | "yearly";
  nextBilling: string;
  createdAt: string;
  cancelledAt?: string;
}

const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    organization: "TechCorp Inc",
    organizationId: "org-1",
    plan: "Pro Automation",
    status: "active",
    amount: 149.0,
    interval: "monthly",
    nextBilling: "2024-11-15",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    organization: "PropertyMgt Co",
    organizationId: "org-2",
    plan: "Enterprise Suite",
    status: "active",
    amount: 499.0,
    interval: "monthly",
    nextBilling: "2024-11-20",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    organization: "RealEstate Partners",
    organizationId: "org-3",
    plan: "Starter Plan",
    status: "trial",
    amount: 0.0,
    interval: "monthly",
    nextBilling: "2024-11-10",
    createdAt: "2024-10-10",
  },
  {
    id: "4",
    organization: "Healthcare Solutions",
    organizationId: "org-4",
    plan: "Pro Automation",
    status: "past_due",
    amount: 149.0,
    interval: "monthly",
    nextBilling: "2024-10-05",
    createdAt: "2024-03-05",
  },
  {
    id: "5",
    organization: "Manufacturing Inc",
    organizationId: "org-5",
    plan: "Enterprise Suite",
    status: "active",
    amount: 499.0,
    interval: "yearly",
    nextBilling: "2025-11-15",
    createdAt: "2023-11-15",
  },
  {
    id: "6",
    organization: "Retail Plus",
    organizationId: "org-6",
    plan: "Starter Plan",
    status: "cancelled",
    amount: 49.0,
    interval: "monthly",
    nextBilling: "2024-10-20",
    createdAt: "2024-09-20",
    cancelledAt: "2024-10-15",
  },
];

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getStatusBadge = (status: Subscription["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="success" className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case "trial":
        return <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">Trial</Badge>;
      case "past_due":
        return <Badge variant="warning" className="bg-yellow-100 text-yellow-800 border-yellow-200">Past Due</Badge>;
      case "cancelled":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-200">Cancelled</Badge>;
      case "expired":
        return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredSubscriptions = useMemo(() => {
    let filtered = subscriptions;

    if (statusFilter !== "all") {
      filtered = filtered.filter((sub) => sub.status === statusFilter);
    }
    if (planFilter !== "all") {
      filtered = filtered.filter((sub) => sub.plan === planFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (sub) =>
          sub.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [subscriptions, statusFilter, planFilter, searchTerm]);

  const stats = useMemo(() => {
    const totalRevenue = filteredSubscriptions
      .filter((s) => s.status === "active")
      .reduce((sum, s) => {
        const monthlyAmount = s.interval === "yearly" ? s.amount / 12 : s.amount;
        return sum + monthlyAmount;
      }, 0);

    const activeSubscriptions = filteredSubscriptions.filter((s) => s.status === "active").length;
    const trialSubscriptions = filteredSubscriptions.filter((s) => s.status === "trial").length;
    const pastDueSubscriptions = filteredSubscriptions.filter((s) => s.status === "past_due").length;
    const churnRate =
      filteredSubscriptions.length > 0
        ? Math.round(
            (filteredSubscriptions.filter((s) => s.status === "cancelled").length / filteredSubscriptions.length) *
              100
          ) / 100
        : 0;

    return { totalRevenue, activeSubscriptions, trialSubscriptions, pastDueSubscriptions, churnRate };
  }, [filteredSubscriptions]);

  const uniquePlans = useMemo(() => {
    return Array.from(new Set(subscriptions.map((s) => s.plan)));
  }, [subscriptions]);

  const columns: Column<Subscription>[] = [
    {
      key: "organization",
      label: "Organization",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "plan",
      label: "Plan",
      sortable: true,
      render: (value) => <span className="text-gray-900">{value}</span>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => getStatusBadge(value as Subscription["status"]),
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value, row) => (
        <div>
          <span className="font-semibold text-gray-900">
            ${typeof value === "number" ? value.toFixed(2) : value}
          </span>
          <span className="text-sm text-gray-500 ml-1">/{row.interval === "yearly" ? "yr" : "mo"}</span>
        </div>
      ),
    },
    {
      key: "interval",
      label: "Billing",
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-600 capitalize">{value}</span>
      ),
    },
    {
      key: "nextBilling",
      label: "Next Billing",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
          <span className="text-sm text-gray-600">
            {row.status === "active" || row.status === "trial"
              ? new Date(value as string).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-600">{new Date(value as string).toLocaleDateString()}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-600 mt-1">Manage client subscriptions and billing</p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Subscription
        </Button>
      </div>

      {/* Past Due Alert */}
      {stats.pastDueSubscriptions > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 admin-card">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-yellow-900">Past Due Subscriptions</h3>
                <p className="text-sm text-yellow-800 mt-1">
                  {stats.pastDueSubscriptions} subscription{stats.pastDueSubscriptions !== 1 ? "s" : ""} {stats.pastDueSubscriptions === 1 ? "is" : "are"} past due. Review and take action.
                </p>
              </div>
              <Button size="sm" variant="outline" className="ml-4">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue (MRR)"
          value={`$${Math.round(stats.totalRevenue).toLocaleString()}`}
          icon={CurrencyDollarIcon}
          type="revenue"
          change={12}
          changeLabel="vs last month"
          trend="up"
        />
        <MetricCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions}
          icon={CheckCircleIcon}
          type="success"
          change={5}
          changeLabel="this month"
          trend="up"
        />
        <MetricCard
          title="Trial Subscriptions"
          value={stats.trialSubscriptions}
          icon={ClockIcon}
          type="default"
          change={-2}
          changeLabel="this week"
          trend="down"
        />
        <MetricCard
          title="Churn Rate"
          value={`${stats.churnRate}%`}
          icon={ExclamationTriangleIcon}
          type={stats.churnRate > 3 ? "warning" : "success"}
          change={stats.churnRate > 3 ? 0.5 : -0.5}
          changeLabel="vs last month"
          trend={stats.churnRate > 3 ? "up" : "down"}
        />
      </div>

      {/* Filters and Search */}
      <Card variant="default" className="admin-card">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-end">
            <div className="flex-1 w-full">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by organization, plan, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 admin-input"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="past_due">Past Due</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                {uniquePlans.map((plan) => (
                  <SelectItem key={plan} value={plan}>
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full sm:w-auto">
              <FunnelIcon className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions Table */}
      <Card variant="default" className="admin-card">
        <CardHeader>
          <CardTitle>All Subscriptions ({filteredSubscriptions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredSubscriptions}
            columns={columns}
            keyExtractor={(row) => row.id}
            searchable={false}
            pagination={true}
            pageSize={10}
            selectable={false}
            actions={(row) => (
              <Button variant="ghost" size="sm">
                <EllipsisHorizontalIcon className="h-4 w-4" />
              </Button>
            )}
            emptyMessage="No subscriptions found matching your criteria."
          />
        </CardContent>
      </Card>
    </div>
  );
}


