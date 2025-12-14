import React from "react";
import Link from 'next/link'
import { 
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  PencilIcon,
  CogIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: UserGroupIcon,
    title: "CRM & Pipelines",
    description: "Intelligent customer relationship management with automated lead scoring and follow-up workflows.",
    link: "/apps/crm"
  },
  {
    icon: DocumentTextIcon,
    title: "SecureVault Docs",
    description: "Bank-grade document security with automated filing, OCR, and compliance tracking.",
    link: "/apps/securevault"
  },
  {
    icon: ChartBarIcon,
    title: "Industry IQ",
    description: "AI-powered business intelligence with predictive analytics and industry benchmarking.",
    link: "/apps/industry-iq"
  },
  {
    icon: PencilIcon,
    title: "Content Engine",
    description: "AI-powered content creation for marketing, documentation, and client communications.",
    link: "/apps/content-engine"
  },
  {
    icon: CogIcon,
    title: "Automations / Workflows",
    description: "Custom workflow automation that adapts to your business processes and industry requirements.",
    link: "/solutions/automation"
  },
  {
    icon: PresentationChartBarIcon,
    title: "Analytics & Reporting",
    description: "Real-time dashboards with actionable insights and automated report generation.",
    link: "/solutions/analytics"
  }
]

export function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Core Features / Solutions Grid
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to transform your business operations in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
