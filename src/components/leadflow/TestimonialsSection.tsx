"use client";

import { useState, useEffect } from "react";
import { StarIcon, ArrowTrendingUpIcon, CurrencyDollarIcon, ClockIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    id: 1,
    quote: "Within 7 days, we got 20 qualified leads, closed 2 clients — the ad spend paid for itself.",
    author: "Sarah Johnson",
    company: "Property Manager",
    industry: "Real Estate",
    results: "20 qualified leads in 7 days"
  },
  {
    id: 2,
    quote: "We used to wait weeks for leads. Now, we have leads coming every day.",
    author: "Michael Chen",
    company: "Real Estate Broker",
    industry: "Real Estate",
    results: "Daily lead flow"
  },
  {
    id: 3,
    quote: "The integration capabilities are outstanding… the real-time reporting has transformed our decision-making.",
    author: "Emily Rodriguez",
    company: "Accounting Director",
    industry: "Accounting",
    results: "3× higher conversion rate"
  },
  {
    id: 4,
    quote: "Finally, a system that works consistently. Our lead quality has improved dramatically.",
    author: "David Thompson",
    company: "Healthcare Practice",
    industry: "Healthcare",
    results: "60% less time on manual follow-up"
  },
  {
    id: 5,
    quote: "The ROI is incredible. We're scaling our ad spend with confidence now.",
    author: "Lisa Martinez",
    company: "Cleaning Services",
    industry: "Cleaning",
    results: "5× ROI on ad spend"
  }
];

const resultBadges = [
  {
    text: "20 qualified leads in 7 days",
    icon: ArrowTrendingUpIcon,
    color: "bg-emerald-500"
  },
  {
    text: "3× higher conversion rate",
    icon: CurrencyDollarIcon,
    color: "bg-blue-500"
  },
  {
    text: "60% less time spent on manual follow-up",
    icon: ClockIcon,
    color: "bg-purple-500"
  }
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Proof + Results (Social Proof)
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real businesses that implemented LeadFlow Engine
          </p>
        </div>

        {/* Result Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {resultBadges.map((badge, index) => (
            <div
              key={index}
              className={`${badge.color} text-white px-6 py-3 rounded-full flex items-center gap-2 font-semibold`}
            >
              <badge.icon className="w-5 h-5" />
              {badge.text}
            </div>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
              ))}
            </div>
            
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 italic">
              "{testimonials[currentTestimonial].quote}"
            </blockquote>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="text-center sm:text-left">
                <div className="font-semibold text-xl text-gray-900">
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentTestimonial].company}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonials[currentTestimonial].industry}
                </div>
              </div>
              
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold">
                {testimonials[currentTestimonial].results}
              </div>
            </div>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-emerald-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.company}
                  </div>
                </div>
                <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {testimonial.results}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join These Success Stories?
            </h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Stop struggling with inconsistent results. Get a system that delivers qualified leads consistently, just like these businesses.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact-sales" 
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get Your Success Story Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
