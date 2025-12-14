import React from "react";

interface PainCardProps {
  title: string;
  pain: string;
}

export function PainCard({
  title,
  pain
}: PainCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow duration-300">
      <h3 className="font-semibold text-gray-900 text-lg mb-3">{title}</h3>
      <p className="text-gray-600 text-sm">{pain}</p>
    </article>
  );
}
