"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function NavigationWithDropdowns() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [demosOpen, setDemosOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const industriesRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);
  const demosRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (industriesRef.current && !industriesRef.current.contains(event.target as Node)) {
        setIndustriesOpen(false);
      }
      if (appsRef.current && !appsRef.current.contains(event.target as Node)) {
        setAppsOpen(false);
      }
      if (demosRef.current && !demosRef.current.contains(event.target as Node)) {
        setDemosOpen(false);
      }
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              OMGsystems
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Industries Dropdown */}
            <div className="relative" ref={industriesRef}>
              <button
                onClick={() => setIndustriesOpen(!industriesOpen)}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
              >
                Industries
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {industriesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <Link href="/industries/property-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Property Management
                  </Link>
                  <Link href="/industries/real-estate" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Real Estate
                  </Link>
                  <Link href="/industries/contractors" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Contractors
                  </Link>
                  <Link href="/industries/accounting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Accounting
                  </Link>
                  <Link href="/industries/healthcare" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Healthcare
                  </Link>
                  <Link href="/industries/cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Cleaning
                  </Link>
                </div>
              )}
            </div>

            {/* Apps Dropdown */}
            <div className="relative" ref={appsRef}>
              <button
                onClick={() => setAppsOpen(!appsOpen)}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
              >
                Apps
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {appsOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <Link href="/apps/crm" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    CRM
                  </Link>
                  <Link href="/apps/securevault" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    SecureVault
                  </Link>
                  <Link href="/apps/leadflow" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    LeadFlow
                  </Link>
                  <Link href="/apps/content-engine" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Content Engine
                  </Link>
                  <Link href="/apps/industry-iq" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Industry IQ
                  </Link>
                </div>
              )}
            </div>

            {/* Demos Dropdown */}
            <div className="relative" ref={demosRef}>
              <button
                onClick={() => setDemosOpen(!demosOpen)}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
              >
                Demos
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {demosOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <Link href="/demo/crm" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    CRM Demo
                  </Link>
                  <Link href="/demo/securevault-docs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    SecureVault Docs Demo
                  </Link>
                  <Link href="/apps/demo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    All Demos
                  </Link>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative" ref={solutionsRef}>
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
              >
                Solutions
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <Link href="/case-snapshots" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Case Studies
                  </Link>
                  <Link href="/roi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    ROI Calculator
                  </Link>
                  <Link href="/resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Resources
                  </Link>
                  <Link href="/pricing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Pricing
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Contact
            </Link>
            
            {/* CTA Button */}
            <Link href="/demo/crm" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Book a Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link href="/industries" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Industries
              </Link>
              <Link href="/apps" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Apps
              </Link>
              <Link href="/try-live-demo" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Demos
              </Link>
              <Link href="/solutions" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Solutions
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900">
                Contact
              </Link>
              <Link href="/demo/crm" className="block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Book a Demo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
