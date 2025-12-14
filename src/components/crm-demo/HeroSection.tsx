"use client";

import { useState } from "react";
import { ChevronDownIcon, PlayIcon, SparklesIcon } from "@heroicons/react/24/outline";

const industries = [
  { value: "contractors", label: "Contractors", description: "Track jobs from lead to invoice" },
  { value: "property-management", label: "Property Management", description: "Manage tenants, maintenance, and rent collection" },
  { value: "real-estate", label: "Real Estate", description: "Agent growth engine and client management" },
  { value: "accounting", label: "Accounting", description: "Streamline onboarding and tax preparation" },
  { value: "healthcare", label: "Healthcare", description: "Patient management and appointment scheduling" },
  { value: "cleaning", label: "Cleaning Services", description: "Service agreements and client records" },
];

export default function HeroSection() {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLaunch = async () => {
    if (!selectedIndustry) return;
    
    setIsLoading(true);
    
    // Simulate loading for demo experience
    setTimeout(() => {
      window.location.href = `/try-live-demo?app=crm&industry=${selectedIndustry}`;
    }, 1500);
  };

  const selectedIndustryData = industries.find(industry => industry.value === selectedIndustry);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="absolute inset-0 bg-[url('/images/crm-demo/hero-pattern.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-16 bg-emerald-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-blue-500/20 rounded-lg animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple-500/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-10 w-14 h-14 bg-emerald-500/20 rounded-lg animate-bounce delay-500"></div>
        </div>
      </div>

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Experience the Power of OMGsystems CRM
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover how our CRM transforms your workflow — tailored for your industry.
          </p>
        </div>

        {/* Industry Selection Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Select Your Industry to Get Started
              </h2>
              <p className="text-white/80 mb-6">
                Use the dropdown below to preview a CRM workspace built for your specific needs.
              </p>
              <p className="text-sm text-white/70 mb-6">
                Not sure? Explore how OMGsystems CRM adapts for contractors, real-estate, healthcare, and more — all just a click away.
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="industry-select" className="block text-lg font-semibold text-white mb-3">
                Choose your industry and see your custom demo — no sign-up required, instant access.
              </label>
              <div className="relative">
                <select
                  id="industry-select"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-4 py-4 pr-10 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none text-lg"
                  aria-label="Select your industry for CRM demo"
                >
                  <option value="" className="text-gray-900">Pick your industry above to explore a live CRM experience built just for you...</option>
                  {industries.map((industry) => (
                    <option key={industry.value} value={industry.value} className="text-gray-900">
                      {industry.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/70 pointer-events-none" />
              </div>
            </div>

            {selectedIndustryData && (
              <div className="mb-6 bg-emerald-50/20 border border-emerald-300/30 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <SparklesIcon className="w-5 h-5 text-emerald-400 mr-2" />
                  <h3 className="font-semibold text-emerald-100">
                    {selectedIndustryData.label} CRM Preview
                  </h3>
                </div>
                <p className="text-emerald-200 text-sm">
                  {selectedIndustryData.description}
                </p>
              </div>
            )}

            <button
              onClick={handleDemoLaunch}
              disabled={!selectedIndustry || isLoading}
              className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Loading your {selectedIndustryData?.label} demo...
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5 mr-2" />
                  {selectedIndustry ? `Launch ${selectedIndustryData?.label} Demo` : 'Select Industry First'}
                </>
              )}
            </button>

            {/* Micro-copy */}
            <div className="mt-4 text-center">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-white/80">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  Instant preview
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  No registration
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  Real industry workflows
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Preview Visual */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                <div className="text-center text-white/80">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <PlayIcon className="w-8 h-8" />
                  </div>
                  <p className="text-lg font-medium">CRM Dashboard Preview</p>
                  <p className="text-sm">
                    {selectedIndustryData ? `${selectedIndustryData.label} Workflow` : 'Select industry to see custom workflow'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
