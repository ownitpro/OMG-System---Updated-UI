"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  ShieldCheckIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

const products = [
  {
    title: "SecureVault Docs",
    tagline: "Capture once. Organize forever.",
    description: "Secure document storage with PIN-protected links and client portals.",
    href: "/apps/securevault-docs",
    icon: ShieldCheckIcon,
    borderColor: "border-[#47BD79]/30",
    hoverBorderColor: "hover:border-[#47BD79]/60",
    accentColor: "text-[#47BD79]",
    bgGradient: "from-[#47BD79]/10 to-emerald-600/10",
    buttonBg: "bg-[#47BD79]",
    buttonHover: "hover:bg-[#3da86a]",
    shadowColor: "shadow-[#47BD79]/30",
    iconBg: "from-[#47BD79] to-emerald-600",
    glowColor: "rgba(71, 189, 121, 0.4)",
  },
  {
    title: "OMG CRM",
    tagline: "Your Business, Organized.",
    description: "A simple CRM that adapts to your industry—not the other way around.",
    href: "/apps/crm",
    icon: UserGroupIcon,
    borderColor: "border-[#3B82F6]/30",
    hoverBorderColor: "hover:border-[#3B82F6]/60",
    accentColor: "text-[#3B82F6]",
    bgGradient: "from-[#3B82F6]/10 to-blue-600/10",
    buttonBg: "bg-[#3B82F6]",
    buttonHover: "hover:bg-[#2563eb]",
    shadowColor: "shadow-[#3B82F6]/30",
    iconBg: "from-[#3B82F6] to-blue-600",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    title: "OMG Space IQ",
    tagline: "Your daily edge—delivered.",
    description: "Smart industry digests via SMS or WhatsApp. No tab overload.",
    href: "/apps/omg-iq",
    icon: SparklesIcon,
    borderColor: "border-[#A855F7]/30",
    hoverBorderColor: "hover:border-[#A855F7]/60",
    accentColor: "text-[#A855F7]",
    bgGradient: "from-[#A855F7]/10 to-purple-600/10",
    buttonBg: "bg-[#A855F7]",
    buttonHover: "hover:bg-[#9333ea]",
    shadowColor: "shadow-[#A855F7]/30",
    iconBg: "from-[#A855F7] to-purple-600",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
];

// 3D Tilt Card Component
function TiltCard({ product }: { product: typeof products[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPosition({ x: 50, y: 50 });
  };

  const Icon = product.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group bg-gradient-to-br ${product.bgGradient} backdrop-blur-xl rounded-2xl p-6 border ${product.borderColor} flex flex-col relative overflow-hidden`}
      style={{
        transform,
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic glow effect that follows cursor */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${product.glowColor} 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.iconBg} flex items-center justify-center mb-4 shadow-lg ${product.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-1">
          {product.title}
        </h3>

        {/* Tagline */}
        <p className={`text-lg font-semibold ${product.accentColor} mb-3`}>
          {product.tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-white/70 mb-6 flex-grow">
          {product.description}
        </p>

        {/* CTA Button */}
        <Link
          href={product.href}
          className={`inline-flex items-center justify-center px-5 py-2.5 ${product.buttonBg} text-white text-sm font-semibold rounded-lg ${product.buttonHover} transition-all duration-300 shadow-lg ${product.shadowColor} hover:scale-105`}
        >
          Learn More
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}

export function ProductsRowSection() {
  return (
    <section className="relative py-16 bg-black overflow-hidden">
      {/* Seamless gradient - blends from Strategy Session's emerald tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071510] to-transparent" style={{ height: '30%' }} />

      {/* Very subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#47BD79]/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#3B82F6]/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#A855F7]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Our Products
          </h2>
          <p className="mt-3 text-lg text-white/60 max-w-2xl mx-auto">
            Everything you need to run your business, organized and secure.
          </p>
        </div>

        {/* 3-Column Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <TiltCard key={product.title} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
