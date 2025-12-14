import React from "react";
import { Container } from '@/components/layout/container'

interface Differentiator {
  title: string
  description: string
  iconName: string
}

interface DifferentiatorsProps {
  title: string
  subtitle: string
  differentiators: Differentiator[]
}

export function Differentiators({ title, subtitle, differentiators }: DifferentiatorsProps) {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: string } = {
      purpose: "🎯",
      integration: "🔗",
      privacy: "🛡️",
      usage: "📊",
      customizable: "⚙️",
      scalable: "📈"
    }
    return icons[iconName] || "⭐"
  }

  return (
    <section className="py-20 bg-gray-50">
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
          {differentiators.map((differentiator, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mx-auto mb-6">
                <span className="text-3xl">{getIcon(differentiator.iconName)}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                {differentiator.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-center">
                {differentiator.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
