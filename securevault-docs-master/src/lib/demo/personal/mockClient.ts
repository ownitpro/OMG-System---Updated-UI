// src/lib/demo/personal/mockClient.ts
// Mock client data for personal demo

export const summary = {
  trialEnds: new Date(Date.now() + 7 * 86400000).toISOString(),
};

export const kpis = {
  docs: 42,
  storage: 320,
  shares: 5,
  sharesActive: 2,
  uploads30d: 18,
  ocr30d: 65,
};

export const activity = {
  events: [
    { id: "1", ts: new Date().toISOString(), summary: "Uploaded 3 receipts" },
    {
      id: "2",
      ts: new Date(Date.now() - 3600e3).toISOString(),
      summary: "Created share link for 'Tax Pack'",
    },
    {
      id: "3",
      ts: new Date(Date.now() - 7200e3).toISOString(),
      summary: "Tagged 'Insurance' on 2 files",
    },
  ],
};

export const metrics = {
  items: [
    { label: "Uploads (7d)", value: "12", trend: "+3 this week" },
    { label: "OCR pages (7d)", value: "28", trend: "+5 this week" },
    { label: "Share links (7d)", value: "3", trend: "+1 this week" },
    { label: "Storage used", value: "320 MB", trend: "of 500 MB" },
  ],
};

export const vault = {
  items: [
    {
      id: "a1",
      name: "Passport.pdf",
      type: "PDF",
      size: 240,
      ts: Date.now() - 86400e3,
      labels: ["ID"],
    },
    {
      id: "a2",
      name: "Lease-2025.docx",
      type: "DOCX",
      size: 120,
      ts: Date.now() - 2 * 86400e3,
      labels: ["Housing"],
    },
    {
      id: "a3",
      name: "Receipt-HomeDepot.jpg",
      type: "JPG",
      size: 860,
      ts: Date.now() - 3 * 86400e3,
      labels: ["Receipt", "Home"],
    },
    {
      id: "a4",
      name: "Insurance-Card.pdf",
      type: "PDF",
      size: 180,
      ts: Date.now() - 5 * 86400e3,
      labels: ["Insurance", "ID"],
    },
    {
      id: "a5",
      name: "Tax-Return-2024.pdf",
      type: "PDF",
      size: 450,
      ts: Date.now() - 7 * 86400e3,
      labels: ["Tax"],
    },
  ],
};

let sharesMemory = [
  {
    id: "s1",
    name: "Tax Pack",
    url: "/viewer/demo/tax-pack",
    pin: "1234",
    expiry: new Date(Date.now() + 3 * 86400e3).toISOString(),
    created: new Date().toISOString(),
  },
  {
    id: "s2",
    name: "ID for Bank",
    url: "/viewer/demo/id",
    created: new Date(Date.now() - 2 * 86400e3).toISOString(),
  },
];

export function getShares() {
  return sharesMemory;
}

export function addShare(share: any) {
  sharesMemory = [share, ...sharesMemory];
  return share;
}

export function removeShare(id: string) {
  sharesMemory = sharesMemory.filter((x) => x.id !== id);
}

