import React from "react";
import { Container } from '@/components/layout/container'

interface Benefit {
  title: string
  subtitle: string
  iconName: string
}

interface OutcomesSectionProps {
  title: string
  subtitle: string
  benefits: Benefit[]
}

export function OutcomesSection({ title, subtitle, benefits }: OutcomesSectionProps) {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: string } = {
      speed: "⚡",
      accuracy: "🎯",
      timely: "⏰",
      transparency: "👁️",
      analytics: "📊",
      scale: "📈"
    }
    return icons[iconName] || "✅"
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
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
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mx-auto mb-6">
                <span className="text-3xl">{getIcon(benefit.iconName)}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {benefit.title}
              </h3>
              
              {/* Subtitle */}
              <p className="text-gray-600 text-center">
                {benefit.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Optional Statistics Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Proven Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
                <div className="text-gray-600">Reduction in statement complaints</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">3×</div>
                <div className="text-gray-600">Increase in owner leads</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">12h → 1h</div>
                <div className="text-gray-600">Contract assembly time</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
