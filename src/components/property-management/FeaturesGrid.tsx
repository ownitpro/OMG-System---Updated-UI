"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Intake Portal",
    description: "Fast self-service intake for tenants & owners.",
    animation: "tenant-form-submission",
    alt: "Animation showing tenant form submission success",
  },
  {
    title: "Work-Order Wizard",
    description: "Trigger work-orders, assign vendors, track status.",
    animation: "work-order-routing",
    alt: "Animation showing maintenance ticket routing to vendor completion",
  },
  {
    title: "Owner Statement Engine",
    description: "Auto-generate owner statements and approve in one click.",
    animation: "statement-generation",
    alt: "Animation showing statement auto-fill and approval process",
  },
  {
    title: "Billing & Payments",
    description: "Automated invoices and payments, synced to your accounting.",
    animation: "payment-processing",
    alt: "Animation showing invoice generation and payment success",
  },
  {
    title: "Performance Analytics",
    description: "Benchmark performance and grow smarter.",
    animation: "analytics-dashboard",
    alt: "Animation showing charts rising and performance badge appearing",
  },
];

export default function FeaturesGrid() {
  const [visibleTiles, setVisibleTiles] = useState<Set<number>>(new Set());
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleTiles(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    tileRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Abstract background graphics */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-purple-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-orange-200 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Features & Interactive Animations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our platform transforms property management with powerful, intuitive tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (tileRefs.current[index] = el)}
              data-index={index}
              className={`
                feature-tile group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md 
                transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
                ${visibleTiles.has(index) ? 'animate-fade-in-up' : 'opacity-0'}
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
              `}
              tabIndex={0}
              role="button"
              aria-label={`${feature.title} - ${feature.description}`}
            >
              {/* Animation Container */}
              <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
                <div className="w-full h-full flex items-center justify-center">
                  {/* Placeholder for animation - in production, this would be Lottie/SVG/MP4 */}
                  <div className="text-4xl opacity-20">
                    {feature.animation === "tenant-form-submission" && "📝"}
                    {feature.animation === "work-order-routing" && "🔧"}
                    {feature.animation === "statement-generation" && "📊"}
                    {feature.animation === "payment-processing" && "💳"}
                    {feature.animation === "analytics-dashboard" && "📈"}
                  </div>
                </div>
                
                {/* Animation overlay for reduced motion */}
                <div className="absolute inset-0 bg-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>

              {/* Accessibility: Hidden description for screen readers */}
              <div className="sr-only">
                {feature.alt}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .feature-tile:hover,
        .feature-tile:focus {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
        }

        @media (prefers-reduced-motion: reduce) {
          .feature-tile {
            animation: none;
            transition: none;
          }
          
          .animate-fade-in-up {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
