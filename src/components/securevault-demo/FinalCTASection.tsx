"use client";

import { useState } from "react";
import { PlayIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function FinalCTASection() {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLaunch = async () => {
    if (!selectedIndustry) return;
    
    setIsLoading(true);
    
    // Simulate loading for demo experience
    setTimeout(() => {
      window.location.href = `/apps/demo/securevault-docs?industry=${selectedIndustry}`;
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/securevault-demo/cta-pattern.svg')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-white/10 rounded-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-white/10 rounded-lg animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Try SecureVault Docs Demo Now
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Experience the power of intelligent document management in just 5 minutes. 
          No registration required—see how it works for your industry.
        </p>

        {/* Quick Demo Launch */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="mb-4">
              <label htmlFor="quick-industry-select" className="block text-sm font-medium text-white mb-2">
                Quick Start - Select Your Industry
              </label>
              <select
                id="quick-industry-select"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              >
                <option value="">Choose your industry...</option>
                <option value="property-management">Property Management</option>
                <option value="contractors">Contractors</option>
                <option value="accounting">Accounting</option>
                <option value="healthcare">Healthcare</option>
                <option value="real-estate">Real Estate</option>
                <option value="cleaning">Cleaning Services</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDemoLaunch}
                disabled={!selectedIndustry || isLoading}
                className="flex-1 inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-emerald-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 transform shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600 mr-3"></div>
                    Loading your demo...
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-5 h-5 mr-2" />
                    Start Your Demo
                  </>
                )}
              </button>
              
              <a
                href="/contact"
                className="flex-1 inline-flex items-center justify-center px-8 py-4 border border-white/30 text-lg font-medium rounded-lg text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                Contact Sales
              </a>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-white/80 text-sm mb-8">
          <p>✅ No registration required • ✅ 5-minute interactive demo • ✅ Industry-specific workflows</p>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <p className="text-white/60 text-sm">© 2024 OMGsystems. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="/about" className="text-white/60 hover:text-white text-sm transition-colors">About</a>
                <a href="/careers" className="text-white/60 hover:text-white text-sm transition-colors">Careers</a>
                <a href="/press" className="text-white/60 hover:text-white text-sm transition-colors">Press</a>
                <a href="/contact" className="text-white/60 hover:text-white text-sm transition-colors">Contact</a>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="/legal/privacy" className="text-white/60 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="/legal/terms" className="text-white/60 hover:text-white text-sm transition-colors">Terms</a>
              <a href="/blog" className="text-white/60 hover:text-white text-sm transition-colors">Blog</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
