"use client";

import { useState, useEffect } from "react";
import { 
  ChatBubbleLeftRightIcon,
  CogIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

const steps = [
  {
    id: 1,
    title: "Discovery Call",
    description: "We understand your business, current processes, and automation opportunities.",
    icon: ChatBubbleLeftRightIcon,
    duration: "30 minutes",
    color: "blue",
    features: [
      "Business process analysis",
      "Pain point identification",
      "Automation opportunity mapping",
      "ROI projections"
    ]
  },
  {
    id: 2,
    title: "Custom Design",
    description: "We design a tailored automation solution that fits your specific needs and industry.",
    icon: CogIcon,
    duration: "1-2 weeks",
    color: "emerald",
    features: [
      "Custom workflow design",
      "Integration planning",
      "User experience mapping",
      "Technical architecture"
    ]
  },
  {
    id: 3,
    title: "Launch & Support",
    description: "We deploy your automation and provide ongoing support to ensure success.",
    icon: RocketLaunchIcon,
    duration: "1-3 weeks",
    color: "purple",
    features: [
      "Automated deployment",
      "Team training",
      "Performance monitoring",
      "Ongoing optimization"
    ]
  }
];

const timeline = [
  {
    week: "Week 1",
    title: "Discovery & Planning",
    description: "Understanding your business and designing the solution",
    status: "completed"
  },
  {
    week: "Week 2-3",
    title: "Development & Testing",
    description: "Building and testing your custom automation",
    status: "active"
  },
  {
    week: "Week 4",
    title: "Launch & Training",
    description: "Deploying your automation and training your team",
    status: "upcoming"
  }
];

export default function HomepageProcessSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How We Transform Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven process takes you from manual processes to intelligent automation 
            in just 1-3 weeks.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              } ${activeStep === index ? 'ring-2 ring-blue-500 scale-105' : ''}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {step.id}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 bg-${step.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                <step.icon className={`w-8 h-8 text-${step.color}-600`} />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {step.description}
                </p>
                <div className="text-sm font-semibold text-gray-500 mb-4">
                  Duration: {step.duration}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <ArrowRightIcon className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Typical Implementation Timeline
            </h3>
            <p className="text-gray-600">
              Most businesses see results within 1-3 weeks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-md ${
                  item.status === 'active' ? 'ring-2 ring-blue-500' : ''
                } ${item.status === 'completed' ? 'opacity-75' : ''}`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                  <span className="text-sm font-semibold text-gray-500">
                    {item.week}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors group"
          >
            <PlayIcon className="w-5 h-5 mr-2" />
            Start Your Transformation
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
