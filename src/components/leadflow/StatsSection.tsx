"use client";

import { useState, useEffect } from "react";
import { 
  ExclamationTriangleIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  ClockIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline";

const stats = [
  {
    id: 1,
    value: "78%",
    label: "of businesses lose leads due to slow follow-up",
    icon: ExclamationTriangleIcon,
    color: "text-red-600"
  },
  {
    id: 2,
    value: "45%",
    label: "higher client retention with integrated CRM",
    icon: ChartBarIcon,
    color: "text-emerald-600"
  },
  {
    id: 3,
    value: "3×",
    label: "average ROI on optimized ad spend",
    icon: CurrencyDollarIcon,
    color: "text-blue-600"
  },
  {
    id: 4,
    value: "60%",
    label: "less time wasted on manual entry after automation",
    icon: ClockIcon,
    color: "text-purple-600"
  },
  {
    id: 5,
    value: "20+",
    label: "industries served; proven results from real estate to healthcare",
    icon: BuildingOfficeIcon,
    color: "text-indigo-600"
  }
];

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why LeadFlow Engine Matters
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The numbers don't lie. Here's what we've learned from helping businesses transform their lead generation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl mb-6">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {stat.value}
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join the Success Stories?
            </h3>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Stop guessing with your marketing. Get a system that works consistently, every single day.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact-sales" 
                className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Get Your Strategy Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
