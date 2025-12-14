"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BuildingOfficeIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  CalculatorIcon,
  SparklesIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const useCases = [
  {
    icon: BuildingOfficeIcon,
    title: "Property Management",
    description: "Track occupancy, maintenance, owner statements—all in one view.",
    link: "/industries/property-management",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: HomeIcon,
    title: "Real Estate",
    description: "Forecast pipeline and benchmark against top firms.",
    link: "/industries/real-estate",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Contractors",
    description: "Spot profit leaks, predict job success, monitor costs.",
    link: "/industries/contractors",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: CalculatorIcon,
    title: "Accounting",
    description: "Compare client portfolio growth, automate compliance tracking.",
    link: "/industries/accounting",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: SparklesIcon,
    title: "Cleaning Services",
    description: "Track efficiency, invoice status, recurring client trends.",
    link: "/industries/cleaning",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    icon: HeartIcon,
    title: "Healthcare",
    description: "Monitor patient flow, service quality, revenue benchmarks.",
    link: "/industries/healthcare",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
];

export default function UseCases() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Use Cases by Industry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry IQ adapts to your specific business needs, providing tailored insights and benchmarks for your vertical.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div
                key={useCase.title}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Header */}
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-xl ${useCase.bgColor} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${useCase.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                      {useCase.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {useCase.description}
                  </p>

                  <Link
                    href={useCase.link}
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group-hover:translate-x-1 transition-all duration-300"
                  >
                    <span className="mr-2">Learn More</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't See Your Industry?
            </h3>
            <p className="text-gray-600 mb-6">
              Industry IQ is designed to adapt to any business vertical. Our AI learns your specific metrics and benchmarks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
              >
                <span className="mr-2">Contact Us</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
