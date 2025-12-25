import React from 'react';
import Link from 'next/link';
import {
  UserIcon,
  CogIcon,
  LifebuoyIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

interface UserProfileDropdownProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function UserProfileDropdown({ user }: UserProfileDropdownProps) {
  return (
    <div className="relative">
      <button className="flex items-center space-x-2 px-3 py-1.5 rounded-xl hover:bg-white/[0.08] hover:shadow-[0_0_12px_rgba(71,189,121,0.15)] transition-all duration-400 ease-premium-out">
        <div className="w-7 h-7 bg-[#47BD79] rounded-lg flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-lg object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-xs">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-white/90 font-medium text-[13px]">{user.name}</p>
        </div>
        <svg className="w-3.5 h-3.5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-[#47BD79]/25 overflow-hidden animate-fade-in-slow"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 30px rgba(71, 189, 121, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="p-4 border-b border-white/[0.1]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#47BD79] rounded-xl flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-xl object-cover"
                />
              ) : (
                <span className="text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{user.name}</p>
              <p className="text-white/50 text-xs">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="p-2">
          <Link
            href="/account"
            className="group flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.08] hover:shadow-[0_0_10px_rgba(71,189,121,0.1)] transition-all duration-400 ease-premium-out"
          >
            <UserIcon className="w-4 h-4 text-white/50 group-hover:text-[#47BD79] transition-colors duration-400" />
            <span className="text-white/90 text-sm">Account</span>
          </Link>

          <Link
            href="/settings"
            className="group flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.08] hover:shadow-[0_0_10px_rgba(71,189,121,0.1)] transition-all duration-400 ease-premium-out"
          >
            <CogIcon className="w-4 h-4 text-white/50 group-hover:text-[#47BD79] transition-colors duration-400" />
            <span className="text-white/90 text-sm">Settings</span>
          </Link>

          <Link
            href="/billing"
            className="group flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.08] hover:shadow-[0_0_10px_rgba(71,189,121,0.1)] transition-all duration-400 ease-premium-out"
          >
            <CreditCardIcon className="w-4 h-4 text-white/50 group-hover:text-[#47BD79] transition-colors duration-400" />
            <span className="text-white/90 text-sm">Billing</span>
          </Link>

          <Link
            href="/notifications"
            className="group flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.08] hover:shadow-[0_0_10px_rgba(71,189,121,0.1)] transition-all duration-400 ease-premium-out"
          >
            <BellIcon className="w-4 h-4 text-white/50 group-hover:text-[#47BD79] transition-colors duration-400" />
            <span className="text-white/90 text-sm">Notifications</span>
          </Link>

          <Link
            href="/support"
            className="group flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.08] hover:shadow-[0_0_10px_rgba(71,189,121,0.1)] transition-all duration-400 ease-premium-out"
          >
            <LifebuoyIcon className="w-4 h-4 text-white/50 group-hover:text-[#47BD79] transition-colors duration-400" />
            <span className="text-white/90 text-sm">Support</span>
          </Link>
        </div>

        <div className="p-2 border-t border-white/[0.1]">
          <Link
            href="/logout"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 hover:shadow-[0_0_10px_rgba(239,68,68,0.15)] transition-all duration-400 ease-premium-out"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
