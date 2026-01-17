"use client";

import { useState, Fragment } from "react";
import {
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  MegaphoneIcon,
  MicrophoneIcon,
  PhoneIcon,
  ArrowRightIcon,
  SparklesIcon as SparklesIconOutline
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

const contentCategories = [
  {
    id: 1,
    title: "Written Content",
    description: "Professional copy that converts",
    icon: DocumentTextIcon,
    color: "blue",
    items: [
      { name: "Blog posts, articles", icon: PencilSquareIcon },
      { name: "Social media posts", icon: ChatBubbleLeftRightIcon },
      { name: "Email campaigns", icon: EnvelopeIcon },
      { name: "Website copy & landing pages", icon: GlobeAltIcon },
      { name: "Product descriptions", icon: ShoppingBagIcon },
      { name: "Press releases", icon: MegaphoneIcon }
    ]
  },
  {
    id: 2,
    title: "Visual Content",
    description: "Eye-catching graphics and designs",
    icon: PhotoIcon,
    color: "purple",
    items: [
      { name: "Infographics", icon: PresentationChartBarIcon },
      { name: "Social graphics", icon: PhotoIcon },
      { name: "Slide decks", icon: PresentationChartBarIcon },
      { name: "Banners, mock-ups", icon: PhotoIcon },
      { name: "Branded assets", icon: ShoppingBagIcon }
    ]
  },
  {
    id: 3,
    title: "Video Content",
    description: "Engaging video scripts and planning",
    icon: VideoCameraIcon,
    color: "red",
    items: [
      { name: "Scripts & storyboards", icon: PencilSquareIcon },
      { name: "Social videos", icon: VideoCameraIcon },
      { name: "Explainers & demos", icon: PresentationChartBarIcon },
      { name: "Training modules", icon: GlobeAltIcon }
    ]
  },
  {
    id: 4,
    title: "Audio Content",
    description: "Professional audio and voice content",
    icon: SpeakerWaveIcon,
    color: "orange",
    items: [
      { name: "Podcast episodes", icon: MicrophoneIcon },
      { name: "Voice-over scripts", icon: SpeakerWaveIcon },
      { name: "Audio ads", icon: MegaphoneIcon },
      { name: "IVR & training audio", icon: PhoneIcon }
    ]
  }
];

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  red: "from-red-500 to-red-600",
  orange: "from-orange-500 to-orange-600"
};

const bgColorClasses = {
  blue: "bg-blue-500/10 border-blue-500/30",
  purple: "bg-purple-500/10 border-purple-500/30",
  red: "bg-red-500/10 border-red-500/30",
  orange: "bg-orange-500/10 border-orange-500/30"
};

export default function ContentTypesSection() {
  const [activeCategory, setActiveCategory] = useState(1);

  return (
    <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* Subtle organic background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Omni-Channel <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent italic">Capability</span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
            From short-form social hooks to long-form technical whitepapers—one engine, infinite formats.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-16 border-b border-white/5 pb-8">
          {contentCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative flex items-center px-8 py-4 rounded-2xl transition-all duration-500 overflow-hidden ${isActive
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/80'
                  }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl animate-fade-in" />
                )}
                <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-300'}`} />
                <span className="text-sm font-bold tracking-wide uppercase">{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {contentCategories
            .filter(category => category.id === activeCategory)
            .map((category) => (
              <Fragment key={category.id}>
                <div className="lg:col-span-4 sticky top-32">
                  <div className={`inline-flex p-4 rounded-3xl bg-gradient-to-br ${colorClasses[category.color as keyof typeof colorClasses]} mb-8 shadow-xl shadow-cyan-500/10`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{category.title}</h3>
                  <p className="text-lg text-white/40 leading-relaxed mb-8">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                      <SparklesIcon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-sm font-bold text-white/60 tracking-widest uppercase group-hover:text-white transition-colors">Learn Automation Logic</span>
                  </div>
                </div>

                <div key={`${category.id}-items`} className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={index}
                        className="group flex items-center p-6 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-4 group-hover:bg-cyan-500/10 transition-colors">
                          <ItemIcon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <span className="text-white font-medium group-hover:text-cyan-50 transition-colors">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </Fragment>
            ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 pt-12 border-t border-white/5 text-center">
          <div className="inline-flex items-center px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer">
            <div className="flex -space-x-2 mr-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800" />
              ))}
            </div>
            <span className="text-white font-bold tracking-tight">Join 200+ Growth Teams scaling with the Engine</span>
            <ArrowRightIcon className="w-5 h-5 ml-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}
