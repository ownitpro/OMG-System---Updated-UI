"use client";

import { useState } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

const problemsSolutions = [
  {
    problem: "Constant rescheduling chaos (staff call in sick, clients reschedule, routes disrupted)",
    solution: "Smart scheduling that syncs staff calendars & client preferences",
  },
  {
    problem: "Missed updates & miscommunication (clients don't know if cleaning happened, staff forget/report wrong)",
    solution: "Automated job notifications + status dashboards",
  },
  {
    problem: "Delayed payments (invoices lost, clients forget to pay, chasing takes hours)",
    solution: "Auto-invoicing + reminders tied to job completion",
  },
  {
    problem: "No clear client reporting (clients can't see what was cleaned, when, or if issues)",
    solution: "Real-time client portal with pictures & status updates",
  },
  {
    problem: "Poor review capture (great work goes unnoticed – no social proof)",
    solution: "Auto follow-up + review request post-job",
  },
  {
    problem: "Tool overload (spreadsheets, texts, multiple systems)",
    solution: "One unified system — no juggling spreadsheets or texts",
  },
];

export default function ProblemsSolutionsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Scheduling, communication, payments, and reviews — automated.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how OMGsystems transforms common cleaning business challenges into streamlined solutions.
          </p>
        </div>

        {/* Desktop: Tabbed interface */}
        <div className="hidden lg:block">
          <div className="flex border-b border-gray-200 mb-8">
            {problemsSolutions.map((item, index) => (
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">Common Issue</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {problemsSolutions[activeTab].problem}
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
                  {problemsSolutions[activeTab].solution}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Stacked layout */}
        <div className="lg:hidden space-y-8">
          {problemsSolutions.map((item, index) => (
            <div key={index} className="grid grid-cols-1 gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600">
                    <XMarkIcon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Common Issue</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.problem}</p>
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
