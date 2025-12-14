import React from "react";
import { Container } from "@/components/layout/container";
import { ProcessStep } from "@/data/contractorsContent";

interface ProcessFlowProps {
  steps: ProcessStep[];
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ steps }) => {
  return (
    <section id="how-it-works" className="py-16 bg-surface">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          Your Contractor Success Flow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="font-semibold text-text-primary mb-2 text-lg">{step.title}</h3>
              <p className="text-text-secondary text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProcessFlow;