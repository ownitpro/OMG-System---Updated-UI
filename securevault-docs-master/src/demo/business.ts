// src/demo/business.ts
// Business demo org data

export type DemoKpis = {
  workspaceUsage: { used: number; cap: number };
  clientPortals: { count: number; cap?: number };
  openRequests: number;
  approvalsPending: number;
};

export const businessOrg = {
  id: "demo_business_org",
  name: "Acme Docs Inc.",
  vertical: "business",
};

export const businessKpis: DemoKpis = {
  workspaceUsage: { used: 62, cap: 200 },
  clientPortals: { count: 28, cap: undefined },
  openRequests: 7,
  approvalsPending: 3,
};

export const businessQuickActions = [
  { id: "upload", title: "Upload", action: "/org/:orgId/upload" },
  { id: "new_share", title: "New share link", action: "/org/:orgId/shares" },
  { id: "request_files", title: "Request files", action: "/org/:orgId/requests" },
  { id: "install_app", title: "Install App", action: "/install" },
  { id: "try_ocr_review", title: "Try OCR Review", action: "/org/:orgId/docs?filter=ocr" },
  { id: "create_client_portal", title: "Create Client Portal", action: "/org/:orgId/portals/new" },
  { id: "send_request_docs", title: "Send Request for Docs", action: "/org/:orgId/requests/new" },
  { id: "connect_qbo", title: "Connect QBO", action: "/org/:orgId/settings/integrations?q=quickbooks" },
];

export const businessChecklist = {
  items: [
    { id: "brand_firm_logo", title: "Brand your org (logo)" },
    { id: "enable_object_lock", title: "Enable Object Lock (demo)" },
    { id: "create_client_intake_link", title: "Create client intake link" },
    { id: "enable_receipt_ocr", title: "Enable receipt OCR" },
    { id: "invite_bookkeepers", title: "Invite your teammates" },
  ],
};

export const businessActivity = {
  events: [
    { id: "e1", ts: new Date().toISOString(), actor: "michael", type: "upload", summary: "Uploaded 6 receipts" },
    { id: "e2", ts: new Date(Date.now()-3600e3).toISOString(), actor: "jamie", type: "link", summary: "Created KYC request link" },
    { id: "e3", ts: new Date(Date.now()-7200e3).toISOString(), actor: "sarah", type: "label", summary: "Applied 'Offer' label to 3 docs" },
  ],
};

