"use client";

import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const problems = [
  "You're unsure how you compare with competitors.",
  "Reports take hours to build and still miss key trends.",
  "Your team reacts to changes instead of predicting them.",
  "Data is scattered and hard to put together.",
];

const solutions = [
  "Benchmarking lets you track progress and out-pace competitors.",
  "Automation saves time and delivers insights instantly.",
  "Forecasting turns you from reactive to proactive.",
  "All your data combined—one reliable source of truth.",
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
            We understand your challenges and provide the solutions you need
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Problems */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Frustrations</h3>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-emerald-700 mb-6">How Industry IQ Solves Them</h3>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700 font-medium">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
