"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChatBubbleLeftIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PauseIcon
} from "@heroicons/react/24/outline";

interface Ticket {
  id: string;
  subject: string;
  description: string | null;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  organization: {
    name: string;
    slug: string;
  };
  user: {
    name: string | null;
    email: string;
  };
  _count?: {
    comments: number;
  };
}

interface PortalSupportIndexProps {
  tickets: Ticket[];
}

export function PortalSupportIndex({ tickets }: PortalSupportIndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OPEN":
        return ExclamationTriangleIcon;
      case "IN_PROGRESS":
        return ClockIcon;
      case "RESOLVED":
        return CheckCircleIcon;
      case "CLOSED":
        return CheckCircleIcon;
      case "ON_HOLD":
        return PauseIcon;
      case "CANCELLED":
        return XCircleIcon;
      default:
        return ChatBubbleLeftIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-red-100 text-red-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      case "CLOSED":
        return "bg-gray-100 text-gray-800";
      case "ON_HOLD":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (ticket.description && ticket.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const statusCounts = {
    all: tickets.length,
    OPEN: tickets.filter(t => t.status === "OPEN").length,
    IN_PROGRESS: tickets.filter(t => t.status === "IN_PROGRESS").length,
    RESOLVED: tickets.filter(t => t.status === "RESOLVED").length,
    CLOSED: tickets.filter(t => t.status === "CLOSED").length,
    ON_HOLD: tickets.filter(t => t.status === "ON_HOLD").length,
    CANCELLED: tickets.filter(t => t.status === "CANCELLED").length,
  };

  const priorityCounts = {
    all: tickets.length,
    urgent: tickets.filter(t => t.priority === "urgent").length,
    high: tickets.filter(t => t.priority === "high").length,
    medium: tickets.filter(t => t.priority === "medium").length,
    low: tickets.filter(t => t.priority === "low").length,
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium text-gray-900">Support Tickets</h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {tickets.length} total
          </span>
        </div>
        <Link
          href="/portal/support/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          New Ticket
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status ({statusCounts.all})</option>
                <option value="OPEN">Open ({statusCounts.OPEN})</option>
                <option value="IN_PROGRESS">In Progress ({statusCounts.IN_PROGRESS})</option>
                <option value="RESOLVED">Resolved ({statusCounts.RESOLVED})</option>
                <option value="CLOSED">Closed ({statusCounts.CLOSED})</option>
                <option value="ON_HOLD">On Hold ({statusCounts.ON_HOLD})</option>
                <option value="CANCELLED">Cancelled ({statusCounts.CANCELLED})</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                id="priority"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priority ({priorityCounts.all})</option>
                <option value="urgent">Urgent ({priorityCounts.urgent})</option>
                <option value="high">High ({priorityCounts.high})</option>
                <option value="medium">Medium ({priorityCounts.medium})</option>
                <option value="low">Low ({priorityCounts.low})</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <ChatBubbleLeftIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery || statusFilter !== "all" || priorityFilter !== "all"
                  ? "Try adjusting your search or filters."
                  : "Get started by creating a new support ticket."}
              </p>
              {!searchQuery && statusFilter === "all" && priorityFilter === "all" && (
                <div className="mt-6">
                  <Link
                    href="/portal/support/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    New Ticket
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => {
                const StatusIcon = getStatusIcon(ticket.status);
                return (
                  <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <StatusIcon className="h-5 w-5 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/portal/support/${ticket.id}`}
                            className="text-sm font-medium text-blue-600 hover:text-blue-900 truncate"
                          >
                            {ticket.subject}
                          </Link>
                          {ticket.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {ticket.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {ticket.status.replace('_', ' ')}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                          </span>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>{getTimeAgo(ticket.createdAt)}</div>
                          <div className="flex items-center">
                            <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                            {ticket._count?.comments ?? 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}