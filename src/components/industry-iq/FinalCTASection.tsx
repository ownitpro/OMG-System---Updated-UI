"use client";

import { useState } from "react";
import Link from "next/link";

export default function FinalCTASection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-600 to-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/industry-iq/cta-pattern.svg')] bg-cover bg-center opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-white/10 rounded-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-white/10 rounded-lg animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Build Once. Profit Forever with Industry IQ
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Transform your business data into actionable intelligence that drives growth and competitive advantage. 
          Join thousands of businesses already using Industry IQ to make smarter decisions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/try-live-demo?product=industry-iq"
            className={`inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-emerald-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 transform ${
              isHovered ? "scale-105 shadow-2xl" : "shadow-lg hover:shadow-xl"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="mr-2">Explore Industry IQ</span>
            <svg
              className="w-5 h-5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <button className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-lg font-medium rounded-lg text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200">
            <span className="mr-2">Request Demo</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>

        <div className="text-white/80 text-sm">
          <p>No long-term contracts • 3×–5× average ROI • 20+ industries served</p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">10,000+</div>
            <div className="text-sm text-white/80">Businesses Trust Us</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">20+</div>
            <div className="text-sm text-white/80">Industries Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">AI</div>
            <div className="text-sm text-white/80">Powered Insights</div>
          </div>
        </div>
      </div>
    </section>
  );
}