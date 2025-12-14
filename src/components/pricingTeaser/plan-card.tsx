import React from "react";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckIcon } from '@heroicons/react/24/outline'

interface PlanCardProps {
  name: string
  priceMonthly: number
  features: string[]
  link: string
}

export function PlanCard({ 
  name, 
  priceMonthly, 
  features, 
  link 
}: PlanCardProps) {
  const isPopular = name === "Growth" // Make Growth plan popular
  
  return (
    <div className={`relative bg-white rounded-2xl p-8 shadow-sm border-2 ${
      isPopular ? 'border-blue-500' : 'border-gray-200'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="text-4xl font-bold text-blue-600 mb-2">
          ${priceMonthly}
          <span className="text-lg font-normal text-gray-500">/month</span>
        </div>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        asChild 
        className={`w-full ${
          isPopular 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-gray-900 hover:bg-gray-800'
        }`}
      >
        <Link href={link}>Get Started</Link>
      </Button>
    </div>
  )
}
