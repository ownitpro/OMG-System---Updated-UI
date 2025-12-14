"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Live KPI Dashboard",
    description: "Real-time performance tracking with animated metrics",
    image: "/images/industry-iq/live-dashboard.png",
    benefit: "Track performance in real-time",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Benchmark Comparison",
    description: "Interactive charts showing your rank vs peers",
    image: "/images/industry-iq/benchmark-chart.png",
    benefit: "See how you rank vs peers",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    title: "AI Forecasts & Alerts",
    description: "Get 'next move' prompts before issues appear",
    image: "/images/industry-iq/ai-forecasts.png",
    benefit: "Get 'next move' prompts before issues appear",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "CRM + Document Integrations",
    description: "Data flows automatically across your systems",
    image: "/images/industry-iq/integrations.png",
    benefit: "Data flows automatically across your systems",
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Performance Badge Display",
    description: "Show 'Top 10% in industry' status to stakeholders",
    image: "/images/industry-iq/performance-badge.png",
    benefit: "Instant credibility & insight",
    color: "from-yellow-500 to-yellow-600",
  },
];

export default function FeaturesGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Showcase Main Features with Engaging Visuals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of Industry IQ through interactive demonstrations and real-world applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                      <div className="w-8 h-8 bg-white rounded-lg opacity-80"></div>
                    </div>
                    <p className="text-sm text-gray-500">Interactive Demo</p>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Click to Explore</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Benefit Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  {feature.benefit}
                </div>
              </div>

              {/* Hover Glow Effect */}
              {hoveredIndex === index && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to See Industry IQ in Action?
            </h3>
            <p className="text-gray-600 mb-6">
              Experience the full power of our business intelligence platform with a personalized demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/try-live-demo?product=industry-iq"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
              >
                <span className="mr-2">Try Live Demo</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}