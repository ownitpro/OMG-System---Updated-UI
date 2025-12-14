"use client";

import { useState } from "react";
import { ChevronDownIcon, PlayIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const industries = [
  { value: "property-management", label: "Property Management", description: "Tenant documents, lease agreements, maintenance records" },
  { value: "contractors", label: "Contractors", description: "Project files, permits, safety documentation" },
  { value: "accounting", label: "Accounting", description: "Tax documents, client files, financial records" },
  { value: "healthcare", label: "Healthcare", description: "Patient records, compliance documents, medical files" },
  { value: "real-estate", label: "Real Estate", description: "Property listings, contracts, client documentation" },
  { value: "cleaning", label: "Cleaning Services", description: "Service agreements, safety protocols, client records" },
];

export default function InteractiveDemoSection() {
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

  const selectedIndustryData = industries.find(industry => industry.value === selectedIndustry);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Launch a Demo Tailored to Your Industry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how SecureVault Docs works specifically for your business type
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-200 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Demo Selection */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Choose Your Industry
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="demo-industry-select" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Industry
                    </label>
                    <div className="relative">
                      <select
                        id="demo-industry-select"
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="w-full px-4 py-3 pr-10 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                        aria-label="Select your industry for demo"
                      >
                        <option value="">Choose your industry...</option>
                        {industries.map((industry) => (
                          <option key={industry.value} value={industry.value}>
                            {industry.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {selectedIndustryData && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <h4 className="font-semibold text-emerald-800 mb-2">
                        {selectedIndustryData.label} Demo
                      </h4>
                      <p className="text-emerald-700 text-sm">
                        {selectedIndustryData.description}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleDemoLaunch}
                    disabled={!selectedIndustry || isLoading}
                    className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Loading your demo...
                      </>
                    ) : (
                      <>
                        <PlayIcon className="w-5 h-5 mr-2" />
                        Launch Demo
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Demo Preview */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Demo Preview</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      Upload documents with drag & drop
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      AI-powered categorization
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Automated workflow setup
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      Compliance & audit features
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 rounded-lg p-4 text-center">
                    <ClockIcon className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-emerald-800">5 minutes</div>
                    <div className="text-xs text-emerald-600">Interactive demo</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <UserGroupIcon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm font-medium text-blue-800">No signup</div>
                    <div className="text-xs text-blue-600">Required</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
