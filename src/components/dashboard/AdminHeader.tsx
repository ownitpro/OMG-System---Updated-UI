"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  read: boolean;
  timestamp: Date;
  href?: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function AdminHeader() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [systemStatus, setSystemStatus] = useState<"healthy" | "degraded" | "down">("healthy");
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Dashboard", href: "/dashboard/admin" }];
    
    if (paths.length > 2) {
      paths.slice(2).forEach((path, index) => {
        const href = "/" + paths.slice(0, index + 3).join("/");
        const label = path
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        breadcrumbs.push({ label, href });
      });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Mock notifications - in real app, fetch from API
  useEffect(() => {
    setNotifications([
      {
        id: "1",
        title: "New organization signup",
        message: "TechCorp Solutions has signed up",
        type: "success",
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        href: "/dashboard/admin/organizations",
      },
      {
        id: "2",
        title: "High usage alert",
        message: "Healthcare Systems exceeded usage limit",
        type: "warning",
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        href: "/dashboard/admin/usage",
      },
      {
        id: "3",
        title: "Payment received",
        message: "$299.00 from Manufacturing Inc",
        type: "info",
        read: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      },
    ]);
  }, []);

  // Global search handler
  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      // Mock search results - in real app, call API
      const mockResults = [
        { id: "1", title: "TechCorp Solutions", subtitle: "Organization", href: "/dashboard/admin/organizations", icon: "BuildingOfficeIcon" },
        { id: "2", title: "Order #12345", subtitle: "Order", href: "/dashboard/admin/orders", icon: "ShoppingCartIcon" },
        { id: "3", title: "Ticket #TKT-456", subtitle: "Support Ticket", href: "/dashboard/admin/tickets", icon: "LifebuoyIcon" },
      ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(mockResults);
    } catch (error) {
      console.error("Search error:", error);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setNotificationOpen(false);
        setUserMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/10 bg-slate-900/95 backdrop-blur-xl px-4 shadow-lg sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Breadcrumbs */}
        <div className="hidden lg:flex items-center space-x-2 text-sm">
          <HomeIcon className="h-4 w-4 text-white/40" />
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRightIcon className="h-4 w-4 text-white/40" />
              {crumb.href && index < breadcrumbs.length - 1 ? (
                <Link href={crumb.href} className="text-white/60 hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className={cn(index === breadcrumbs.length - 1 ? "text-white font-medium" : "text-white/60")}>
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Global Search */}
        <div className="flex-1 max-w-lg" ref={searchRef}>
          <div className="relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder="Search... (⌘K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="block w-full pl-10 pr-4 py-2 border border-white/20 bg-white/5 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Search Results Dropdown */}
            {searchOpen && (searchQuery.length >= 2 || searchResults.length > 0) && (
              <div className="absolute z-50 mt-2 w-full bg-slate-800 rounded-lg shadow-xl border border-white/10 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        href={result.href}
                        className="block px-4 py-3 hover:bg-white/5 transition-colors"
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <div className="font-medium text-white">{result.title}</div>
                        <div className="text-sm text-white/60">{result.subtitle}</div>
                      </Link>
                    ))}
                  </div>
                ) : searchQuery.length >= 2 ? (
                  <div className="px-4 py-8 text-center text-white/60">
                    No results found
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* System Status Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            {systemStatus === "healthy" ? (
              <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
            ) : systemStatus === "degraded" ? (
              <ExclamationTriangleIcon className="h-4 w-4 text-amber-400" />
            ) : (
              <XMarkIcon className="h-4 w-4 text-red-400" />
            )}
            <span className="text-xs font-medium text-white/80 capitalize">{systemStatus}</span>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              type="button"
              className="relative -m-2.5 p-2.5 text-white/60 hover:text-white transition-colors"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 z-50 mt-2 w-80 bg-slate-800 rounded-lg shadow-xl border border-white/10 max-h-96 overflow-y-auto">
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <button className="text-xs text-emerald-400 hover:text-emerald-300">
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="py-2">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <Link
                        key={notification.id}
                        href={notification.href || "#"}
                        className={cn(
                          "block px-4 py-3 hover:bg-white/5 transition-colors border-l-4",
                          !notification.read && "bg-emerald-500/10 border-l-emerald-500",
                          notification.read && "border-l-transparent"
                        )}
                        onClick={() => setNotificationOpen(false)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{notification.title}</p>
                            <p className="text-xs text-white/60 mt-1">{notification.message}</p>
                            <p className="text-xs text-white/40 mt-1">
                              {new Date(notification.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="ml-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                          )}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-white/60">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-white/20" />

          {/* Profile dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              className="-m-1.5 flex items-center p-1.5 hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <UserCircleIcon className="h-5 w-5 text-white" />
              </div>
              <span className="hidden lg:flex lg:items-center ml-3">
                <div className="text-left">
                  <span className="block text-sm font-semibold leading-6 text-white">
                    {session?.user?.name || "Admin User"}
                  </span>
                  <span className="block text-xs text-white/60">Admin</span>
                </div>
                <ChevronDownIcon className="ml-2 h-5 w-5 text-white/60" />
              </span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 z-50 mt-2.5 w-56 origin-top-right rounded-lg bg-slate-800 py-2 shadow-xl ring-1 ring-white/10 focus:outline-none">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm font-medium text-white">{session?.user?.name || "Admin"}</p>
                  <p className="text-xs text-white/60 truncate">{session?.user?.email}</p>
                  <div className="mt-2 flex items-center space-x-1">
                    <ShieldCheckIcon className="h-3 w-3 text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-medium">Administrator</span>
                  </div>
                </div>
                <div className="py-1">
                  <Link
                    href="/dashboard/admin/settings"
                    className="flex items-center px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Cog6ToothIcon className="mr-3 h-5 w-5 text-white/60" />
                    Settings
                  </Link>
                  <Link
                    href="/dashboard/admin/profile"
                    className="flex items-center px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <UserIcon className="mr-3 h-5 w-5 text-white/60" />
                    Profile
                  </Link>
                </div>
                <div className="border-t border-white/10 py-1">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      signOut();
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-white/60" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
