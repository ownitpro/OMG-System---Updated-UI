"use client";

import { useState, useEffect } from "react";

export default function WhyChooseCRM() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedFeatures, setAnimatedFeatures] = useState(Array(5).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate features one by one
          animatedFeatures.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedFeatures(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('why-choose-crm');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: "Single Source of Truth",
      description: "Unify leads, clients & documents in one place.",
      color: "bg-teal-50 text-teal-600",
      animation: "animate-pulse"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      title: "Automated Lead Follow-up",
      description: "Respond to leads up to 7× faster.",
      color: "bg-cyan-50 text-cyan-600",
      animation: "animate-bounce"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      ),
      title: "Industry-Ready Workflows",
      description: "Pre-built for property management, real estate & more.",
      color: "bg-blue-50 text-blue-600",
      animation: "animate-spin"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
      title: "Mobile Access",
      description: "Access your CRM anywhere, anytime.",
      color: "bg-teal-50 text-teal-600",
      animation: "animate-pulse"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      ),
      title: "Reporting & Analytics",
      description: "Make data-driven decisions with real-time insights.",
      color: "bg-cyan-50 text-cyan-600",
      animation: "animate-bounce"
    }
  ];

  return (
    <section id="why-choose-crm" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-100 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-cyan-100 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-100 rounded-full animate-ping opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Built for real-world business workflows across industries.
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Everything you need to manage your business relationships and drive growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100 ${
                animatedFeatures[index] 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Animated Icon Container */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300 ${feature.animation}`}>
                {feature.icon}
              </div>
              
              {/* Animated Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              {/* Animated Description */}
              <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">
                {feature.description}
              </p>
              
              {/* Animated Background Overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/0 to-cyan-400/0 group-hover:from-teal-400/5 group-hover:to-cyan-400/5 transition-all duration-500 pointer-events-none"></div>
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-teal-200 transition-all duration-300 pointer-events-none"></div>
              
              {/* Floating Animation Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300" style={{animationDelay: '0.5s'}}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
