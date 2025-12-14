import React from "react";
import { Container } from '@/components/layout/container'
import { ProcessStep } from './process-step'

interface Step {
  number: string
  icon: string
  title: string
  description: string
}

interface ProcessFlowProps {
  title: string
  subtitle: string
  steps: Step[]
}

export function ProcessFlow({ title, subtitle, steps }: ProcessFlowProps) {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
