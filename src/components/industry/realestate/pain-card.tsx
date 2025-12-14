import React from "react";

interface PainCardProps {
  icon?: string;
  title: string;
  pain: string;
  fixLabel?: string;
  solution: string;
}

export function PainCard({
  icon,
  title,
  pain,
  fixLabel = "Our fix:",
  solution
}: PainCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow duration-300">
      {icon && (
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
          <img src={icon} alt="" className="h-6 w-6" />
        </div>
      )}
      
      <h3 className="font-semibold text-gray-900 text-lg mb-3">{title}</h3>
      
      <p className="text-gray-600 text-sm mb-4">{pain}</p>
      
      <div className="text-sm">
        <span className="font-semibold text-green-600">{fixLabel}</span>
        <span className="text-gray-900 ml-1">{solution}</span>
      </div>
    </article>
  );
}
