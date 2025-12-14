"use client";

import Link from "next/link";

export default function NavigationMinimal() {
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
            <Link href="/industries" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Industries
            </Link>
            <Link href="/apps" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Apps
            </Link>
            <Link href="/demos" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Demos
            </Link>
            <Link href="/solutions" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Solutions
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Pricing
            </Link>
            <Link href="/case-snapshots" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Case Studies
            </Link>
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
            <button className="text-gray-700 hover:text-gray-900 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
