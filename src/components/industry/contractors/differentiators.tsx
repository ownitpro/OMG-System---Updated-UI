import React from "react";
import { Container } from "@/components/layout/container";

const Differentiators: React.FC = () => {
  const differentiators = [
    "Purpose-built for contractors (not generic)",
    "Seamless integration: leads, CRM, payments, content",
    "Canadian data privacy / compliance & encryption",
    "Usage metering + guardrails",
    "Customizable workflows & templates",
    "Scales from small to large operations",
    "Real-time dashboard & analytics",
    "24/7 support & training included"
  ];

  return (
    <section className="py-16 bg-neutral-100">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          Differentiators / Why Choose Us
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((differentiator, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-medium text-center"
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                {index + 1}
              </div>
              <p className="text-text-primary text-sm font-medium">{differentiator}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Differentiators;