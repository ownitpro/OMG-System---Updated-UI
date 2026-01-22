// src/lib/demo/business/mockClient.ts
// Mock client data for business demo

export const summary = {
  plan: "growth",
  trialEnds: new Date("2025-11-25").toISOString(),
  kpis: {
    workspaceUsage: { used: 62, cap: 100 },
    clientPortals: { count: 12, cap: 50 },
    openRequests: 7,
    approvalsPending: 3,
  },
};

export const activity = {
  events: [
    { id: "1", ts: new Date().toISOString(), actor: "michael", summary: "Uploaded 6 receipts" },
    {
      id: "2",
      ts: new Date(Date.now() - 3600e3).toISOString(),
      actor: "jamie",
      summary: "Created KYC request link",
    },
    {
      id: "3",
      ts: new Date(Date.now() - 2 * 3600e3).toISOString(),
      actor: "sarah",
      summary: 'Applied "Offer" label to 3 docs',
    },
  ],
};

export const metrics = {
  items: [
    { label: "Uploads (7d)", value: "214", trend: "+12% WoW" },
    { label: "OCR pages (7d)", value: "1,420", trend: "+7% WoW" },
    { label: "Egress (GB, 7d)", value: "3.2", trend: "-4% WoW" },
    { label: "Active users (7d)", value: "27", trend: "+2 MoM" },
  ],
};

export const documents = [
  { name: "Invoice_2025-11-14.pdf", label: "Invoice", status: "Clean", updated: "1h ago" },
  { name: "Contract_Acme_v3.pdf", label: "Contract", status: "Watermarked", updated: "3h ago" },
  { name: "NOA_JohnDoe.pdf", label: "Tax", status: "Clean", updated: "Yesterday" },
];

export const portals = [
  { client: "Acme Corp", email: "ops@acme.com", status: "Active", last: "Today" },
  { client: "Maple Homes", email: "info@maplehomes.ca", status: "Invited", last: "2d ago" },
];

export const requests = [
  { title: "Year-end docs", for: "Acme Corp", due: "Nov 30", state: "Open" },
  { title: "KYC refresh", for: "Maple Homes", due: "Dec 05", state: "Pending" },
];

export const shares = [
  { link: "svd.to/xyz", label: "Offer", expires: "Dec 10", downloads: "3" },
  { link: "svd.to/abc", label: "Financials", expires: "Dec 02", downloads: "12" },
];

export const billing = { plan: "growth" };
export const settings = { ok: true };

