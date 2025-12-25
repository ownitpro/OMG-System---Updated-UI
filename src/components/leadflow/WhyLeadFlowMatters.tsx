"use client";

import { useEffect, useRef, useState } from "react";

export default function WhyLeadFlowMatters() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const metrics = [
    {
      value: 78,
      suffix: "%",
      label: "of businesses lose leads due to slow follow-up",
    },
    {
      value: 45,
      suffix: "%",
      label: "higher client retention with integrated CRM",
    },
    {
      value: 3,
      suffix: "×",
      label: "average ROI on optimized ad spend",
    },
    {
      value: 60,
      suffix: "%",
      label: "less manual entry after automation",
    },
    {
      value: 20,
      suffix: "+",
      label: "industries served from real estate to healthcare",
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-black">
      {/* Emerald glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[120px] h-[200px] bg-gradient-to-r from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[120px] h-[200px] bg-gradient-to-l from-[#47BD79]/10 via-emerald-500/6 to-transparent rounded-full blur-2xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            The numbers don't lie. See how businesses transform their lead generation.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-[#47BD79]/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-[#47BD79] mb-2">
                  {isVisible ? (
                    <CountUpAnimation
                      end={metric.value}
                      duration={2000}
                      delay={index * 200}
                    />
                  ) : (
                    "0"
                  )}
                  <span className="text-2xl">{metric.suffix}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {metric.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUpAnimation({ end, duration, delay }: { end: number; duration: number; delay: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, hasStarted]);

  return <span>{count}</span>;
}
