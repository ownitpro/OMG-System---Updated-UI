import React from "react";
import { Container } from '@/components/layout/container'

interface Testimonial {
  quote: string
  author: string
  logoUrl?: string
  photoUrl?: string
}

interface TestimonialsSectionProps {
  title: string
  subtitle: string
  testimonials: Testimonial[]
}

export function TestimonialsSection({ title, subtitle, testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200"
            >
              {/* Quote */}
              <div className="mb-6">
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {testimonial.author}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
