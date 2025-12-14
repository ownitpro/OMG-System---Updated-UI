"use client";

import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const problemsSolutions = [
  {
    problem: "Leads lost in spreadsheets",
    solution: "Everything captured automatically in one platform.",
  },
  {
    problem: "Slow follow-up—clients vanish",
    solution: "Automated routing & reminders trigger instantly.",
  },
  {
    problem: "Multiple systems = wasted time",
    solution: "One system covers CRM, docs & workflows.",
  },
  {
    problem: "No visibility into sales",
    solution: "Real-time tracking from lead to close.",
  },
  {
    problem: "Manual data-entry errors",
    solution: "Smart automation reduces errors by up to 90%.",
  },
];

export default function ProblemsSolutionsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stop Losing Business to These Common Problems
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our CRM solves the challenges that hold businesses back
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-200 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Problems Column */}
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Common Problems</h3>
                </div>
                {problemsSolutions.map((item, index) => (
                  <div key={index} className="bg-white/60 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 font-medium">{item.problem}</p>
                  </div>
                ))}
              </div>

              {/* Solutions Column */}
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Our Solution</h3>
                </div>
                {problemsSolutions.map((item, index) => (
                  <div key={index} className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <p className="text-emerald-800 font-medium">{item.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-blue-50 border border-blue-200 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-blue-700 font-medium">
              Ready to solve these problems? Try our CRM today
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
