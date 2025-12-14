import React from "react";
import { Container } from '@/components/layout/container'
import { TestimonialCard } from './testimonial-card'
import { Testimonial } from '@/types/homepage'

interface TestimonialsSectionProps {
  title: string
  subtitle: string
  testimonials: Testimonial[]
}

export function TestimonialsSection({ title, subtitle, testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
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
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              logoUrl={testimonial.logoUrl}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
