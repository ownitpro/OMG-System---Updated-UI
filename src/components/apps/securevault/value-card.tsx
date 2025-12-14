import React from "react";

interface ValueCardProps {
  title: string;
  body: string;
  icon?: string;
}

export function ValueCard({
  title,
  body,
  icon
}: ValueCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow duration-300">
      {icon && (
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
          <img src={icon} alt="" className="h-6 w-6" />
        </div>
      )}
      <h3 className="font-semibold text-gray-900 text-lg mb-3">{title}</h3>
      <p className="text-gray-600 text-sm">{body}</p>
    </article>
  );
}
