import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

interface StatBandProps {
  title?: string;
  stats: readonly { label: string; value: string; footnote?: string }[];
}

export function StatBand({
  title,
  stats
}: StatBandProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      {title && (
        <h3 className="text-2xl font-semibold text-center text-gray-900 mb-8">{title}</h3>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            {stat.footnote && (
              <div className="text-xs text-gray-500 mt-1">{stat.footnote}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
