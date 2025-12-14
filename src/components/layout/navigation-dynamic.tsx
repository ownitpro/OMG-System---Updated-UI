"use client";

import dynamic from 'next/dynamic';

const NavigationClient = dynamic(() => import('./navigation-client'), {
  ssr: false,
  loading: () => (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-gray-900">OMGsystems</div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <div className="text-gray-700 px-3 py-2 text-sm font-medium">Industries</div>
            <div className="text-gray-700 px-3 py-2 text-sm font-medium">Apps</div>
            <div className="text-gray-700 px-3 py-2 text-sm font-medium">Demos</div>
            <div className="text-gray-700 px-3 py-2 text-sm font-medium">Solutions</div>
            <div className="text-gray-700 px-3 py-2 text-sm font-medium">About Us</div>
            <div className="text-gray-700 px-3 py-2 text-sm font-medium">Contact</div>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">Book a Demo</div>
          </div>
        </div>
      </div>
    </nav>
  )
});

export default function NavigationDynamic() {
  return <NavigationClient />;
}
