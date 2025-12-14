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
  ChartBarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BuildingOfficeIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// Mock data - in real app, fetch from API
interface UsageEvent {
  id: string;
  orgId: string;
  orgName: string;
  key: string;
  amount: number;
  unit: string;
  createdAt: string;
  threshold: number;
  percentage: number;
}

const mockUsageEvents: UsageEvent[] = [
  {
    id: "1",
    orgId: "org-1",
    orgName: "TechCorp Solutions",
    key: "storage_used",
    amount: 2.3,
    unit: "GB",
    createdAt: "2024-01-22T10:30:00Z",
    threshold: 10,
    percentage: 23,
  },
  {
    id: "2",
    orgId: "org-2",
    orgName: "Manufacturing Inc",
    key: "ocr_pages",
    amount: 1250,
    unit: "pages",
    createdAt: "2024-01-22T09:15:00Z",
    threshold: 5000,
    percentage: 25,
  },
  {
    id: "3",
    orgId: "org-3",
    orgName: "Retail Plus",
    key: "api_calls",
    amount: 12500,
    unit: "calls",
    createdAt: "2024-01-22T08:45:00Z",
    threshold: 50000,
    percentage: 25,
  },
  {
    id: "4",
    orgId: "org-4",
    orgName: "Healthcare Systems",
    key: "workflow_runs",
    amount: 45,
    unit: "runs",
    createdAt: "2024-01-22T07:20:00Z",
    threshold: 100,
    percentage: 45,
  },
  {
    id: "5",
    orgId: "org-1",
    orgName: "TechCorp Solutions",
    key: "storage_used",
    amount: 8.7,
    unit: "GB",
    createdAt: "2024-01-21T16:30:00Z",
    threshold: 10,
    percentage: 87,
  },
  {
    id: "6",
    orgId: "org-5",
    orgName: "Finance Corp",
    key: "api_calls",
    amount: 45000,
    unit: "calls",
    createdAt: "2024-01-22T11:00:00Z",
    threshold: 50000,
    percentage: 90,
  },
  {
    id: "7",
    orgId: "org-6",
    orgName: "Startup Inc",
    key: "storage_used",
    amount: 9.2,
    unit: "GB",
    createdAt: "2024-01-22T10:15:00Z",
    threshold: 10,
    percentage: 92,
  },
];

export default function UsageEventsPage() {
  const [usageEvents, setUsageEvents] = useState<UsageEvent[]>(mockUsageEvents);
  const [orgFilter, setOrgFilter] = useState<string>("all");
  const [keyFilter, setKeyFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getAlertLevelBadge = (percentage: number) => {
    if (percentage >= 90) {
      return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Critical</Badge>;
    } else if (percentage >= 70) {
      return <Badge variant="warning" className="bg-yellow-100 text-yellow-800 border-yellow-200">High</Badge>;
    } else if (percentage >= 50) {
      return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">Medium</Badge>;
    } else {
      return <Badge variant="success" className="bg-green-100 text-green-800 border-green-200">Normal</Badge>;
    }
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-yellow-500";
    if (percentage >= 50) return "bg-orange-500";
    return "bg-green-500";
  };

  const filteredEvents = useMemo(() => {
    let filtered = usageEvents;

    if (orgFilter !== "all") {
      filtered = filtered.filter((event) => event.orgId === orgFilter);
    }
    if (keyFilter !== "all") {
      filtered = filtered.filter((event) => event.key === keyFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.orgName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [usageEvents, orgFilter, keyFilter, searchTerm]);

  const stats = useMemo(() => {
    const totalEvents = filteredEvents.length;
    const today = new Date().toISOString().slice(0, 10);
    const eventsToday = filteredEvents.filter((e) => e.createdAt.startsWith(today)).length;
    const highUsageEvents = filteredEvents.filter((e) => e.percentage >= 70).length;
    const averageUsage =
      filteredEvents.length > 0
        ? Math.round(filteredEvents.reduce((sum, e) => sum + e.percentage, 0) / filteredEvents.length)
        : 0;

    return { totalEvents, eventsToday, highUsageEvents, averageUsage };
  }, [filteredEvents]);

  const uniqueOrgs = useMemo(() => {
    return Array.from(new Set(usageEvents.map((e) => e.orgId)));
  }, [usageEvents]);

  const uniqueKeys = useMemo(() => {
    return Array.from(new Set(usageEvents.map((e) => e.key)));
  }, [usageEvents]);

  const columns: Column<UsageEvent>[] = [
    {
      key: "orgName",
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
      key: "key",
      label: "Usage Key",
      sortable: true,
      render: (value) => (
        <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">{value}</code>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value, row) => (
        <span className="font-medium">
          {typeof value === "number" && value < 1 ? value.toFixed(1) : value.toLocaleString()} {row.unit}
        </span>
      ),
    },
    {
      key: "threshold",
      label: "Threshold",
      sortable: true,
      render: (value, row) => (
        <span className="text-gray-600">
          {value.toLocaleString()} {row.unit}
        </span>
      ),
    },
    {
      key: "percentage",
      label: "Usage %",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2 min-w-[120px]">
          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all ${getUsageColor(value as number)}`}
              style={{ width: `${Math.min(value as number, 100)}%` }}
            />
          </div>
          <span className="text-sm font-medium w-12 text-right">{value}%</span>
        </div>
      ),
    },
    {
      key: "percentage",
      label: "Alert Level",
      sortable: false,
      render: (value) => getAlertLevelBadge(value as number),
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-600">
          {new Date(value as string).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usage Events</h1>
          <p className="text-gray-600 mt-1">Monitor resource usage across all organizations in real-time</p>
        </div>
        <Button variant="outline">
          <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* High Usage Alert */}
      {stats.highUsageEvents > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 admin-card">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-yellow-900">High Usage Alerts</h3>
                <p className="text-sm text-yellow-800 mt-1">
                  {stats.highUsageEvents} organization{stats.highUsageEvents !== 1 ? "s" : ""} {stats.highUsageEvents === 1 ? "is" : "are"} approaching or exceeding usage limits. Review and take action.
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
          title="Total Events"
          value={stats.totalEvents}
          icon={ChartBarIcon}
          type="default"
          change={stats.eventsToday > 0 ? Math.round((stats.eventsToday / stats.totalEvents) * 100) : 0}
          changeLabel="today"
          trend={stats.eventsToday > 0 ? "up" : "neutral"}
        />
        <MetricCard
          title="Events Today"
          value={stats.eventsToday}
          icon={ClockIcon}
          type="default"
          change={12}
          changeLabel="vs yesterday"
          trend="up"
        />
        <MetricCard
          title="High Usage Alerts"
          value={stats.highUsageEvents}
          icon={ExclamationTriangleIcon}
          type={stats.highUsageEvents > 0 ? "warning" : "success"}
          change={stats.highUsageEvents > 0 ? 3 : 0}
          changeLabel="require attention"
          trend={stats.highUsageEvents > 0 ? "up" : "neutral"}
        />
        <MetricCard
          title="Average Usage"
          value={`${stats.averageUsage}%`}
          icon={CheckCircleIcon}
          type={stats.averageUsage >= 70 ? "warning" : "success"}
          change={stats.averageUsage >= 70 ? 5 : -2}
          changeLabel="across all resources"
          trend={stats.averageUsage >= 70 ? "up" : "down"}
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
                  placeholder="Search by organization, key, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 admin-input"
                />
              </div>
            </div>
            <Select value={orgFilter} onValueChange={setOrgFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                {uniqueOrgs.map((orgId) => {
                  const org = usageEvents.find((e) => e.orgId === orgId);
                  return org ? (
                    <SelectItem key={orgId} value={orgId}>
                      {org.orgName}
                    </SelectItem>
                  ) : null;
                })}
              </SelectContent>
            </Select>
            <Select value={keyFilter} onValueChange={setKeyFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by usage key" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Keys</SelectItem>
                {uniqueKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
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

      {/* Usage Events Table */}
      <Card variant="default" className="admin-card">
        <CardHeader>
          <CardTitle>Usage Events ({filteredEvents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredEvents}
            columns={columns}
            keyExtractor={(row) => row.id}
            searchable={false}
            pagination={true}
            pageSize={10}
            selectable={false}
            emptyMessage="No usage events found matching your criteria."
          />
        </CardContent>
      </Card>
    </div>
  );
}
