import React from 'react';
import Link from 'next/link';
import { 
  BoltIcon, 
  ChartBarIcon, 
  ShieldCheckIcon, 
  CpuChipIcon,
  DocumentTextIcon,
  LightBulbIcon,
  CogIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

interface Feature {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  color: string;
}

interface FeaturesGridProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  className?: string;
}

export function FeaturesGrid({ title, subtitle, features, className = '' }: FeaturesGridProps) {
  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const content = (
              <div className="group h-full">
                <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover effect indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            );

            return feature.href ? (
              <Link key={index} href={feature.href} className="block">
                {content}
              </Link>
            ) : (
              <div key={index}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Default features for OMGsystems
export const defaultFeatures: Feature[] = [
  {
    name: "LeadFlow Engine™",
    description: "Convert ad spend into qualified leads automatically with intelligent scoring and nurturing.",
    icon: BoltIcon,
    href: "/apps/leadflow",
    color: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    name: "CRM & Pipelines",
    description: "Tailored pipelines, scoring, and automation per industry with seamless integration.",
    icon: ChartBarIcon,
    href: "/apps/crm",
    color: "bg-gradient-to-br from-green-500 to-green-600"
  },
  {
    name: "SecureVault Docs",
    description: "OCR, auto-filing, secure sharing, and audit trails built-in for compliance.",
    icon: ShieldCheckIcon,
    href: "/apps/securevault",
    color: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    name: "Industry IQ",
    description: "Daily snapshots & trends to stay ahead in your sector with actionable insights.",
    icon: CpuChipIcon,
    href: "/apps/industry-iq",
    color: "bg-gradient-to-br from-orange-500 to-orange-600"
  },
  {
    name: "Content Engine",
    description: "Generate & schedule posts, video content, and captions automatically across platforms.",
    icon: DocumentTextIcon,
    href: "/apps/content-engine",
    color: "bg-gradient-to-br from-pink-500 to-pink-600"
  },
  {
    name: "Smart Automations",
    description: "Trigger-based workflows to eliminate manual tasks and boost efficiency.",
    icon: LightBulbIcon,
    href: "/smart-automations",
    color: "bg-gradient-to-br from-yellow-500 to-yellow-600"
  },
  {
    name: "Workflow Builder",
    description: "Drag-and-drop automation builder for custom business processes.",
    icon: CogIcon,
    href: "/workflow-builder",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600"
  },
  {
    name: "Analytics & Reporting",
    description: "Real-time dashboards & scheduled reports with industry benchmarks.",
    icon: ChartPieIcon,
    href: "/analytics-demo",
    color: "bg-gradient-to-br from-teal-500 to-teal-600"
  }
];
