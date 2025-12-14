"use client";

import React from "react";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  CreditCardIcon,
  TicketIcon,
  UserCircleIcon,
  BellIcon,
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

interface PortalShellProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Overview", href: "/portal", icon: HomeIcon },
  { name: "Onboarding", href: "/portal/onboarding", icon: ClipboardDocumentListIcon },
  { name: "Documents", href: "/portal/documents", icon: DocumentTextIcon },
  { name: "Billing", href: "/portal/billing", icon: CreditCardIcon },
  { name: "Support", href: "/portal/support", icon: TicketIcon },
  { name: "Profile", href: "/portal/profile", icon: UserCircleIcon },
];

interface Notification {
  id?: string;
  title?: string;
  message?: string;
  timeAgo?: string;
  readAt?: string | null;
  href?: string;
}

export function PortalShell({ children }: PortalShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null);
  
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  // Load notifications for client portal
  const loadNotifications = useCallback(async () => {
    // Don't fetch if orgId is null or undefined
    if (!activeOrgId) {
      setNotifications([]);
      return;
    }

    try {
      const response = await fetch(`/api/portal/notifications?orgId=${activeOrgId}`);
      if (response.ok) {
        const data = await response.json();
        // Ensure data is always an array
        setNotifications(Array.isArray(data) ? data : []);
      } else {
        // If API fails (403, 404, etc.), set empty array silently
        setNotifications([]);
      }
    } catch (error) {
      // Silently handle errors - don't log to console to avoid noise
      setNotifications([]);
    }
  }, [activeOrgId]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
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
              <h1 className="text-xl font-bold text-blue-600">OMGsystems</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1" role="navigation" aria-label="Portal navigation">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={`${
                        isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
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
                <h1 className="text-xl font-bold text-blue-600">OMGsystems</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1" role="navigation" aria-label="Portal navigation">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <item.icon
                        className={`${
                          isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                        } mr-3 flex-shrink-0 h-6 w-6`}
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
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <span className="text-sm text-gray-500">Welcome to your OMGsystems portal</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              {/* Notifications */}
              <div className="relative ml-3">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" />
                  {Array.isArray(notifications) && notifications.filter((n: any) => !n.readAt).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
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
                    {!Array.isArray(notifications) || notifications.length === 0 ? (
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
