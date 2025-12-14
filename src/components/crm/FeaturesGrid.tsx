"use client";

import { useState, useEffect } from "react";

export default function FeaturesGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedFeatures, setAnimatedFeatures] = useState(Array(6).fill(false));

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
            }, index * 150);
          });
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features-grid');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);
  const features = [
    {
      title: "Contact & Lead Management",
      description: "Capture, organize, and track every interaction with your prospects and customers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      ),
      color: "bg-teal-50 text-teal-600",
      animation: "animate-pulse",
      image: "/images/crm/contact-management.png"
    },
    {
      title: "Pipeline Tracking",
      description: "Visualize your sales pipeline and never lose track of opportunities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      ),
      color: "bg-cyan-50 text-cyan-600",
      animation: "animate-bounce",
      image: "/images/crm/pipeline-tracking.png"
    },
    {
      title: "Automation Builder",
      description: "Create custom workflows that work 24/7 to nurture leads and customers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      ),
      color: "bg-blue-50 text-blue-600",
      animation: "animate-spin",
      image: "/images/crm/automation-builder.png"
    },
    {
      title: "Document Integration",
      description: "Store and organize all customer documents in one secure location.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
      color: "bg-teal-50 text-teal-600",
      animation: "animate-pulse",
      image: "/images/crm/document-integration.png"
    },
    {
      title: "Reporting Dashboard",
      description: "Get insights that matter with customizable reports and analytics.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      color: "bg-cyan-50 text-cyan-600",
      animation: "animate-bounce",
      image: "/images/crm/reporting-dashboard.png"
    },
    {
      title: "Team Collaboration",
      description: "Keep your team aligned with shared notes, tasks, and communication.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
      color: "bg-blue-50 text-blue-600",
      animation: "animate-pulse",
      image: "/images/crm/team-collaboration.png"
    }
  ];

  return (
    <section id="features-grid" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-teal-100 rounded-full animate-pulse opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-cyan-100 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-100 rounded-full animate-ping opacity-25"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Powerful features designed to streamline your business operations.
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Everything you need in one platform.
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
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Animated Screenshot Placeholder */}
              <div className="mb-4 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 h-32 flex items-center justify-center group-hover:from-teal-100 group-hover:to-cyan-100 transition-all duration-300">
                <div className="text-gray-400 text-sm group-hover:text-teal-600 transition-colors duration-300">
                  <img 
                    src={feature.image} 
                    alt={`${feature.title} screenshot`}
                    className="w-full h-full object-cover rounded-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center bg-gray-100 rounded-lg group-hover:bg-teal-100 transition-colors duration-300">
                    <span className="text-gray-400 text-sm group-hover:text-teal-600 transition-colors duration-300">Screenshot placeholder</span>
                  </div>
                </div>
              </div>

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
