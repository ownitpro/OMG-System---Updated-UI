"use client";

import React from "react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  PlayIcon, 
  CalendarIcon, 
  UserIcon, 
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

interface DemoRequest {
  id: string;
  appSlug: string;
  industry: string | null;
  answers: any;
  bookedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  lead: {
    id: string;
    contact: string | null;
    email: string | null;
    orgName: string | null;
    source: string | null;
  } | null;
}

interface AdminDemosIndexProps {
  demos: DemoRequest[];
  stats: {
    total: number;
    booked: number;
    recent: number;
    crm: number;
    securevault: number;
  };
}

export function AdminDemosIndex({ demos, stats }: AdminDemosIndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterApp, setFilterApp] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "bookedAt" | "appSlug">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Get unique apps, industries for filters
  const apps = useMemo(() => {
    const unique = [...new Set(demos.map(demo => demo.appSlug))];
    return unique.sort();
  }, [demos]);

  const industries = useMemo(() => {
    const unique = [...new Set(demos.map(demo => demo.industry).filter(Boolean))];
    return unique.sort();
  }, [demos]);

  // Filter and sort demos
  const filteredDemos = useMemo(() => {
    let filtered = demos.filter(demo => {
      const matchesSearch = 
        demo.lead?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demo.lead?.orgName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demo.lead?.contact?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demo.appSlug.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesApp = !filterApp || demo.appSlug === filterApp;
      const matchesIndustry = !filterIndustry || demo.industry === filterIndustry;
      
      let matchesStatus = true;
      if (filterStatus === "booked") {
        matchesStatus = demo.bookedAt !== null;
      } else if (filterStatus === "pending") {
        matchesStatus = demo.bookedAt === null;
      }
      
      return matchesSearch && matchesApp && matchesIndustry && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case "createdAt":
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case "bookedAt":
          aValue = a.bookedAt || new Date(0);
          bValue = b.bookedAt || new Date(0);
          break;
        case "appSlug":
          aValue = a.appSlug.toLowerCase();
          bValue = b.appSlug.toLowerCase();
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
  }, [demos, searchQuery, filterApp, filterIndustry, filterStatus, sortBy, sortOrder]);

  const getAppDisplayName = (appSlug: string) => {
    switch (appSlug) {
      case "crm":
        return "CRM Demo";
      case "securevault-docs":
        return "SecureVault Docs Demo";
      default:
        return appSlug;
    }
  };

  const getAppIcon = (appSlug: string) => {
    switch (appSlug) {
      case "crm":
        return BuildingOfficeIcon;
      case "securevault-docs":
        return UserIcon;
      default:
        return PlayIcon;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PlayIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Demos
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
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Booked
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.booked}
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
                <ClockIcon className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Recent (7d)
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.recent}
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
                <BuildingOfficeIcon className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    CRM Demos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.crm}
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
                <UserIcon className="h-6 w-6 text-indigo-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    SecureVault Demos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.securevault}
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search demos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* App Filter */}
            <select
              value={filterApp}
              onChange={(e) => setFilterApp(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Apps</option>
              {apps.map(app => (
                <option key={app} value={app}>{getAppDisplayName(app)}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Status</option>
              <option value="booked">Booked</option>
              <option value="pending">Pending</option>
            </select>

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

            {/* Sort */}
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="createdAt">Sort by Created</option>
                <option value="bookedAt">Sort by Booked</option>
                <option value="appSlug">Sort by App</option>
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

      {/* Demos Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Demo Requests ({filteredDemos.length})
          </h3>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {filteredDemos.map((demo) => {
            const AppIcon = getAppIcon(demo.appSlug);
            return (
              <li key={demo.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <AppIcon className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {getAppDisplayName(demo.appSlug)}
                          </p>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            demo.bookedAt ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {demo.bookedAt ? "Booked" : "Pending"}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <p>{demo.lead?.email || demo.lead?.contact || "No contact info"}</p>
                          {demo.lead?.orgName && (
                            <>
                              <span className="mx-2">•</span>
                              <p>{demo.lead.orgName}</p>
                            </>
                          )}
                          {demo.industry && (
                            <>
                              <span className="mx-2">•</span>
                              <p>{demo.industry}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {/* Dates */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {new Date(demo.createdAt).toLocaleDateString()}
                        </div>
                        {demo.bookedAt && (
                          <div className="flex items-center">
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            {new Date(demo.bookedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/demos/${demo.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                        {!demo.bookedAt && (
                          <Link
                            href={`/admin/demos/${demo.id}/convert`}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                          >
                            Convert
                            <ArrowRightIcon className="h-3 w-3 ml-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Demo Answers Preview */}
                  {demo.answers && (
                    <div className="mt-2">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Answers:</span>{" "}
                        {Object.keys(demo.answers).length} fields completed
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        
        {filteredDemos.length === 0 && (
          <div className="text-center py-12">
            <PlayIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No demo requests found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
