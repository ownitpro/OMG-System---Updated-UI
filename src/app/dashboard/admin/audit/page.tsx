"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import type { Column } from "@/components/ui/data-table";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ClipboardDocumentListIcon,
  FunnelIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  UserIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
  organization?: {
    name: string;
  };
}

// Mock data - in real app, fetch from API
const mockAuditLogs: AuditLog[] = [
  {
    id: "AUD-2024-001",
    action: "user_login",
    entityType: "User",
    entityId: "user-123",
    details: "User logged in successfully",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    createdAt: "2024-01-20T14:30:00Z",
    user: { name: "John Doe", email: "john@techcorp.com" },
    organization: { name: "TechCorp Solutions" },
  },
  {
    id: "AUD-2024-002",
    action: "organization_created",
    entityType: "Organization",
    entityId: "org-456",
    details: "New organization created: Manufacturing Inc",
    ipAddress: "192.168.1.101",
    createdAt: "2024-01-20T12:15:00Z",
    user: { name: "Admin User", email: "admin@omgsystems.com" },
    organization: { name: "Manufacturing Inc" },
  },
  {
    id: "AUD-2024-003",
    action: "subscription_updated",
    entityType: "Subscription",
    entityId: "sub-789",
    details: "Subscription plan changed from Professional to Enterprise",
    ipAddress: "192.168.1.102",
    createdAt: "2024-01-20T10:45:00Z",
    user: { name: "Jane Smith", email: "jane@retailplus.com" },
    organization: { name: "Retail Plus" },
  },
  {
    id: "AUD-2024-004",
    action: "user_deleted",
    entityType: "User",
    entityId: "user-321",
    details: "User account deleted",
    ipAddress: "192.168.1.103",
    createdAt: "2024-01-19T16:20:00Z",
    user: { name: "Admin User", email: "admin@omgsystems.com" },
    organization: { name: "Healthcare Systems" },
  },
  {
    id: "AUD-2024-005",
    action: "payment_processed",
    entityType: "Payment",
    entityId: "pay-654",
    details: "Payment of $299.00 processed successfully",
    ipAddress: "192.168.1.104",
    createdAt: "2024-01-19T14:10:00Z",
    user: { name: "Bob Johnson", email: "bob@finance.com" },
    organization: { name: "Finance Corp" },
  },
  {
    id: "AUD-2024-006",
    action: "ticket_created",
    entityType: "Ticket",
    entityId: "tkt-987",
    details: "Support ticket created: Unable to access dashboard",
    ipAddress: "192.168.1.105",
    createdAt: "2024-01-19T11:30:00Z",
    user: { name: "Alice Williams", email: "alice@techcorp.com" },
    organization: { name: "TechCorp Solutions" },
  },
  {
    id: "AUD-2024-007",
    action: "feature_flag_updated",
    entityType: "FeatureFlag",
    entityId: "ff-147",
    details: "Feature flag 'new_dashboard' enabled for organization",
    ipAddress: "192.168.1.106",
    createdAt: "2024-01-18T09:15:00Z",
    user: { name: "Admin User", email: "admin@omgsystems.com" },
  },
  {
    id: "AUD-2024-008",
    action: "api_key_rotated",
    entityType: "ApiKey",
    entityId: "key-258",
    details: "API key rotated for security",
    ipAddress: "192.168.1.107",
    createdAt: "2024-01-18T08:00:00Z",
    user: { name: "Charlie Brown", email: "charlie@manufacturing.com" },
    organization: { name: "Manufacturing Inc" },
  },
];

export default function AuditLogsPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In real app, fetch from API
    const fetchAuditLogs = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/audit");
        if (response.ok) {
          const data = await response.json();
          setAuditLogs(data.auditLogs || mockAuditLogs);
        }
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuditLogs();
  }, []);

  const getActionBadge = (action: string) => {
    if (action.includes("login") || action.includes("created") || action.includes("processed")) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          {action.replace(/_/g, " ")}
        </Badge>
      );
    }
    if (action.includes("deleted") || action.includes("failed") || action.includes("error")) {
      return (
        <Badge variant="destructive">
          {action.replace(/_/g, " ")}
        </Badge>
      );
    }
    if (action.includes("updated") || action.includes("modified")) {
      return (
        <Badge variant="default" className="bg-blue-100 text-blue-800">
          {action.replace(/_/g, " ")}
        </Badge>
      );
    }
    return (
      <Badge variant="outline">
        {action.replace(/_/g, " ")}
      </Badge>
    );
  };

  const getActionIcon = (action: string) => {
    if (action.includes("login") || action.includes("created") || action.includes("processed")) {
      return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
    }
    if (action.includes("deleted") || action.includes("failed") || action.includes("error")) {
      return <ExclamationCircleIcon className="h-4 w-4 text-red-600" />;
    }
    if (action.includes("updated") || action.includes("modified")) {
      return <InformationCircleIcon className="h-4 w-4 text-blue-600" />;
    }
    return <ShieldCheckIcon className="h-4 w-4 text-gray-600" />;
  };

  // Filter audit logs
  const filteredLogs = auditLogs.filter((log) => {
    if (actionFilter !== "all" && !log.action.includes(actionFilter.toLowerCase())) return false;
    if (entityTypeFilter !== "all" && log.entityType !== entityTypeFilter) return false;
    return true;
  });

  const columns: Column<AuditLog>[] = [
    {
      key: "id",
      label: "Log ID",
      sortable: true,
      render: (value) => (
        <div className="font-mono text-sm font-semibold text-primary-600">{value}</div>
      ),
    },
    {
      key: "action",
      label: "Action",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          {getActionIcon(value)}
          <div>
            <div className="font-medium text-gray-900">{getActionBadge(value)}</div>
            <div className="text-xs text-gray-500 mt-1">{row.entityType}</div>
          </div>
        </div>
      ),
    },
    {
      key: "details",
      label: "Details",
      sortable: false,
      render: (value) => (
        <div className="text-sm text-gray-700 max-w-md line-clamp-2">{value}</div>
      ),
    },
    {
      key: "user",
      label: "User",
      sortable: false,
      render: (value, row) => (
        <div>
          {row.user ? (
            <>
              <div className="text-sm font-medium text-gray-900">{row.user.name}</div>
              <div className="text-xs text-gray-500">{row.user.email}</div>
            </>
          ) : (
            <span className="text-sm text-gray-400">System</span>
          )}
        </div>
      ),
    },
    {
      key: "organization",
      label: "Organization",
      sortable: false,
      render: (value, row) => (
        <div className="text-sm text-gray-600">
          {row.organization?.name || "N/A"}
        </div>
      ),
    },
    {
      key: "ipAddress",
      label: "IP Address",
      sortable: false,
      render: (value) => (
        <div className="font-mono text-xs text-gray-500">{value || "N/A"}</div>
      ),
    },
    {
      key: "createdAt",
      label: "Timestamp",
      sortable: true,
      render: (value) => (
        <div className="text-sm text-gray-600">
          <div>{new Date(value).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">{new Date(value).toLocaleTimeString()}</div>
        </div>
      ),
    },
  ];

  const totalLogs = auditLogs.length;
  const todayLogs = auditLogs.filter(
    (log) => new Date(log.createdAt).toDateString() === new Date().toDateString()
  ).length;
  const uniqueUsers = new Set(auditLogs.map((log) => log.user?.email).filter(Boolean)).size;
  const uniqueOrganizations = new Set(
    auditLogs.map((log) => log.organization?.name).filter(Boolean)
  ).size;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-1">
            Track all system activities and user actions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button variant="outline">
            <FunnelIcon className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Logs"
          value={totalLogs}
          change={15.3}
          changeLabel="vs last week"
          icon={ClipboardDocumentListIcon}
          type="default"
          trend="up"
        />
        <MetricCard
          title="Today's Logs"
          value={todayLogs}
          change={-5.2}
          changeLabel="vs yesterday"
          icon={CalendarIcon}
          type="default"
          trend="down"
        />
        <MetricCard
          title="Active Users"
          value={uniqueUsers}
          change={8.7}
          changeLabel="vs last week"
          icon={UserIcon}
          type="users"
          trend="up"
        />
        <MetricCard
          title="Organizations"
          value={uniqueOrganizations}
          change={3.1}
          changeLabel="vs last week"
          icon={BuildingOfficeIcon}
          type="default"
          trend="up"
        />
      </div>

      {/* Filters */}
      <Card variant="default">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="updated">Updated</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="ticket">Ticket</SelectItem>
                <SelectItem value="subscription">Subscription</SelectItem>
              </SelectContent>
            </Select>
            <Select value={entityTypeFilter} onValueChange={setEntityTypeFilter}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filter by entity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Entity Types</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Organization">Organization</SelectItem>
                <SelectItem value="Subscription">Subscription</SelectItem>
                <SelectItem value="Payment">Payment</SelectItem>
                <SelectItem value="Ticket">Ticket</SelectItem>
                <SelectItem value="FeatureFlag">Feature Flag</SelectItem>
                <SelectItem value="ApiKey">API Key</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <FunnelIcon className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>All Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredLogs}
            columns={columns}
            keyExtractor={(row) => row.id}
            searchable={true}
            searchPlaceholder="Search logs by action, details, user, or organization..."
            pagination={true}
            pageSize={15}
            selectable={true}
            loading={loading}
            expandable={true}
            renderExpandable={(row) => (
              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Entity ID</div>
                    <div className="font-mono text-sm text-gray-900">{row.entityId}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">IP Address</div>
                    <div className="font-mono text-sm text-gray-900">{row.ipAddress || "N/A"}</div>
                  </div>
                  {row.userAgent && (
                    <div className="col-span-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-1">User Agent</div>
                      <div className="text-sm text-gray-900 break-all">{row.userAgent}</div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Full Details</div>
                  <div className="text-sm text-gray-700 bg-white p-3 rounded border">{row.details}</div>
                </div>
              </div>
            )}
            actions={(row) => (
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" title="View Details">
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
            emptyMessage="No audit logs found"
          />
        </CardContent>
      </Card>
    </div>
  );
}

