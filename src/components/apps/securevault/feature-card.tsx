import React from "react";

interface FeatureCardProps {
  title: string;
  bullets: readonly string[];
  icon?: string;
  id?: string;
}

export function FeatureCard({
  title,
  bullets,
  icon,
  id
}: FeatureCardProps) {
  return (
    <article id={id} className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow duration-300">
      {icon && (
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
          <img src={icon} alt="" className="h-6 w-6" />
        </div>
      )}
      
      <h3 className="font-semibold text-gray-900 text-lg mb-4">{title}</h3>
      
      <ul className="space-y-2">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start text-sm text-gray-600">
            <span className="text-green-600 mr-2 mt-1">•</span>
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}
