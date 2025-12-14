"use client";

import {
  ShieldCheckIcon,
  LockClosedIcon,
  UserGroupIcon,
  DocumentTextIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const securityFeatures = [
  {
    icon: GlobeAltIcon,
    title: "Data residency in Canada",
    description: "All data stored and processed within Canadian borders for compliance.",
  },
  {
    icon: LockClosedIcon,
    title: "Bank-level encryption",
    description: "Financial & tenant data protected with industry-standard encryption.",
  },
  {
    icon: UserGroupIcon,
    title: "Role-based access control",
    description: "Granular permissions for all users based on their responsibilities.",
  },
  {
    icon: DocumentTextIcon,
    title: "Audit trails",
    description: "Complete transaction history for all property-related activities.",
  },
  {
    icon: ShieldCheckIcon,
    title: "PIPEDA & provincial compliance",
    description: "Full compliance with Canadian privacy laws and regulations.",
  },
];

export default function SecurityComplianceSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
            Built for Ontario Property Managers
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Security and compliance features designed specifically for Canadian property management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-blue-100 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
