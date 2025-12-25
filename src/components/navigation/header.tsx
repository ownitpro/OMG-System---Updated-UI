'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon, Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import { IndustriesDropdown } from './dropdowns/industries-dropdown';
import { AppsDropdown } from './dropdowns/apps-dropdown';
import { SolutionsDropdown } from './dropdowns/solutions-dropdown';
import { MarketingAgencyDropdown } from './dropdowns/marketing-agency-dropdown';
import { UserProfileDropdown } from './dropdowns/user-profile-dropdown';
import { Logo } from '@/components/common/logo';
import { usePageTheme } from '@/hooks/usePageTheme';

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
  const { rgb: themeRgb, hex: themeHex } = usePageTheme();

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

  // Listen for closeDropdown custom event
  useEffect(() => {
    const handleCloseDropdown = () => {
      setActiveDropdown(null);
    };

    window.addEventListener('closeDropdown', handleCloseDropdown);
    return () => {
      window.removeEventListener('closeDropdown', handleCloseDropdown);
    };
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
    },
    {
      label: 'Solutions',
      href: '/solutions',
      hasDropdown: true,
      dropdown: 'solutions',
    },
    {
      label: 'Marketing',
      href: '/marketing',
      hasDropdown: true,
      dropdown: 'marketing',
    },
    {
      label: 'Industries',
      href: '/industries',
      hasDropdown: true,
      dropdown: 'industries',
    }
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[100] py-3 lg:py-4"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full Width Layout */}
          <div className="flex items-center justify-between gap-4">

            {/* Mobile Logo (Outside glass container - only on mobile) */}
            <div className="flex-shrink-0 lg:hidden">
              <Link
                href="/"
                className="flex items-center space-x-2 group"
                onClick={() => setActiveDropdown(null)}
              >
                <div className="group-hover:scale-105 transition-transform duration-300 group-hover:drop-shadow-[0_0_12px_rgba(71,189,121,0.6)]">
                  <Logo width={120} priority variant="svg" letterColor="white" />
                </div>
              </Link>
            </div>

            {/* Desktop - Enhanced Glass Navigation Container with Logo inside - Full Width */}
            <div className="hidden lg:flex items-center w-full">
              <nav
                className="flex items-center justify-between w-full gap-1 px-6 py-2 rounded-full border transition-all duration-500 ease-out"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderColor: `rgba(${themeRgb}, 0.25)`,
                  boxShadow: `0 0 20px rgba(${themeRgb}, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)`,
                }}
              >
                {/* Logo inside nav */}
                <Link
                  href="/"
                  className="flex items-center px-2 group"
                  onClick={() => setActiveDropdown(null)}
                >
                  <div className="group-hover:scale-105 transition-transform duration-300">
                    <Logo width={110} priority variant="svg" letterColor="white" />
                  </div>
                </Link>

                {/* Divider after logo */}
                <div className="w-px h-6 bg-white/[0.15] mx-1" />

                {navigationItems.map((item) => (
                  <div key={item.label} className="relative">
                    <button
                      onClick={(e) => handleDropdownToggle(item.dropdown, e)}
                      onMouseDown={(e) => e.stopPropagation()}
                      className={`flex items-center gap-1 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-600 ease-premium-out ${
                        activeDropdown === item.dropdown
                          ? 'text-white bg-white/[0.12] shadow-[0_0_10px_rgba(71,189,121,0.2)]'
                          : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDownIcon
                        className={`w-3.5 h-3.5 transition-transform duration-400 ease-premium-out ${
                          activeDropdown === item.dropdown ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown - More opaque for readability */}
                    {activeDropdown === item.dropdown && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl border overflow-hidden z-[100] animate-fade-in-slow transition-all duration-500"
                        style={{
                          background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(15, 15, 15, 0.98) 100%)',
                          backdropFilter: 'blur(24px)',
                          WebkitBackdropFilter: 'blur(24px)',
                          borderColor: `rgba(${themeRgb}, 0.30)`,
                          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 30px rgba(${themeRgb}, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
                        }}
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

                {/* Divider */}
                <div className="w-px h-6 bg-white/[0.15] mx-1" />

                {/* Secondary Links */}
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-xl text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                >
                  Contact
                </Link>

                <Link
                  href="/about"
                  className="px-4 py-2 rounded-xl text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                >
                  About
                </Link>

                {/* Divider */}
                <div className="w-px h-6 bg-white/[0.15] mx-1" />

                {/* Login/User */}
                {user ? (
                  <UserProfileDropdown user={user} />
                ) : (
                  <Link
                    href="/login"
                    className="px-5 py-2 text-white text-[13px] font-semibold rounded-xl transition-all duration-500 active:scale-[0.98]"
                    style={{
                      backgroundColor: themeHex,
                      boxShadow: `0 2px 12px rgba(${themeRgb}, 0.4)`,
                    }}
                  >
                    Login
                  </Link>
                )}
              </nav>
            </div>

            {/* Mobile menu button - Enhanced Glass */}
            <div className="lg:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="p-2.5 rounded-full transition-all duration-500 ease-out border text-white/90 hover:text-white"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderColor: `rgba(${themeRgb}, 0.25)`,
                  boxShadow: isMobileMenuOpen
                    ? `0 0 25px rgba(${themeRgb}, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                    : `0 0 15px rgba(${themeRgb}, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                }}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-5 h-5" />
                ) : (
                  <Bars3Icon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced Glass */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 mx-4 animate-fade-in-slow">
            <div
              className="rounded-2xl border overflow-hidden transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: `rgba(${themeRgb}, 0.25)`,
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 25px rgba(${themeRgb}, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
              }}
            >
              <div className="p-4 space-y-1">
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/[0.1] rounded-xl transition-all duration-400 ease-premium-out font-medium text-sm"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="my-3 border-t border-white/[0.1]" />

                <Link
                  href="/contact"
                  className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/[0.1] rounded-xl transition-all duration-400 ease-premium-out font-medium text-sm"
                >
                  Contact
                </Link>

                <Link
                  href="/about"
                  className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/[0.1] rounded-xl transition-all duration-400 ease-premium-out font-medium text-sm"
                >
                  About
                </Link>

                <div className="my-3 border-t border-white/[0.1]" />

                {user ? (
                  <div className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
                        style={{
                          backgroundColor: themeHex,
                          boxShadow: `0 0 15px rgba(${themeRgb}, 0.4)`,
                        }}
                      >
                        <span className="text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{user.name}</p>
                        <p className="text-white/50 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block mx-2 px-4 py-3 text-white font-semibold rounded-xl text-center transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] text-sm"
                    style={{
                      backgroundColor: themeHex,
                      boxShadow: `0 4px 20px rgba(${themeRgb}, 0.4)`,
                    }}
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
        <div
          className="fixed top-24 right-4 z-50 text-white px-4 py-3 rounded-xl shadow-2xl max-w-sm animate-bounce transition-all duration-500"
          style={{
            backgroundColor: themeHex,
            boxShadow: `0 25px 50px -12px rgba(${themeRgb}, 0.3)`,
          }}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <BellIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">New here?</p>
              <p className="text-sm text-white/90">Explore our most popular demos to see OMGsystems in action!</p>
            </div>
            <button
              onClick={() => setShowWelcomeTooltip(false)}
              className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* No spacer - hero section will start from top and flow behind header */}
    </>
  );
}
