"use client";

import { useState } from "react";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/24/outline";

const industries = [
  { value: "property-management", label: "Property Management" },
  { value: "contractors", label: "Contractors" },
  { value: "accounting", label: "Accounting" },
  { value: "healthcare", label: "Healthcare" },
  { value: "real-estate", label: "Real Estate" },
  { value: "cleaning", label: "Cleaning Services" },
];

export default function HeroSection() {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLaunch = async () => {
    if (!selectedIndustry) return;
    
    setIsLoading(true);
    
    // Simulate loading for demo experience
    setTimeout(() => {
      // In a real implementation, this would route to the actual demo
      window.location.href = `/apps/demo/securevault-docs?industry=${selectedIndustry}`;
    }, 1500);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('/images/securevault-demo/hero-pattern.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-16 bg-emerald-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-blue-500/20 rounded-lg animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-indigo-500/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-10 w-14 h-14 bg-emerald-500/20 rounded-lg animate-bounce delay-500"></div>
        </div>
      </div>

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Try SecureVault Docs Demo
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Experience how SecureVault Docs can transform your document management. 
            Choose your industry to see tailored workflows and features.
          </p>
        </div>

        {/* Demo Launch Interface */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="mb-6">
              <label htmlFor="industry-select" className="block text-lg font-semibold text-white mb-3">
                Select Your Industry
              </label>
              <div className="relative">
                <select
                  id="industry-select"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-4 py-3 pr-10 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                  aria-label="Select your industry"
                >
                  <option value="" className="text-gray-900">Choose your industry...</option>
                  {industries.map((industry) => (
                    <option key={industry.value} value={industry.value} className="text-gray-900">
                      {industry.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70 pointer-events-none" />
              </div>
            </div>

            <button
              onClick={handleDemoLaunch}
              disabled={!selectedIndustry || isLoading}
              className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Loading your demo...
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Start Your Demo
                </>
              )}
            </button>

            <div className="mt-4 text-sm text-white/80">
              <p>✅ No registration required</p>
              <p>✅ 5-minute interactive demo</p>
              <p>✅ Tailored demo by industry</p>
            </div>
          </div>
        </div>

        {/* Demo Preview Visual */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                <div className="text-center text-white/80">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <PlayIcon className="w-8 h-8" />
                  </div>
                  <p className="text-lg font-medium">Interactive Demo Preview</p>
                  <p className="text-sm">Upload → Organize → Compliance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
