// src/app/personal/page.tsx - Personal Dashboard with Globe Component

import Link from "next/link";
import { DashboardGlobe } from "@/components/dashboard/DashboardGlobe";

export default function PersonalHomePage() {
  const personalMetrics = [
    { label: 'Storage Used', value: '2.3 GB', change: '23% of 10 GB', trend: 'neutral' as const },
    { label: 'Active Links', value: '3', change: 'All active', trend: 'neutral' as const },
    { label: 'Documents', value: '47', change: '+5 this week', trend: 'up' as const },
    { label: 'OCR Pages', value: '32', change: 'This month', trend: 'up' as const },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Your Personal Vault</h1>
          <div className="w-1 h-1 rounded-full bg-blue-500"></div>
        </div>
        <p className="text-lg text-muted-foreground max-w-xl">
          Store receipts, bills, ID, and other life admin in one place. Uploads and
          OCR previews are fully mocked in this demo, so nothing leaves your
          computer.
        </p>
      </header>

      {/* Dashboard Globe Component */}
      <DashboardGlobe
        isPersonal={true}
        metrics={personalMetrics}
        activityData={[
          { region: 'Local', count: 38, color: 'emerald' },
          { region: 'Cloud Sync', count: 9, color: 'blue' },
        ]}
      />

      {/* Quick Actions */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 space-y-4">
          <h2 className="text-base font-semibold">Quick Actions</h2>
          <div className="grid gap-2">
            <Link
              href="/personal/docs"
              className="rounded-xl border bg-background px-4 py-3 text-sm hover:bg-blue-50 hover:border-blue-300 flex items-center justify-between transition group"
            >
              <span className="font-medium">Upload a document</span>
              <span className="text-xs text-muted-foreground group-hover:text-blue-600">↗</span>
            </Link>
            <Link
              href="/personal/shares"
              className="rounded-xl border bg-background px-4 py-3 text-sm hover:bg-blue-50 hover:border-blue-300 flex items-center justify-between transition group"
            >
              <span className="font-medium">Create a share link</span>
              <span className="text-xs text-muted-foreground group-hover:text-blue-600">↗</span>
            </Link>
            <Link
              href="/install"
              className="rounded-xl border bg-background px-4 py-3 text-sm hover:bg-blue-50 hover:border-blue-300 flex items-center justify-between transition group"
            >
              <span className="font-medium">Install App</span>
              <span className="text-xs text-muted-foreground group-hover:text-blue-600">↗</span>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 space-y-4">
          <h2 className="text-base font-semibold">Recent Activity</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <div className="font-medium">receipt_2025-01-15.pdf</div>
                <div className="text-xs text-muted-foreground">Uploaded 2 hours ago</div>
              </div>
            </li>
            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <div className="font-medium">Share link created</div>
                <div className="text-xs text-muted-foreground">tax_docs • 5 hours ago</div>
              </div>
            </li>
            <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <div className="font-medium">invoice_12345.pdf</div>
                <div className="text-xs text-muted-foreground">Uploaded yesterday</div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Storage Overview */}
      <div className="rounded-2xl border bg-card p-6">
        <h3 className="text-base font-semibold mb-4">Storage Overview</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Used: 2.3 GB</span>
              <span className="text-sm text-muted-foreground">Available: 7.7 GB</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: "23%" }}></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Documents</div>
              <div className="font-semibold">1.8 GB</div>
            </div>
            <div>
              <div className="text-muted-foreground">Images</div>
              <div className="font-semibold">0.4 GB</div>
            </div>
            <div>
              <div className="text-muted-foreground">Other</div>
              <div className="font-semibold">0.1 GB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
