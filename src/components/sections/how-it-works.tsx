import React from "react";
import { 
  ArrowDownTrayIcon,
  CogIcon,
  TruckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const steps = [
  {
    number: "01",
    icon: ArrowDownTrayIcon,
    title: "Capture",
    description: "Lead or document enters system"
  },
  {
    number: "02", 
    icon: CogIcon,
    title: "Automate",
    description: "Rules, workflows, routing"
  },
  {
    number: "03",
    icon: TruckIcon,
    title: "Deliver",
    description: "Project, messages, docs to client"
  },
  {
    number: "04",
    icon: ChartBarIcon,
    title: "Grow",
    description: "Analytics, upsell, referrals"
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works / Process Summary
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple 4-step process to transform your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-100 mb-4">
                {step.number}
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mx-auto mb-4">
                <step.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
