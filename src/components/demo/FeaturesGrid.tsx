"use client";

import { UserGroupIcon, DocumentTextIcon, CogIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const features = [
  {
    icon: UserGroupIcon,
    title: "Lead Capture & CRM",
    description: "Watch leads stream in",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: DocumentTextIcon,
    title: "SecureVault Docs",
    description: "See compliance-ready document workflows",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    icon: CogIcon,
    title: "Workflow Builder",
    description: "Drag-drop triggers, actions and deploy",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: ChartBarIcon,
    title: "Analytics & Reporting",
    description: "View live KPIs and industry benchmarks",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
];

export default function FeaturesGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            What you'll explore in the demo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get hands-on with the core features that make OMGsystems the platform of choice for growing businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
