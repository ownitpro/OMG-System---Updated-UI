import React from "react";

interface ProofBlockProps {
  quotes: readonly { quote: string; cite?: string }[];
  logos?: readonly string[];
}

export function ProofBlock({
  quotes,
  logos
}: ProofBlockProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <div className="lg:col-span-2 rounded-2xl border border-gray-200 p-6 bg-white">
        <ul className="space-y-5">
          {quotes.map((q, i) => (
            <li key={i} className="text-gray-800">
              <p className="text-lg">"{q.quote}"</p>
              {q.cite && (
                <p className="text-sm text-gray-500 mt-1">— {q.cite}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-gray-200 p-6 bg-white grid grid-cols-2 gap-4 place-content-center">
        {logos?.map((src, index) => (
          <img 
            key={index} 
            src={src} 
            alt="" 
            className="h-8 object-contain opacity-70" 
          />
        ))}
      </div>
    </div>
  );
}
