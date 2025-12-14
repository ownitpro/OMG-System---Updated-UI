import React from "react";
import { Container } from "@/components/layout/container";
import { Module } from "@/data/contractorsContent";

interface ModulesGridProps {
  modules: Module[];
}

const ModulesGrid: React.FC<ModulesGridProps> = ({ modules }) => {
  return (
    <section className="py-16 bg-neutral-100">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
          What's Included / Core Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-medium"
            >
              <h3 className="font-semibold text-text-primary mb-4 text-lg">{module.name}</h3>
              <ul className="space-y-2">
                {module.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start text-sm text-text-secondary">
                    <span className="text-primary mr-2 mt-1">•</span>
                    {bullet}
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

export default ModulesGrid;