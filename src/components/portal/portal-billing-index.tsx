"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  CreditCardIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  UserIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";

interface Invoice {
  id: string;
  number: string;
  amount: number;
  status: string;
  dueDate: Date | null;
  paidAt: Date | null;
  createdAt: Date;
  organization: {
    name: string;
    slug: string;
  };
}

interface Subscription {
  id: string;
  name: string;
  status: string;
  amount: number;
  interval: string;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  organization: {
    name: string;
    slug: string;
  };
}

interface PortalBillingIndexProps {
  invoices: Invoice[];
  subscriptions: Subscription[];
  stats: {
    totalInvoices: number;
    paidInvoices: number;
    unpaidInvoices: number;
    overdueInvoices: number;
    totalAmount: number;
    paidAmount: number;
    activeSubscriptions: number;
    trialSubscriptions: number;
  };
}

export function PortalBillingIndex({ invoices, subscriptions, stats }: PortalBillingIndexProps) {
  const [activeTab, setActiveTab] = useState<"invoices" | "subscriptions">("invoices");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "dueDate" | "amount" | "status">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const tabs = [
    { id: "invoices", name: "Invoices", icon: DocumentTextIcon },
    { id: "subscriptions", name: "Subscriptions", icon: CreditCardIcon },
  ];

  // Filter and sort invoices
  const filteredInvoices = useMemo(() => {
    let filtered = invoices.filter(invoice => {
      const matchesSearch = 
        invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.organization.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = !filterStatus || invoice.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case "createdAt":
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case "dueDate":
          aValue = a.dueDate || new Date(0);
          bValue = b.dueDate || new Date(0);
          break;
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "status":
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
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
  }, [invoices, searchQuery, filterStatus, sortBy, sortOrder]);

  // Filter and sort subscriptions
  const filteredSubscriptions = useMemo(() => {
    let filtered = subscriptions.filter(subscription => {
      const matchesSearch = 
        subscription.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscription.organization.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = !filterStatus || subscription.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case "createdAt":
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case "dueDate":
          aValue = a.endDate || new Date(0);
          bValue = b.endDate || new Date(0);
          break;
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "status":
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
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
  }, [subscriptions, searchQuery, filterStatus, sortBy, sortOrder]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PAID":
        return CheckCircleIcon;
      case "SENT":
        return ClockIcon;
      case "OVERDUE":
        return ExclamationTriangleIcon;
      case "ACTIVE":
        return CheckCircleIcon;
      case "TRIAL":
        return ClockIcon;
      case "CANCELLED":
        return ExclamationTriangleIcon;
      default:
        return ClockIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "SENT":
        return "bg-yellow-100 text-yellow-800";
      case "OVERDUE":
        return "bg-red-100 text-red-800";
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "TRIAL":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(amount);
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

  const isOverdue = (dueDate: Date | null) => {
    if (!dueDate) return false;
    return new Date() > dueDate;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Invoices
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalInvoices}
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
                    Paid
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.paidInvoices}
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
                <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Overdue
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.overdueInvoices}
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
                <CurrencyDollarIcon className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Amount
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(stats.totalAmount)}
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
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.name}
                  {tab.id === "invoices" && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {filteredInvoices.length}
                    </span>
                  )}
                  {tab.id === "subscriptions" && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {filteredSubscriptions.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-6 py-4">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                {activeTab === "invoices" ? (
                  <>
                    <option value="PAID">Paid</option>
                    <option value="SENT">Sent</option>
                    <option value="OVERDUE">Overdue</option>
                  </>
                ) : (
                  <>
                    <option value="ACTIVE">Active</option>
                    <option value="TRIAL">Trial</option>
                    <option value="CANCELLED">Cancelled</option>
                  </>
                )}
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
                <option value="amount-desc">Amount (High to Low)</option>
                <option value="amount-asc">Amount (Low to High)</option>
                <option value="status-asc">Status A-Z</option>
              </select>
            </div>
          </div>

          {/* Invoices Tab */}
          {activeTab === "invoices" && (
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => {
                const StatusIcon = getStatusIcon(invoice.status);
                const overdue = isOverdue(invoice.dueDate);
                
                return (
                  <div key={invoice.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <StatusIcon className="h-6 w-6 text-gray-400" />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Invoice #{invoice.number}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Amount: {formatCurrency(invoice.amount)}</span>
                            <span>Created: {new Date(invoice.createdAt).toLocaleDateString()}</span>
                            {invoice.dueDate && (
                              <span className={overdue ? "text-red-600" : ""}>
                                Due: {new Date(invoice.dueDate).toLocaleDateString()}
                                {overdue && " (Overdue)"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <ArrowDownTrayIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {filteredInvoices.length === 0 && (
                <div className="text-center py-12">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === "subscriptions" && (
            <div className="space-y-4">
              {filteredSubscriptions.map((subscription) => {
                const StatusIcon = getStatusIcon(subscription.status);
                
                return (
                  <div key={subscription.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <StatusIcon className="h-6 w-6 text-gray-400" />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {subscription.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Amount: {formatCurrency(subscription.amount)}/{subscription.interval}</span>
                            <span>Started: {new Date(subscription.startDate).toLocaleDateString()}</span>
                            {subscription.endDate && (
                              <span>Ends: {new Date(subscription.endDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                          {subscription.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {filteredSubscriptions.length === 0 && (
                <div className="text-center py-12">
                  <CreditCardIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No subscriptions found</h3>
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
