import React from "react";
import { Container } from '@/components/layout/container'
import { 
  CheckIcon, 
  XMarkIcon, 
  ExclamationTriangleIcon, 
  LightBulbIcon 
} from '@heroicons/react/24/outline'

interface ComparisonItem {
  text: string
}

interface ComparisonGridProps {
  title: string
  subtitle: string
  oldWay: {
    title: string
    subtitle: string
    items: ComparisonItem[]
  }
  newWay: {
    title: string
    subtitle: string
    items: ComparisonItem[]
  }
}

export function ComparisonGrid({ 
  title, 
  subtitle, 
  oldWay, 
  newWay 
}: ComparisonGridProps) {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Old Way */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-red-900">{oldWay.title}</h3>
                <p className="text-red-700">{oldWay.subtitle}</p>
              </div>
            </div>
            
            <ul className="space-y-4">
              {oldWay.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <XMarkIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-red-800">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* New Way */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <LightBulbIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-green-900">{newWay.title}</h3>
                <p className="text-green-700">{newWay.subtitle}</p>
              </div>
            </div>
            
            <ul className="space-y-4">
              {newWay.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-green-800">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
