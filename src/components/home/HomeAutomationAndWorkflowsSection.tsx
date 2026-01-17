"use client";

import Link from "next/link";
import {
  getSolutionsForHomepageSection,
  type SolutionConfig,
} from "@/config/solutions_config";

function AutomationCard({ solution }: { solution: SolutionConfig }) {
  // Use solution-specific accent color or default to green
  const accentColor = solution.accentColor || "#47BD79";

  // Convert hex to RGB for rgba usage
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 71, g: 189, b: 121 }; // Default green
  };

  const rgb = hexToRgb(accentColor);
  const rgbaLight = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
  const rgbaMedium = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
  const rgbaHover = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;

  return (
    <div
      className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border hover:bg-white/10 transition-all duration-600 ease-premium-out flex flex-col h-full"
      style={{
        borderColor: `${accentColor}33`, // 20% opacity
        boxShadow: `0 0 30px ${rgbaLight}`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${accentColor}66`; // 40% opacity
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${accentColor}33`;
      }}
    >
      <h3 className="text-xl font-semibold text-white mb-2">
        {solution.label}
      </h3>
      <p className="text-white/60 mb-4">{solution.summary}</p>

      {solution.bullets && solution.bullets.length > 0 && (
        <ul className="space-y-1 text-sm text-white/60 mb-6">
          {solution.bullets.slice(0, 4).map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1" style={{ color: accentColor }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {solution.ctaHref && solution.ctaLabel && (
        <div className="mt-auto">
          <Link
            href={solution.ctaHref}
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-600 ease-premium-out"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 10px 15px -3px ${rgbaMedium}, 0 4px 6px -4px ${rgbaMedium}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 30px ${rgbaHover}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 10px 15px -3px ${rgbaMedium}, 0 4px 6px -4px ${rgbaMedium}`;
            }}
          >
            {solution.ctaLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

export function HomeAutomationAndWorkflowsSection() {
  const solutions = getSolutionsForHomepageSection("automation_workflows");

  // We expect exactly 2 here: Automations + Custom Solutions
  // but this will gracefully support more if you ever add them.
  return (
    <section className="relative py-16 bg-black overflow-hidden">
      {/* Smooth gradient transition from black */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black via-30% to-black" />

      {/* Background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#47BD79]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A855F7]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title stays the same as your current layout */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Automation &amp; Workflows
        </h2>
        <p className="text-center text-white/60 max-w-2xl mx-auto mb-12">
          Turn busywork into background noise. OMGsystems connects your CRM,
          SecureVault Docs, inboxes, and forms so leads, documents, and tasks
          move automatically—while you and your team focus on clients and
          growth.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution) => (
            <AutomationCard key={solution.id} solution={solution} />
          ))}
        </div>
      </div>
    </section>
  );
}








