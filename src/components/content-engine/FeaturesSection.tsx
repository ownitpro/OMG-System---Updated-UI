"use client";

import { useState } from "react";
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  PhotoIcon, 
  VideoCameraIcon, 
  SpeakerWaveIcon, 
  GlobeAltIcon 
} from "@heroicons/react/24/outline";

const features = [
  {
    id: 1,
    title: "AI Content Generation",
    description: "Smart, on-brand copy at the click of a button.",
    icon: SparklesIcon,
    color: "emerald",
    details: [
      "Natural language processing",
      "Brand voice consistency",
      "Context-aware generation",
      "Multi-tone adaptation"
    ]
  },
  {
    id: 2,
    title: "Multi-Format Support",
    description: "Blog posts, social media, emails, marketing copy and more.",
    icon: DocumentTextIcon,
    color: "blue",
    details: [
      "Blog posts & articles",
      "Social media content",
      "Email campaigns",
      "Marketing copy"
    ]
  },
  {
    id: 3,
    title: "Visual Content Creation",
    description: "AI-powered images, infographics, and graphics designed for maximum impact.",
    icon: PhotoIcon,
    color: "purple",
    details: [
      "AI-generated images",
      "Custom infographics",
      "Social media graphics",
      "Branded visual assets"
    ]
  },
  {
    id: 4,
    title: "Video Content Tools",
    description: "Auto-generate scripts, plan videos or build marketing clips—fast.",
    icon: VideoCameraIcon,
    color: "red",
    details: [
      "Script generation",
      "Storyboard creation",
      "Video planning",
      "Marketing clips"
    ]
  },
  {
    id: 5,
    title: "Audio Content",
    description: "Podcasts, voice-overs, and audio ads, localized for every market.",
    icon: SpeakerWaveIcon,
    color: "orange",
    details: [
      "Podcast scripts",
      "Voice-over content",
      "Audio ads",
      "Localized audio"
    ]
  },
  {
    id: 6,
    title: "Multi-Language Support",
    description: "Reach global audiences with culturally relevant, locally-authentic content.",
    icon: GlobeAltIcon,
    color: "cyan",
    details: [
      "50+ languages supported",
      "Cultural adaptation",
      "Local market insights",
      "Regional optimization"
    ]
  }
];

const colorClasses = {
  emerald: "from-emerald-500 to-emerald-600",
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  red: "from-red-500 to-red-600",
  orange: "from-orange-500 to-orange-600",
  cyan: "from-cyan-500 to-cyan-600"
};

const bgColorClasses = {
  emerald: "bg-emerald-500/10 border-emerald-500/30",
  blue: "bg-blue-500/10 border-blue-500/30",
  purple: "bg-purple-500/10 border-purple-500/30",
  red: "bg-red-500/10 border-red-500/30",
  orange: "bg-orange-500/10 border-orange-500/30",
  cyan: "bg-cyan-500/10 border-cyan-500/30"
};

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Create Content That Converts — Faster Than Ever
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Our Content Engine blends advanced AI with human-level creative insight, delivering content that engages and drives business outcomes.
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-emerald-50/10 border border-emerald-500/30 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-emerald-400 font-medium">Features At-a-Glance</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredFeature === feature.id;
            
            return (
              <div
                key={feature.id}
                className={`group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isHovered ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: 1,
                  transform: 'translateY(0)'
                }}
              >
                {/* Feature Icon */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`relative w-16 h-16 rounded-full bg-gradient-to-r ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-900">{feature.id}</span>
                    </div>
                  </div>
                </div>

                {/* Feature Content */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Feature Details */}
                <div className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-300">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white font-medium">All features included in every plan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
