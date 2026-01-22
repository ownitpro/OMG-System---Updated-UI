// src/app/try-demo/page.tsx - Enhanced Demo Page with SVD-code style

import Link from "next/link";
import { demoOrgIdForVertical, humanVertical, getDemoOrg, type Vertical } from "@/lib/demoOrgs";

type Props = {
  searchParams: Promise<{ vertical?: Vertical | string }>;
};

const VERTICALS: { id: Vertical; name: string; description: string; icon: string }[] = [
  { id: "accounting", name: "Accounting", description: "Receipt OCR, client portals, and tax document requests", icon: "📊" },
  { id: "real_estate", name: "Real Estate", description: "Offer packs, buyer folders, and KYC requests", icon: "🏠" },
  { id: "construction", name: "Construction", description: "Permits, drawings, and change orders", icon: "🏗️" },
  { id: "project_management", name: "Project Management", description: "SOWs, sign-offs, and releases", icon: "📋" },
  { id: "personal", name: "Personal", description: "Receipts, bills, and life admin", icon: "👤" },
];

export default async function TryDemoPage({ searchParams }: Props) {
  const { vertical: v } = await searchParams;
  const vertical = (v as Vertical) || "accounting";
  const orgId = demoOrgIdForVertical(vertical);
  const org = getDemoOrg(orgId);
  const vLabel = humanVertical(vertical);

  return (
    <div className="min-h-screen bg-background">
      {/* Marketing Header */}
      <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
              SVD
            </div>
            <span className="text-lg font-semibold">SecureVault Docs</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/pricing" className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition">
              Pricing
            </Link>
            <Link href="/login" className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Try the <span className="text-blue-600">{vLabel}</span> Demo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore SecureVault Docs with sample data. No signup required. Everything is fully mocked and safe to experiment with.
          </p>
        </div>

        {/* Selected Demo Card */}
        <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">{VERTICALS.find(v => v.id === vertical)?.icon || "📊"}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{org.name}</h2>
              <p className="text-muted-foreground mb-1">{org.headline}</p>
              <p className="text-sm text-muted-foreground">{org.subheadline}</p>
            </div>
          </div>

          {/* Metrics Preview */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {org.metrics.map((m, idx) => (
              <div key={idx} className="rounded-xl border bg-background/80 p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{m.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Demo Info */}
          <div className="rounded-xl border bg-background/80 p-4 mb-6">
            <h3 className="font-semibold mb-3 text-sm">What you can do in this demo:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Upload files (fully mocked — no files leave your machine)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>View OCR previews (fake text — no AWS/Textract enabled)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Create client portals and share links (in-memory demo data)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Send document requests and manage workflows</span>
              </li>
            </ul>
          </div>

          <Link
            href={`/org/${orgId}/overview`}
            className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-base"
          >
            Enter {vLabel} Demo →
          </Link>
        </div>

        {/* Other Demo Options */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Try other industry demos:</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {VERTICALS.filter(v => v.id !== vertical).map((vert) => (
              <Link
                key={vert.id}
                href={`/demo?tab=interactive&v=${vert.id}`}
                className="rounded-xl border bg-card p-4 hover:border-blue-300 hover:shadow-md transition group"
              >
                <div className="text-2xl mb-2">{vert.icon}</div>
                <h4 className="font-semibold mb-1 group-hover:text-blue-600 transition">{vert.name}</h4>
                <p className="text-sm text-muted-foreground">{vert.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Code-style Info Box */}
        <div className="rounded-xl border bg-muted/50 p-6 font-mono text-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-muted-foreground">demo-info.md</span>
          </div>
          <div className="space-y-1 text-muted-foreground">
            <div><span className="text-blue-600">#</span> Demo Mode Active</div>
            <div><span className="text-blue-600">#</span> All uploads are mocked locally</div>
            <div><span className="text-blue-600">#</span> OCR previews use fake data</div>
            <div><span className="text-blue-600">#</span> Share links and portals use in-memory storage</div>
            <div className="mt-3 pt-3 border-t">
              <span className="text-blue-600">$</span> Change URL: <code className="bg-background px-2 py-1 rounded">?vertical=accounting</code> → <code className="bg-background px-2 py-1 rounded">?vertical=real_estate</code>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
