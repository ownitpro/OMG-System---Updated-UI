import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  avatar?: string;
  rating: number;
  metrics?: {
    label: string;
    value: string;
  }[];
}

interface TestimonialsSectionProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialsSection({ 
  title, 
  subtitle, 
  testimonials, 
  className = '' 
}: TestimonialsSectionProps) {
  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 h-full">
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 text-center mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Metrics */}
                {testimonial.metrics && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="grid grid-cols-2 gap-4">
                      {testimonial.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {metric.value}
                          </div>
                          <div className="text-sm text-gray-600">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-semibold text-lg">
                          {testimonial.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {testimonial.company}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {testimonial.industry}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Join These Success Stories?
            </h3>
            <p className="text-gray-600 mb-6">
              See how OMGsystems can transform your business operations and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/case-snapshots"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Case Studies
              </a>
              <a
                href="/demo/crm"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-blue-600"
              >
                Start Your Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default testimonials
export const defaultTestimonials: Testimonial[] = [
  {
    quote: "OMGsystems has revolutionized how we manage our properties. The automation features have saved us 20 hours per week, and our tenant satisfaction has increased by 40%.",
    author: "",
    role: "",
    company: "",
    industry: "Property Management",
    rating: 5,
    metrics: [
      { label: "Time Saved", value: "20h/week" },
      { label: "Satisfaction", value: "+40%" }
    ]
  },
  {
    quote: "The SecureVault Docs feature is a game-changer. We now securely share documents instantly, and compliance tracking gives us peace of mind.",
    author: "",
    role: "",
    company: "",
    industry: "Real Estate",
    rating: 5,
    metrics: [
      { label: "Document Processing", value: "90% faster" },
      { label: "Compliance Score", value: "100%" }
    ]
  },
  {
    quote: "The integration capabilities are outstanding. We've connected all our tools seamlessly; real-time reporting has transformed decision-making.",
    author: "",
    role: "",
    company: "",
    industry: "Accounting",
    rating: 5,
    metrics: [
      { label: "Integration Time", value: "2 weeks" },
      { label: "Report Accuracy", value: "99.9%" }
    ]
  },
  {
    quote: "Our contractor business runs like clockwork now. Quote generation went from 3 days to 45 minutes, and our close rate increased by 32%.",
    author: "",
    role: "",
    company: "",
    industry: "Contractors",
    rating: 5,
    metrics: [
      { label: "Quote Time", value: "45 min" },
      { label: "Close Rate", value: "+32%" }
    ]
  },
  {
    quote: "The healthcare automation has been incredible. We reduced admin time by 70% and our staff can focus on patient care instead of paperwork.",
    author: "",
    role: "",
    company: "",
    industry: "Healthcare",
    rating: 5,
    metrics: [
      { label: "Admin Time", value: "-70%" },
      { label: "Patient Throughput", value: "+50%" }
    ]
  },
  {
    quote: "OMGsystems transformed our cleaning business. Scheduling is automated, billing is instant, and our team productivity increased by 60%.",
    author: "",
    role: "",
    company: "",
    industry: "Cleaning",
    rating: 5,
    metrics: [
      { label: "Productivity", value: "+60%" },
      { label: "Billing Time", value: "Instant" }
    ]
  }
];
