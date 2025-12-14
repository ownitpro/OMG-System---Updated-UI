"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { 
  ChevronDownIcon, 
  Bars3Icon, 
  XMarkIcon,
  UserIcon,
  PlayIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

interface NavDropdown {
  label: string;
  items: { 
    label: string; 
    href: string; 
    description?: string;
  }[];
}

const navDropdowns: NavDropdown[] = [
  {
    label: "Industries",
    items: [
      { 
        label: "Property Management", 
        href: "/industries/property-management",
        description: "SmartRent Flow - Automate rent, maintenance, and owner reports"
      },
      { 
        label: "Real Estate", 
        href: "/industries/real-estate",
        description: "Agent Growth Engine - Automate the busywork, close more deals"
      },
      { 
        label: "Contractors", 
        href: "/industries/contractors",
        description: "Project Growth Engine - Let automation handle the admin"
      },
      { 
        label: "Accounting", 
        href: "/industries/accounting",
        description: "Financial Workflow Engine - Automate 80% of your firm's grind"
      },
      { 
        label: "Cleaning", 
        href: "/industries/cleaning",
        description: "CleanFlow Engine - Run your company without it running you"
      },
      { 
        label: "Healthcare", 
        href: "/industries/healthcare",
        description: "CareFlow Automation - Improve patient care, strengthen efficiency"
      },
    ],
  },
  {
    label: "Apps",
    items: [
      { 
        label: "CRM", 
        href: "/apps/crm",
        description: "Customer Relationship Management"
      },
      { 
        label: "SecureVault Docs", 
        href: "/apps/securevault-docs",
        description: "Secure Document Management"
      },
      { 
        label: "LeadFlow Engine", 
        href: "/apps/leadflow-engine",
        description: "Predictable Lead Generation System"
      },
      { 
        label: "IndustryIQ", 
        href: "/apps/industry-iq",
        description: "Industry Intelligence"
      },
    ],
  },
  {
    label: "Demos",
    items: [
      { label: "CRM Demo", href: "/apps/demo/crm" },
      { label: "SecureVault Demo", href: "/apps/demo/securevault-docs" },
      { label: "LeadFlow Demo", href: "/apps/demo/leadflow" },
      { label: "Industry IQ Demo", href: "/apps/demo/industry-iq" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { 
        label: "Property Management", 
        href: "/industries/property-management",
        description: "SmartRent Flow - Automate rent, maintenance, and owner reports"
      },
      { 
        label: "Real Estate", 
        href: "/industries/real-estate",
        description: "Agent Growth Engine - Automate the busywork, close more deals"
      },
      { 
        label: "Healthcare", 
        href: "/industries/healthcare",
        description: "CareFlow Automation - Improve patient care, strengthen efficiency"
      },
      { 
        label: "Accounting", 
        href: "/industries/accounting",
        description: "Financial Workflow Engine - Automate 80% of your firm's grind"
      },
      { 
        label: "Contractors", 
        href: "/industries/contractors",
        description: "Project Growth Engine - Let automation handle the admin"
      },
      { 
        label: "Cleaning", 
        href: "/industries/cleaning",
        description: "CleanFlow Engine - Run your company without it running you"
      },
    ],
  },
];

interface NavigationProps {
  abVariant?: 'A' | 'B' | null;
  onABClick?: (element: string, destination: string) => void;
}

export function Navigation({ abVariant, onABClick }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Enhanced click outside handler with better debugging
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!navRef.current) return;
    
    const target = event.target as Node;
    if (!navRef.current.contains(target)) {
      console.log('Navigation: Clicking outside, closing dropdown');
      setOpenDropdown(null);
    }
  }, []);

  // Enhanced dropdown toggle with debugging
  const toggleDropdown = useCallback((dropdownLabel: string) => {
    console.log('Navigation: Toggling dropdown:', dropdownLabel);
    setOpenDropdown((prev) => {
      const newState = prev === dropdownLabel ? null : dropdownLabel;
      console.log('Navigation: Dropdown state changed from', prev, 'to', newState);
      return newState;
    });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isClient) return;
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isClient, handleClickOutside]);

  // Close dropdown on escape key
  useEffect(() => {
    if (!isClient) return;
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openDropdown) {
        console.log('Navigation: Escape key pressed, closing dropdown');
        setOpenDropdown(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isClient, openDropdown]);

  return (
    <nav ref={navRef} className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            OMGsystems
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navDropdowns.map((nav) => (
              <div className="relative" key={nav.label}>
                <button
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 flex items-center transition-colors duration-200 hover:bg-gray-50 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => toggleDropdown(nav.label)}
                  aria-expanded={openDropdown === nav.label}
                  aria-haspopup="true"
                  type="button"
                >
                  {nav.label}
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>
                {openDropdown === nav.label && (
                  <div 
                    className="absolute left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] animate-in slide-in-from-top-2 duration-200"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={`${nav.label.toLowerCase()}-button`}
                  >
                    <div className="py-2">
                      {nav.items.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors focus:outline-none focus:bg-gray-50"
                          onClick={() => {
                            console.log('Navigation: Link clicked:', item.href);
                            setOpenDropdown(null);
                          }}
                          role="menuitem"
                          tabIndex={0}
                        >
                          <div className="font-medium text-gray-900">{item.label}</div>
                          {item.description && (
                            <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                          )}
                        </Link>
                      ))}
                      {nav.label === "Industries" && (
                        <div className="px-4 py-3 border-t border-gray-100">
                          <Link
                            href="/book-demo"
                            className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            Book a Demo
                          </Link>
                        </div>
                      )}
                      {nav.label === "Solutions" && (
                        <div className="px-4 py-3 border-t border-gray-100">
                          <Link
                            href="/solutions"
                            className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            View All Solutions
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Additional single links */}
            <Link
              href="/case-snapshots"
              className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 transition-colors duration-200 hover:bg-gray-50 rounded-lg font-medium"
            >
              <ChartBarIcon className="h-4 w-4 mr-1" />
              Case Snapshots
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 transition-colors duration-200 hover:bg-gray-50 rounded-lg font-medium"
            >
              About Us
            </Link>
          </div>

          {/* Right side - Auth & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => signIn()}
                >
                  Login
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
            {abVariant === 'B' ? (
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link 
                  href="#how-it-works" 
                  onClick={() => onABClick?.('header-cta', 'how-it-works')}
                >
                  <PlayIcon className="h-4 w-4 mr-2" />
                  See how it works
                </Link>
              </Button>
            ) : (
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link 
                  href="/campaign/leadflow-v2" 
                  onClick={() => onABClick?.('header-cta', 'campaign-leadflow-v2')}
                >
                  Book a Demo
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1 transition-colors"
              onClick={() => {
                console.log('Navigation: Mobile menu toggled');
                setOpenDropdown((prev) => (prev ? null : "mobile"));
              }}
              aria-expanded={openDropdown === "mobile"}
              aria-label="Toggle mobile menu"
              type="button"
            >
              {openDropdown === "mobile" ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {openDropdown === "mobile" && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {navDropdowns.map((nav) => (
            <div key={nav.label} className="border-b border-gray-100">
              <button
                className="w-full text-left px-4 py-3 flex justify-between items-center text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                onClick={() => {
                  console.log('Navigation: Mobile dropdown toggled:', nav.label);
                  setOpenDropdown((prev) =>
                    prev === nav.label ? "mobile" : nav.label
                  );
                }}
                aria-expanded={openDropdown === nav.label}
                type="button"
              >
                {nav.label}
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${openDropdown === nav.label ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === nav.label && (
                <div className="bg-gray-50">
                  {nav.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <div className="font-medium">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Mobile extra links */}
          <Link
            href="/case-snapshots"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setOpenDropdown(null)}
          >
            <ChartBarIcon className="h-4 w-4 mr-2" />
            Case Snapshots
          </Link>
          <Link
            href="/about"
            className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setOpenDropdown(null)}
          >
            About Us
          </Link>

          {/* Mobile Auth & CTA */}
          <div className="pt-4 border-t border-gray-200 px-4 pb-4">
            {session ? (
              <div className="space-y-2">
                <Link href="/dashboard" className="block">
                  <Button variant="outline" className="w-full">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn()}
                >
                  Login
                </Button>
                <Button asChild className="w-full">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            )}
            {abVariant === 'B' ? (
              <Button asChild className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                <Link 
                  href="#how-it-works" 
                  onClick={() => onABClick?.('mobile-cta', 'how-it-works')}
                >
                  <PlayIcon className="h-4 w-4 mr-2" />
                  See how it works
                </Link>
              </Button>
            ) : (
              <Button asChild className="w-full mt-2 bg-blue-600 hover:bg-blue-700">
                <Link 
                  href="/campaign/leadflow-v2" 
                  onClick={() => onABClick?.('mobile-cta', 'campaign-leadflow-v2')}
                >
                  Book a Demo
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Debug Panel - Only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-[10000]">
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="bg-red-500 text-white px-2 py-1 text-xs rounded"
          >
            Debug Nav
          </button>
          {showDebug && (
            <div className="absolute bottom-8 left-0 bg-black text-white p-2 text-xs rounded max-w-xs">
              <div>Open Dropdown: {openDropdown || 'none'}</div>
              <div>Is Client: {isClient ? 'yes' : 'no'}</div>
              <div>Session Status: {status}</div>
              <div>AB Variant: {abVariant || 'none'}</div>
              <div>Nav Ref: {navRef.current ? 'attached' : 'null'}</div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
