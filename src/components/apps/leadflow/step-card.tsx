import React from "react";

interface StepCardProps {
  index: number;
  title: string;
  body: string;
  icon?: string;
}

export function StepCard({
  index,
  title,
  body,
  icon
}: StepCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 p-6 bg-white h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-green-600 text-white grid place-items-center font-semibold text-sm">
          {index}
        </div>
        {icon && (
          <div className="w-6 h-6">
            <img src={icon} alt="" className="h-6 w-6" />
          </div>
        )}
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <p className="text-gray-600 text-sm">{body}</p>
    </div>
  );
}
