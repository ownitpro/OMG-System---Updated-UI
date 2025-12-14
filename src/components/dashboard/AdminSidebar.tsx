"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  BuildingOfficeIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  FlagIcon,
  LifebuoyIcon,
  ChartBarIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  section?: string;
}

const navigation: NavItem[] = [
  // Core section
  { name: "Overview", href: "/dashboard/admin", icon: HomeIcon, section: "Core" },
  { name: "Organizations", href: "/dashboard/admin/organizations", icon: BuildingOfficeIcon, section: "Core" },
  { name: "Orders", href: "/dashboard/admin/orders", icon: ShoppingCartIcon, section: "Core", badge: 3 },
  { name: "Subscriptions", href: "/dashboard/admin/subscriptions", icon: CreditCardIcon, section: "Core" },
  
  // Analytics section
  { name: "Usage Events", href: "/dashboard/admin/usage-events", icon: ChartBarIcon, section: "Analytics" },
  { name: "Audit Logs", href: "/dashboard/admin/audit", icon: ClipboardDocumentListIcon, section: "Analytics" },
  
  // Support section
  { name: "Support Tickets", href: "/dashboard/admin/tickets", icon: LifebuoyIcon, section: "Support", badge: 5 },
  
  // Settings section
  { name: "Feature Flags", href: "/dashboard/admin/feature-flags", icon: FlagIcon, section: "Settings" },
  { name: "System Settings", href: "/dashboard/admin/settings", icon: CogIcon, section: "Settings" },
];

const sections = ["Core", "Analytics", "Support", "Settings"];

export function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(sections));
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { data: session } = useSession();

  // Prevent hydration mismatch - ensure consistent initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (mounted) {
      setSidebarOpen(false);
    }
  }, [pathname, mounted]);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getSectionItems = (section: string) => {
    let items = navigation.filter(item => item.section === section);
    // Filter by search query if present
    if (searchQuery.trim()) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return items;
  };

  const filteredNavigation = searchQuery.trim()
    ? navigation.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : navigation;

  const NavLink = ({ item, isMobile = false }: { item: NavItem; isMobile?: boolean }) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
    const showText = isMobile || !collapsed || !mounted;
    return (
      <Link
        href={item.href}
        className={cn(
          "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative",
          isActive
            ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20"
            : "text-gray-300 hover:bg-gray-800/80 hover:text-white hover:translate-x-1",
          isMobile ? "mx-2" : "",
          !showText && "justify-center"
        )}
        onClick={() => isMobile && setSidebarOpen(false)}
        title={!showText ? item.name : undefined}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
        )}
        <item.icon
          className={cn(
            "flex-shrink-0 transition-all duration-200",
            isActive ? "text-white scale-110" : "text-gray-400 group-hover:text-white group-hover:scale-105",
            showText ? "mr-3 h-5 w-5" : "h-5 w-5"
          )}
        />
        {showText && (
          <>
            <span className="flex-1 transition-all">{item.name}</span>
            {item.badge && (
              <span className={cn(
                "ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none rounded-full transition-all",
                isActive 
                  ? "bg-white/20 text-white" 
                  : "bg-red-500/80 text-white group-hover:bg-red-500"
              )}>
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile sidebar - only render after mount to prevent hydration mismatch */}
      {mounted && (
        <div
          className={cn(
            "lg:hidden fixed inset-0 z-50 transition-opacity duration-300",
            sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 admin-backdrop-blur" onClick={() => setSidebarOpen(false)} />
          <div
            className={cn(
              "relative flex w-full max-w-xs flex-1 flex-col bg-gray-900 shadow-xl transform transition-transform duration-300",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-shrink-0 items-center px-4 py-4 border-b border-gray-800">
            <ShieldCheckIcon className="h-8 w-8 text-primary-500 mr-2" />
            <h1 className="text-xl font-bold text-white">Admin Portal</h1>
          </div>
          {/* Search */}
          <div className="px-3 py-3 border-b border-gray-800">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="mt-2 h-0 flex-1 overflow-y-auto admin-scrollbar">
            <nav className="space-y-1 px-2">
              {sections.map((section) => {
                const items = getSectionItems(section);
                if (items.length === 0) return null;
                return (
                  <div key={section} className="mb-4">
                    <button
                      onClick={() => toggleSection(section)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-300 transition-colors"
                    >
                      <span>{section}</span>
                      {expandedSections.has(section) ? (
                        <ChevronRightIcon className="h-4 w-4 rotate-90" />
                      ) : (
                        <ChevronRightIcon className="h-4 w-4" />
                      )}
                    </button>
                    {expandedSections.has(section) && (
                      <div className="mt-1 space-y-1">
                        {items.map((item) => (
                          <NavLink key={item.name} item={item} isMobile />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
          {/* User profile section */}
          {mounted && session?.user && (
            <div className="flex-shrink-0 border-t border-gray-800 p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                  <UserCircleIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-white">{session.user.name || "Admin"}</p>
                  <p className="text-xs text-gray-400">{session.user.email}</p>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300",
          mounted && collapsed ? "lg:w-20" : "lg:w-64"
        )}
        suppressHydrationWarning
      >
        <div className="flex flex-grow flex-col overflow-y-auto bg-gray-900 border-r border-gray-800">
          {/* Header */}
          <div className="flex flex-shrink-0 items-center justify-between px-4 py-4 border-b border-gray-800">
            {(!mounted || !collapsed) && (
              <div className="flex items-center">
                <ShieldCheckIcon className="h-8 w-8 text-primary-500 mr-2 transition-transform hover:scale-110" />
                <h1 className="text-xl font-bold text-white">Admin Portal</h1>
              </div>
            )}
            {mounted && collapsed && <ShieldCheckIcon className="h-8 w-8 text-primary-500 mx-auto transition-transform hover:scale-110" />}
            {mounted && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-1.5 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? (
                  <ChevronRightIcon className="h-5 w-5" />
                ) : (
                  <ChevronLeftIcon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>

          {/* Search - Desktop */}
          {(!mounted || !collapsed) && (
            <div className="px-3 py-3 border-b border-gray-800">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-2 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 px-3 overflow-y-auto admin-scrollbar">
              {sections.map((section) => {
                const items = getSectionItems(section);
                if (items.length === 0) return null;
                return (
                  <div key={section} className="mb-4">
                    {(!mounted || !collapsed) && (
                      <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider transition-opacity">
                        {section}
                      </div>
                    )}
                    <div className="space-y-1">
                      {items.map((item) => (
                        <NavLink key={item.name} item={item} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* User profile section */}
          {mounted && session?.user && !collapsed && (
            <div className="flex-shrink-0 border-t border-gray-800 p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <UserCircleIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{session.user.name || "Admin"}</p>
                  <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                </div>
              </div>
            </div>
          )}
          {mounted && collapsed && session?.user && (
            <div className="flex-shrink-0 border-t border-gray-800 p-4 flex justify-center">
              <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                <UserCircleIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu button */}
      {mounted && (
        <div className="lg:hidden fixed top-4 left-4 z-40">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
