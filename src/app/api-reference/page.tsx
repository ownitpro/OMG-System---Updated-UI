"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRightIcon,
  CodeBracketIcon,
  KeyIcon,
  ShieldCheckIcon,
  BoltIcon,
  CloudArrowUpIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  CubeTransparentIcon,
  ServerStackIcon,
  GlobeAltIcon,
  LockClosedIcon,
  ChartBarIcon,
  ArrowPathIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

// API Endpoints organized by resource
const apiResources = [
  {
    name: "Contacts",
    description: "Manage customer and lead data",
    color: "cyan",
    endpoints: [
      { method: "GET", path: "/contacts", description: "List all contacts" },
      { method: "POST", path: "/contacts", description: "Create a contact" },
      { method: "GET", path: "/contacts/:id", description: "Get a contact" },
      { method: "PATCH", path: "/contacts/:id", description: "Update a contact" },
      { method: "DELETE", path: "/contacts/:id", description: "Delete a contact" },
    ],
  },
  {
    name: "Workflows",
    description: "Automation workflow management",
    color: "violet",
    endpoints: [
      { method: "GET", path: "/workflows", description: "List all workflows" },
      { method: "POST", path: "/workflows", description: "Create a workflow" },
      { method: "POST", path: "/workflows/:id/trigger", description: "Trigger workflow" },
      { method: "GET", path: "/workflows/:id/runs", description: "Get run history" },
    ],
  },
  {
    name: "Documents",
    description: "SecureVault document operations",
    color: "amber",
    endpoints: [
      { method: "GET", path: "/documents", description: "List documents" },
      { method: "POST", path: "/documents/upload", description: "Upload document" },
      { method: "GET", path: "/documents/:id", description: "Get document" },
      { method: "DELETE", path: "/documents/:id", description: "Delete document" },
    ],
  },
  {
    name: "Analytics",
    description: "Business metrics and insights",
    color: "emerald",
    endpoints: [
      { method: "GET", path: "/analytics/overview", description: "Get overview" },
      { method: "GET", path: "/analytics/leads", description: "Lead analytics" },
      { method: "GET", path: "/analytics/conversions", description: "Conversion data" },
    ],
  },
];

const authMethods = [
  {
    title: "API Key",
    description: "Simple authentication for server-side applications",
    icon: KeyIcon,
    color: "amber",
    code: "Authorization: Bearer your_api_key",
  },
  {
    title: "OAuth 2.0",
    description: "Secure delegated access for user-facing apps",
    icon: ShieldCheckIcon,
    color: "violet",
    code: "Authorization: Bearer access_token",
  },
  {
    title: "Webhooks",
    description: "Real-time event notifications to your server",
    icon: BoltIcon,
    color: "cyan",
    code: "X-OMG-Signature: sha256=...",
  },
];

const rateLimits = [
  { plan: "Starter", requests: "1,000", window: "per minute", color: "white" },
  { plan: "Professional", requests: "5,000", window: "per minute", color: "cyan" },
  { plan: "Enterprise", requests: "Unlimited", window: "custom", color: "amber" },
];

const statusCodes = [
  { code: "200", meaning: "Success", description: "Request completed successfully", type: "success" },
  { code: "201", meaning: "Created", description: "Resource created successfully", type: "success" },
  { code: "400", meaning: "Bad Request", description: "Invalid request parameters", type: "warning" },
  { code: "401", meaning: "Unauthorized", description: "Invalid or missing API key", type: "error" },
  { code: "404", meaning: "Not Found", description: "Resource doesn't exist", type: "warning" },
  { code: "429", meaning: "Rate Limited", description: "Too many requests", type: "error" },
  { code: "500", meaning: "Server Error", description: "Internal server error", type: "error" },
];

const sdkLanguages = [
  { name: "JavaScript", install: "npm install @omgsystems/sdk", color: "amber" },
  { name: "Python", install: "pip install omgsystems", color: "cyan" },
  { name: "Go", install: "go get github.com/omgsystems/go-sdk", color: "violet" },
  { name: "Ruby", install: "gem install omgsystems", color: "rose" },
];

export default function APIPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeResource, setActiveResource] = useState("Contacts");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "POST":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "PATCH":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "DELETE":
        return "bg-rose-500/20 text-rose-400 border-rose-500/30";
      default:
        return "bg-white/20 text-white border-white/30";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[150px] animate-pulse delay-500" />
      </div>

      <section className="relative pt-32 pb-20">
        {/* ===== HERO SECTION - Asymmetric Split ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Content - 3 cols */}
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
                <CodeBracketIcon className="w-4 h-4" />
                REST API v1
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                OMGsystems{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
                  API
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 mb-8 max-w-xl">
                Powerful, flexible APIs to integrate automation, CRM, and document management into your applications.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Get API Keys
                  <KeyIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                >
                  Read Docs
                  <BookOpenIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right - Base URL Card - 2 cols */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[60px]" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-white/50 text-sm mb-3">
                    <GlobeAltIcon className="w-4 h-4" />
                    Base URL
                  </div>
                  <div className="flex items-center justify-between bg-slate-900/50 rounded-xl p-4 border border-white/5">
                    <code className="text-cyan-400 font-mono text-sm">https://api.omgsystems.ca/v1</code>
                    <button
                      onClick={() => handleCopy("https://api.omgsystems.ca/v1", "base-url")}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {copiedCode === "base-url" ? (
                        <CheckIcon className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <DocumentDuplicateIcon className="w-4 h-4 text-white/40" />
                      )}
                    </button>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>99.9% Uptime</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50">
                      <ClockIcon className="w-4 h-4" />
                      <span>&lt;100ms latency</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== AUTHENTICATION - Horizontal Cards ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-6">
              <LockClosedIcon className="w-4 h-4" />
              Authentication
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Secure{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Access
              </span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">Multiple authentication methods to fit your integration needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {authMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-${method.color}-500/20 p-6 hover:border-${method.color}-400/40 transition-all duration-300`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-${method.color}-500/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative">
                    <div className={`w-12 h-12 bg-${method.color}-500/10 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 text-${method.color}-400`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                    <p className="text-white/50 text-sm mb-4">{method.description}</p>
                    <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3 border border-white/5">
                      <code className="text-xs text-white/60 font-mono truncate">{method.code}</code>
                      <button
                        onClick={() => handleCopy(method.code, `auth-${index}`)}
                        className="p-1.5 hover:bg-white/5 rounded transition-colors flex-shrink-0 ml-2"
                      >
                        {copiedCode === `auth-${index}` ? (
                          <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <DocumentDuplicateIcon className="w-3.5 h-3.5 text-white/40" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== API ENDPOINTS - Interactive Tabbed Explorer ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-medium mb-6">
              <ServerStackIcon className="w-4 h-4" />
              Endpoints
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              API{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Resources
              </span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
            {/* Resource Tabs */}
            <div className="flex overflow-x-auto border-b border-white/10 bg-white/[0.02]">
              {apiResources.map((resource) => (
                <button
                  key={resource.name}
                  onClick={() => setActiveResource(resource.name)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all ${
                    activeResource === resource.name
                      ? `text-${resource.color}-400 border-b-2 border-${resource.color}-400 bg-${resource.color}-500/5`
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {resource.name}
                </button>
              ))}
            </div>

            {/* Endpoints List */}
            <div className="p-6">
              {apiResources
                .filter((r) => r.name === activeResource)
                .map((resource) => (
                  <div key={resource.name}>
                    <p className="text-white/50 mb-6">{resource.description}</p>
                    <div className="space-y-3">
                      {resource.endpoints.map((endpoint, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors group"
                        >
                          <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                          </span>
                          <code className="text-white/80 font-mono text-sm flex-1">/v1{endpoint.path}</code>
                          <span className="text-white/40 text-sm hidden sm:block">{endpoint.description}</span>
                          <ArrowRightIcon className="w-4 h-4 text-white/20 group-hover:text-white/40 group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* ===== RATE LIMITS - Stacked Comparison ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
                <ChartBarIcon className="w-4 h-4" />
                Rate Limits
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Built for{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Scale
                </span>
              </h2>
              <p className="text-white/60 mb-6">
                Our API is designed to handle high-volume requests with intelligent rate limiting that grows with your needs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/70">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                  Automatic retry headers
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                  Burst allowance for spikes
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                  Per-endpoint granularity
                </li>
              </ul>
            </div>

            {/* Right - Rate Cards */}
            <div className="space-y-4">
              {rateLimits.map((limit, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl p-5 border transition-all ${
                    limit.color === "amber"
                      ? "bg-gradient-to-r from-amber-500/10 to-amber-500/5 border-amber-500/30"
                      : limit.color === "cyan"
                      ? "bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 border-cyan-500/30"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-lg font-semibold ${limit.color === "amber" ? "text-amber-400" : limit.color === "cyan" ? "text-cyan-400" : "text-white"}`}>
                        {limit.plan}
                      </h3>
                      <p className="text-white/50 text-sm">{limit.window}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white">{limit.requests}</span>
                      <p className="text-white/40 text-sm">requests</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== STATUS CODES - Compact Grid ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Response Status Codes</h2>
            <p className="text-white/50">Standard HTTP status codes for all API responses</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {statusCodes.slice(0, 4).map((status, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl p-4 border ${
                  status.type === "success"
                    ? "bg-emerald-500/5 border-emerald-500/20"
                    : status.type === "warning"
                    ? "bg-amber-500/5 border-amber-500/20"
                    : "bg-rose-500/5 border-rose-500/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  {status.type === "success" ? (
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  ) : status.type === "warning" ? (
                    <ExclamationTriangleIcon className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  ) : (
                    <InformationCircleIcon className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-mono font-bold ${
                        status.type === "success" ? "text-emerald-400" : status.type === "warning" ? "text-amber-400" : "text-rose-400"
                      }`}>
                        {status.code}
                      </span>
                      <span className="text-white text-sm">{status.meaning}</span>
                    </div>
                    <p className="text-white/40 text-xs">{status.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional codes in a horizontal strip */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {statusCodes.slice(4).map((status, index) => (
              <div
                key={index}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                  status.type === "success"
                    ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                    : status.type === "warning"
                    ? "bg-amber-500/5 border-amber-500/20 text-amber-400"
                    : "bg-rose-500/5 border-rose-500/20 text-rose-400"
                }`}
              >
                <span className="font-mono font-bold text-sm">{status.code}</span>
                <span className="text-white/60 text-sm">{status.meaning}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== SDKs - Horizontal Install Strip ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500/10 via-cyan-500/5 to-amber-500/10 border border-white/10 p-8 lg:p-12">
            <div className="absolute top-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]" />

            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Official SDKs</h2>
                  <p className="text-white/50">Get started in your preferred language</p>
                </div>
                <Link
                  href="/docs/sdks"
                  className="hidden sm:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View all SDKs
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {sdkLanguages.map((sdk, index) => (
                  <div
                    key={index}
                    className="group bg-slate-900/50 rounded-xl p-4 border border-white/5 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-semibold text-${sdk.color}-400`}>{sdk.name}</h3>
                      <CubeTransparentIcon className={`w-5 h-5 text-${sdk.color}-400/50`} />
                    </div>
                    <div className="flex items-center gap-2 bg-black/30 rounded-lg p-2">
                      <code className="text-xs text-white/60 font-mono truncate flex-1">{sdk.install}</code>
                      <button
                        onClick={() => handleCopy(sdk.install, `sdk-${index}`)}
                        className="p-1 hover:bg-white/5 rounded transition-colors flex-shrink-0"
                      >
                        {copiedCode === `sdk-${index}` ? (
                          <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <DocumentDuplicateIcon className="w-3.5 h-3.5 text-white/40" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== WEBHOOKS PREVIEW ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Info - 2 cols */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-medium mb-6">
                <BoltIcon className="w-4 h-4" />
                Webhooks
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Real-time{" "}
                <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                  Events
                </span>
              </h2>
              <p className="text-white/60 mb-6">
                Subscribe to events and get instant notifications when something happens in your OMGsystems account.
              </p>
              <Link
                href="/docs/webhooks"
                className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors"
              >
                Learn more about webhooks
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Event Types - 3 cols */}
            <div className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { event: "contact.created", description: "New contact added" },
                  { event: "contact.updated", description: "Contact info changed" },
                  { event: "workflow.triggered", description: "Automation started" },
                  { event: "workflow.completed", description: "Automation finished" },
                  { event: "document.uploaded", description: "New document stored" },
                  { event: "lead.converted", description: "Lead became customer" },
                ].map((webhook, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-rose-500/20 transition-colors"
                  >
                    <ArrowPathIcon className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <div>
                      <code className="text-sm text-white font-mono">{webhook.event}</code>
                      <p className="text-xs text-white/40">{webhook.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== FINAL CTA ===== */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600/20 via-violet-600/20 to-amber-600/20 border border-white/10 p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-amber-500/5" />
            <div className="relative z-10">
              <CloudArrowUpIcon className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Building Today
              </h2>
              <p className="text-white/60 mb-8 max-w-xl mx-auto">
                Get your API keys in seconds and start integrating OMGsystems into your applications.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Get API Keys
                  <KeyIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                >
                  Read Documentation
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
