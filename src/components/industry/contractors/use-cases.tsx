import React from "react";
import { Container } from "@/components/layout/container";
import { UseCase } from "@/data/contractorsContent";

interface UseCasesProps {
  useCases: UseCase[];
}

const UseCases: React.FC<UseCasesProps> = ({ useCases }) => {
  return (
    <section className="py-16 bg-surface">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          Use Cases / Contractor Types
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-neutral-100 border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-medium"
            >
              <h3 className="font-semibold text-text-primary mb-4 text-lg">{useCase.title}</h3>
              <ul className="space-y-2">
                {useCase.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start text-sm text-text-secondary">
                    <span className="text-primary mr-2 mt-1">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default UseCases;