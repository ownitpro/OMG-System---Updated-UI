"use client";

import { useState } from "react";
import { PlayIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function FinalCTASection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLaunch = async () => {
    setIsLoading(true);
    
    // Simulate loading for demo experience
    setTimeout(() => {
      window.location.href = "/try-live-demo?app=crm";
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#2B2A2A] via-[#1f1e1e] to-[#2B2A2A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-[#47BD79]/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-[#47BD79]/10 rounded-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-[#47BD79]/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-[#47BD79]/10 rounded-lg animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-[#47BD79]/20 shadow-[0_0_40px_rgba(71,189,121,0.15)]">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Start Growing Your Business Today
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            Join thousands of businesses that have transformed their operations with our CRM.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={handleDemoLaunch}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-[#47BD79] hover:bg-[#3da86a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#47BD79] transition-all duration-600 ease-premium-out transform hover:scale-105 shadow-[0_0_20px_rgba(71,189,121,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Loading demo...
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Try a Live Demo
                </>
              )}
            </button>

            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-lg font-medium rounded-lg text-white bg-white/5 hover:bg-white/10 hover:border-[#47BD79]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#47BD79] transition-all duration-600 ease-premium-out"
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              Contact Sales for Custom Pricing
            </a>
          </div>

          {/* Micro-copy */}
          <div className="text-white/60 text-sm mb-8">
            <p>Included in our full platform—or choose CRM standalone.</p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#47BD79] mb-2">10,000+</div>
              <div className="text-white/70">Businesses Trust Us</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#47BD79] mb-2">99.9%</div>
              <div className="text-white/70">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#47BD79] mb-2">24/7</div>
              <div className="text-white/70">Support Available</div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <p className="text-white/50 text-sm">© 2024 OMGsystems. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="/about" className="text-white/50 hover:text-white text-sm transition-colors">About</a>
                <a href="/careers" className="text-white/50 hover:text-white text-sm transition-colors">Careers</a>
                <a href="/press" className="text-white/50 hover:text-white text-sm transition-colors">Press</a>
                <a href="/contact" className="text-white/50 hover:text-white text-sm transition-colors">Contact</a>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="/legal/privacy" className="text-white/50 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="/legal/terms" className="text-white/50 hover:text-white text-sm transition-colors">Terms</a>
              <a href="/blog" className="text-white/50 hover:text-white text-sm transition-colors">Blog</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
