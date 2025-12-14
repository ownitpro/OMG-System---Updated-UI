"use client";

import {
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const benefits = [
  {
    icon: DocumentTextIcon,
    title: "Owner Statements & Payouts",
    description: "Generate statements automatically, send by email, and speed up payout processing.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Maintenance & Work-Order Routing",
    description: "Ticket intake → auto-assign vendor → real-time updates for streamlined service.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: UserGroupIcon,
    title: "Tenant & Owner Portals",
    description: "Self-service portals for tenants & owners reduce calls and manual work.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: ChartBarIcon,
    title: "Analytics & Benchmarking",
    description: "See occupancy trends, cost per unit, and owner profitability at a glance.",
    color: "bg-orange-50 text-orange-600",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Key Benefits & Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline property management operations in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-full ${benefit.color} mb-4`}>
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
