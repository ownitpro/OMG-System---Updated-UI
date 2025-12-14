import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ComparisonItem {
  feature: string;
  oldWay: string | boolean;
  newWay: string | boolean;
}

interface ComparisonSectionProps {
  title: string;
  subtitle?: string;
  oldWayTitle: string;
  newWayTitle: string;
  items: ComparisonItem[];
  className?: string;
}

export function ComparisonSection({
  title,
  subtitle,
  oldWayTitle,
  newWayTitle,
  items,
  className = ''
}: ComparisonSectionProps) {
  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Old Way */}
          <div className="bg-red-50 rounded-3xl p-8 border-2 border-red-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                <XMarkIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{oldWayTitle}</h3>
            </div>
            
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <XMarkIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.feature}
                    </h4>
                    <p className="text-gray-700">
                      {typeof item.oldWay === 'boolean' 
                        ? (item.oldWay ? 'Yes' : 'No')
                        : item.oldWay
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pain Points Summary */}
            <div className="mt-8 p-6 bg-red-100 rounded-2xl">
              <h4 className="font-bold text-red-800 mb-3">Common Pain Points:</h4>
              <ul className="text-red-700 space-y-2">
                <li>• Time-consuming manual processes</li>
                <li>• Data scattered across multiple tools</li>
                <li>• Poor visibility into performance</li>
                <li>• Compliance and security gaps</li>
                <li>• High operational costs</li>
              </ul>
            </div>
          </div>

          {/* New Way */}
          <div className="bg-green-50 rounded-3xl p-8 border-2 border-green-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <CheckIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{newWayTitle}</h3>
            </div>
            
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <CheckIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item.feature}
                    </h4>
                    <p className="text-gray-700">
                      {typeof item.newWay === 'boolean' 
                        ? (item.newWay ? 'Yes' : 'No')
                        : item.newWay
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits Summary */}
            <div className="mt-8 p-6 bg-green-100 rounded-2xl">
              <h4 className="font-bold text-green-800 mb-3">Key Benefits:</h4>
              <ul className="text-green-700 space-y-2">
                <li>• Automated workflows save 40-60% time</li>
                <li>• Unified platform, unified data</li>
                <li>• Real-time analytics & insights</li>
                <li>• Built-in compliance & security</li>
                <li>• Predictable, scalable growth</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Make the Switch?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of businesses that have transformed their operations with OMGsystems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/apps/demo"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Live Demos
              </a>
              <a
                href="/case-snapshots"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-blue-600"
              >
                View Success Stories
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default comparison data
export const defaultComparisonData: ComparisonSectionProps = {
  title: "Transformation: Old Way vs New Way",
  subtitle: "See how OMGsystems transforms your business operations from chaos to clarity",
  oldWayTitle: "Old Way",
  newWayTitle: "New Way with OMGsystems",
  items: [
    {
      feature: "Lead Management",
      oldWay: "Leads lost in email chaos",
      newWay: "Auto follow-ups & lead nurturing"
    },
    {
      feature: "Document Handling",
      oldWay: "Manual documents, scattered filing",
      newWay: "Auto-filing & OCR document flow"
    },
    {
      feature: "Data Integration",
      oldWay: "Disconnected tools & data silos",
      newWay: "Unified platform, unified data"
    },
    {
      feature: "Administrative Tasks",
      oldWay: "Time-consuming admin work",
      newWay: "AI workflows & automation"
    },
    {
      feature: "Compliance & Visibility",
      oldWay: "Poor visibility, compliance gaps",
      newWay: "Real-time analytics & audit compliance"
    },
    {
      feature: "Team Collaboration",
      oldWay: "Communication breakdowns",
      newWay: "Seamless team coordination"
    },
    {
      feature: "Customer Experience",
      oldWay: "Inconsistent service delivery",
      newWay: "Standardized, high-quality service"
    },
    {
      feature: "Growth Scalability",
      oldWay: "Manual processes don't scale",
      newWay: "Automated systems grow with you"
    }
  ]
};
