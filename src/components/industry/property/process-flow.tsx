import React from "react";
import { Container } from '@/components/layout/container'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface ProcessStep {
  step: number
  title: string
  description: string
  iconName: string
}

interface ProcessFlowProps {
  title: string
  subtitle: string
  processSteps: ProcessStep[]
}

export function ProcessFlow({ title, subtitle, processSteps }: ProcessFlowProps) {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: string } = {
      capture: "📥",
      sign: "✍️",
      setup: "⚙️",
      operate: "🚀",
      growth: "📈"
    }
    return icons[iconName] || "🔧"
  }

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

        {/* Desktop Horizontal Flow */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="text-center">
                  {/* Step Number */}
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mx-auto mb-4">
                    <span className="text-3xl">{getIcon(step.iconName)}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm max-w-48">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow (except for last item) */}
                {index < processSteps.length - 1 && (
                  <ArrowRightIcon className="h-8 w-8 text-gray-400 mx-8 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Vertical Flow */}
        <div className="lg:hidden">
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0 mr-6">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mb-3">
                    {step.step}
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                    <span className="text-2xl">{getIcon(step.iconName)}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
