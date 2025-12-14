"use client";

import React from "react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  FlagIcon,
  CheckCircleIcon,
  XCircleIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CalendarIcon,
  UserIcon
} from "@heroicons/react/24/outline";

interface FeatureFlag {
  id: string;
  name: string;
  description: string | null;
  isEnabled: boolean;
  isGlobal: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    organizationFlags: number;
  };
}

interface AdminFeatureFlagsIndexProps {
  featureFlags: FeatureFlag[];
  stats: {
    totalFlags: number;
    enabled: number;
    disabled: number;
    globalFlags: number;
    orgScopedFlags: number;
  };
}

export function AdminFeatureFlagsIndex({ featureFlags, stats }: AdminFeatureFlagsIndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterScope, setFilterScope] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "createdAt" | "updatedAt" | "isEnabled">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFlagGroups, setShowFlagGroups] = useState(false);

  // Filter and sort feature flags
  const filteredFeatureFlags = useMemo(() => {
    let filtered = featureFlags.filter(flag => {
      const matchesSearch = 
        flag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flag.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = !filterStatus || 
        (filterStatus === "enabled" && flag.isEnabled) ||
        (filterStatus === "disabled" && !flag.isEnabled);
      
      const matchesScope = !filterScope || 
        (filterScope === "global" && flag.isGlobal) ||
        (filterScope === "org-scoped" && !flag.isGlobal);
      
      return matchesSearch && matchesStatus && matchesScope;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "createdAt":
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case "updatedAt":
          aValue = a.updatedAt;
          bValue = b.updatedAt;
          break;
        case "isEnabled":
          aValue = a.isEnabled ? 1 : 0;
          bValue = b.isEnabled ? 1 : 0;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [featureFlags, searchQuery, filterStatus, filterScope, sortBy, sortOrder]);

  // Group flags by prefix (e.g., "auth_", "billing_", etc.)
  const flagGroups = useMemo(() => {
    const groups: { [key: string]: FeatureFlag[] } = {};
    
    filteredFeatureFlags.forEach(flag => {
      const prefix = flag.name.includes('_') ? flag.name.split('_')[0] : 'other';
      if (!groups[prefix]) {
        groups[prefix] = [];
      }
      groups[prefix].push(flag);
    });
    
    return groups;
  }, [filteredFeatureFlags]);

  const getStatusIcon = (isEnabled: boolean) => {
    return isEnabled ? CheckCircleIcon : XCircleIcon;
  };

  const getStatusColor = (isEnabled: boolean) => {
    return isEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getScopeIcon = (isGlobal: boolean) => {
    return isGlobal ? GlobeAltIcon : BuildingOfficeIcon;
  };

  const getScopeColor = (isGlobal: boolean) => {
    return isGlobal ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800";
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

  const toggleFlag = (flagId: string, isEnabled: boolean) => {
    // In a real app, this would make an API call to toggle the flag
    console.log('Toggling feature flag:', flagId, 'to', !isEnabled);
    alert(`Feature flag ${isEnabled ? 'disabled' : 'enabled'}!`);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FlagIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Flags
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalFlags}
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
                    Enabled
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.enabled}
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
                    Disabled
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.disabled}
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
                <GlobeAltIcon className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Global
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.globalFlags}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Feature Flags ({filteredFeatureFlags.length})
            </h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFlagGroups(!showFlagGroups)}
                className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                  showFlagGroups
                    ? "border-blue-500 text-blue-700 bg-blue-50"
                    : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                }`}
              >
                <FlagIcon className="h-4 w-4 mr-2" />
                Group by Prefix
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Flag
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search flags..."
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
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>

            {/* Scope Filter */}
            <select
              value={filterScope}
              onChange={(e) => setFilterScope(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Scopes</option>
              <option value="global">Global</option>
              <option value="org-scoped">Org Scoped</option>
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
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="isEnabled-desc">Enabled First</option>
              <option value="isEnabled-asc">Disabled First</option>
              <option value="createdAt-desc">Newest First</option>
              <option value="updatedAt-desc">Recently Updated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feature Flags Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {showFlagGroups ? (
          /* Grouped View */
          <div className="divide-y divide-gray-200">
            {Object.entries(flagGroups).map(([groupName, flags]) => (
              <div key={groupName} className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">
                  {groupName} ({flags.length})
                </h3>
                <div className="space-y-3">
                  {flags.map((flag) => {
                    const StatusIcon = getStatusIcon(flag.isEnabled);
                    const ScopeIcon = getScopeIcon(flag.isGlobal);
                    
                    return (
                      <div key={flag.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(flag.isEnabled)}`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {flag.isEnabled ? "Enabled" : "Disabled"}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScopeColor(flag.isGlobal)}`}>
                              <ScopeIcon className="h-3 w-3 mr-1" />
                              {flag.isGlobal ? "Global" : "Org Scoped"}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{flag.name}</div>
                            {flag.description && (
                              <div className="text-sm text-gray-500">{flag.description}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {flag._count.organizationFlags} orgs
                          </span>
                          <button
                            onClick={() => toggleFlag(flag.id, flag.isEnabled)}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              flag.isEnabled
                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                          >
                            {flag.isEnabled ? "Disable" : "Enable"}
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flag
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scope
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organizations
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFeatureFlags.map((flag) => {
                  const StatusIcon = getStatusIcon(flag.isEnabled);
                  const ScopeIcon = getScopeIcon(flag.isGlobal);
                  
                  return (
                    <tr key={flag.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {flag.name}
                          </div>
                          {flag.description && (
                            <div className="text-sm text-gray-500">
                              {flag.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(flag.isEnabled)}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {flag.isEnabled ? "Enabled" : "Disabled"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScopeColor(flag.isGlobal)}`}>
                          <ScopeIcon className="h-3 w-3 mr-1" />
                          {flag.isGlobal ? "Global" : "Org Scoped"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {flag._count.organizationFlags}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(flag.updatedAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getTimeAgo(flag.updatedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleFlag(flag.id, flag.isEnabled)}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              flag.isEnabled
                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                          >
                            {flag.isEnabled ? "Disable" : "Enable"}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        
        {filteredFeatureFlags.length === 0 && (
          <div className="text-center py-12">
            <FlagIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No feature flags found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
