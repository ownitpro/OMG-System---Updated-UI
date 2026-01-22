'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAccountAccess } from '@/hooks/useAccountAccess';
import { ChevronDown, Bell, Sun, Moon, Menu, X, Download } from 'lucide-react';
import NotificationBell from '@/components/notifications/NotificationBell';

export function AppTopNav() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { activeOrg, setActiveOrg, organizations, isPersonalVault } = useOrganization();
  const { isDarkMode, isLoaded, toggleDarkMode } = useTheme();
  const { canAccessClientPortal } = useAccountAccess();
  const [showOrgDropdown, setShowOrgDropdown] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Wait for theme to load to prevent hydration mismatch
  if (!isLoaded) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white h-24">
        <div className="w-full bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between h-24">
              {/* Placeholder while loading */}
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Navigation items - filter based on account type
  const allNavItems = [
    { href: '/dashboard', label: 'Dashboard', requiresBusinessAccount: false },
    { href: '/documents', label: 'Documents', requiresBusinessAccount: false },
    { href: '/portals', label: 'Portals', requiresBusinessAccount: true },
    { href: '/settings', label: 'Settings', requiresBusinessAccount: false },
  ];

  // Filter out Portals for personal accounts
  const navItems = allNavItems.filter(item =>
    !item.requiresBusinessAccount || canAccessClientPortal
  );

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const handleOrgSwitch = (orgId: string, orgName: string, type: 'personal' | 'business') => {
    setActiveOrg({ id: orgId, name: orgName, type });
    setShowOrgDropdown(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 bg-transparent pt-4"
    >
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center py-2">
            <img
              src="/logo-dark.png"
              alt="SecureVault Docs"
              className="h-20 transition-all duration-500"
            />
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
            <div className="nav-container-premium px-2 py-1 flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-5 py-2 text-sm font-medium tracking-tight rounded-full transition-all duration-300 relative ${
                      active
                        ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg shadow-teal-500/25 font-semibold'
                        : 'text-white dark:text-cream-mid hover:text-teal-100 dark:hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>



          {/* Right side: Theme Toggle + Download + Notifications + Org Switcher + Sign Out */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`relative p-2 min-w-[44px] min-h-[44px] flex items-center justify-center ${isDarkMode ? 'text-yellow-400 hover:bg-slate-700' : 'text-white hover:bg-white/10'} rounded-lg transition-all duration-300`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="relative w-5 h-5">
                <Sun className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                <Moon className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
              </div>
            </button>

            {/* Download App Button - hide on settings pages */}
            {!pathname?.startsWith('/settings') && (
              <Link
                href="/download"
                className={`hidden md:flex items-center gap-2 px-3 py-2 min-h-[44px] text-sm font-medium rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-blue-400 hover:bg-slate-700 border border-slate-600'
                    : 'text-white hover:bg-white/10 border border-white/30'
                }`}
              >
                <Download className="h-4 w-4" />
                <span className="hidden lg:inline">Get App</span>
              </Link>
            )}

            {/* Notifications Bell - hidden on mobile, shown in mobile menu */}
            <div className="hidden md:block">
              <NotificationBell />
            </div>

            {/* Organization Switcher - Only show for business accounts with organizations */}
            {canAccessClientPortal && organizations.length > 0 && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                  className={`flex items-center gap-2 px-3 py-2 min-h-[44px] text-sm ${isDarkMode ? 'text-slate-200 hover:bg-slate-700 border-slate-600' : 'text-white hover:bg-white/10 border-white/30'} rounded-lg border transition-colors`}
                >
                  <span className="font-medium">
                    {activeOrg?.name || organizations[0]?.name || 'Organization'}
                  </span>
                  {organizations.length > 1 && <ChevronDown className="h-4 w-4" />}
                </button>

                {showOrgDropdown && organizations.length > 1 && (
                  <div className={`absolute right-0 mt-2 w-56 ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'} rounded-lg shadow-2xl border py-1`}>
                    <div className={`px-3 py-1.5 text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-gray-500'} uppercase tracking-wider`}>
                      Organizations
                    </div>
                    {organizations.map((org) => (
                      <button
                        key={org.id}
                        onClick={() => handleOrgSwitch(org.id, org.name, 'business')}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          activeOrg?.id === org.id
                            ? 'bg-cyan-500/20 text-cyan-400 font-medium'
                            : isDarkMode
                              ? 'text-white hover:bg-slate-700/50'
                              : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {org.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sign Out - hidden on mobile, shown in mobile menu */}
            <button
              onClick={() => signOut()}
              className="hidden md:flex items-center justify-center px-6 py-2 min-h-[44px] text-sm font-bold tracking-tight rounded-full btn-premium-primary hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5"
            >
              Sign out
            </button>



            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center ${isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg transition-colors`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Only render on mobile when menu is open */}
      {isMobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Menu Drawer */}
          <div
            className={`md:hidden fixed top-0 right-0 z-[70] h-full w-80 max-w-[85vw] ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} border-l shadow-2xl`}
          >
        {/* Mobile Menu Header */}
        <div className={`flex items-center justify-between px-4 py-4 border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
          <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center ${isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg transition-colors`}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex flex-col h-[calc(100%-73px)] overflow-y-auto">
          {/* Navigation Links */}
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 min-h-[48px] flex items-center text-base font-medium rounded-lg transition-colors ${
                    active
                      ? isDarkMode
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-blue-50 text-blue-600'
                      : isDarkMode
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className={`border-t mx-4 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`} />

          {/* Organization Switcher in Mobile - Only show for business accounts with multiple organizations */}
          {canAccessClientPortal && organizations.length > 1 && (
            <div className="p-4">
              <p className={`text-xs font-semibold uppercase tracking-wider mb-2 px-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Organizations
              </p>
              {organizations.map((org) => (
                <button
                  key={org.id}
                  onClick={() => {
                    handleOrgSwitch(org.id, org.name, 'business');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 min-h-[48px] flex items-center text-base rounded-lg transition-colors ${
                    activeOrg?.id === org.id
                      ? isDarkMode
                        ? 'bg-cyan-500/20 text-cyan-400 font-medium'
                        : 'bg-cyan-50 text-cyan-600 font-medium'
                      : isDarkMode
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {org.name}
                </button>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className={`border-t mx-4 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`} />

          {/* Notifications in Mobile */}
          <div className="p-4">
            <div className="flex items-center justify-between px-4 py-3">
              <span className={`flex items-center gap-3 text-base ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                <Bell className="h-5 w-5" />
                Notifications
              </span>
              <NotificationBell />
            </div>
          </div>

          {/* Download App - hide on settings pages */}
          {!pathname?.startsWith('/settings') && (
            <>
              <div className={`border-t mx-4 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`} />
              <div className="p-4">
                <Link
                  href="/download"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 min-h-[48px] text-base font-medium rounded-lg transition-colors ${
                    isDarkMode
                      ? 'text-blue-400 hover:bg-slate-800'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Download className="h-5 w-5" />
                  Download App
                </Link>
              </div>
            </>
          )}

          {/* Sign Out at Bottom */}
          <div className={`mt-auto p-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <button
              onClick={() => {
                signOut();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 min-h-[48px] text-base font-medium rounded-lg transition-colors ${isDarkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'}`}
            >
              Sign out
            </button>
          </div>
        </div>
        </div>
        </>
      )}
    </header>
  );
}
