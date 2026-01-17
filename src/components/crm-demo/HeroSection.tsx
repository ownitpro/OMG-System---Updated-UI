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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black">
        <div className="absolute inset-0 bg-[url('/images/crm-demo/hero-pattern.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-16 bg-sky-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-sky-400/20 rounded-lg animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-blue-500/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-10 w-14 h-14 bg-sky-500/20 rounded-lg animate-bounce delay-500"></div>
        </div>
      </div>

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Experience the Power of OMGsystems CRM
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover how our CRM transforms your workflow — tailored for your industry.
          </p>
        </div>

        {/* Industry Selection - Minimal Design */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-white mb-3">
            Select Your Industry to Get Started
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Use the dropdown below to preview a CRM workspace built for your specific needs.
          </p>
          <p className="text-sm text-white/60 mb-8">
            Not sure? Explore how OMGsystems CRM adapts for contractors, real-estate, healthcare, and more — all just a click away.
          </p>

          {/* Dropdown */}
          <div className="mb-6">
            <label htmlFor="industry-select" className="block text-lg font-semibold text-white mb-4">
              Choose your industry and see your custom demo — no sign-up required, instant access.
            </label>
            <div className="relative max-w-2xl mx-auto">
              <select
                id="industry-select"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-6 py-4 pr-12 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 appearance-none text-lg backdrop-blur-sm hover:bg-white/15 transition-all"
                aria-label="Select your industry for CRM demo"
              >
                <option value="" className="text-gray-900">Pick your industry above to explore a live CRM experience built just for you...</option>
                {industries.map((industry) => (
                  <option key={industry.value} value={industry.value} className="text-gray-900">
                    {industry.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/70 pointer-events-none" />
            </div>
          </div>

          {/* Selected Industry Preview */}
          {selectedIndustryData && (
            <div className="mb-6 border-l-4 border-sky-400 bg-sky-500/10 pl-6 py-4 text-left max-w-2xl mx-auto">
              <div className="flex items-center mb-2">
                <SparklesIcon className="w-5 h-5 text-sky-400 mr-2" />
                <h3 className="font-semibold text-sky-100 text-lg">
                  {selectedIndustryData.label} CRM Preview
                </h3>
              </div>
              <p className="text-sky-200">
                {selectedIndustryData.description}
              </p>
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={handleDemoLaunch}
            disabled={!selectedIndustry || isLoading}
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-xl text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-sky-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
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

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-white/70">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-sky-400 rounded-full mr-2"></div>
              Instant preview
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              No registration
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-sky-300 rounded-full mr-2"></div>
              Real industry workflows
            </span>
          </div>
        </div>

        {/* Dashboard Preview Visual */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-1 border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-sky-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                <div className="text-center text-white/80">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <PlayIcon className="w-8 h-8 text-sky-400" />
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
