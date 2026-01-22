// src/app/org/[orgId]/overview/page.tsx - Dynamic Dashboard with Globe Component

import Link from "next/link";
import { getDemoOrg, humanVertical } from "@/lib/demoOrgs";
import { DashboardGlobe } from "@/components/dashboard/DashboardGlobe";
import { UsageToasts } from "@/components/billing/UsageToasts";

type Props = {
  params: Promise<{ orgId: string }>;
};

const QUICK_ACTIONS = [
  { id: "upload", label: "Upload", href: (orgId: string) => `/org/${orgId}/upload` },
  {
    id: "new_share",
    label: "New share link",
    href: (orgId: string) => `/org/${orgId}/shares/new`
  },
  {
    id: "create_client_portal",
    label: "Create client portal",
    href: (orgId: string) => `/org/${orgId}/portals/new`
  },
  {
    id: "send_request_docs",
    label: "Send request for docs",
    href: (orgId: string) => `/org/${orgId}/requests/new`
  },
  { id: "install_app", label: "Install App", href: () => `/install` },
  { id: "try_ocr", label: "Try OCR Review", href: (orgId: string) => `/org/${orgId}/upload` },
];

// Industry-specific metrics based on vertical
function getIndustryMetrics(vertical: string, orgMetrics: { label: string; value: string }[]) {
  const baseMetrics = orgMetrics.map(m => ({
    ...m,
    change: undefined,
    trend: 'neutral' as const
  }));

  switch (vertical) {
    case 'accounting':
      return [
        { label: 'Client Portals', value: baseMetrics[0]?.value || '24', change: '+3 this month', trend: 'up' as const },
        { label: 'Open Requests', value: baseMetrics[1]?.value || '7', change: '2 due today', trend: 'up' as const },
        { label: 'Receipts Processed', value: '156', change: '+12 today', trend: 'up' as const },
        { label: 'Storage Used', value: '12 GB', change: '60% of 20 GB', trend: 'neutral' as const },
      ];
    case 'real_estate':
      return [
        { label: 'Active Listings', value: '18', change: '+2 this week', trend: 'up' as const },
        { label: 'Buyer Folders', value: '32', change: '8 pending', trend: 'up' as const },
        { label: 'Documents Shared', value: '89', change: '+5 today', trend: 'up' as const },
        { label: 'Storage Used', value: '28 GB', change: '70% of 40 GB', trend: 'neutral' as const },
      ];
    case 'construction':
      return [
        { label: 'Active Projects', value: '12', change: '3 nearing completion', trend: 'up' as const },
        { label: 'Permits Filed', value: '45', change: '+2 this week', trend: 'up' as const },
        { label: 'Change Orders', value: '8', change: '2 pending approval', trend: 'up' as const },
        { label: 'Storage Used', value: '67 GB', change: '84% of 80 GB', trend: 'neutral' as const },
      ];
    case 'project_management':
      return [
        { label: 'Active Projects', value: '15', change: '+1 this week', trend: 'up' as const },
        { label: 'SOWs Pending', value: '6', change: '2 awaiting signature', trend: 'up' as const },
        { label: 'Releases', value: '23', change: '+3 today', trend: 'up' as const },
        { label: 'Storage Used', value: '34 GB', change: '68% of 50 GB', trend: 'neutral' as const },
      ];
    default:
      return baseMetrics;
  }
}

export default async function OrgOverviewPage({ params }: Props) {
  const { orgId } = await params;
  const org = getDemoOrg(orgId);
  const vLabel = humanVertical(org.vertical);
  const metrics = getIndustryMetrics(org.vertical, org.metrics);

  return (
    <div className="space-y-6">
      {/* Plan Banner */}
      <div className="rounded-2xl border bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 p-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Current Plan: Growth</div>
          <div className="text-xs text-muted-foreground">Trial ends in 14 days • Upgrade anytime</div>
        </div>
        <Link
          href="/org/demo/billing"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Manage billing →
        </Link>
      </div>

      {/* Health Status Chips */}
      <div className="flex gap-2 flex-wrap">
        {["Uploads", "OCR", "Email", "API", "WAF"].map((service) => (
          <div
            key={service}
            className="flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1.5 text-xs font-medium"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-blue-700">{service}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {vLabel} workspace
          </p>
          <div className="w-1 h-1 rounded-full bg-blue-500"></div>
        </div>
        <h1 className="text-3xl font-bold">{org.name}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {org.headline}
        </p>
        <p className="text-sm text-muted-foreground max-w-2xl">
          {org.subheadline}
        </p>
      </header>

      {/* Dashboard Globe Component */}
      <DashboardGlobe
        orgId={orgId}
        vertical={org.vertical}
        metrics={metrics}
        activityData={[
          { region: 'North America', count: 45, color: 'emerald' },
          { region: 'Europe', count: 23, color: 'blue' },
          { region: 'Asia Pacific', count: 18, color: 'indigo' },
          { region: 'Other', count: 14, color: 'purple' },
        ]}
      />

      {/* Quick Actions */}
      <section className="grid gap-4 md:grid-cols-[2fr,3fr]">
        <div className="rounded-2xl border bg-card p-6 space-y-4">
          <h2 className="text-base font-semibold">Quick Actions</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {QUICK_ACTIONS.map((qa) => (
              <Link
                key={qa.id}
                href={qa.href(orgId)}
                className="rounded-xl border bg-background px-4 py-3 text-sm hover:bg-blue-50 hover:border-blue-300 flex items-center justify-between transition group"
              >
                <span className="font-medium">{qa.label}</span>
                <span className="text-xs text-muted-foreground group-hover:text-blue-600">↗</span>
              </Link>
            ))}
            {org.vertical === "accounting" && (
              <button
                className="rounded-xl border bg-background px-4 py-3 text-sm opacity-50 cursor-not-allowed flex items-center justify-between"
                disabled
              >
                <span className="font-medium">Connect QBO</span>
                <span className="text-xs text-muted-foreground">Soon</span>
              </button>
            )}
          </div>
          <p className="text-xs text-muted-foreground pt-2 border-t">
            All uploads, share links, and portals are mocked in this demo. In
            production, this is where your real client data would live.
          </p>
        </div>

        {/* Right side: Getting Started + Recent Activity */}
        <div className="space-y-4">
          <div className="rounded-2xl border bg-card p-6 space-y-4">
            <h2 className="text-base font-semibold">Getting Started</h2>
            <ul className="space-y-3 text-sm">
              {[
                "Add your firm logo",
                "Create your first client portal",
                "Send a request for docs",
                "Test a share link",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <input type="checkbox" className="rounded border-blue-300 text-blue-600 focus:ring-blue-500" />
                  <span className={i < 2 ? "text-muted-foreground line-through" : ""}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-6 space-y-4">
            <h2 className="text-base font-semibold">Recent Activity</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Uploaded 6 receipts (demo)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Created 2 client portals (demo)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Sent 1 request for docs (demo)
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Usage Toasts */}
      <UsageToasts />
    </div>
  );
}
