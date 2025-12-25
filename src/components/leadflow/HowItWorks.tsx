"use client";

import { useEffect, useRef, useState } from "react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start animation sequence
          const steps = [0, 1, 2, 3, 4, 5];
          steps.forEach((step, index) => {
            setTimeout(() => setActiveStep(step), index * 500);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: 1,
      title: "Strategy & Audience Discovery",
      description: "Custom plan for ideal client/market.",
    },
    {
      number: 2,
      title: "Video & Creative Production",
      description: "Eye-catching video ads make your brand stand out.",
    },
    {
      number: 3,
      title: "Meta Lead Campaigns",
      description: "Targeted Facebook/Instagram ads capture real leads.",
    },
    {
      number: 4,
      title: "Instant CRM Integration & Follow-Up",
      description: "Leads flow directly to your CRM with instant responses.",
    },
    {
      number: 5,
      title: "Nurture & Retarget Funnels",
      description: "Automated emails/SMS keep prospects engaged and moving.",
    },
    {
      number: 6,
      title: "Tracking, Optimization & Scale",
      description: "We track every campaign and invest where ROI is highest.",
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-black">
      {/* Emerald glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-gradient-to-br from-[#47BD79]/8 via-emerald-500/5 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            How it works
          </h2>
          <p className="text-xl text-white/70">
            Six steps from nothing to something.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-[#47BD79]/20 hover:border-[#47BD79]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(71,189,121,0.15)]"
            >
              <div className="flex items-start mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(71,189,121,0.3)] ${
                  activeStep >= index
                    ? 'bg-gradient-to-br from-[#47BD79] to-emerald-600'
                    : 'bg-white/10 border border-white/20'
                }`}>
                  <span className="text-xl font-bold text-white">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
