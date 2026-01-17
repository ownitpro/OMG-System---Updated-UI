import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "CRM Industry Templates | OMGsystems",
  description: "Choose from pre-built CRM templates tailored to your industry. Get started faster with industry-specific workflows, fields, and automation.",
  robots: "index, follow",
};

const templates = [
  {
    name: "Real Estate",
    icon: "🏠",
    color: "from-blue-500 to-blue-600",
    description: "Manage properties, clients, showings, and deals with automated follow-ups.",
    features: [
      "Property listings management",
      "Client & lead tracking",
      "Showing scheduler",
      "Deal pipeline automation",
      "Commission calculator",
      "MLS integration ready"
    ],
    popular: true,
  },
  {
    name: "Property Management",
    icon: "🏢",
    color: "from-emerald-500 to-emerald-600",
    description: "Track tenants, leases, maintenance requests, and owner reports.",
    features: [
      "Tenant database",
      "Lease tracking & renewals",
      "Maintenance request system",
      "Owner portal integration",
      "Rent collection tracking",
      "Property inspection logs"
    ],
    popular: true,
  },
  {
    name: "Accounting & Tax",
    icon: "📊",
    color: "from-indigo-500 to-indigo-600",
    description: "Manage clients, engagements, deadlines, and document collection.",
    features: [
      "Client engagement tracking",
      "Tax deadline calendar",
      "Document collection workflow",
      "Billing & invoicing",
      "Engagement letters",
      "CPE tracking"
    ],
    popular: false,
  },
  {
    name: "Contractors",
    icon: "🔨",
    color: "from-orange-500 to-orange-600",
    description: "Track jobs, estimates, materials, and subcontractors in one place.",
    features: [
      "Job pipeline management",
      "Estimate & proposal builder",
      "Material cost tracking",
      "Subcontractor management",
      "Project timeline",
      "Client communication log"
    ],
    popular: true,
  },
  {
    name: "Consulting",
    icon: "💼",
    color: "from-purple-500 to-purple-600",
    description: "Manage clients, projects, deliverables, and billable hours.",
    features: [
      "Client project tracking",
      "Deliverable milestones",
      "Time tracking integration",
      "Proposal templates",
      "Engagement scoring",
      "Resource allocation"
    ],
    popular: false,
  },
  {
    name: "Creative Agency",
    icon: "🎨",
    color: "from-pink-500 to-pink-600",
    description: "Manage clients, campaigns, assets, and creative workflows.",
    features: [
      "Campaign tracking",
      "Creative brief templates",
      "Asset library integration",
      "Client approval workflow",
      "Project timeline",
      "Team collaboration"
    ],
    popular: false,
  },
];

export default function CRMTemplatesPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0f172a] to-black" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/apps/crm"
          className="mb-8 inline-flex items-center text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to CRM
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Industry Template
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Get started faster with a CRM template pre-configured for your industry.
            Each template includes custom fields, workflows, and automation tailored to your business.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => (
            <div
              key={index}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#3B82F6]/30 transition-all duration-300 group flex flex-col"
            >
              {/* Popular Badge */}
              {template.popular && (
                <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-[#3B82F6] to-blue-600 text-white text-xs font-bold rounded-full">
                  POPULAR
                </div>
              )}

              {/* Icon & Title */}
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-gradient-to-br ${template.color}`}>
                  <span className="text-2xl">{template.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{template.name}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/60 mb-4 text-sm">{template.description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6 flex-grow">
                {template.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm text-white/70">
                    <CheckCircleIcon className="h-5 w-5 text-[#3B82F6] mr-2 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/apps#waiting-list-form"
                className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#3B82F6]/30"
              >
                Use This Template
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Don't see your industry?
          </h2>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            Start with our blank template and customize it to fit your exact needs.
            Or contact us to discuss creating a custom template for your industry.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/apps#waiting-list-form"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 font-semibold hover:bg-white/20 transition-all"
            >
              Start with Blank Template
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              Request Custom Template
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
