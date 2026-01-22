import { NextResponse } from 'next/server';

export async function GET() {
  // Map each vertical to one or more seeded demo orgs.
  // Keep these orgIds in sync with your seeded DB.
  // Keys match the VERTICALS array keys in demo/page.tsx
  const data = {
    accounting: [
      {
        title: 'Accounting — Starter Org',
        orgId: 'org_demo_accounting',
        overviewPath: '/org/org_demo_accounting/overview',
        notes: 'Receipts inbox, OCR preview, notices widget'
      }
    ],
    real_estate: [
      {
        title: 'Real Estate — Brokerage Demo',
        orgId: 'org_demo_real_estate',
        overviewPath: '/org/org_demo_real_estate/overview',
        notes: 'Listing pack, offers, KYC intake'
      }
    ],
    construction: [
      {
        title: 'Contractors — GC Demo',
        orgId: 'org_demo_construction',
        overviewPath: '/org/org_demo_construction/overview',
        notes: 'Permit pack, change orders, site photos'
      }
    ],
    project_management: [
      {
        title: 'Project Mgmt — Delivery Demo',
        orgId: 'org_demo_pm',
        overviewPath: '/org/org_demo_pm/overview',
        notes: 'SOWs, sign-offs, release bundles'
      }
    ]
  } as const;

  return NextResponse.json(data);
}

