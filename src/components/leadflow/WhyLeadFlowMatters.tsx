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
      color: "text-red-600"
    },
    {
      value: 45,
      suffix: "%",
      label: "higher client retention with integrated CRM",
      color: "text-green-600"
    },
    {
      value: 3,
      suffix: "×",
      label: "average ROI on optimized ad spend",
      color: "text-emerald-600"
    },
    {
      value: 60,
      suffix: "%",
      label: "less manual entry after automation",
      color: "text-blue-600"
    },
    {
      value: 20,
      suffix: "+",
      label: "industries served from real estate to healthcare",
      color: "text-purple-600"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            The numbers don't lie. See how businesses transform their lead generation.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className={`text-4xl font-bold ${metric.color} mb-2`}>
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
                <p className="text-gray-600 text-sm leading-relaxed">
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
