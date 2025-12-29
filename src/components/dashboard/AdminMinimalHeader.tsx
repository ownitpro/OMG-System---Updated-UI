"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "@/components/common/logo";

export function AdminMinimalHeader() {
  const { data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [systemStatus, setSystemStatus] = useState<"healthy" | "degraded" | "down">("healthy");
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0f172a]/95 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity group">
          <Logo width={80} priority variant="png" />
          <span className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors" style={{ letterSpacing: '-0.05em' }}>
            OMGsystems
          </span>
        </Link>

        {/* Right side - System Status & User Menu */}
        <div className="flex items-center gap-x-4">
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

          {/* User Menu */}
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
              <div className="absolute right-0 z-50 mt-2.5 w-56 origin-top-right rounded-lg bg-[#0f172a] border border-white/10 py-2 shadow-xl focus:outline-none">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm font-medium text-white">{session?.user?.name || "Admin"}</p>
                  <p className="text-xs text-white/60 truncate">{session?.user?.email}</p>
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
    </header>
  );
}


