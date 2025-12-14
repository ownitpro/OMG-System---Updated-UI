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
    title: "PHIPA/PIPEDA-aligned, Canadian data residency",
    description: "Full compliance with Canadian privacy regulations",
  },
  {
    icon: LockClosedIcon,
    title: "Encryption at rest & in transit",
    description: "AES-256 encryption for all data and communications",
  },
  {
    icon: UserGroupIcon,
    title: "Role-based access control (least privilege)",
    description: "Granular permissions for team members and clients",
  },
  {
    icon: DocumentTextIcon,
    title: "Immutable logs for all access/change",
    description: "Complete audit trail of all system activities",
  },
  {
    icon: CloudIcon,
    title: "Consent tracking & suppression list management",
    description: "Automated consent management and opt-out handling",
  },
  {
    icon: CheckCircleIcon,
    title: "Automated backups & disaster recovery",
    description: "Regular backups with disaster recovery procedures",
  },
];

export default function SecurityCompliance() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Security & Compliance Highlights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your data and your clients' data is protected with enterprise-grade security and full Canadian compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
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
