"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import type { Column } from "@/components/ui/data-table";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LifebuoyIcon,
  FunnelIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
  };
  organization?: {
    name: string;
  };
  assignedTo?: {
    name: string;
    email: string;
  };
  comments?: number;
}

// Mock data - in real app, fetch from API
const mockTickets: Ticket[] = [
  {
    id: "TKT-2024-001",
    title: "Unable to access dashboard",
    description: "User reports being unable to log into the dashboard after password reset.",
    status: "OPEN",
    priority: "HIGH",
    category: "Technical",
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T14:15:00Z",
    user: { name: "John Doe", email: "john@techcorp.com" },
    organization: { name: "TechCorp Solutions" },
    assignedTo: { name: "Support Agent", email: "support@omgsystems.com" },
    comments: 3,
  },
  {
    id: "TKT-2024-002",
    title: "Billing inquiry - Invoice #12345",
    description: "Question about charges on the latest invoice.",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    category: "Billing",
    createdAt: "2024-01-19T09:15:00Z",
    updatedAt: "2024-01-20T11:20:00Z",
    user: { name: "Jane Smith", email: "jane@manufacturing.com" },
    organization: { name: "Manufacturing Inc" },
    assignedTo: { name: "Billing Team", email: "billing@omgsystems.com" },
    comments: 5,
  },
  {
    id: "TKT-2024-003",
    title: "Feature request: Export functionality",
    description: "Request to add CSV export feature to the reports section.",
    status: "OPEN",
    priority: "LOW",
    category: "Feature Request",
    createdAt: "2024-01-18T15:45:00Z",
    updatedAt: "2024-01-18T15:45:00Z",
    user: { name: "Bob Johnson", email: "bob@retailplus.com" },
    organization: { name: "Retail Plus" },
    comments: 1,
  },
  {
    id: "TKT-2024-004",
    title: "API integration issue",
    description: "Third-party API integration is returning 500 errors intermittently.",
    status: "RESOLVED",
    priority: "HIGH",
    category: "Technical",
    createdAt: "2024-01-17T08:00:00Z",
    updatedAt: "2024-01-19T16:30:00Z",
    user: { name: "Alice Williams", email: "alice@healthcare.com" },
    organization: { name: "Healthcare Systems" },
    assignedTo: { name: "Dev Team", email: "dev@omgsystems.com" },
    comments: 8,
  },
  {
    id: "TKT-2024-005",
    title: "Account upgrade request",
    description: "Customer wants to upgrade from Professional to Enterprise plan.",
    status: "CLOSED",
    priority: "MEDIUM",
    category: "Billing",
    createdAt: "2024-01-16T12:20:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
    user: { name: "Charlie Brown", email: "charlie@finance.com" },
    organization: { name: "Finance Corp" },
    assignedTo: { name: "Sales Team", email: "sales@omgsystems.com" },
    comments: 4,
  },
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In real app, fetch from API
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/tickets");
        if (response.ok) {
          const data = await response.json();
          setTickets(data.tickets || mockTickets);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Open</Badge>;
      case "IN_PROGRESS":
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case "RESOLVED":
        return <Badge variant="default" className="bg-green-100 text-green-800">Resolved</Badge>;
      case "CLOSED":
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return <Badge variant="destructive">High</Badge>;
      case "MEDIUM":
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "LOW":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    if (statusFilter !== "all" && ticket.status !== statusFilter) return false;
    if (priorityFilter !== "all" && ticket.priority !== priorityFilter) return false;
    if (categoryFilter !== "all" && ticket.category !== categoryFilter) return false;
    return true;
  });

  const columns: Column<Ticket>[] = [
    {
      key: "id",
      label: "Ticket ID",
      sortable: true,
      render: (value, row) => (
        <div className="font-mono text-sm font-semibold text-primary-600">{value}</div>
      ),
    },
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          {row.description && (
            <div className="text-sm text-gray-500 line-clamp-1 mt-1">{row.description}</div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => getStatusBadge(value),
    },
    {
      key: "priority",
      label: "Priority",
      sortable: true,
      render: (value) => getPriorityBadge(value),
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (value) => (
        <Badge variant="outline" className="text-xs">
          {value}
        </Badge>
      ),
    },
    {
      key: "user",
      label: "Requester",
      sortable: false,
      render: (value, row) => (
        <div>
          {row.user ? (
            <>
              <div className="text-sm font-medium text-gray-900">{row.user.name}</div>
              <div className="text-xs text-gray-500">{row.user.email}</div>
            </>
          ) : (
            <span className="text-sm text-gray-400">N/A</span>
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
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (value) => (
        <div className="text-sm text-gray-600">
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: "comments",
      label: "Comments",
      sortable: true,
      render: (value) => (
        <div className="flex items-center text-sm text-gray-600">
          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
          {value || 0}
        </div>
      ),
    },
  ];

  const openTickets = tickets.filter((t) => t.status === "OPEN").length;
  const inProgressTickets = tickets.filter((t) => t.status === "IN_PROGRESS").length;
  const resolvedTickets = tickets.filter((t) => t.status === "RESOLVED").length;
  const highPriorityTickets = tickets.filter((t) => t.priority === "HIGH").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600 mt-1">
            Manage and track customer support requests
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <FunnelIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <LifebuoyIcon className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Open Tickets"
          value={openTickets}
          change={-12.5}
          changeLabel="vs last week"
          icon={ClockIcon}
          type="warning"
          trend="down"
        />
        <MetricCard
          title="In Progress"
          value={inProgressTickets}
          change={5.2}
          changeLabel="vs last week"
          icon={ExclamationTriangleIcon}
          type="default"
          trend="up"
        />
        <MetricCard
          title="Resolved"
          value={resolvedTickets}
          change={18.3}
          changeLabel="vs last week"
          icon={CheckCircleIcon}
          type="success"
          trend="up"
        />
        <MetricCard
          title="High Priority"
          value={highPriorityTickets}
          change={-8.1}
          changeLabel="vs last week"
          icon={ExclamationTriangleIcon}
          type="warning"
          trend="down"
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
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Billing">Billing</SelectItem>
                <SelectItem value="Feature Request">Feature Request</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <FunnelIcon className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card variant="default">
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredTickets}
            columns={columns}
            keyExtractor={(row) => row.id}
            searchable={true}
            searchPlaceholder="Search tickets by ID, title, or description..."
            pagination={true}
            pageSize={10}
            selectable={true}
            loading={loading}
            actions={(row) => (
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" title="View Details">
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
            emptyMessage="No tickets found"
          />
        </CardContent>
      </Card>
    </div>
  );
}


