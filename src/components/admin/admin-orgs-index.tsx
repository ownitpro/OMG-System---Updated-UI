"use client";

import React from "react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  BuildingOfficeIcon, 
  UsersIcon, 
  DocumentTextIcon, 
  TicketIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon
} from "@heroicons/react/24/outline";

interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  industry: string | null;
  size: string | null;
  createdAt: Date;
  memberships: Array<{
    id: string;
    role: string;
    user: {
      name: string | null;
      email: string;
    };
  }>;
  _count: {
    projects: number;
    invoices: number;
    tickets: number;
    memberships: number;
  };
}

interface AdminOrgsIndexProps {
  organizations: Organization[];
  stats: {
    total: number;
    withAdmins: number;
    activeProjects: number;
    unpaidInvoices: number;
  };
}

export function AdminOrgsIndex({ organizations, stats }: AdminOrgsIndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "createdAt" | "members">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Get unique industries and sizes for filters
  const industries = useMemo(() => {
    const unique = [...new Set(organizations.map(org => org.industry).filter(Boolean))];
    return unique.sort();
  }, [organizations]);

  const sizes = useMemo(() => {
    const unique = [...new Set(organizations.map(org => org.size).filter(Boolean))];
    return unique.sort();
  }, [organizations]);

  // Filter and sort organizations
  const filteredOrganizations = useMemo(() => {
    let filtered = organizations.filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           org.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           org.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesIndustry = !filterIndustry || org.industry === filterIndustry;
      const matchesSize = !filterSize || org.size === filterSize;
      
      return matchesSearch && matchesIndustry && matchesSize;
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
        case "members":
          aValue = a._count.memberships;
          bValue = b._count.memberships;
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
  }, [organizations, searchQuery, filterIndustry, filterSize, sortBy, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BuildingOfficeIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Organizations
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.total}
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
                <UsersIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    With Admins
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.withAdmins}
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
                <DocumentTextIcon className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Projects
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.activeProjects}
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
                <TicketIcon className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Unpaid Invoices
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.unpaidInvoices}
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Industry Filter */}
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>

            {/* Size Filter */}
            <select
              value={filterSize}
              onChange={(e) => setFilterSize(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Sizes</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            {/* Sort */}
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="createdAt">Sort by Created</option>
                <option value="members">Sort by Members</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Organizations Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Organizations ({filteredOrganizations.length})
            </h3>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Organization
            </button>
          </div>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {filteredOrganizations.map((org) => (
            <li key={org.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BuildingOfficeIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {org.name}
                        </p>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {org.slug}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <p>{org.description || "No description"}</p>
                        {org.industry && (
                          <>
                            <span className="mx-2">•</span>
                            <p>{org.industry}</p>
                          </>
                        )}
                        {org.size && (
                          <>
                            <span className="mx-2">•</span>
                            <p>{org.size}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Stats */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-1" />
                        {org._count.memberships}
                      </div>
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-4 w-4 mr-1" />
                        {org._count.projects}
                      </div>
                      <div className="flex items-center">
                        <TicketIcon className="h-4 w-4 mr-1" />
                        {org._count.tickets}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/orgs/${org.slug}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <button className="text-gray-400 hover:text-gray-600">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Members Preview */}
                <div className="mt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">Members:</span>
                    <div className="flex -space-x-2">
                      {org.memberships.slice(0, 3).map((membership) => (
                        <div
                          key={membership.id}
                          className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-700"
                          title={`${membership.user.name || membership.user.email} (${membership.role})`}
                        >
                          {(membership.user.name || membership.user.email).charAt(0).toUpperCase()}
                        </div>
                      ))}
                      {org.memberships.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                          +{org.memberships.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        {filteredOrganizations.length === 0 && (
          <div className="text-center py-12">
            <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No organizations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
