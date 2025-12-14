import React from "react";
import { Container } from '@/components/layout/container';
import { StarIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  quote: string;
  author: string;
  logoUrl?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Results from Real Estate Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our Real Estate Suite has transformed businesses across Ontario and Canada.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {/* Quote */}
              <div className="mb-6">
                <div className="text-4xl text-blue-600 mb-4">"</div>
                <p className="text-gray-700 leading-relaxed italic">
                  {testimonial.quote}
                </p>
                <div className="text-4xl text-blue-600 text-right mt-2">"</div>
              </div>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                  </div>
                </div>
                {testimonial.logoUrl && (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center ml-4">
                    <img 
                      src={testimonial.logoUrl} 
                      alt={`${testimonial.author} logo`}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Statistics Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              Proven Performance Across Canadian Markets
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
                <div className="text-sm text-gray-600 mb-1">Qualified Leads</div>
                <div className="text-xs text-gray-500">Average per month per agent</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">7</div>
                <div className="text-sm text-gray-600 mb-1">Days</div>
                <div className="text-xs text-gray-500">Average offer-to-close time</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">60%</div>
                <div className="text-sm text-gray-600 mb-1">Fewer No-Shows</div>
                <div className="text-xs text-gray-500">With automated reminders</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">30%</div>
                <div className="text-sm text-gray-600 mb-1">Higher Conversion</div>
                <div className="text-xs text-gray-500">Lead to close rate</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Market Context */}
        <div className="mt-12 text-center">
          <div className="bg-white p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Perfect Timing for Ontario Real Estate
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              With over 14,000 home sales in Ontario in September 2025, the market is active. 
              Our Real Estate Suite helps you capture more of these opportunities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Market Opportunity:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• 14,349 residential sales in Ontario (Sept 2025)</li>
                  <li>• Average home price: $828,896</li>
                  <li>• 1 in 5 homes are investor-owned</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Your Advantage:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Faster response times = more deals</li>
                  <li>• Automated follow-up = better conversion</li>
                  <li>• Professional presentation = higher trust</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
