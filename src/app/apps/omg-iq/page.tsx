import { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  GlobeAltIcon,
  SparklesIcon,
  BoltIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { FAQAccordion } from "@/components/apps/faq-accordion";

export const metadata: Metadata = {
  title: "OMGIQ – Turn Industry Noise Into Daily Smart Moves | OMGsystems",
  description:
    "OMGIQ finds what matters in your industry, turns it into clear, short digests, and delivers it to you and your team either through Email or SMS.",
  keywords: [
    "industry intelligence",
    "SMS digests",
    "WhatsApp business",
    "industry insights",
    "daily digest",
    "business intelligence",
    "industry news",
    "SMS notifications",
  ],
  authors: [{ name: "OMGsystems" }],
  creator: "OMGsystems",
  publisher: "OMGsystems",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.omgsystems.com/apps/omg-iq",
  },
  openGraph: {
    title: "OMGIQ – Turn Industry Noise Into Daily Smart Moves | OMGsystems",
    description:
      "OMGIQ finds what matters in your industry, turns it into clear, short digests, and delivers it to you and your team either through Email or SMS.",
    url: "https://www.omgsystems.com/apps/omg-iq",
    siteName: "OMGsystems",
    images: [
      {
        url: "https://www.omgsystems.com/images/omg-iq/omg-iq-preview.png",
        width: 1200,
        height: 630,
        alt: "OMGIQ – Industry intelligence delivered via SMS and WhatsApp",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OMGIQ – Turn Industry Noise Into Daily Smart Moves | OMGsystems",
    description:
      "OMGIQ finds what matters in your industry, turns it into clear, short digests, and delivers it to you and your team either through Email or SMS.",
    images: ["https://www.omgsystems.com/images/omg-iq/omg-iq-preview.png"],
  },
};

export default function OMGIQPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Turn industry noise into daily smart moves.
            </h1>
            <p className="text-lg leading-8 text-slate-300 sm:text-xl pt-6">
              OMGIQ finds what matters in your industry, turns it into clear,
              short digests, and delivers it to you and your team either through Email or SMS.
            </p>
            <div className="flex items-center justify-center gap-x-6 pt-10">
              <Link
                href="/apps/demo?app=omg-iq"
                className="rounded-md bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Get Started
              </Link>
              <Link
                href="/apps/omg-iq/sample"
                className="text-base font-semibold leading-6 text-white hover:text-emerald-400"
              >
                See a Sample Digest <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What it does (in one minute) */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-2xl text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What it does (in one minute)
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 pt-12">
              {[
                "Picks your industries (up to 10).",
                "Scans trusted sources daily.",
                "Summarizes into plain English.",
                "Sends it to you by SMS or WhatsApp.",
                "Tracks what you open and improves over time.",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group"
                  className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ 
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 group-hover:bg-emerald-200 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
                    <CheckCircleIcon
                      className="h-6 w-6 text-emerald-600"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 pt-4 group-hover:text-emerald-600 transition-colors">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-2xl text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Who it's for
            </h2>
            <p className="text-lg leading-8 text-gray-600 pt-6">
              If you lead a team and make decisions fast, OMGIQ keeps you sharp
              without the time sink.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 pt-12 justify-items-center">
              {[
                { name: "Real Estate", icon: "🏠", color: "from-blue-500 to-blue-600" },
                { name: "Construction", icon: "🏗️", color: "from-orange-500 to-orange-600" },
                { name: "HVAC", icon: "❄️", color: "from-cyan-500 to-cyan-600" },
                { name: "Creative", icon: "🎨", color: "from-purple-500 to-purple-600" },
                { name: "Consulting", icon: "💼", color: "from-indigo-500 to-indigo-600" },
                { name: "Education", icon: "📚", color: "from-green-500 to-green-600" },
                { name: "Finance", icon: "💰", color: "from-emerald-500 to-emerald-600" },
                { name: "Health", icon: "🏥", color: "from-red-500 to-red-600" },
                { name: "Hospitality", icon: "🍽️", color: "from-amber-500 to-amber-600" },
                { name: "Retail", icon: "🛍️", color: "from-pink-500 to-pink-600" },
              ].map((industry, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl bg-white px-6 py-5 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 w-full max-w-[200px] border border-gray-100 hover:border-emerald-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ 
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${industry.color} text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {industry.icon}
                  </div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {industry.name}
                  </p>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-emerald-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why teams love it */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-2xl text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why teams love it
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 pt-12">
              {[
                {
                  icon: SparklesIcon,
                  title: "Simple",
                  description: "Short, skimmable digests. No fluff.",
                },
                {
                  icon: ClockIcon,
                  title: "Timely",
                  description: "Set your cadence (daily or weekly).",
                },
                {
                  icon: DevicePhoneMobileIcon,
                  title: "Everywhere",
                  description:
                    "SMS (AWS SNS) and WhatsApp (Amazon Pinpoint).",
                },
                {
                  icon: ChartBarIcon,
                  title: "Personalized",
                  description: "Choose the industries you care about.",
                },
                {
                  icon: BoltIcon,
                  title: "Fast setup",
                  description:
                    "Start in minutes—no heavy training needed.",
                },
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="text-center group"
                  className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ 
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600 group-hover:bg-emerald-700 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 pt-4 group-hover:text-emerald-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 pt-2">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-2xl text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How it works
            </h2>
            <div className="space-y-8 pt-12">
              {[
                {
                  step: "1",
                  title: "Choose your plan & industries",
                  description:
                    "Pick Base (1 industry), Entrepreneur (5), or Premium (10).",
                },
                {
                  step: "2",
                  title: "Set your channels",
                  description:
                    "Turn on SMS or WhatsApp. It's a quick one-time setup.",
                },
                {
                  step: "3",
                  title: "Pick your cadence",
                  description:
                    "Daily or weekly—change anytime.",
                },
                {
                  step: "4",
                  title: "Get your digests",
                  description:
                    "We send clear, useful insights with your name on it.",
                },
                {
                  step: "5",
                  title: "Refine & grow",
                  description:
                    "Add/remove industries. Upgrade or downgrade in one click.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex gap-6 rounded-lg bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 hover:border-emerald-200"
                  className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ 
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white group-hover:bg-emerald-700 group-hover:scale-110 transition-all duration-300 shadow-md">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 pt-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key features */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-2xl text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Key features
            </h2>
            <div className="space-y-8 pt-12">
              <div className="rounded-lg bg-gray-50 p-6 text-left hover:bg-emerald-50 transition-colors duration-300 group border border-gray-200 hover:border-emerald-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Multi-industry coverage
                </h3>
                <p className="text-sm text-gray-600 pt-2">
                  Track 1–10 industries per account.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 text-left hover:bg-emerald-50 transition-colors duration-300 group border border-gray-200 hover:border-emerald-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Channel delivery
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 pt-2">
                  <li className="flex items-start">
                    <CheckCircleIcon
                      className="h-5 w-5 shrink-0 text-emerald-600 pr-2"
                      aria-hidden="true"
                    />
                    Email
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon
                      className="h-5 w-5 shrink-0 text-emerald-600 pr-2"
                      aria-hidden="true"
                    />
                    SMS
                  </li>
                </ul>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 text-left hover:bg-emerald-50 transition-colors duration-300 group border border-gray-200 hover:border-emerald-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Clean onboarding
                </h3>
                <p className="text-sm text-gray-600 pt-2">
                  Simple from sign-up to first digest.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 text-left hover:bg-emerald-50 transition-colors duration-300 group border border-gray-200 hover:border-emerald-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Home dashboard
                </h3>
                <p className="text-sm text-gray-600 pt-2">
                  "Welcome, {`{Name}`}"—shows plan, industries, cadence, and
                  simple upgrade/downgrade.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 text-left hover:bg-emerald-50 transition-colors duration-300 group border border-gray-200 hover:border-emerald-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Self-serve messaging setup
                </h3>
                <p className="text-sm text-gray-600 pt-2">
                  Clients enter their own WhatsApp (Pinpoint) details—no secrets
                  shared.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 text-left hover:bg-emerald-50 transition-colors duration-300 group border border-gray-200 hover:border-emerald-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Activity feed
                </h3>
                <p className="text-sm text-gray-600 pt-2">
                  See what's been sent and when, with icons for SMS/WhatsApp.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 text-left hover:bg-emerald-50 transition-colors duration-300 group border border-gray-200 hover:border-emerald-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Admin controls (back office)
                </h3>
                <p className="text-sm text-gray-600 pt-2">
                  Cost guardrails, FX setting, monthly snapshots, audit-ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-2xl text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Pricing (USD monthly)
            </h2>
            <p className="text-sm text-gray-600 pt-4">
              Cancel or change plans anytime. Taxes may apply.
            </p>
          </div>
          <div className="grid max-w-5xl gap-8 sm:grid-cols-3 pt-12 mx-auto">
            {[
              {
                name: "Base",
                price: "$9.99",
                description: "For solo operators.",
                features: [
                  "1 industry",
                  "SMS/WhatsApp delivery",
                  "Dashboard",
                  "Upgrade anytime",
                ],
              },
              {
                name: "Entrepreneur",
                price: "$19.99",
                description: "For growing teams.",
                features: [
                  "Up to 5 industries",
                  "Channel delivery",
                  "Dashboard",
                  "Activity feed",
                  "Priority updates",
                ],
                popular: true,
              },
              {
                name: "Premium",
                price: "$29.99",
                description: "For builders who want it all.",
                features: [
                  "Up to 10 industries",
                  "Channel delivery",
                  "Dashboard",
                  "Activity feed",
                  "Priority support",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-lg bg-white p-8 shadow-sm ${
                  plan.popular
                    ? "ring-2 ring-emerald-600"
                    : "ring-1 ring-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="pb-4">
                    <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>
                <div className="flex items-baseline pt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-600 pl-2">USD</span>
                </div>
                <p className="text-sm text-gray-600 pt-2">
                  {plan.description}
                </p>
                <ul className="space-y-3 pt-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircleIcon
                        className="mr-2 h-5 w-5 shrink-0 text-emerald-600"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/apps/demo?app=omg-iq&plan=base"
                  className="block w-full rounded-md bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors pt-8"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations & delivery */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-2xl text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Integrations & delivery
            </h2>
            <div className="space-y-6 text-left pt-12">
              <div className="rounded-lg bg-gray-50 p-6 hover:bg-emerald-50 transition-colors duration-300 group border border-gray-200 hover:border-emerald-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  AWS SNS for SMS
                </h3>
                <p className="text-sm text-gray-600 pt-2">
                  Global reach, robust deliverability.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 hover:bg-emerald-50 transition-colors duration-300 group border border-gray-200 hover:border-emerald-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Amazon Pinpoint for WhatsApp
                </h3>
                <p className="text-sm text-gray-600 pt-2">
                  Approved templates, compliant outreach.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 hover:bg-emerald-50 transition-colors duration-300 group border border-gray-200 hover:border-emerald-200">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Your branding
                </h3>
                <p className="text-sm text-gray-600 pt-2">
                  Works with your number and your WhatsApp Business setup—your
                  clients get consistent branding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & trust */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-2xl text-center mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Security & trust
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 pt-12">
              {[
                {
                  icon: ShieldCheckIcon,
                  title: "Modern auth",
                  description: "Role-based access (Admin/User).",
                },
                {
                  icon: GlobeAltIcon,
                  title: "Data privacy",
                  description:
                    "You control your industries and delivery settings.",
                },
                {
                  icon: ShieldCheckIcon,
                  title: "Infrastructure",
                  description:
                    "Built on AWS with strong security practices.",
                },
                {
                  icon: CheckCircleIcon,
                  title: "Compliance-minded",
                  description:
                    "WhatsApp templates and explicit opt-in where required.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 hover:border-emerald-200"
                  className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ 
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600 group-hover:bg-emerald-700 group-hover:scale-110 transition-all duration-300 shadow-md">
                    <item.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 pt-4 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 pt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        heading="FAQ"
        items={[
          {
            question: "Do I need the WhatsApp API?",
            answer:
              "For automated WhatsApp delivery, yes—OMGIQ uses Amazon Pinpoint with your approved templates. If you're not ready yet, use SMS or set up Pinpoint later in two minutes.",
          },
          {
            question: "Can I change industries later?",
            answer:
              "Yes. Add/remove industries anytime. Your plan sets the max.",
          },
          {
            question: "How often do you send?",
            answer:
              "Daily or weekly—your choice. You can pause or change cadence anytime.",
          },
          {
            question: "What sources do you use?",
            answer:
              "We focus on high-signal industry sources. Over time we tune based on what you open and request.",
          },
          {
            question: "Can my team receive the same digest?",
            answer:
              "Yes—share the channel or add teammates to your plan.",
          },
        ]}
      />

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to turn noise into action?
            </h2>
            <p className="text-lg leading-8 text-slate-300 pt-6">
              Start your free 7-day trial and see how OMGIQ keeps you ahead
              without the time sink.
            </p>
            <div className="flex items-center justify-center gap-x-6 pt-10">
              <Link
                href="/apps/demo?app=omg-iq"
                className="rounded-md bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Start now (free 7-day trial)
              </Link>
              <Link
                href="/apps/omg-iq/sample"
                className="text-base font-semibold leading-6 text-white hover:text-emerald-400"
              >
                See a sample digest <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="pt-8">
              <Link
                href="/contact"
                className="text-sm font-semibold text-slate-300 hover:text-white"
              >
                Talk to us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Legal note */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-500">
            OMGIQ delivers summaries for information purposes only. Always verify
            critical decisions with official sources.
          </p>
        </div>
      </section>
    </main>
  );
}

