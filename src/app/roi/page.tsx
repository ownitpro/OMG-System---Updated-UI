import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorIcon, ChartBarIcon, ClockIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "ROI Calculators | OMGsystems",
  description: "Estimate time and cost savings from automation for your industry in Ontario. Transparent calculations, instant results.",
  robots: {
    index: true,
    follow: true,
  },
};

const industries = [
  {
    slug: "property-management",
    name: "Property Management",
    description: "Automate owner statements, tenant onboarding, and maintenance coordination",
    defaultProperties: 120,
    defaultMaintenanceRequests: 90,
    icon: "🏢"
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description: "Transform lead follow-up, showing coordination, and client communication",
    defaultInquiries: 60,
    defaultCommission: 7500,
    icon: "🏠"
  },
  {
    slug: "contractors",
    name: "Contractors",
    description: "Streamline project management, client updates, and invoice collection",
    defaultLeads: 45,
    defaultJobValue: 6500,
    icon: "🔨"
  },
  {
    slug: "accounting",
    name: "Accounting",
    description: "Automate client document collection, engagement letters, and tax workflows",
    defaultClients: 180,
    defaultEngagements: 3,
    icon: "📊"
  },
  {
    slug: "cleaning",
    name: "Cleaning Services",
    description: "Optimize scheduling, route planning, and client communication",
    defaultJobs: 420,
    defaultJobValue: 180,
    icon: "🧽"
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Reduce no-shows, streamline intake, and automate claims processing",
    defaultAppointments: 2400,
    defaultClaims: 1800,
    icon: "🏥"
  }
];

export default function ROIIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <CalculatorIcon className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ROI Calculators
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Estimate time saved, admin costs avoided, and predictable monthly ROI in CAD. 
              Get instant, transparent calculations tailored for Ontario businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#calculators"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Calculators
              </a>
              <a
                href="/campaign/leadflow"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">65%</h3>
              <p className="text-gray-600">Average Time Savings</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">3 weeks</h3>
              <p className="text-gray-600">Typical Payback Period</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CalculatorIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">6</h3>
              <p className="text-gray-600">Industry Calculators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculators Grid */}
      <div id="calculators" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Industry</h2>
            <p className="text-xl text-gray-600">
              Get personalized ROI estimates based on Ontario market data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/roi/${industry.slug}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {industry.description}
                  </p>
                  <div className="flex items-center justify-center text-blue-600 font-medium">
                    <span>Calculate ROI</span>
                    <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our ROI Calculator Works</h2>
            <p className="text-xl text-gray-600">
              Transparent calculations based on real Ontario business data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Your Numbers</h3>
              <p className="text-gray-600">
                Input your current volume, team size, and processes. We provide Ontario-specific defaults.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">See Live Results</h3>
              <p className="text-gray-600">
                Get instant calculations for time saved, cost reduction, and payback period.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Your Report</h3>
              <p className="text-gray-600">
                Email yourself the results and book a demo to see how we can achieve these savings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to see these savings in action?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book a personalized demo to see how OMGsystems can transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/campaign/leadflow"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Book a Demo
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
