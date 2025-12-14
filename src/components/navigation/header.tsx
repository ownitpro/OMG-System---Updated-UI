'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon, Bars3Icon, XMarkIcon, UserIcon, BellIcon } from '@heroicons/react/24/outline';
import { IndustriesDropdown } from './dropdowns/industries-dropdown';
import { AppsDropdown } from './dropdowns/apps-dropdown';
import { SolutionsDropdown } from './dropdowns/solutions-dropdown';
import { MarketingAgencyDropdown } from './dropdowns/marketing-agency-dropdown';
import { UserProfileDropdown } from './dropdowns/user-profile-dropdown';
import { Logo } from '@/components/common/logo';

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

export function Header({ user }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle welcome tooltip for new users
  useEffect(() => {
    const hasVisited = localStorage.getItem('omgsystems-visited');
    if (!hasVisited && !user) {
      const timer = setTimeout(() => {
        setShowWelcomeTooltip(true);
        localStorage.setItem('omgsystems-visited', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeDropdown]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Listen for closeDropdown custom event and route changes
  useEffect(() => {
    const handleCloseDropdown = () => {
      setActiveDropdown(null);
    };
    
    // Close on navigation
    const handleRouteChange = () => {
      setActiveDropdown(null);
    };
    
    window.addEventListener('closeDropdown', handleCloseDropdown);
    // Close dropdown when route changes
    const unsubscribe = () => {
      window.removeEventListener('closeDropdown', handleCloseDropdown);
    };
    
    return unsubscribe;
  }, []);

  const handleDropdownToggle = (dropdown: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const navigationItems = [
    {
      label: 'Apps',
      href: '/apps',
      hasDropdown: true,
      dropdown: 'apps',
      description: 'Powerful tools for your business'
    },
    {
      label: 'Solutions',
      href: '/solutions',
      hasDropdown: true,
      dropdown: 'solutions',
      description: 'See how automation and AI transform your business'
    },
    {
      label: 'Marketing Agency',
      href: '/marketing',
      hasDropdown: true,
      dropdown: 'marketing',
      description: 'Done-for-you marketing services'
    },
    {
      label: 'Industry Focused',
      href: '/industries',
      hasDropdown: true,
      dropdown: 'industries',
      description: 'Solutions tailored for your industry'
    }
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center space-x-3 group"
                onClick={() => setActiveDropdown(null)}
              >
                <div className="group-hover:scale-105 transition-transform duration-300">
                  <Logo width={120} priority variant="png" />
                </div>
                <span className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 whitespace-nowrap" style={{ letterSpacing: '-0.05em' }}>
                  OMGSystems
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    onClick={(e) => handleDropdownToggle(item.dropdown, e)}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative z-10 ${
                      activeDropdown === item.dropdown
                        ? 'text-blue-600 bg-blue-50 shadow-md'
                        : 'text-gray-800 hover:text-blue-600 hover:bg-blue-50/50 hover:shadow-sm'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.dropdown ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Content */}
                  {activeDropdown === item.dropdown && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl border border-gray-200/50 shadow-2xl overflow-hidden z-[100] pointer-events-auto"
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      {item.dropdown === 'apps' && <AppsDropdown />}
                      {item.dropdown === 'solutions' && <SolutionsDropdown />}
                      {item.dropdown === 'marketing' && <MarketingAgencyDropdown />}
                      {item.dropdown === 'industries' && <IndustriesDropdown />}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/contact"
                className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-medium hover:shadow-sm px-3 py-2 rounded-lg hover:bg-blue-50/50"
              >
                Contact Us
              </Link>
              
              <Link
                href="/about"
                className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-medium hover:shadow-sm px-3 py-2 rounded-lg hover:bg-blue-50/50"
              >
                About Us
              </Link>
              
              {user ? (
                <UserProfileDropdown user={user} />
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50/50 transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors duration-300 font-medium"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200/50 space-y-3">
                <Link
                  href="/contact"
                  className="block px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors duration-300 font-medium"
                >
                  Contact Us
                </Link>
                
                <Link
                  href="/about"
                  className="block px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors duration-300 font-medium"
                >
                  About Us
                </Link>
                
                {user ? (
                  <div className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">{user.name}</p>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Welcome Tooltip for New Users */}
      {showWelcomeTooltip && !user && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg max-w-sm animate-bounce">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <BellIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">New here?</p>
              <p className="text-sm">Explore our most popular demos to see OMGsystems in action!</p>
            </div>
            <button
              onClick={() => setShowWelcomeTooltip(false)}
              className="flex-shrink-0 text-emerald-200 hover:text-white"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
