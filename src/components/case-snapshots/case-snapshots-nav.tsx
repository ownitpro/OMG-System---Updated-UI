"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export function CaseSnapshotsNav() {
  const [isOpen, setIsOpen] = useState(false);

  const industries = [
    { id: "property-management", name: "Property Management", count: 3 },
    { id: "real-estate", name: "Real Estate", count: 2 },
    { id: "accounting", name: "Accounting", count: 2 },
    { id: "contractors", name: "Contractors", count: 2 },
    { id: "cleaning", name: "Cleaning", count: 1 },
    { id: "healthcare", name: "Healthcare", count: 1 },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-3 py-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <ChartBarIcon className="h-5 w-5" />
        <span className="font-medium">Case Snapshots</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Success Stories by Industry</h3>
            <div className="space-y-2">
              {industries.map((industry) => (
                <Link
                  key={industry.id}
                  href={`/case-snapshots?industry=${industry.id}`}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-sm text-gray-700">{industry.name}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {industry.count}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/case-snapshots"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                View All Case Snapshots
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
