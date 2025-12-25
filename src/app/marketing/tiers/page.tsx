"use client";

import Link from "next/link";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  RocketLaunchIcon,
  FireIcon,
  StarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function MarketingTiersPage() {
  const tiers = [
    {
      name: "Ignite",
      tagline: "Foundation",
      icon: SparklesIcon,
      description:
        "Build the strategic foundation your marketing needs to succeed. Perfect for businesses ready to get serious about growth.",
      price: "Starting at",
      priceValue: "$2,500",
      pricePeriod: "/month",
      features: [
        "Brand audit & positioning analysis",
        "Market research & competitive analysis",
        "Messaging framework development",
        "Content strategy roadmap",
        "Competitive landscape review",
        "Monthly strategy call",
        "Quarterly performance review",
      ],
      cta: "Get Started",
      highlighted: false,
      color: "amber",
    },
    {
      name: "Flow",
      tagline: "Execution",
      icon: RocketLaunchIcon,
      description:
        "Full campaign execution across channels with ongoing optimization. For businesses ready to scale their acquisition.",
      price: "Starting at",
      priceValue: "$5,000",
      pricePeriod: "/month",
      features: [
        "Everything in Ignite",
        "Paid ad campaign management",
        "Content production & publishing",
        "Email sequence automation",
        "Landing page development",
        "A/B testing & optimization",
        "Bi-weekly strategy calls",
        "Monthly performance reports",
      ],
      cta: "Most Popular",
      highlighted: true,
      color: "emerald",
    },
    {
      name: "Scale",
      tagline: "Full-Service",
      icon: FireIcon,
      description:
        "A dedicated marketing team focused on scaling your acquisition. For businesses ready to dominate their market.",
      price: "Starting at",
      priceValue: "$10,000",
      pricePeriod: "/month",
      features: [
        "Everything in Flow",
        "Dedicated marketing strategist",
        "Multi-channel campaign orchestration",
        "Advanced analytics & attribution",
        "CRM & sales integration",
        "Custom reporting dashboards",
        "Weekly strategy calls",
        "Priority support & communication",
        "Quarterly strategy reviews",
      ],
      cta: "Apply Now",
      highlighted: false,
      color: "purple",
    },
  ];

  const faqs = [
    {
      question: "How do I know which tier is right for me?",
      answer:
        "Ignite is best for businesses that need strategic clarity before execution. Flow is ideal if you're ready to run campaigns but need expert management. Scale is for businesses serious about aggressive growth with a dedicated team.",
    },
    {
      question: "Can I upgrade or downgrade my tier?",
      answer:
        "Yes. We review performance quarterly and can adjust your tier based on results and goals. Many clients start with Ignite and upgrade to Flow once the foundation is set.",
    },
    {
      question: "What's the minimum commitment?",
      answer:
        "We recommend a 3-month minimum to see meaningful results. Marketing takes time to compound, and short-term engagements rarely produce the ROI you're looking for.",
    },
    {
      question: "Is ad spend included in these prices?",
      answer:
        "No, these are management fees. Ad spend is separate and depends on your goals and market. We typically recommend a minimum of $2,000/month in ad spend for Flow and Scale tiers.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ===== MAIN CONTENT WRAPPER ===== */}
      <div className="relative">
        {/* Background Elements - spans entire content area */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-[30%] right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse" />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 pt-32 sm:pt-40 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
              <StarIcon className="w-4 h-4" />
              Marketing Packages
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Growth Path
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Three tiers designed to meet you where you are and take you where you want to go.
              No hidden fees. No long-term contracts. Just results.
            </p>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`relative backdrop-blur-xl rounded-2xl border p-8 transition-all duration-500 flex flex-col ${
                  tier.highlighted
                    ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.2)] lg:-mt-4 lg:mb-4"
                    : "bg-white/5 border-white/10 hover:border-emerald-500/30"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white text-sm font-medium">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <tier.icon
                  className={`w-10 h-10 mb-6 ${
                    tier.highlighted ? "text-emerald-400" : "text-emerald-400/70"
                  }`}
                />

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-emerald-400 font-medium">{tier.tagline}</p>
                </div>

                <p className="text-white/60 mb-6 flex-grow">{tier.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <p className="text-sm text-white/50 mb-1">{tier.price}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{tier.priceValue}</span>
                    <span className="text-white/50">{tier.pricePeriod}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <CheckCircleIcon
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          tier.highlighted ? "text-emerald-400" : "text-emerald-400/70"
                        }`}
                      />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={`block w-full py-4 text-center font-semibold rounded-lg transition-all duration-300 mt-auto ${
                    tier.highlighted
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      : "border border-white/20 text-white hover:bg-white/5 hover:border-white/40"
                  }`}
                >
                  {tier.cta === "Most Popular" ? "Get Started" : tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Comparison Note */}
        <div className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
            <ChartBarIcon className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Not sure which tier fits?
            </h3>
            <p className="text-white/60 mb-6">
              Book a free strategy call and we'll help you identify the right level of
              support based on your goals, budget, and current marketing maturity.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              Book Free Strategy Call
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
        </div>

        {/* FAQ Section */}
        <div className="relative z-10 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Common{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:border-emerald-500/30 transition-all duration-300"
              >
                <h3 className="font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-white/60">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-500 to-emerald-600" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to scale your marketing?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Pick a tier and let's build a marketing system that actually drives revenue.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Get Started Today
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/marketing"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              Back to Marketing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
