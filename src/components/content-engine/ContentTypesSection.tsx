"use client";

import { useState } from "react";
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
  PhoneIcon
} from "@heroicons/react/24/outline";

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
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need, In One Place
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            All Content Types, One Platform
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {contentCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center px-6 py-3 rounded-lg border transition-all duration-200 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                    : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {category.title}
              </button>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contentCategories
            .filter(category => category.id === activeCategory)
            .map((category) => (
              <div key={category.id} className="col-span-full">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${colorClasses[category.color as keyof typeof colorClasses]} flex items-center justify-center mr-4`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                      <p className="text-gray-300">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item, index) => {
                      const ItemIcon = item.icon;
                      return (
                        <div 
                          key={index}
                          className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
                        >
                          <ItemIcon className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                          <span className="text-white text-sm">{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white font-medium">Create any content type with AI assistance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
