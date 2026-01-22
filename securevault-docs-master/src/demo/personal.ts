// src/demo/personal.ts
// Personal demo org data

export const personalOrg = {
  id: "demo_personal_org",
  name: "My Secure Vault",
  vertical: "personal",
};

export const personalKpis = {
  workspaceUsage: { used: 12, cap: 50 },
  clientPortals: { count: 0 },
  openRequests: 1,
  approvalsPending: 0,
};

export const personalQuickActions = [
  { id: "upload", title: "Upload", action: "/org/:orgId/upload" },
  { id: "new_share", title: "New share link", action: "/org/:orgId/shares" },
  { id: "install_app", title: "Install App", action: "/install" },
  { id: "try_ocr_review", title: "Try OCR Review", action: "/org/:orgId/docs?filter=ocr" },
];

export const personalChecklist = {
  items: [
    { id: "secure_backup", title: "Secure a backup email" },
    { id: "upload_id", title: "Upload ID & Insurance cards" },
    { id: "enable_pwa", title: "Install PWA on your device" },
  ],
};

export const personalActivity = {
  events: [
    { id: "p1", ts: new Date().toISOString(), actor: "you", type: "upload", summary: "Uploaded Passport.pdf" },
  ],
};

