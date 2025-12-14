import React from "react";
import { Container } from "@/components/layout/container";
import { Testimonial } from "@/data/contractorsContent";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-16 bg-surface">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          What Contractors Are Saying
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-neutral-100 border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-medium"
            >
              <blockquote className="text-text-primary mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              <cite className="text-text-secondary text-sm font-medium">
                — {testimonial.author}
              </cite>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;