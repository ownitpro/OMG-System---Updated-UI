"use client";

import Link from "next/link";
import type { AppConfig } from "@/config/apps_config";
import { AppIndustriesStrip } from "@/components/apps/AppIndustriesStrip";
import { AppSolutionsStrip } from "@/components/apps/AppSolutionsStrip";
import { AppRelationsStrip } from "@/components/apps/AppRelationsStrip";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  BoltIcon,
  UserGroupIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  CalculatorIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  ShoppingBagIcon,
  HeartIcon,
  ScaleIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

type Props = { app: AppConfig };

export function CRMAppPage({ app }: Props) {
  const industries = [
    {
      id: "contractors",
      icon: WrenchScrewdriverIcon,
      name: "Contractors",
      description:
        "Imagine a CRM that understands your jobs, quotes, site visits, materials, and client follow-ups.",
      pipeline: "New → Site Visit → Quote Sent → In Progress → Completed",
      roadmap: "from intake to walkthrough",
      ai: "writes proposal follow-ups",
      tasks: "reminders for inspections, materials, and client updates",
    },
    {
      id: "real-estate",
      icon: HomeIcon,
      name: "Real Estate",
      description:
        "Stay on top of buyers, sellers, showings, offers, and closing timelines.",
      pipeline: "New → Contacted → Viewing → Offer → Under Contract → Closed",
      roadmap: "from first call → viewing → closing",
      ai: "writes warm check-ins",
      tasks: '"Confirm viewing," "Send offer summary," etc.',
    },
    {
      id: "accountants",
      icon: CalculatorIcon,
      name: "Accountants",
      description:
        "The easiest way to track client files, missing documents, and follow-up reminders.",
      pipeline: "Inquiry → Document Request → Review → Return → Completed",
      roadmap: "from intake → documents → review → filing",
      ai: "writes tax-season reminders",
      tasks: "automatic missing-doc reminders",
    },
    {
      id: "agencies",
      icon: BuildingOfficeIcon,
      name: "Agencies",
      description: "Keep leads, proposals, and onboarding organized.",
      pipeline: "Lead → Discovery → Proposal → Negotiation → Won → Onboarding",
      roadmap: "from qualification → kickoff",
      ai: "writes friendly updates",
      tasks: "recap emails, proposal follow-ups",
    },
    {
      id: "coaches",
      icon: AcademicCapIcon,
      name: "Coaches & Consultants",
      description: "Track calls, offers, enrollment, and sessions.",
      pipeline: "New → Engaged → Discovery → Offer → Enrolled → Completed",
      roadmap: "from welcome → clarity → coaching",
      ai: "writes friendly updates",
      tasks: "call recaps, session reminders",
    },
    {
      id: "ecommerce",
      icon: ShoppingBagIcon,
      name: "E-commerce",
      description: "For high-touch orders, VIPs, and wholesale customers.",
      pipeline: "Inquiry → Engaged → Quote → Ordered → Fulfilled → Repeat",
      roadmap: "from inquiry → quote → fulfillment",
      ai: "writes follow-ups",
      tasks: "VIP outreach, quote follow-ups",
    },
    {
      id: "healthcare",
      icon: HeartIcon,
      name: "Healthcare",
      description: "Perfect for clinics, therapists, med spas, dental, etc.",
      pipeline: "Inquiry → Intake → Consult → Treatment Plan → In Treatment → Follow-Up",
      roadmap: "from inquiry → treatment → follow-up",
      ai: "writes appointment reminders",
      tasks: "appointment confirmations, treatment reminders",
    },
    {
      id: "legal",
      icon: ScaleIcon,
      name: "Legal",
      description: "Designed for intake, consultations, retainers, and matters.",
      pipeline: "Inquiry → Intake → Consult → Engagement → Retained → Closed",
      roadmap: "from inquiry → engagement → closure",
      ai: "writes engagement letters",
      tasks: "conflict checks, engagement letters, closing summaries",
    },
  ];

  const integrations = [
    "Websites (WordPress, Webflow, Shopify, custom)",
    "Forms (HTML, Jotform, Typeform, Gravity Forms)",
    "Meta Leads (Facebook/Instagram)",
    "Google Lead Forms",
    "TikTok Lead Ads",
    "Shopify order inquiries",
    "Stripe",
    "Zapier / Make / n8n",
    "Other CRMs (HubSpot, GoHighLevel, Pipedrive)",
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              A Light CRM Built for Real Businesses — Not Tech Experts
            </h1>
            <p className="text-2xl md:text-3xl text-blue-600 font-semibold mb-6">
              {app.tagline}
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              {app.summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apps/crm/templates"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start With an Industry Template
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="https://crm.omgsystems.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Open OMG CRM
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Pain Points We Solve
            </h2>

            <div className="space-y-12">
              {/* Pain Point 1 */}
              <div className="bg-red-50 rounded-2xl p-8 border-l-4 border-red-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Most CRMs are too heavy.
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  People get lost. Setup takes weeks. Nobody uses it.
                </p>
                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-lg font-semibold text-green-800 mb-2">
                    We fix it:
                  </p>
                  <p className="text-gray-700">
                    OMG CRM is clean, simple, and ready in minutes.
                  </p>
                </div>
              </div>

              {/* Pain Point 2 */}
              <div className="bg-red-50 rounded-2xl p-8 border-l-4 border-red-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Most CRMs don't match your industry.
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Contractors need something different from lawyers. Realtors don't work like coaches. E-com stores don't manage clients like accountants.
                </p>
                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-lg font-semibold text-green-800 mb-2">
                    We fix it:
                  </p>
                  <p className="text-gray-700">
                    You pick your industry → CRM instantly reshapes itself for you.
                  </p>
                </div>
              </div>

              {/* Pain Point 3 */}
              <div className="bg-red-50 rounded-2xl p-8 border-l-4 border-red-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Too many reminders fall through the cracks.
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  People forget to follow up, and business is lost.
                </p>
                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-lg font-semibold text-green-800 mb-2">
                    We fix it:
                  </p>
                  <p className="text-gray-700">
                    Every pipeline stage triggers smart auto-tasks. Your CRM nudges you before you forget.
                  </p>
                </div>
              </div>

              {/* Pain Point 4 */}
              <div className="bg-red-50 rounded-2xl p-8 border-l-4 border-red-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Teams forget the "right process."
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Everyone works differently → inconsistent results.
                </p>
                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-lg font-semibold text-green-800 mb-2">
                    We fix it:
                  </p>
                  <p className="text-gray-700">
                    Each industry has built-in Roadmaps — clear steps from lead → client → complete.
                  </p>
                </div>
              </div>

              {/* Pain Point 5 */}
              <div className="bg-red-50 rounded-2xl p-8 border-l-4 border-red-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Sales messages take too long to write.
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Follow-ups are repetitive and time-consuming.
                </p>
                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-lg font-semibold text-green-800 mb-2">
                    We fix it:
                  </p>
                  <p className="text-gray-700">
                    AI writes warm, friendly messages in one click.
                  </p>
                </div>
              </div>

              {/* Pain Point 6 */}
              <div className="bg-red-50 rounded-2xl p-8 border-l-4 border-red-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Switching tools is painful.
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  People don't want to switch from their existing CRM, email, or website.
                </p>
                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-lg font-semibold text-green-800 mb-2">
                    We fix it:
                  </p>
                  <p className="text-gray-700 mb-3">
                    OMG CRM integrates with:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Websites</li>
                    <li>Forms</li>
                    <li>Zapier / Make</li>
                    <li>Shopify</li>
                    <li>Facebook & Google lead forms</li>
                    <li>Stripe</li>
                    <li>Other CRMs (HubSpot, GHL, Pipedrive)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Core Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Adaptive Pipelines",
                description:
                  "Each industry comes with a pipeline that already makes sense for your workflow. You can change it anytime.",
                icon: ChartBarIcon,
              },
              {
                title: "Smart Roadmaps",
                description:
                  "Step-by-step guidance that mirrors the perfect client process — and auto-updates as stages change.",
                icon: SparklesIcon,
              },
              {
                title: "Auto-Tasks for Every Stage",
                description:
                  'Move a lead from "New" to "Proposal Sent"? We auto-create the follow-up.',
                icon: BoltIcon,
              },
              {
                title: "AI Follow-Up Generator",
                description:
                  "Click once → send a friendly message that sounds like you.",
                icon: SparklesIcon,
              },
              {
                title: "Industry Templates",
                description:
                  "8 industries done + expandable. Pick yours and go.",
                icon: UserGroupIcon,
              },
              {
                title: "Integrations",
                description:
                  "Bring your leads from anywhere. Website, forms, ads, other CRMs.",
                icon: LinkIcon,
              },
              {
                title: "Website & Forms",
                description:
                  "Embed forms that drop leads directly into the right industry + right stage.",
                icon: LinkIcon,
              },
              {
                title: "Clean and Simple UI",
                description:
                  "No clutter. No chaos. No guesswork. Easy enough for anyone.",
                icon: CheckCircleIcon,
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why OMG CRM Is Different */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Why OMG CRM Is Different
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "It's a CRM that adapts to YOU",
                description:
                  "Not a one-size-fits-all tool. Not a confusing monster like Salesforce. Not a marketing tool pretending to be a CRM. You click your industry → Boom. Tailored pipeline, tasks, roadmap, and AI prompts.",
                icon: SparklesIcon,
              },
              {
                title: "You stay consistent — automatically",
                description:
                  'Every stage change triggers tasks: "Call John back", "Send proposal summary", "Confirm appointment", "Check on treatment progress". Depends on the industry. No more guessing what\'s next.',
                icon: BoltIcon,
              },
              {
                title: "You get clarity — instantly",
                description:
                  "Your Roadmap shows every big step: What's done, What's next, What needs attention. It's like having a project manager inside the CRM.",
                icon: ChartBarIcon,
              },
              {
                title: "You get speed — without the stress",
                description:
                  "AI writes emails. AI suggests tasks. AI checks stages and fills in the blanks.",
                icon: BoltIcon,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            Built for Your Industry
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Pick your industry and get a CRM that already understands how you work.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.id}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {industry.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {industry.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">Pipeline:</p>
                      <p className="text-gray-600">{industry.pipeline}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Roadmap:</p>
                      <p className="text-gray-600">{industry.roadmap}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">AI:</p>
                      <p className="text-gray-600">{industry.ai}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Tasks:</p>
                      <p className="text-gray-600">{industry.tasks}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Connect OMG CRM to the tools you already use
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your leads can come from anywhere — your CRM catches them and puts them in the right pipeline instantly.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-left"
                >
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{integration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple pricing. No stress.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/mo",
                description: "1 user. One industry.",
                features: [
                  "Leads, tasks, pipeline, roadmap",
                  "AI follow-ups",
                  "Website integration",
                ],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$49",
                period: "/mo",
                description: "Team access. Multi-industry workspaces.",
                features: [
                  "Everything in Starter",
                  "Roadmap editor",
                  "AI task suggestions",
                ],
                cta: "Get Started",
                popular: true,
              },
              {
                name: "Agency",
                price: "$99",
                period: "/mo",
                description: "White-label. Unlimited industries.",
                features: [
                  "Everything in Pro",
                  "Integrations",
                  "Client accounts",
                ],
                cta: "Get Started",
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg ${
                  plan.popular ? "ring-2 ring-blue-600 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="mb-4">
                    <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup?plan=crm"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Industries Strip */}
      <AppIndustriesStrip app={app} />

      {/* App Solutions Strip */}
      <AppSolutionsStrip app={app} />

      {/* App Relations Strip */}
      <AppRelationsStrip app={app} />

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start with the CRM that adapts to your business
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/apps/crm/templates"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Pick Your Industry Template
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="https://crm.omgsystems.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white border-2 border-white font-bold rounded-xl hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try the CRM
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

