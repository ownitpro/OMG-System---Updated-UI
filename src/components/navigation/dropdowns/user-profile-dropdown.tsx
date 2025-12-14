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
      <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors duration-300">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-gray-900 font-medium text-sm">{user.name}</p>
          <p className="text-gray-600 text-xs">{user.email}</p>
        </div>
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl border border-gray-200/50 shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <p className="text-gray-900 font-semibold">{user.name}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </div>
        </div>
        
        <div className="p-2">
          <Link
            href="/account"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-50/50 transition-colors duration-300"
          >
            <UserIcon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800">Account</span>
          </Link>
          
          <Link
            href="/settings"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-50/50 transition-colors duration-300"
          >
            <CogIcon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800">Settings</span>
          </Link>
          
          <Link
            href="/billing"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-50/50 transition-colors duration-300"
          >
            <CreditCardIcon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800">Billing</span>
          </Link>
          
          <Link
            href="/notifications"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-50/50 transition-colors duration-300"
          >
            <BellIcon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800">Notifications</span>
          </Link>
          
          <Link
            href="/support"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-50/50 transition-colors duration-300"
          >
            <LifebuoyIcon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800">Support</span>
          </Link>
        </div>
        
        <div className="p-2 border-t border-gray-200/50">
          <Link
            href="/logout"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-50/50 transition-colors duration-300"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 text-red-500" />
            <span className="text-red-500">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
