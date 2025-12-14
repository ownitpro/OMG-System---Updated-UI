import React from "react";
import { 
  ClockIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline'

const benefits = [
  {
    icon: ClockIcon,
    title: "Save hours weekly",
    description: "Automate repetitive tasks and focus on what matters most"
  },
  {
    icon: ShieldCheckIcon,
    title: "Prevent data leaks",
    description: "Enterprise-grade security with bank-level encryption"
  },
  {
    icon: ChartBarIcon,
    title: "Predictable revenue",
    description: "AI-powered insights help you forecast and optimize growth"
  },
  {
    icon: DocumentCheckIcon,
    title: "Compliance & audit ease",
    description: "Automated compliance tracking and audit-ready documentation"
  }
]

export function Benefits() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Benefits / Value Points
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your business with measurable improvements across every aspect of your operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mx-auto mb-4">
                <benefit.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
