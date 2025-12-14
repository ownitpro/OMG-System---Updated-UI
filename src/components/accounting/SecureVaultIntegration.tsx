"use client";

import {
  DocumentArrowUpIcon,
  EyeIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: DocumentArrowUpIcon,
    title: "Intake via upload/email",
    description: "OCR auto-names; status page shows missing items",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: EyeIcon,
    title: "CRA forms & e-sign",
    description: "Year-end packetization and 'lock'",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: ShieldCheckIcon,
    title: "Automatic document classification",
    description: "Immutable audit trails",
    color: "bg-purple-50 text-purple-600",
  },
];

const usageLevels = [
  { level: "70%", color: "bg-yellow-100 text-yellow-800", label: "Alert" },
  { level: "80%", color: "bg-orange-100 text-orange-800", label: "Warning" },
  { level: "90%", color: "bg-red-100 text-red-800", label: "Critical" },
  { level: "100%", color: "bg-red-200 text-red-900", label: "Hard Stop" },
];

export default function SecureVaultIntegration() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Documents collect themselves.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SecureVault Docs integration makes document management effortless and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${feature.color} flex-shrink-0`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Usage Meter Widget */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Usage Meter with Thresholds
            </h3>
            
            {/* Visual usage meter */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Storage Usage</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-emerald-400 to-blue-400 h-3 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            {/* Threshold badges */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Usage Thresholds:</h4>
              {usageLevels.map((level, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{level.label}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${level.color}`}>
                    {level.level}
                  </span>
                </div>
              ))}
            </div>

            {/* Security badges */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Security Features:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <ShieldCheckIcon className="h-3 w-3 mr-1" />
                  Encrypted
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <EyeIcon className="h-3 w-3 mr-1" />
                  Audit Trail
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <ShieldCheckIcon className="h-3 w-3 mr-1" />
                  PHIPA Compliant
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
