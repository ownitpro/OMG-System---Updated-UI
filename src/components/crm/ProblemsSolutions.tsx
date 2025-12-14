"use client";

import { useState, useEffect } from "react";

export default function ProblemsSolutions() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState(Array(5).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate items one by one
          animatedItems.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedItems(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 300);
          });
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('problems-solutions');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);
  const problems = [
    {
      problem: "Leads lost in spreadsheets",
      solution: "Everything captured automatically in one platform."
    },
    {
      problem: "Slow follow-up means clients disappear",
      solution: "Automated routing & reminders trigger instantly."
    },
    {
      problem: "Multiple systems = wasted time",
      solution: "One system covers CRM, docs, workflows."
    },
    {
      problem: "No visibility into sales pipeline",
      solution: "Real-time tracking from lead to close."
    },
    {
      problem: "Manual data entry errors",
      solution: "Smart automation reduces errors by 90%."
    }
  ];

  return (
    <section id="problems-solutions" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-40 h-40 bg-teal-100 rounded-full animate-pulse opacity-20"></div>
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-cyan-100 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-blue-100 rounded-full animate-ping opacity-25"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            See how our CRM solves the biggest challenges businesses face every day.
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Stop losing business to these common problems.
          </p>
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden lg:block">
          <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-2">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Problem</h3>
              </div>
              <div className="bg-teal-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-teal-900">Our Solution</h3>
              </div>
            </div>
            
            {problems.map((item, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-2 border-b border-gray-200 last:border-b-0 transition-all duration-500 ${
                  animatedItems[index] 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <div className="px-6 py-4 flex items-start space-x-4 group hover:bg-red-50 transition-colors duration-300">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 group-hover:scale-110 transition-transform duration-300 animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{item.problem}</p>
                  </div>
                </div>
                <div className="px-6 py-4 flex items-start space-x-4 bg-teal-50/50 group hover:bg-teal-100 transition-colors duration-300">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 group-hover:scale-110 transition-transform duration-300 animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium text-sm leading-relaxed group-hover:text-teal-800 transition-colors duration-300">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Stacked Layout */}
        <div className="lg:hidden space-y-6">
          {problems.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl p-6 shadow-md transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${
                animatedItems[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <div className="flex items-start space-x-4 mb-4 group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 group-hover:scale-110 transition-transform duration-300 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">Problem</h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{item.problem}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 group-hover:scale-110 transition-transform duration-300 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">Our Solution</h3>
                  <p className="text-gray-700 font-medium text-sm leading-relaxed group-hover:text-teal-800 transition-colors duration-300">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
