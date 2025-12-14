"use client";

import { useState, useEffect } from "react";
import { 
  ClockIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  HeartIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const results = [
  {
    id: 1,
    metric: "10×",
    label: "Faster Creation",
    description: "From hours to minutes",
    icon: ClockIcon,
    color: "emerald",
    details: [
      "AI generates content in seconds",
      "No more writer's block",
      "Instant content variations",
      "Streamlined workflow"
    ]
  },
  {
    id: 2,
    metric: "75%",
    label: "Lower Costs",
    description: "Spend less, create more",
    icon: CurrencyDollarIcon,
    color: "blue",
    details: [
      "Reduce content creation costs",
      "Eliminate freelance writer fees",
      "Scale without hiring",
      "Maximize ROI on content"
    ]
  },
  {
    id: 3,
    metric: "90%",
    label: "Brand Consistency",
    description: "Unified voice across every channel",
    icon: ChartBarIcon,
    color: "purple",
    details: [
      "Consistent brand voice",
      "Unified messaging",
      "Brand guideline compliance",
      "Professional quality"
    ]
  },
  {
    id: 4,
    metric: "60%",
    label: "Higher Engagement",
    description: "Optimised for performance",
    icon: HeartIcon,
    color: "red",
    details: [
      "AI-optimized for engagement",
      "Performance-driven content",
      "Audience-specific messaging",
      "Data-backed improvements"
    ]
  }
];

const testimonials = [
  {
    id: 1,
    quote: "We tripled our output and finally have a consistent voice everywhere.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp"
  },
  {
    id: 2,
    quote: "The AI understands our brand better than some of our previous writers.",
    author: "Michael Chen",
    role: "Content Manager",
    company: "StartupXYZ"
  },
  {
    id: 3,
    quote: "Content creation went from our biggest challenge to our biggest strength.",
    author: "Emily Rodriguez",
    role: "CEO",
    company: "GrowthCo"
  }
];

const colorClasses = {
  emerald: "from-emerald-500 to-emerald-600",
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  red: "from-red-500 to-red-600"
};

export default function ResultsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedMetrics, setAnimatedMetrics] = useState({
    faster: 0,
    costs: 0,
    consistency: 0,
    engagement: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateMetric = (target: number, key: keyof typeof animatedMetrics, duration: number) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedMetrics(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 16);
      };

      animateMetric(10, 'faster', 2000);
      animateMetric(75, 'costs', 2500);
      animateMetric(90, 'consistency', 3000);
      animateMetric(60, 'engagement', 3500);
    }
  }, [isVisible]);

  return (
    <section className="py-16 md:py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Transform Your Content Strategy — And Results
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Results & Outcomes
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {results.map((result, index) => {
            const Icon = result.icon;
            
            return (
              <div
                key={result.id}
                className={`group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Result Icon */}
                <div className="flex items-center justify-center mb-4">
                  <div className={`relative w-16 h-16 rounded-full bg-gradient-to-r ${colorClasses[result.color as keyof typeof colorClasses]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Result Content */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {result.id === 1 && animatedMetrics.faster > 0 ? `${animatedMetrics.faster}×` : result.metric}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {result.label}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {result.description}
                  </p>
                </div>

                {/* Result Details */}
                <div className="space-y-2">
                  {result.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start space-x-2">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">What Our Customers Say</h3>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-6 text-yellow-400">⭐</div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 4) * 200}ms` }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">💬</div>
                  <blockquote className="text-gray-300 mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  <div className="text-emerald-400 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white font-medium">Join thousands of businesses transforming their content strategy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
