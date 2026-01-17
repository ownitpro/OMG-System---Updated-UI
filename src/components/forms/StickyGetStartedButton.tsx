"use client";

import React from 'react';

interface StickyGetStartedButtonProps {
  variant?: 'solutions' | 'marketing' | 'industries';
  customGradient?: string;
  customShadow?: string;
}

const variantStyles = {
  solutions: {
    gradient: 'from-emerald-500 to-teal-500',
    hoverGradient: 'hover:from-emerald-600 hover:to-teal-600',
    shadow: 'shadow-emerald-500/30',
    hoverShadow: 'hover:shadow-emerald-500/50',
  },
  marketing: {
    gradient: 'from-blue-500 to-purple-500',
    hoverGradient: 'hover:from-blue-600 hover:to-purple-600',
    shadow: 'shadow-blue-500/30',
    hoverShadow: 'hover:shadow-blue-500/50',
  },
  industries: {
    gradient: 'from-purple-500 to-pink-500',
    hoverGradient: 'hover:from-purple-600 hover:to-pink-600',
    shadow: 'shadow-purple-500/30',
    hoverShadow: 'hover:shadow-purple-500/50',
  },
};

export default function StickyGetStartedButton({
  variant = 'solutions',
  customGradient,
  customShadow
}: StickyGetStartedButtonProps) {
  const styles = variantStyles[variant];
  const gradient = customGradient || styles.gradient;
  const shadow = customShadow || styles.shadow;

  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button
      onClick={scrollToForm}
      className={`
        fixed bottom-6 right-6 z-50
        hidden md:flex items-center gap-2
        px-6 py-3
        bg-gradient-to-r ${gradient} ${customGradient ? `hover:opacity-90` : styles.hoverGradient}
        text-white font-semibold rounded-full
        shadow-lg ${shadow} ${customShadow ? `hover:shadow-xl` : styles.hoverShadow}
        transition-all duration-300
        hover:scale-105
        animate-pulse hover:animate-none
      `}
      aria-label="Get Started - scroll to form"
    >
      <span>Get Started</span>
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  );
}
