"use client";

import { useState, useEffect } from "react";
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  GlobeAltIcon,
  UserGroupIcon 
} from "@heroicons/react/24/outline";

const stats = [
  {
    id: 1,
    value: "66%",
    label: "of companies say AI agents delivered measurable value by boosting productivity",
    source: "PwC",
    icon: ChartBarIcon,
    color: "text-emerald-600"
  },
  {
    id: 2,
    value: "51%",
    label: "of companies have deployed AI agents today; another 35% plan to in the next 2 years",
    source: "Tech Monitor",
    icon: UserGroupIcon,
    color: "text-lime-600"
  },
  {
    id: 3,
    value: "45%",
    label: "CAGR growth expected for the global AI agents market from 2025-2030",
    source: "MarketsandMarkets",
    icon: ArrowTrendingUpIcon,
    color: "text-blue-600"
  }
];

const testimonials = [
  {
    id: 1,
    quote: "Thanks to our agent we reclaimed 10 hours/week",
    author: "Sarah Chen",
    company: "Property Management Pro",
    industry: "Real Estate"
  },
  {
    id: 2,
    quote: "Our lead qualification is now 40% faster",
    author: "Mike Rodriguez",
    company: "Contractor Solutions",
    industry: "Construction"
  },
  {
    id: 3,
    quote: "Invoice processing time reduced by 60%",
    author: "Lisa Thompson",
    company: "Accounting Plus",
    industry: "Finance"
  }
];

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate testimonials every 3 seconds
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why business teams are turning to AI Agents
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The numbers speak for themselves. AI Agents are transforming how businesses operate.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-100 to-lime-100 rounded-2xl mb-6">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {stat.value}
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {stat.label}
              </p>
              
              <div className="text-sm text-gray-500 font-medium">
                Source: {stat.source}
              </div>
            </div>
          ))}
        </div>

        {/* Micro Testimonials */}
        <div className="bg-gradient-to-r from-emerald-500 to-lime-500 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center">
            <GlobeAltIcon className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Real Results from Real Businesses
            </h3>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <blockquote className="text-xl md:text-2xl font-medium mb-6 italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="text-center sm:text-left">
                    <div className="font-semibold text-lg">
                      {testimonials[currentTestimonial].author}
                    </div>
                    <div className="text-emerald-100">
                      {testimonials[currentTestimonial].company}
                    </div>
                    <div className="text-sm text-emerald-200">
                      {testimonials[currentTestimonial].industry}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-white' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
