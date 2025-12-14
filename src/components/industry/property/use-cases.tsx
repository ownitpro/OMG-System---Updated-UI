import React from "react";
import { Container } from '@/components/layout/container'

interface UseCase {
  title: string
  points: string[]
}

interface UseCasesProps {
  title: string
  subtitle: string
  useCases: UseCase[]
}

export function UseCases({ title, subtitle, useCases }: UseCasesProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {useCase.title}
              </h3>
              
              {/* Points */}
              <ul className="space-y-3">
                {useCase.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{point}</span>
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
