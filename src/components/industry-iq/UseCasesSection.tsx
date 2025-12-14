"use client";

import { BuildingOfficeIcon, HomeIcon, WrenchScrewdriverIcon, CalculatorIcon, SparklesIcon, HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const useCases = [
  {
    icon: BuildingOfficeIcon,
    title: "Property Management",
    description: "Track occupancy, maintenance costs and owner statements in one dashboard.",
    link: "/industries/property-management",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: HomeIcon,
    title: "Real Estate",
    description: "Forecast sales pipeline and benchmark against top firms.",
    link: "/industries/real-estate",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Contractors",
    description: "Spot profit leaks, monitor job costs and predict success.",
    link: "/industries/contractors",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: CalculatorIcon,
    title: "Accounting",
    description: "Compare client portfolio growth and automate compliance tracking.",
    link: "/industries/accounting",
    color: "text-lime-600",
    bgColor: "bg-lime-50",
  },
  {
    icon: SparklesIcon,
    title: "Cleaning Services",
    description: "Track efficiency, invoice status and recurring client trends.",
    link: "/industries/cleaning",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: HeartIcon,
    title: "Healthcare",
    description: "Monitor patient flow, service quality and revenue benchmarks.",
    link: "/industries/healthcare",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
];

export default function UseCasesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Use Cases by Industry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry IQ adapts to your specific vertical with tailored insights and benchmarks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${useCase.bgColor} mr-4`}>
                  <useCase.icon className={`h-6 w-6 ${useCase.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{useCase.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{useCase.description}</p>
              <Link
                href={useCase.link}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Learn More
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
