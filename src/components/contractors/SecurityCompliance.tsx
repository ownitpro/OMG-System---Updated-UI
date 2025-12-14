"use client";

import {
  ShieldCheckIcon,
  LockClosedIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CloudIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const securityFeatures = [
  {
    icon: ShieldCheckIcon,
    title: "Canadian data residency & privacy compliance",
    description: "All data stored and processed within Canada",
  },
  {
    icon: LockClosedIcon,
    title: "Bank-level encryption for financial data",
    description: "AES-256 encryption for all sensitive information",
  },
  {
    icon: UserGroupIcon,
    title: "Role-based access control for all users",
    description: "Granular permissions for team members and clients",
  },
  {
    icon: DocumentTextIcon,
    title: "Audit trails for all project transactions",
    description: "Complete history of all project activities and changes",
  },
  {
    icon: CloudIcon,
    title: "Secure document storage & sharing",
    description: "Encrypted file storage with secure sharing links",
  },
  {
    icon: CheckCircleIcon,
    title: "PIPEDA & provincial privacy law compliance",
    description: "Full compliance with Canadian privacy regulations",
  },
];

export default function SecurityCompliance() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Security & Compliance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your data and your clients' data is protected with enterprise-grade security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <feature.icon className="h-6 w-6" />
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
