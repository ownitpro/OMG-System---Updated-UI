import React from "react";
interface ProcessStepProps {
  number: string
  icon: string
  title: string
  description: string
}

export function ProcessStep({ number, icon, title, description }: ProcessStepProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-blue-100 mb-4">
        {number}
      </div>
      <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mx-auto mb-4">
        <div className="h-8 w-8 text-white text-center text-2xl">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  )
}
