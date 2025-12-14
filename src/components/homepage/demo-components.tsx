import React from 'react';
import Link from 'next/link';
import { PlayIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface DemoOption {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  features: string[];
  estimatedTime: string;
}

interface DemoComponentsProps {
  title: string;
  subtitle?: string;
  demos: DemoOption[];
  className?: string;
}

export function DemoComponents({ title, subtitle, demos, className = '' }: DemoComponentsProps) {
  return (
    <section className={`py-20 bg-gradient-to-br from-blue-50 to-purple-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <SparklesIcon className="h-4 w-4 mr-2" />
            Interactive Demos
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {demos.map((demo, index) => {
            const IconComponent = demo.icon;
            return (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 h-full">
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 ${demo.color} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {demo.title}
                      </h3>
                      <p className="text-gray-600">
                        {demo.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">What you'll see:</h4>
                    <ul className="space-y-2">
                      {demo.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Time Estimate */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      Estimated time: {demo.estimatedTime}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={demo.href}
                    className="block w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors group/btn flex items-center justify-center"
                  >
                    <PlayIcon className="h-5 w-5 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Try {demo.title}
                    <ArrowRightIcon className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Explore Our Setup Process</h3>
              <p className="text-gray-600 text-sm">
                See how we bring your ideas to life—setup costs may vary
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">
                Demo sessions are always protected and data is safely managed
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">💬</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Effortless Setup After Purchase</h3>
              <p className="text-gray-600 text-sm">
                We've tailored everything to your industry, so getting started takes minimal effort.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default demo options
export const defaultDemoOptions: DemoOption[] = [
  {
    title: "Analytics & Reporting Demo",
    description: "See how our analytics and reporting tools can transform your business insights",
    href: "/analytics-demo",
    icon: PlayIcon,
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    features: [
      "Industry-specific dashboards",
      "Performance metrics and KPIs",
      "Custom report generation",
      "Benchmark comparisons",
      "Actionable insights and recommendations"
    ],
    estimatedTime: "5-8 minutes"
  },
  {
    title: "Workflow Builder Demo",
    description: "Build custom workflows with our drag-and-drop interface",
    href: "/workflow-builder",
    icon: PlayIcon,
    color: "bg-gradient-to-br from-green-500 to-green-600",
    features: [
      "Visual workflow designer",
      "Drag-and-drop automation",
      "Real-time pricing calculator",
      "Pre-built automation templates",
      "Instant deployment options"
    ],
    estimatedTime: "10-15 minutes"
  },
  {
    title: "Smart Automations Demo",
    description: "Choose from ready-to-deploy automations for your business",
    href: "/smart-automations",
    icon: PlayIcon,
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    features: [
      "Modular automation library",
      "Industry-specific solutions",
      "Quick setup and deployment",
      "Proven automation templates",
      "Custom configuration options"
    ],
    estimatedTime: "8-12 minutes"
  }
];
