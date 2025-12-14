import React from "react";
import { Container } from '@/components/layout/container'

interface PainCard {
  title: string
  problem: string
  solution: string
  iconName: string
}

interface PainGridProps {
  title: string
  subtitle: string
  painCards: PainCard[]
}

export function PainGrid({ title, subtitle, painCards }: PainGridProps) {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: string } = {
      onboarding: "📋",
      contract: "📄",
      communication: "💬",
      statement: "📊",
      lead: "🎯",
      content: "📸"
    }
    return icons[iconName] || "🔧"
  }

  return (
    <section className="py-20 bg-white">
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
          {painCards.map((card, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-xl mx-auto mb-6">
                <span className="text-3xl">{getIcon(card.iconName)}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Pain: {card.title}
              </h3>
              
              {/* Problem */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {card.problem}
              </p>
              
              {/* Solution */}
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <p className="text-green-800 font-medium">
                  <span className="font-semibold">We solve it by:</span> {card.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
