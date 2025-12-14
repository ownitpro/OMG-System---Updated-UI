import React from "react";
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline'

const oldWayProblems = [
  "Leads lost in email chaos",
  "Manual filing and document search",
  "Scattered systems and data silos",
  "Time-consuming administrative tasks",
  "Limited visibility into performance",
  "Compliance and security gaps"
]

const newWayBenefits = [
  "Auto follow-ups and lead nurturing",
  "Auto-filing & OCR document processing",
  "Unified platform with integrated data",
  "AI-powered workflow automation",
  "Real-time analytics and insights",
  "Enterprise-grade security & compliance"
]

export function Comparison() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Old Way vs New Way
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how OMGsystems transforms your business operations from chaos to clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Old Way */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-red-900">Old Way</h3>
                <p className="text-red-700">Manual, scattered, inefficient</p>
              </div>
            </div>
            
            <ul className="space-y-4">
              {oldWayProblems.map((problem, index) => (
                <li key={index} className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-red-800">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* New Way */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <LightBulbIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-green-900">New Way with OMGsystems</h3>
                <p className="text-green-700">Automated, unified, intelligent</p>
              </div>
            </div>
            
            <ul className="space-y-4">
              {newWayBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
