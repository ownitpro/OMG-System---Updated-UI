"use client";

import {
  BuildingOfficeIcon,
  HomeModernIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const useCases = [
  {
    icon: BuildingOfficeIcon,
    title: "Residential Portfolios",
    description: "Manage hundreds of units: tenant intake, occupancy forecasting, maintenance automation.",
    link: "/industries/property-management/residential",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: BuildingStorefrontIcon,
    title: "Commercial & Mixed-Use",
    description: "Track leases, vendor assignments, CAM recoveries, full financials.",
    link: "/industries/property-management/commercial",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: HomeModernIcon,
    title: "Single-Family & HOAs",
    description: "Self-service owner portals, automated maintenance, easy statements.",
    link: "/industries/property-management/single-family",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function UseCasesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Use Cases by Segment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored solutions for different property management needs and scales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-full ${useCase.color} mb-4`}>
                <useCase.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {useCase.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{useCase.description}</p>
              <Link
                href={useCase.link}
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
              >
                Learn More
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
