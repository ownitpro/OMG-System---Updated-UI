"use client";

import {
  HomeIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const segments = [
  {
    icon: HomeIcon,
    title: "Home Renovation / Remodeling",
    description: "Kitchen, bath, basement conversions",
    benefit: "Project-driven quoting & phased payments",
    link: "/industries/contractors/home-renovation",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: PaintBrushIcon,
    title: "Painting / Flooring / Finishing Trades",
    description: "Fast quoting by room/sq-ft",
    benefit: "Recurring scheduling & upsells",
    link: "/industries/contractors/finishing-trades",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "HVAC / Electric / Plumbing",
    description: "Service + installation jobs",
    benefit: "Change orders & parts tracking",
    link: "/industries/contractors/hvac-electric-plumbing",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: BuildingOfficeIcon,
    title: "General Contractor / GC",
    description: "Managing subcontractors",
    benefit: "Multi-phase projects, site updates & client portal",
    link: "/industries/contractors/general-contractor",
    color: "bg-orange-50 text-orange-600",
  },
];

export default function ContractorSegments() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Built for Ontario Contractors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored solutions for every type of contracting business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-full ${segment.color} mb-4`}>
                <segment.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {segment.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {segment.description}
              </p>
              <p className="text-gray-500 text-xs mb-4">
                {segment.benefit}
              </p>
              <Link
                href={segment.link}
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
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
