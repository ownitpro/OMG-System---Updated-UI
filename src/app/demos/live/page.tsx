"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PlayIcon,
  ArrowRightIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

type DemoOption = {
  id: string;
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  color: string;
  gradient: string;
  features: string[];
  duration: string;
  href: string;
};

const demoOptions: DemoOption[] = [
  {
    id: 'crm',
    title: 'Try Live CRM Demo',
    description: 'Experience our comprehensive Customer Relationship Management system with real-time lead tracking, automated workflows, and intelligent analytics.',
    icon: UserGroupIcon,
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
    features: ['Lead Management', 'Pipeline Tracking', 'Team Collaboration'],
    duration: '5-7 minutes',
    href: '/apps/crm'
  },
  {
    id: 'securevault',
    title: 'Try Live SecureVault Docs Demo',
    description: 'Explore our secure document management system with industry-grade encryption, automated organization, and seamless collaboration tools.',
    icon: ShieldCheckIcon,
    color: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-teal-500',
    features: ['Document Security', 'Automated Organization', 'Team Sharing'],
    duration: '4-6 minutes',
    href: '/apps/securevault-docs'
  }
];

export default function LiveDemoPage() {
  const [selectedDemo, setSelectedDemo] = useState<DemoOption | null>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const router = useRouter();

  const handleDemoSelect = (demo: DemoOption) => {
    setSelectedDemo(demo);
    // Add a brief animation delay before navigation
    setTimeout(() => {
      router.push(demo.href);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-6">
                Welcome to OMGsystems
              </h1>
              <p className="text-2xl text-indigo-200 mb-8 max-w-4xl mx-auto">
                Experience the power of intelligent automation with our interactive live demos
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-indigo-300">
                <div className="flex items-center space-x-2">
                  <PlayIcon className="w-5 h-5" />
                  <span>Interactive Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>Live Demos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <StarIcon className="w-5 h-5" />
                  <span>Real Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Demo Selection Area */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Demo Experience
            </h2>
            <p className="text-xl text-indigo-200 mb-8">
              Select from our comprehensive live demos to explore our platform's capabilities
            </p>
          </div>

          {/* Demo Selection Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {demoOptions.map((demo) => (
              <div
                key={demo.id}
                className={`group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 transition-all duration-500 transform hover:scale-105 hover:bg-white/15 cursor-pointer ${
                  selectedDemo?.id === demo.id ? 'scale-105 bg-white/20' : ''
                }`}
                onClick={() => handleDemoSelect(demo)}
                onMouseEnter={() => setIsHovered(demo.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${demo.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon and Header */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${demo.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <demo.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-100 transition-colors duration-300">
                    {demo.title}
                  </h3>
                  
                  <p className="text-indigo-200 mb-6 leading-relaxed">
                    {demo.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {demo.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/20 rounded-full text-sm text-white group-hover:bg-white/30 transition-colors duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Duration and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-indigo-300">
                      <ClockIcon className="w-4 h-4" />
                      <span className="text-sm">{demo.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-white group-hover:text-indigo-100 transition-colors duration-300">
                      <span className="font-semibold">Start Demo</span>
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Hover Animation Elements */}
                  {isHovered === demo.id && (
                    <>
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-indigo-400 rounded-full animate-ping"></div>
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                What You'll Experience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <PlayIcon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Interactive Tours</h4>
                  <p className="text-indigo-300 text-sm">Navigate through real features with guided experiences</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Live Data</h4>
                  <p className="text-indigo-300 text-sm">See real-time analytics and data processing in action</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <StarIcon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Hands-On</h4>
                  <p className="text-indigo-300 text-sm">Try features yourself with no setup required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
