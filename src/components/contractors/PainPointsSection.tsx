"use client";

import { useState } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

const painPoints = [
  {
    pain: "Feast-or-famine jobs — one week swamped, the next slow",
    fix: "Targeted ads + high-intent landing pages feed steady qualified leads",
  },
  {
    pain: "Wasted calls with tire-kickers outside budget/scope/area",
    fix: "Smart intake scoring filters by job type, budget & location",
  },
  {
    pain: "Slow quotes lose clients",
    fix: "Templates + pricing library send branded quotes in minutes",
  },
  {
    pain: "Payment delays drain cash flow",
    fix: "Accepted quote triggers invoice + automated reminders & overdue flows",
  },
  {
    pain: "No reviews or referrals after job completion",
    fix: "Auto-requests for Google/Facebook reviews + referral prompts",
  },
  {
    pain: "No content marketing",
    fix: "Content Engine uploads, schedules & auto-posts your photos/videos (30/60/90s)",
  },
];

export default function PainPointsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Every contractor faces these challenges. We turn them into competitive advantages.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how OMGsystems transforms common contracting challenges into streamlined solutions.
          </p>
        </div>

        {/* Desktop: Tabbed interface */}
        <div className="hidden lg:block">
          <div className="flex border-b border-gray-200 mb-8">
            {painPoints.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === index
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Challenge {index + 1}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8 items-center min-h-[200px]">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600">
                  <XMarkIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Pain</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {painPoints[activeTab].pain}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                  <CheckIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Fix</h3>
                <p className="text-gray-700 font-medium text-sm leading-relaxed">
                  {painPoints[activeTab].fix}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Stacked layout */}
        <div className="lg:hidden space-y-8">
          {painPoints.map((item, index) => (
            <div key={index} className="grid grid-cols-1 gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600">
                    <XMarkIcon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Pain</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.pain}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Fix</h3>
                  <p className="text-gray-700 font-medium text-sm leading-relaxed">{item.fix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
