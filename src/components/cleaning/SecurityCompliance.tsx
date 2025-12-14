"use client";

import {
  ShieldCheckIcon,
  LockClosedIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

const securityFeatures = [
  {
    icon: ShieldCheckIcon,
    title: "Canadian-hosted data",
    description: "Encryption at rest & in transit",
  },
  {
    icon: UserGroupIcon,
    title: "Role-based access control",
    description: "Granular permissions for all users",
  },
  {
    icon: DocumentTextIcon,
    title: "Full audit trail",
    description: "For all actions & document access",
  },
  {
    icon: CloudArrowUpIcon,
    title: "Automated backups & fail-over protection",
    description: "Business continuity guaranteed",
  },
  {
    icon: LockClosedIcon,
    title: "Privacy-first design",
    description: "Under PHIPA/PIPEDA compliance",
  },
  {
    icon: KeyIcon,
    title: "Secure API integrations",
    description: "With third-party systems",
  },
];

export default function SecurityCompliance() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
            Security & Compliance Highlights
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Your cleaning business data is protected with bank-level security and Canadian compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-emerald-100 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-5 w-5 text-emerald-300" />
              <span className="text-sm font-medium">PHIPA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <LockClosedIcon className="h-5 w-5 text-emerald-300" />
              <span className="text-sm font-medium">Canadian Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <KeyIcon className="h-5 w-5 text-emerald-300" />
              <span className="text-sm font-medium">Bank-Level Security</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
