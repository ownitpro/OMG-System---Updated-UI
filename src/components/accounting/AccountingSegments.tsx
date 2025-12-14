"use client";

import {
  UserIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const segments = [
  {
    icon: UserIcon,
    title: "Solo/Small Firms",
    description: "Streamline client onboarding & doc collection, automate routine tasks, professional client experience with minimal overhead",
    link: "/industries/accounting/solo-practitioners",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: BuildingOfficeIcon,
    title: "Multi-partner Practices",
    description: "Standardise workflows across partners, centralise docs & client communication, workload balancing & capacity planning",
    link: "/industries/accounting/multi-partner",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: CalendarIcon,
    title: "Tax-season Teams",
    description: "Handle peak volume without extra staff, automated reminders & doc collection, real-time visibility into bottlenecks/overdue items",
    link: "/industries/accounting/tax-season",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: ShieldCheckIcon,
    title: "Compliance-focused Firms",
    description: "Immutable audit logs & retention policies, KYC/evidence tracking, PHIPA/PIPEDA compliance + Canadian data residency",
    link: "/industries/accounting/compliance-focused",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function AccountingSegments() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Built for Canadian Accounting Firms
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From solo practitioners to multi-partner practices.
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
              <p className="text-gray-600 text-sm mb-4">
                {segment.description}
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
