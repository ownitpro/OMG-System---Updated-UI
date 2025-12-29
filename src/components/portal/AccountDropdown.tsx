"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

type AccountDropdownProps = {
  role: "client" | "admin";
};

export function AccountDropdown({ role }: AccountDropdownProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const roleColor = role === "admin" ? "#A855F7" : "#47BD79";
  const portalBase = role === "admin" ? "/portal/admin" : "/portal";

  // Get user data from session
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";
  const userInitial = userName.charAt(0).toUpperCase();
  const userRole = (session?.user as any)?.role || "CLIENT";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const menuItems = [
    {
      label: "Profile",
      icon: UserIcon,
      href: `${portalBase}/profile`,
    },
    {
      label: "Billing",
      icon: CreditCardIcon,
      href: `${portalBase}/billing`,
    },
    {
      label: "Settings",
      icon: Cog6ToothIcon,
      href: `${portalBase}/settings`,
    },
    {
      label: "Help & Support",
      icon: QuestionMarkCircleIcon,
      href: `${portalBase}/support`,
    },
  ];

  // Admin-specific menu item
  if (role === "admin") {
    menuItems.splice(2, 0, {
      label: "Security",
      icon: ShieldCheckIcon,
      href: `${portalBase}/security`,
    });
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-xl border border-white/20 bg-white/5 p-2 hover:bg-white/10 transition-colors"
        aria-label="Account menu"
      >
        <UserCircleIcon className="w-5 h-5 text-white/70" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-[#1e293b] backdrop-blur-xl shadow-2xl z-50 overflow-hidden">
          {/* User Info Header */}
          <div className="px-4 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: `${roleColor}30` }}
              >
                {userInitial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {userName}
                </p>
                <p className="text-xs text-white/50 truncate">{userEmail}</p>
              </div>
            </div>
            <div className="mt-3">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border"
                style={{
                  backgroundColor: `${roleColor}20`,
                  borderColor: `${roleColor}40`,
                  color: roleColor,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: roleColor }}
                />
                {userRole === "ADMIN" ? "Admin" : userRole === "STAFF" ? "Staff" : "Client"}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-white/10 py-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
