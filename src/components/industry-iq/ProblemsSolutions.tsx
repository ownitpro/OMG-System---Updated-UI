"use client";

import { useState } from "react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const problemsSolutions = [
  {
    problem: "Unsure how you compare with competitors",
    solution: "Benchmarking lets you track and outpace competitors",
  },
  {
    problem: "Reports take hours to build and still miss key trends",
    solution: "Automation saves time, delivers insights instantly",
  },
  {
    problem: "Always reacting instead of predicting",
    solution: "Forecasting shifts you from reactive to proactive",
  },
  {
    problem: "Data is scattered and hard to collect",
    solution: "Unified dashboard: everything in one source of truth",
  },
];

export default function ProblemsSolutions() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            What Frustrates You? — We've Heard This Before
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop struggling with scattered data and reactive decision-making. See how Industry IQ transforms your business intelligence.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-2">
              {/* Problems Column */}
              <div className="bg-gray-50 p-8">
                <div className="flex items-center mb-6">
                  <ExclamationTriangleIcon className="w-8 h-8 text-red-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Common Problems</h3>
                </div>
                <div className="space-y-6">
                  {problemsSolutions.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 transition-all duration-300 cursor-pointer ${
                        activeIndex === index
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-red-300 hover:bg-red-25"
                      }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <p className="text-gray-700 font-medium">{item.problem}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions Column */}
              <div className="bg-emerald-50 p-8">
                <div className="flex items-center mb-6">
                  <CheckCircleIcon className="w-8 h-8 text-emerald-500 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">How Industry IQ Helps</h3>
                </div>
                <div className="space-y-6">
                  {problemsSolutions.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
                        activeIndex === index
                          ? "border-emerald-500 bg-emerald-100"
                          : "border-emerald-200"
                      }`}
                    >
                      <p className="text-gray-700 font-medium">{item.solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stacked View */}
        <div className="lg:hidden space-y-6">
          {problemsSolutions.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Problem</h4>
                  <p className="text-gray-600 mb-4">{item.problem}</p>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                      <p className="text-gray-600">{item.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business Intelligence?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of businesses already using Industry IQ to make data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200">
                Start Free Trial
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200">
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
