import React from "react";

interface SplitTileProps {
  title: string;
  body: string;
  cta?: { label: string; href: string };
}

export function SplitTile({
  title,
  body,
  cta
}: SplitTileProps) {
  return (
    <div className="rounded-2xl border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-4">{body}</p>
      {cta && (
        <a 
          href={cta.href} 
          className="inline-block text-sm font-medium text-green-600 hover:text-green-700 underline underline-offset-4"
        >
          {cta.label}
        </a>
      )}
    </div>
  );
}
