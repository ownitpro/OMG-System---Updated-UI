"use client";

import { useState } from "react";
import Link from "next/link";

export default function PricingCTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/industry-iq/pricing-pattern.svg')] bg-cover bg-center opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500/10 rounded-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-purple-500/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-yellow-500/10 rounded-lg animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Ready to Turn Your Data Into Growth?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of businesses already using Industry IQ to make smarter, data-driven decisions.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Free Trial Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Start Free Trial</h3>
              <div className="text-4xl font-extrabold text-emerald-400 mb-2">$0</div>
              <p className="text-gray-300">for 14 days</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-emerald-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Full access to Industry IQ dashboard
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-emerald-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Industry-specific benchmarks
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-emerald-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                AI-powered insights & forecasts
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-emerald-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Setup & onboarding support
              </li>
            </ul>

            <Link
              href="/try-live-demo?product=industry-iq"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-slate-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Demo Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Request Demo</h3>
              <div className="text-4xl font-extrabold text-blue-400 mb-2">Free</div>
              <p className="text-gray-300">personalized demo</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Personalized 30-minute demo
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Customized for your industry
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Q&A with our experts
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Implementation roadmap
              </li>
            </ul>

            <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-white/30 text-base font-medium rounded-lg text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              Schedule Demo
            </button>
          </div>
        </div>

        {/* Platform Note */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-4xl mx-auto border border-white/20">
            <p className="text-gray-300 mb-4">
              <span className="font-semibold text-white">Industry IQ</span> is part of the OMGsystems Platform
            </p>
            <p className="text-sm text-gray-400">
              Available as a standalone add-on for existing clients or as part of our comprehensive business automation suite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
