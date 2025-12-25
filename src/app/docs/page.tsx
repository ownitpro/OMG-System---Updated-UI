"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  CodeBracketIcon,
  CogIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  CommandLineIcon,
  DocumentTextIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  RocketLaunchIcon,
  BeakerIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

const docSections = [
  {
    title: "Getting Started",
    description: "Quick start guides and initial setup",
    icon: RocketLaunchIcon,
    color: "violet",
    articles: 12,
    link: "/docs/getting-started",
  },
  {
    title: "API Reference",
    description: "Complete API documentation",
    icon: CodeBracketIcon,
    color: "cyan",
    articles: 45,
    link: "/docs/api",
  },
  {
    title: "Automations",
    description: "Build powerful workflows",
    icon: CogIcon,
    color: "amber",
    articles: 23,
    link: "/docs/automations",
  },
  {
    title: "Integrations",
    description: "Connect your favorite tools",
    icon: PuzzlePieceIcon,
    color: "emerald",
    articles: 34,
    link: "/docs/integrations",
  },
  {
    title: "Security",
    description: "Best practices and compliance",
    icon: ShieldCheckIcon,
    color: "rose",
    articles: 18,
    link: "/docs/security",
  },
  {
    title: "SDKs & Libraries",
    description: "Official client libraries",
    icon: CommandLineIcon,
    color: "orange",
    articles: 8,
    link: "/docs/sdks",
  },
];

const sdks = [
  { name: "JavaScript", version: "2.4.1", status: "Stable", color: "amber" },
  { name: "Python", version: "1.8.0", status: "Stable", color: "cyan" },
  { name: "Go", version: "0.9.2", status: "Beta", color: "violet" },
  { name: "Ruby", version: "1.2.0", status: "Stable", color: "rose" },
];

const apiEndpoints = [
  { method: "GET", path: "/api/v1/contacts", description: "List all contacts" },
  { method: "POST", path: "/api/v1/contacts", description: "Create a contact" },
  { method: "GET", path: "/api/v1/workflows", description: "List workflows" },
  { method: "POST", path: "/api/v1/automations/trigger", description: "Trigger automation" },
];

const changelog = [
  { version: "2.4.0", date: "Dec 20, 2024", title: "New Workflow Builder", type: "feature" },
  { version: "2.3.5", date: "Dec 15, 2024", title: "Performance improvements", type: "improvement" },
  { version: "2.3.4", date: "Dec 10, 2024", title: "Bug fixes for integrations", type: "fix" },
];

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const codeExample = `import { OMGClient } from '@omgsystems/sdk';

const client = new OMGClient({
  apiKey: process.env.OMG_API_KEY,
});

// Create a new contact
const contact = await client.contacts.create({
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Acme Corp',
});

// Trigger an automation
await client.automations.trigger('welcome-sequence', {
  contactId: contact.id,
});`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
      violet: {
        bg: "bg-violet-500/10",
        border: "border-violet-500/30 hover:border-violet-400/50",
        text: "text-violet-400",
        glow: "group-hover:shadow-violet-500/20",
      },
      cyan: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30 hover:border-cyan-400/50",
        text: "text-cyan-400",
        glow: "group-hover:shadow-cyan-500/20",
      },
      amber: {
        bg: "bg-amber-500/10",
        border: "border-amber-500/30 hover:border-amber-400/50",
        text: "text-amber-400",
        glow: "group-hover:shadow-amber-500/20",
      },
      emerald: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30 hover:border-emerald-400/50",
        text: "text-emerald-400",
        glow: "group-hover:shadow-emerald-500/20",
      },
      rose: {
        bg: "bg-rose-500/10",
        border: "border-rose-500/30 hover:border-rose-400/50",
        text: "text-rose-400",
        glow: "group-hover:shadow-rose-500/20",
      },
      orange: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/30 hover:border-orange-400/50",
        text: "text-orange-400",
        glow: "group-hover:shadow-orange-500/20",
      },
    };
    return colors[color] || colors.violet;
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[150px] animate-pulse delay-500" />
      </div>

      <section className="relative pt-32 pb-20">
        {/* ===== HERO SECTION ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-medium mb-6">
            <BookOpenIcon className="w-4 h-4" />
            Developer Documentation
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Build with{" "}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-amber-400 bg-clip-text text-transparent">
              OMGsystems
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Everything you need to integrate, automate, and scale your business workflows.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative group">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-violet-400 transition-colors" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-24 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-white/30 text-sm">
                <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">K</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* ===== DOCUMENTATION SECTIONS GRID ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.map((section, index) => {
              const colors = getColorClasses(section.color);
              const Icon = section.icon;
              return (
                <Link
                  key={index}
                  href={section.link}
                  className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border ${colors.border} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${colors.glow}`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative z-10">
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
                    <p className="text-white/50 mb-4">{section.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/40">{section.articles} articles</span>
                      <ArrowRightIcon className={`w-4 h-4 ${colors.text} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ===== CODE EXAMPLE SECTION ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
              <CodeBracketIcon className="w-4 h-4" />
              Quick Start
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Up and running in{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                minutes
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur-xl">
              {/* Code Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-sm text-white/40">example.ts</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              {/* Code Content */}
              <pre className="p-6 overflow-x-auto">
                <code className="text-sm leading-relaxed">
                  <span className="text-violet-400">import</span>
                  <span className="text-white">{" { "}</span>
                  <span className="text-cyan-400">OMGClient</span>
                  <span className="text-white">{" } "}</span>
                  <span className="text-violet-400">from</span>
                  <span className="text-amber-400">{" '@omgsystems/sdk'"}</span>
                  <span className="text-white">;</span>
                  {"\n\n"}
                  <span className="text-violet-400">const</span>
                  <span className="text-white"> client = </span>
                  <span className="text-violet-400">new</span>
                  <span className="text-cyan-400"> OMGClient</span>
                  <span className="text-white">{"({"}</span>
                  {"\n"}
                  <span className="text-white">{"  "}</span>
                  <span className="text-white">apiKey</span>
                  <span className="text-white">: </span>
                  <span className="text-cyan-400">process</span>
                  <span className="text-white">.env.</span>
                  <span className="text-amber-400">OMG_API_KEY</span>
                  <span className="text-white">,</span>
                  {"\n"}
                  <span className="text-white">{"});"}</span>
                  {"\n\n"}
                  <span className="text-emerald-400/60">{"// Create a new contact"}</span>
                  {"\n"}
                  <span className="text-violet-400">const</span>
                  <span className="text-white"> contact = </span>
                  <span className="text-violet-400">await</span>
                  <span className="text-white"> client.</span>
                  <span className="text-cyan-400">contacts</span>
                  <span className="text-white">.</span>
                  <span className="text-amber-400">create</span>
                  <span className="text-white">{"({"}</span>
                  {"\n"}
                  <span className="text-white">{"  "}name: </span>
                  <span className="text-amber-400">{`'John Doe'`}</span>
                  <span className="text-white">,</span>
                  {"\n"}
                  <span className="text-white">{"  "}email: </span>
                  <span className="text-amber-400">{`'john@example.com'`}</span>
                  <span className="text-white">,</span>
                  {"\n"}
                  <span className="text-white">{"  "}company: </span>
                  <span className="text-amber-400">{`'Acme Corp'`}</span>
                  <span className="text-white">,</span>
                  {"\n"}
                  <span className="text-white">{"});"}</span>
                  {"\n\n"}
                  <span className="text-emerald-400/60">{"// Trigger an automation"}</span>
                  {"\n"}
                  <span className="text-violet-400">await</span>
                  <span className="text-white"> client.</span>
                  <span className="text-cyan-400">automations</span>
                  <span className="text-white">.</span>
                  <span className="text-amber-400">trigger</span>
                  <span className="text-white">(</span>
                  <span className="text-amber-400">{`'welcome-sequence'`}</span>
                  <span className="text-white">, {"{"}</span>
                  {"\n"}
                  <span className="text-white">{"  "}contactId: contact.</span>
                  <span className="text-cyan-400">id</span>
                  <span className="text-white">,</span>
                  {"\n"}
                  <span className="text-white">{"});"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* ===== SDKs SECTION ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Official{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                SDKs
              </span>
            </h2>
            <p className="text-white/50">Choose your language. Start building.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {sdks.map((sdk, index) => {
              const colors = getColorClasses(sdk.color);
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-xl bg-white/5 border ${colors.border} p-5 transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <CubeIcon className={`w-8 h-8 ${colors.text}`} />
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        sdk.status === "Stable"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {sdk.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{sdk.name}</h3>
                  <p className="text-sm text-white/40">v{sdk.version}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== API ENDPOINTS PREVIEW ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">API Endpoints</h2>
                <p className="text-white/50">RESTful API with predictable resource URLs</p>
              </div>
              <Link
                href="/docs/api"
                className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
              >
                View all
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {apiEndpoints.map((endpoint, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
                >
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${
                      endpoint.method === "GET"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-white/80 font-mono text-sm">{endpoint.path}</code>
                  <span className="text-white/40 text-sm ml-auto hidden sm:block">{endpoint.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== CHANGELOG SECTION ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Recent Updates</h2>
                <p className="text-white/50">What&apos;s new in OMGsystems</p>
              </div>
              <Link
                href="/docs/changelog"
                className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
              >
                Full changelog
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {changelog.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="flex-shrink-0">
                    <ClockIcon className="w-5 h-5 text-white/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-sm text-violet-400">{item.version}</span>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          item.type === "feature"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : item.type === "improvement"
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <p className="text-white">{item.title}</p>
                    <p className="text-sm text-white/40 mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== RESOURCES STRIP ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="#"
              className="group flex items-center gap-4 p-5 bg-gradient-to-br from-violet-500/10 to-violet-500/5 rounded-xl border border-violet-500/20 hover:border-violet-400/40 transition-all"
            >
              <BeakerIcon className="w-10 h-10 text-violet-400" />
              <div>
                <h3 className="text-white font-semibold group-hover:text-violet-400 transition-colors">API Sandbox</h3>
                <p className="text-sm text-white/50">Test endpoints live</p>
              </div>
            </a>
            <a
              href="#"
              className="group flex items-center gap-4 p-5 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all"
            >
              <DocumentTextIcon className="w-10 h-10 text-cyan-400" />
              <div>
                <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">Postman Collection</h3>
                <p className="text-sm text-white/50">Import & explore</p>
              </div>
            </a>
            <a
              href="#"
              className="group flex items-center gap-4 p-5 bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-xl border border-amber-500/20 hover:border-amber-400/40 transition-all"
            >
              <CodeBracketIcon className="w-10 h-10 text-amber-400" />
              <div>
                <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors">OpenAPI Spec</h3>
                <p className="text-sm text-white/50">Download schema</p>
              </div>
            </a>
          </div>
        </div>

        {/* ===== FINAL CTA ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600/20 via-cyan-600/20 to-amber-600/20 border border-white/10 p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-amber-500/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to start building?
              </h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
                Get your API keys and start integrating OMGsystems into your applications today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                >
                  Get API Keys
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
