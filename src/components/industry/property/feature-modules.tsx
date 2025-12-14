import React from "react";
import { Container } from '@/components/layout/container'

interface Module {
  name: string
  bullets: string[]
  iconName: string
}

interface FeatureModulesProps {
  title: string
  subtitle: string
  modules: Module[]
}

export function FeatureModules({ title, subtitle, modules }: FeatureModulesProps) {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: string } = {
      intake: "📝",
      "e-sign": "✍️",
      crm: "👥",
      statement: "📊",
      funnel: "🔄",
      reporting: "📈",
      automation: "⚙️",
      content: "📸"
    }
    return icons[iconName] || "🔧"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modules.map((module, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <span className="text-2xl">{getIcon(module.iconName)}</span>
              </div>
              
              {/* Module Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {module.name}
              </h3>
              
              {/* Bullet Points */}
              <ul className="space-y-2">
                {module.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600 text-sm">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
