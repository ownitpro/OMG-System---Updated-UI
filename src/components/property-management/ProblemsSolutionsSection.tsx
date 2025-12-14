"use client";

import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

const problemsSolutions = [
  {
    problem: "Your team juggles spreadsheets, emails, paper files",
    solution: "One platform replaces spreadsheets—everything in one place",
  },
  {
    problem: "Owner communication is manual; accountability is weak",
    solution: "Owner statements auto-generated and sent—fewer errors, faster payouts",
  },
  {
    problem: "Maintenance tickets are reactive; tracking is hard",
    solution: "Workflow builder auto-routes tickets, assigns vendors, notifies all",
  },
  {
    problem: "Data is fragmented—no unified view of performance",
    solution: "Unified dashboard gives you real-time insight and control",
  },
];

export default function ProblemsSolutionsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Problems & Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how OMGsystems transforms common property management challenges into streamlined solutions.
          </p>
        </div>

        <div className="space-y-8">
          {problemsSolutions.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Problem Side */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600">
                    <XMarkIcon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Problem
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.problem}
                  </p>
                </div>
              </div>

              {/* Solution Side */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    OMGsystems Solution
                  </h3>
                  <p className="text-gray-700 font-medium text-sm leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
