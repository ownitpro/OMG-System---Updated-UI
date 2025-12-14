import React from "react";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, subtitle, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-12 md:py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">{title}</h2>
            {subtitle && (
              <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        <div className={title || subtitle ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}
