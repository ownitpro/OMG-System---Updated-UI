"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function NavigationSimpleWorking() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

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
          <div className="hidden md:flex md:items-center md:space-x-6" ref={dropdownRef}>
            {/* Industries Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('industries')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
              >
                Industries
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    activeDropdown === 'industries' ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === 'industries' && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Link
                      href="/industries/property-management"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Property Management
                    </Link>
                    <Link
                      href="/industries/real-estate"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Real Estate
                    </Link>
                    <Link
                      href="/industries/contractors"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Contractors
                    </Link>
                    <Link
                      href="/industries/accounting"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Accounting
                    </Link>
                    <Link
                      href="/industries/healthcare"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Healthcare
                    </Link>
                    <Link
                      href="/industries/cleaning"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Cleaning
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Apps Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('apps')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
              >
                Apps
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    activeDropdown === 'apps' ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === 'apps' && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Link
                      href="/apps/crm"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      CRM
                    </Link>
                    <Link
                      href="/apps/securevault"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      SecureVault
                    </Link>
                    <Link
                      href="/apps/leadflow"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      LeadFlow
                    </Link>
                    <Link
                      href="/apps/content-engine"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Content Engine
                    </Link>
                    <Link
                      href="/apps/industry-iq"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Industry IQ
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Demos Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('demos')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
              >
                Demos
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    activeDropdown === 'demos' ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === 'demos' && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Link
                      href="/demo/crm"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      CRM Demo
                    </Link>
                    <Link
                      href="/demo/securevault-docs"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      SecureVault Docs Demo
                    </Link>
                    <Link
                      href="/try-live-demo"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      All Demos
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('solutions')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
              >
                Solutions
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    activeDropdown === 'solutions' ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === 'solutions' && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Link
                      href="/case-snapshots"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Case Studies
                    </Link>
                    <Link
                      href="/tools/roi-calculator"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      ROI Calculator
                    </Link>
                    <Link
                      href="/resources"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Resources
                    </Link>
                    <Link
                      href="/pricing"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Pricing
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Contact
            </Link>

            {/* CTA Button */}
            <Link
              href="/demo/crm"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile Industries Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('mobile-industries')}
                className="block w-full text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
              >
                Industries
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    activeDropdown === 'mobile-industries' ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === 'mobile-industries' && (
                <div className="pl-5 pr-3 py-1 space-y-1">
                  <Link
                    href="/industries/property-management"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Property Management
                  </Link>
                  <Link
                    href="/industries/real-estate"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Real Estate
                  </Link>
                  <Link
                    href="/industries/contractors"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Contractors
                  </Link>
                  <Link
                    href="/industries/accounting"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Accounting
                  </Link>
                  <Link
                    href="/industries/healthcare"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Healthcare
                  </Link>
                  <Link
                    href="/industries/cleaning"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Cleaning
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Apps Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('mobile-apps')}
                className="block w-full text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
              >
                Apps
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    activeDropdown === 'mobile-apps' ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === 'mobile-apps' && (
                <div className="pl-5 pr-3 py-1 space-y-1">
                  <Link
                    href="/apps/crm"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    CRM
                  </Link>
                  <Link
                    href="/apps/securevault"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    SecureVault
                  </Link>
                  <Link
                    href="/apps/leadflow"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    LeadFlow
                  </Link>
                  <Link
                    href="/apps/content-engine"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Content Engine
                  </Link>
                  <Link
                    href="/apps/industry-iq"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Industry IQ
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Demos Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('mobile-demos')}
                className="block w-full text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
              >
                Demos
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    activeDropdown === 'mobile-demos' ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === 'mobile-demos' && (
                <div className="pl-5 pr-3 py-1 space-y-1">
                  <Link
                    href="/demo/crm"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    CRM Demo
                  </Link>
                  <Link
                    href="/demo/securevault-docs"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    SecureVault Docs Demo
                  </Link>
                  <Link
                    href="/try-live-demo"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    All Demos
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('mobile-solutions')}
                className="block w-full text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
              >
                Solutions
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    activeDropdown === 'mobile-solutions' ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === 'mobile-solutions' && (
                <div className="pl-5 pr-3 py-1 space-y-1">
                  <Link
                    href="/case-snapshots"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="/tools/roi-calculator"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    ROI Calculator
                  </Link>
                  <Link
                    href="/resources"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Resources
                  </Link>
                  <Link
                    href="/pricing"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={closeMobileMenu}
                  >
                    Pricing
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            <Link
              href="/demo/crm"
              className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 mt-4"
              onClick={closeMobileMenu}
            >
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
