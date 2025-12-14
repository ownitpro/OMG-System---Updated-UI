"use client";

import React from "react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowPathIcon,
  LinkIcon,
  BuildingOfficeIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";

interface WebhookEvent {
  id: string;
  eventType: string;
  status: string;
  responseCode: number | null;
  responseBody: string | null;
  createdAt: Date;
  webhookEndpoint: {
    id: string;
    url: string;
    isActive: boolean;
    organization: {
      name: string;
      slug: string;
    };
  };
}

interface WebhookEndpoint {
  id: string;
  url: string;
  isActive: boolean;
  createdAt: Date;
  organization: {
    name: string;
    slug: string;
  };
  _count: {
    events: number;
  };
}

interface AdminUsageIndexProps {
  webhookEvents: WebhookEvent[];
  webhookEndpoints: WebhookEndpoint[];
  stats: {
    totalWebhookEvents: number;
    successfulWebhooks: number;
    failedWebhooks: number;
    pendingWebhooks: number;
    totalWebhookEndpoints: number;
    activeEndpoints: number;
    inactiveEndpoints: number;
  };
}

export function AdminUsageIndex({ webhookEvents, webhookEndpoints, stats }: AdminUsageIndexProps) {
  const [activeTab, setActiveTab] = useState<"events" | "endpoints">("events");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterOrg, setFilterOrg] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "status" | "eventType">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Get unique organizations for filters
  const organizations = useMemo(() => {
    const unique = [...new Set([
      ...webhookEvents.map(e => e.webhookEndpoint.organization.name),
      ...webhookEndpoints.map(e => e.organization.name)
    ])];
    return unique.sort();
  }, [webhookEvents, webhookEndpoints]);

  // Filter and sort webhook events
  const filteredWebhookEvents = useMemo(() => {
    let filtered = webhookEvents.filter(event => {
      const matchesSearch = 
        event.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.webhookEndpoint.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.webhookEndpoint.organization.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = !filterStatus || event.status === filterStatus;
      const matchesOrg = !filterOrg || event.webhookEndpoint.organization.name === filterOrg;
      
      return matchesSearch && matchesStatus && matchesOrg;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case "createdAt":
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case "status":
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        case "eventType":
          aValue = a.eventType.toLowerCase();
          bValue = b.eventType.toLowerCase();
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [webhookEvents, searchQuery, filterStatus, filterOrg, sortBy, sortOrder]);

  // Filter and sort webhook endpoints
  const filteredWebhookEndpoints = useMemo(() => {
    let filtered = webhookEndpoints.filter(endpoint => {
      const matchesSearch = 
        endpoint.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        endpoint.organization.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = !filterStatus || 
        (filterStatus === "active" && endpoint.isActive) ||
        (filterStatus === "inactive" && !endpoint.isActive);
      
      const matchesOrg = !filterOrg || endpoint.organization.name === filterOrg;
      
      return matchesSearch && matchesStatus && matchesOrg;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case "createdAt":
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case "status":
          aValue = a.isActive ? "active" : "inactive";
          bValue = b.isActive ? "active" : "inactive";
          break;
        case "eventType":
          aValue = a.url.toLowerCase();
          bValue = b.url.toLowerCase();
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [webhookEndpoints, searchQuery, filterStatus, filterOrg, sortBy, sortOrder]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return CheckCircleIcon;
      case "failed":
        return XCircleIcon;
      case "pending":
        return ClockIcon;
      default:
        return ExclamationTriangleIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
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

  const retryWebhook = (eventId: string) => {
    // In a real app, this would make an API call to retry the webhook
    console.log('Retrying webhook event:', eventId);
    alert('Webhook retry initiated!');
  };

  const toggleEndpoint = (endpointId: string, isActive: boolean) => {
    // In a real app, this would make an API call to toggle the endpoint
    console.log('Toggling webhook endpoint:', endpointId, 'to', !isActive);
    alert(`Webhook endpoint ${isActive ? 'deactivated' : 'activated'}!`);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Events
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalWebhookEvents}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Successful
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.successfulWebhooks}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Failed
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.failedWebhooks}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <LinkIcon className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Endpoints
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalWebhookEndpoints}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("events")}
              className={`${
                activeTab === "events"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <ChartBarIcon className="h-5 w-5 mr-2" />
              Webhook Events ({filteredWebhookEvents.length})
            </button>
            <button
              onClick={() => setActiveTab("endpoints")}
              className={`${
                activeTab === "endpoints"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <LinkIcon className="h-5 w-5 mr-2" />
              Webhook Endpoints ({filteredWebhookEndpoints.length})
            </button>
          </nav>
        </div>

        <div className="px-6 py-4">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">All Status</option>
                {activeTab === "events" ? (
                  <>
                    <option value="sent">Sent</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                  </>
                ) : (
                  <>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </>
                )}
              </select>

              {/* Organization Filter */}
              <select
                value={filterOrg}
                onChange={(e) => setFilterOrg(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">All Organizations</option>
                {organizations.map(org => (
                  <option key={org} value={org}>{org}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field as any);
                  setSortOrder(order as any);
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="status-asc">Status A-Z</option>
                <option value="status-desc">Status Z-A</option>
                {activeTab === "events" && (
                  <option value="eventType-asc">Event Type A-Z</option>
                )}
              </select>
            </div>
          </div>

          {/* Webhook Events Tab */}
          {activeTab === "events" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Endpoint
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Response
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredWebhookEvents.map((event) => {
                    const StatusIcon = getStatusIcon(event.status);
                    
                    return (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {event.eventType}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <div className="text-sm text-gray-900">
                              {event.webhookEndpoint.organization.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 truncate max-w-xs">
                            {event.webhookEndpoint.url}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.responseCode || "N/A"}
                          </div>
                          {event.responseBody && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {event.responseBody}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(event.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {getTimeAgo(event.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {event.status === "failed" && (
                              <button
                                onClick={() => retryWebhook(event.id)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Retry webhook"
                              >
                                <ArrowPathIcon className="h-4 w-4" />
                              </button>
                            )}
                            <button className="text-gray-400 hover:text-gray-600">
                              <EyeIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {filteredWebhookEvents.length === 0 && (
                <div className="text-center py-12">
                  <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No webhook events found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Webhook Endpoints Tab */}
          {activeTab === "endpoints" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Endpoint
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Events
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredWebhookEndpoints.map((endpoint) => (
                    <tr key={endpoint.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {endpoint.url}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900">
                            {endpoint.organization.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          endpoint.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {endpoint.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {endpoint._count.events}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(endpoint.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getTimeAgo(endpoint.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleEndpoint(endpoint.id, endpoint.isActive)}
                            className={`${
                              endpoint.isActive 
                                ? "text-red-600 hover:text-red-900" 
                                : "text-green-600 hover:text-green-900"
                            }`}
                            title={endpoint.isActive ? "Deactivate" : "Activate"}
                          >
                            {endpoint.isActive ? (
                              <XCircleIcon className="h-4 w-4" />
                            ) : (
                              <CheckCircleIcon className="h-4 w-4" />
                            )}
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-400 hover:text-red-600">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredWebhookEndpoints.length === 0 && (
                <div className="text-center py-12">
                  <LinkIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No webhook endpoints found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
