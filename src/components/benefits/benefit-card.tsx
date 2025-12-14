import React from "react";
interface BenefitCardProps {
  icon: string
  title: string
  description: string
}

export function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mx-auto mb-4">
        <div className="h-8 w-8 text-blue-600 text-center text-2xl">
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
