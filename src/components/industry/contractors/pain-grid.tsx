import React from "react";
import { Container } from "@/components/layout/container";
import { PainCard } from "@/data/contractorsContent";

interface PainGridProps {
  pains: PainCard[];
}

const PainGrid: React.FC<PainGridProps> = ({ pains }) => {
  return (
    <section className="py-16 bg-surface">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          The Contractor Pain Points We Solve
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map((pain, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-medium"
            >
              <div className="text-sm font-semibold text-primary mb-2">Pain:</div>
              <h3 className="font-semibold text-text-primary mb-3">{pain.title}</h3>
              <p className="text-text-secondary text-sm mb-4">{pain.problem}</p>
              <div className="text-sm font-semibold text-primary mb-2">We solve it by:</div>
              <p className="text-text-primary text-sm">{pain.solution}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PainGrid;