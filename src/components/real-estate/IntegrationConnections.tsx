"use client";

import { ChartBarIcon, MegaphoneIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const integrations = [
  {
    icon: ChartBarIcon,
    title: "Smart CRM",
    shortTitle: "CRM",
    description: "Centralized lead and client management",
    color: "bg-blue-500",
  },
  {
    icon: MegaphoneIcon,
    title: "Marketing Hub",
    shortTitle: "MKT",
    description: "Automated marketing campaigns",
    color: "bg-green-500",
  },
  {
    icon: DocumentTextIcon,
    title: "SecureVault Docs",
    shortTitle: "SVD",
    description: "Document management and e-signatures",
    color: "bg-purple-500",
  },
];

export default function IntegrationConnections() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            All your lead, marketing, and document workflows connected
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No more data silos — everything flows together seamlessly.
          </p>
        </div>

        <div className="relative">
          {/* Desktop: Three connected modules */}
          <div className="hidden lg:flex items-center justify-center space-x-8">
            {integrations.map((integration, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-20 h-20 rounded-xl ${integration.color} flex items-center justify-center text-white shadow-lg mb-4`}>
                  <integration.icon className="h-10 w-10" />
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {integration.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {integration.description}
                  </div>
                </div>
                
                {/* Connection arrows */}
                {index < integrations.length - 1 && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-full max-w-[200px]">
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 relative">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-emerald-400 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                      </div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mx-2"></div>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 relative">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-blue-400 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: Stacked layout */}
          <div className="lg:hidden space-y-8">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-xl ${integration.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                  <integration.icon className="h-8 w-8" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {integration.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {integration.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            <span className="font-semibold">Seamless integration</span> between CRM, Marketing Engine, and SecureVault Docs ensures every lead, campaign, and document flows together.
          </p>
        </div>
      </div>
    </section>
  );
}
