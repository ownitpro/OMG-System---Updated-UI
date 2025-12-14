export type LogLevel = "info" | "warn" | "error" | "audit";

export type AdminLog = {
  id: string;
  ts: string; // ISO
  level: LogLevel;
  actor: { type: "system" | "admin" | "client"; name: string; email?: string };
  action: string; // short label
  detail: string; // readable explanation
  meta?: Record<string, string | number | boolean | null>;
};

export const MOCK_LOGS: AdminLog[] = [
  {
    id: "log_2001",
    ts: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    level: "audit",
    actor: { type: "admin", name: "Admin", email: "admin@omg.com" },
    action: "Entitlements reset",
    detail: "Dev Tools: Reset test purchases was used.",
    meta: { key: "omg_entitlements" },
  },
  {
    id: "log_2002",
    ts: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    level: "info",
    actor: { type: "client", name: "Jordan Blake", email: "jordan@example.com" },
    action: "Checkout success (mock)",
    detail: "Client completed mock checkout for SecureVault Docs (SVD).",
    meta: { productId: "securevault-docs" },
  },
  {
    id: "log_2003",
    ts: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    level: "warn",
    actor: { type: "system", name: "System" },
    action: "App ping delayed",
    detail: "OMG-CRM localhost ping exceeded threshold (dev).",
    meta: { app: "omg-crm", ms: 1280 },
  },
  {
    id: "log_2004",
    ts: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    level: "error",
    actor: { type: "system", name: "System" },
    action: "Checkout error (mock)",
    detail: "Mock checkout returned cancel state.",
    meta: { productId: "omg-leads" },
  },
];

