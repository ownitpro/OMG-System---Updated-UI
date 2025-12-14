"use client";

import React from "react";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  HomeIcon,
  BuildingOfficeIcon,
  PlayIcon,
  DocumentTextIcon,
  CreditCardIcon,
  CogIcon,
  TicketIcon,
  ChartBarIcon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  DocumentDuplicateIcon,
  FlagIcon,
  UsersIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

interface AdminShellProps {
  children: React.ReactNode;
}

// Updated navigation with proper order and sections
const navigation = [
  { name: "Overview", href: "/admin", icon: HomeIcon },
  { name: "Organizations", href: "/admin/orgs", icon: BuildingOfficeIcon },
  { name: "Demos", href: "/admin/demos", icon: PlayIcon },
  { name: "Orders", href: "/admin/orders", icon: DocumentTextIcon },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCardIcon },
  { name: "Projects", href: "/admin/projects", icon: CogIcon },
  { name: "Tickets", href: "/admin/tickets", icon: TicketIcon },
  { name: "Documents", href: "/admin/documents", icon: DocumentDuplicateIcon },
  { name: "Usage & Webhooks", href: "/admin/usage", icon: ChartBarIcon },
  { name: "Feature Flags", href: "/admin/flags", icon: FlagIcon },
  { name: "People", href: "/admin/people", icon: UsersIcon },
  { name: "Settings", href: "/admin/settings", icon: CogIcon },
];

export function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [buildHash, setBuildHash] = useState("");
  
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  // Get build hash from environment
  useEffect(() => {
    setBuildHash(process.env.NEXT_PUBLIC_BUILD_HASH || "dev");
  }, []);

  // Global search functionality
  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}&orgId=${activeOrgId}`);
      const results = await response.json();
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
    }
  }, [activeOrgId]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  // Handle search result click
  const handleSearchResultClick = useCallback((result: any) => {
    router.push(result.href);
    setSearchQuery("");
    setShowSearchResults(false);
  }, [router]);

  // Handle org switcher change
  const handleOrgChange = useCallback((orgId: string) => {
    setActiveOrgId(orgId);
    // In a real app, this would update the session and refresh data
    console.log('Switching to org:', orgId);
  }, []);

  // Load notifications
  const loadNotifications = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/notifications?orgId=${activeOrgId}`);
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }, [activeOrgId]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? "" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">OMGsystems Admin</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1" role="navigation" aria-label="Admin navigation">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={`${
                        isActive ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                      } mr-4 flex-shrink-0 h-6 w-6`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-gray-900">OMGsystems Admin</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1" role="navigation" aria-label="Admin navigation">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`${
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <item.icon
                        className={`${
                          isActive ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                        } mr-3 flex-shrink-0 h-6 w-6`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            {/* Footer with build hash */}
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="text-xs text-gray-500">
                    Build: {buildHash}
                  </div>
                  <div className="text-xs text-gray-400">
                    {process.env.NODE_ENV === 'production' ? 'Production' : 'Development'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              {/* Global Search */}
              <div className="relative w-full max-w-lg">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent"
                    placeholder="Search organizations, invoices, tickets..."
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setShowSearchResults(false);
                        setSearchQuery("");
                      }
                    }}
                  />
                </div>
                
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {searchResults.map((result: any, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        onClick={() => handleSearchResultClick(result)}
                      >
                        <div className="flex items-center">
                          <result.icon className="h-4 w-4 mr-3 text-gray-400" />
                          <div>
                            <div className="font-medium">{result.title}</div>
                            <div className="text-gray-500 text-xs">{result.subtitle}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              {/* Org Switcher */}
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={activeOrgId || ""}
                  onChange={(e) => handleOrgChange(e.target.value)}
                >
                  <option value="">Select Organization</option>
                  {(session?.user as any)?.memberships?.map((membership: any) => (
                    <option key={membership.orgId} value={membership.orgId}>
                      {membership.organization.name}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Notifications */}
              <div className="relative ml-3">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" />
                  {notifications.filter((n: any) => !n.readAt).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter((n: any) => !n.readAt).length}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500">No notifications</div>
                    ) : (
                      notifications.slice(0, 10).map((notification: any, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            if (notification.href) {
                              router.push(notification.href);
                            }
                            setShowNotifications(false);
                          }}
                        >
                          <div className="flex items-start">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{notification.title}</div>
                              <div className="text-gray-500 text-xs mt-1">{notification.message}</div>
                              <div className="text-gray-400 text-xs mt-1">{notification.timeAgo}</div>
                            </div>
                            {!notification.readAt && (
                              <div className="ml-2 h-2 w-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* User menu */}
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {session?.user?.name || session?.user?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
