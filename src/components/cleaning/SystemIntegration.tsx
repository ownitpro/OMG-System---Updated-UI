"use client";

import {
  LinkIcon,
  DocumentArrowUpIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const integrationFeatures = [
  {
    icon: LinkIcon,
    title: "Unified workflow",
    description: "Every lead, job, and document flows seamlessly between the CRM & SecureVault Docs",
  },
  {
    icon: DocumentArrowUpIcon,
    title: "Automated document filing & organization",
    description: "Smart categorization and storage of all business documents",
  },
  {
    icon: ShieldCheckIcon,
    title: "Encrypted storage with audit trails",
    description: "Bank-level security with complete activity tracking",
  },
  {
    icon: ArrowPathIcon,
    title: "Real-time synchronization across platforms",
    description: "Instant updates between all connected systems",
  },
];

export default function SystemIntegration() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Seamless integration between CRM and SecureVault Docs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All your work, one engine. Every lead, job, and document flows seamlessly between systems.
          </p>
        </div>

        {/* Visual integration flow */}
        <div className="mb-16">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900">CRM</h3>
              <p className="text-sm text-gray-600">Leads & Jobs</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <ArrowPathIcon className="h-6 w-6 text-emerald-500 animate-spin" />
              <span className="text-sm font-medium text-gray-600">Syncs</span>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="font-semibold text-gray-900">Job Engine</h3>
              <p className="text-sm text-gray-600">Automation</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <ArrowPathIcon className="h-6 w-6 text-emerald-500 animate-spin" />
              <span className="text-sm font-medium text-gray-600">Syncs</span>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📁</span>
              </div>
              <h3 className="font-semibold text-gray-900">SecureVault Docs</h3>
              <p className="text-sm text-gray-600">Documents</p>
            </div>
          </div>
        </div>

        {/* Integration features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {integrationFeatures.map((feature, index) => (
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
