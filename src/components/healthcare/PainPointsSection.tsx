"use client";

import { useState } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

const painPoints = [
  {
    pain: "Scheduling chaos & no-shows",
    solution: "Self-service booking, confirmations, wait-list auto-fill",
  },
  {
    pain: "Paper intake & re-entry",
    solution: "Digital forms, e-signature, OCR, direct mapping to EHR",
  },
  {
    pain: "Claim rejections & delays",
    solution: "Eligibility checks, one-click submission, denial tracking",
  },
  {
    pain: "Scattered documents",
    solution: "Unified document hub, smart tags, role access, audit logs",
  },
  {
    pain: "Medication rounds / LTC risk",
    solution: "Barcode checks, auto-dose logging, inventory alerts",
  },
  {
    pain: "Staffing gaps & overtime",
    solution: "Shift engine, auto-substitute, mobile rosters",
  },
  {
    pain: "Alerts missed or late",
    solution: "Rules engine, escalation chains, context-rich notifications",
  },
  {
    pain: "Compliance/reporting load",
    solution: "Exportable dashboards and real-time monitoring",
  },
];

export default function PainPointsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Every healthcare provider faces these challenges — we turn them into competitive advantages.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how CareFlow transforms common healthcare challenges into streamlined solutions.
          </p>
        </div>

        {/* Desktop: Tabbed interface */}
        <div className="hidden lg:block">
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
            {painPoints.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
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
                  {painPoints[activeTab].solution}
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
                  <p className="text-gray-700 font-medium text-sm leading-relaxed">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
