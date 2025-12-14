"use client";

import { useState, useEffect } from "react";
import { 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const useCases = [
  {
    id: 1,
    title: "Lead Qualification Agent",
    industry: "Real Estate",
    description: "Automatically qualifies and scores incoming leads based on budget, timeline, and property preferences.",
    results: [
      "40% faster response time",
      "60% improvement in lead quality",
      "25% increase in conversion rate"
    ],
    icon: UserGroupIcon,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Invoice Alert Agent",
    industry: "Contractors",
    description: "Monitors payment schedules, sends automated reminders, and escalates overdue invoices to management.",
    results: [
      "60% reduction in overdue invoices",
      "30% faster payment processing",
      "50% less manual follow-up time"
    ],
    icon: CurrencyDollarIcon,
    color: "from-emerald-500 to-lime-500"
  },
  {
    id: 3,
    title: "Document Processing Agent",
    industry: "Healthcare",
    description: "Automatically processes patient forms, extracts key information, and routes to appropriate departments.",
    results: [
      "70% reduction in manual data entry",
      "45% faster patient processing",
      "90% accuracy improvement"
    ],
    icon: DocumentTextIcon,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    title: "Property Management Agent",
    industry: "Property Management",
    description: "Handles tenant inquiries, schedules maintenance, tracks lease renewals, and manages vendor communications.",
    results: [
      "80% reduction in routine inquiries",
      "50% faster maintenance scheduling",
      "35% improvement in tenant satisfaction"
    ],
    icon: BuildingOfficeIcon,
    color: "from-orange-500 to-red-500"
  }
];

export default function UseCasesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCase, setHoveredCase] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="use-cases" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Use Cases, Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how AI Agents are transforming businesses across industries with measurable results.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.id}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${
                hoveredCase === useCase.id ? 'ring-4 ring-emerald-200' : ''
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCase(useCase.id)}
              onMouseLeave={() => setHoveredCase(null)}
            >
              {/* Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${useCase.color} rounded-xl flex-shrink-0`}>
                  <useCase.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {useCase.title}
                  </h3>
                  <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                    {useCase.industry}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {useCase.description}
              </p>

              {/* Results */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">Key Results:</h4>
                {useCase.results.map((result, resultIndex) => (
                  <div key={resultIndex} className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{result}</span>
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              {hoveredCase === useCase.id && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-emerald-600 font-medium">
                    <span className="text-sm">View Full Case Study</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Industry Stats */}
        <div className="bg-gradient-to-r from-emerald-500 to-lime-500 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Proven Across Industries
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
                <div className="text-emerald-100">Agents Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">85%</div>
                <div className="text-emerald-100">Time Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">60%</div>
                <div className="text-emerald-100">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                <div className="text-emerald-100">Always Working</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-lg text-gray-600 mb-6">
            Want to see more detailed case studies?
          </p>
          <a 
            href="#offer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-lime-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-lime-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Request Your Custom Agent
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
