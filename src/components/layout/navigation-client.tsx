"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function NavigationClient() {
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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleIndustries = () => setIndustriesOpen(!industriesOpen);
  const toggleApps = () => setAppsOpen(!appsOpen);
  const toggleDemos = () => setDemosOpen(!demosOpen);
  const toggleSolutions = () => setSolutionsOpen(!solutionsOpen);

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
                onClick={toggleIndustries}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
              >
                Industries
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    industriesOpen ? "rotate-180" : ""
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
              {industriesOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Link
                      href="/industries/property-management"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Property Management
                    </Link>
                    <Link
                      href="/industries/real-estate"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Real Estate
                    </Link>
                    <Link
                      href="/industries/contractors"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Contractors
                    </Link>
                    <Link
                      href="/industries/accounting"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Accounting
                    </Link>
                    <Link
                      href="/industries/healthcare"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Healthcare
                    </Link>
                    <Link
                      href="/industries/cleaning"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cleaning
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Apps Dropdown */}
            <div className="relative" ref={appsRef}>
              <button
                onClick={toggleApps}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
              >
                Apps
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    appsOpen ? "rotate-180" : ""
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
              {appsOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Link
                      href="/apps/crm"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      CRM
                    </Link>
                    <Link
                      href="/apps/securevault"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      SecureVault
                    </Link>
                    <Link
                      href="/apps/leadflow"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      LeadFlow
                    </Link>
                    <Link
                      href="/apps/content-engine"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Content Engine
                    </Link>
                    <Link
                      href="/apps/industry-iq"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Industry IQ
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Demos Dropdown */}
            <div className="relative" ref={demosRef}>
              <button
                onClick={toggleDemos}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
              >
                Demos
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    demosOpen ? "rotate-180" : ""
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
              {demosOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Link
                      href="/demo/crm"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      CRM Demo
                    </Link>
                    <Link
                      href="/demo/securevault-docs"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      SecureVault Docs Demo
                    </Link>
                    <Link
                      href="/try-live-demo"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      All Demos
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative" ref={solutionsRef}>
              <button
                onClick={toggleSolutions}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
              >
                Solutions
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    solutionsOpen ? "rotate-180" : ""
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
              {solutionsOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Link
                      href="/case-snapshots"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Case Studies
                    </Link>
                    <Link
                      href="/tools/roi-calculator"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      ROI Calculator
                    </Link>
                    <Link
                      href="/resources"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Resources
                    </Link>
                    <Link
                      href="/pricing"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
              onClick={toggleMobileMenu}
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
                onClick={toggleIndustries}
                className="block w-full text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
              >
                Industries
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    industriesOpen ? "rotate-180" : ""
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
              {industriesOpen && (
                <div className="pl-5 pr-3 py-1 space-y-1">
                  <Link
                    href="/industries/property-management"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Property Management
                  </Link>
                  <Link
                    href="/industries/real-estate"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Real Estate
                  </Link>
                  <Link
                    href="/industries/contractors"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Contractors
                  </Link>
                  <Link
                    href="/industries/accounting"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Accounting
                  </Link>
                  <Link
                    href="/industries/healthcare"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Healthcare
                  </Link>
                  <Link
                    href="/industries/cleaning"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Cleaning
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Apps Dropdown */}
            <div className="relative">
              <button
                onClick={toggleApps}
                className="block w-full text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
              >
                Apps
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    appsOpen ? "rotate-180" : ""
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
              {appsOpen && (
                <div className="pl-5 pr-3 py-1 space-y-1">
                  <Link
                    href="/apps/crm"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    CRM
                  </Link>
                  <Link
                    href="/apps/securevault"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    SecureVault
                  </Link>
                  <Link
                    href="/apps/leadflow"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    LeadFlow
                  </Link>
                  <Link
                    href="/apps/content-engine"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Content Engine
                  </Link>
                  <Link
                    href="/apps/industry-iq"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Industry IQ
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Demos Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDemos}
                className="block w-full text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
              >
                Demos
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    demosOpen ? "rotate-180" : ""
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
              {demosOpen && (
                <div className="pl-5 pr-3 py-1 space-y-1">
                  <Link
                    href="/demo/crm"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    CRM Demo
                  </Link>
                  <Link
                    href="/demo/securevault-docs"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    SecureVault Docs Demo
                  </Link>
                  <Link
                    href="/try-live-demo"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    All Demos
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={toggleSolutions}
                className="block w-full text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
              >
                Solutions
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    solutionsOpen ? "rotate-180" : ""
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
              {solutionsOpen && (
                <div className="pl-5 pr-3 py-1 space-y-1">
                  <Link
                    href="/case-snapshots"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="/tools/roi-calculator"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    ROI Calculator
                  </Link>
                  <Link
                    href="/resources"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Resources
                  </Link>
                  <Link
                    href="/pricing"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Pricing
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Contact
            </Link>
            <Link
              href="/demo/crm"
              className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 mt-4"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
