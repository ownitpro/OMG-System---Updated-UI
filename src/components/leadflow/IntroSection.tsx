"use client";

import {
  CheckCircleIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline";

const benefits = [
  {
    id: 1,
    title: "All Your Lead Tools — Integrated & Automated",
    description: "No more switching between platforms. Everything works together seamlessly.",
    icon: CheckCircleIcon,
    color: "text-emerald-600"
  },
  {
    id: 2,
    title: "No Gaps — From Ad to Follow-up to Sale",
    description: "Complete visibility and control from first click to closed deal.",
    icon: ChartBarIcon,
    color: "text-blue-600"
  },
  {
    id: 3,
    title: "Data-Driven & Optimized Daily",
    description: "AI-powered insights that improve your campaigns automatically.",
    icon: ChartBarIcon,
    color: "text-purple-600"
  },
  {
    id: 4,
    title: "Built for Real Scale",
    description: "Whether you're just starting or growing fast, the system scales with you.",
    icon: BuildingOfficeIcon,
    color: "text-indigo-600"
  }
];

export default function IntroSection() {
  return (
    <section id="intro-section" className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Introducing LeadFlow Engine™
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your turnkey lead system — captures leads from Meta (Facebook & Instagram), funnels them into your CRM, nurtures them with smart automations, and helps you close and retain clients.
          </p>
        </div>

        {/* What It Is */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What It Is
            </h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              A complete lead generation and nurturing system that turns your digital campaigns into a predictable revenue stream.
              No more guessing, no more gaps, no more lost opportunities.
            </p>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Key Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Lead Generation?
            </h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Stop struggling with inconsistent results. Get a system that delivers qualified leads consistently, every single day.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/industries#lead-form"
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get Your LeadFlow Strategy Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
