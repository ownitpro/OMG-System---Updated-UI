import React from "react";
import { Container } from "@/components/layout/container";
import { Benefit } from "@/data/contractorsContent";

interface BenefitsSectionProps {
  benefits: Benefit[];
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ benefits }) => {
  return (
    <section className="py-16 bg-neutral-100">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          Outcomes / Benefits
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-medium text-center"
            >
              <h3 className="font-semibold text-text-primary mb-3 text-lg">{benefit.title}</h3>
              <p className="text-text-secondary text-sm">{benefit.subtitle}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BenefitsSection;