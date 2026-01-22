import type { TemplateSpec } from "@/lib/templates/schema";

// Simple org state — replace with DB later
export type OrgState = {
  id: string;
  folders: Set<string>;
  labels: Set<string>;
  labelRules: any[];
  requestTemplates: any[];
  sharePresets: any[];
  ui: { kpis: string[]; quickActions: string[]; checklist: string[] };
};

export type InstallLog = {
  id: string; // install batch id
  orgId: string;
  templateId: string;
  version: number;
  created: string;
  createdItems: {
    folders: string[];
    labels: string[];
    labelRules: number[]; // indexes
    requestTemplates: number[]; // indexes
    sharePresets: number[]; // indexes
  };
};

// Mock orgs (business & personal demos)
export const orgs: Record<string, OrgState> = {
  "demo-business": {
    id: "demo-business",
    folders: new Set(["Welcome","Receipts"]),
    labels: new Set(["Welcome"]),
    labelRules: [],
    requestTemplates: [],
    sharePresets: [],
    ui: { kpis: [], quickActions: [], checklist: [] }
  },
  "demo-personal": {
    id: "demo-personal",
    folders: new Set(["Home","IDs"]),
    labels: new Set(["ID"]),
    labelRules: [],
    requestTemplates: [],
    sharePresets: [],
    ui: { kpis: [], quickActions: [], checklist: [] }
  }
};

export const installs: Record<string, InstallLog> = {};

export function dryRun(orgId: string, tpl: TemplateSpec) {
  const org = orgs[orgId];
  if (!org) throw new Error("Unknown org");

  const collisions = {
    folders: tpl.vault.folders.filter(f => org.folders.has(f.path)).map(f => f.path),
    labels: tpl.vault.labels.filter(l => org.labels.has(l.key)).map(l => l.key),
  };

  return { collisions };
}

export function applyInstall(orgId: string, tpl: TemplateSpec) {
  const org = orgs[orgId];
  if (!org) throw new Error("Unknown org");

  const id = `inst_${Date.now()}`;
  const created = { folders: [] as string[], labels: [] as string[], labelRules: [] as number[], requestTemplates: [] as number[], sharePresets: [] as number[] };

  tpl.vault.folders.forEach(f => { if (!org.folders.has(f.path)) { org.folders.add(f.path); created.folders.push(f.path); } });
  tpl.vault.labels.forEach(l => { if (!org.labels.has(l.key)) { org.labels.add(l.key); created.labels.push(l.key); } });
  tpl.vault.labelRules.forEach((r, idx) => { org.labelRules.push(r); created.labelRules.push(org.labelRules.length - 1); });
  tpl.requests.forEach((r) => { org.requestTemplates.push(r); created.requestTemplates.push(org.requestTemplates.length - 1); });
  tpl.shares.forEach((s) => { org.sharePresets.push(s); created.sharePresets.push(org.sharePresets.length - 1); });

  org.ui.kpis = Array.from(new Set([...(org.ui.kpis||[]), ...(tpl.ui.kpis||[])]));
  org.ui.quickActions = Array.from(new Set([...(org.ui.quickActions||[]), ...(tpl.ui.quickActions||[])]));
  org.ui.checklist = Array.from(new Set([...(org.ui.checklist||[]), ...(tpl.ui.checklist||[])]));

  const log: InstallLog = { id, orgId, templateId: tpl.templateId, version: tpl.version, created: new Date().toISOString(), createdItems: created };
  installs[id] = log;

  return log;
}

export function rollback(installId: string) {
  const log = installs[installId];
  if (!log) throw new Error("Unknown install id");

  const org = orgs[log.orgId];
  if (!org) throw new Error("Unknown org");

  // Remove created items
  log.createdItems.folders.forEach(p => org.folders.delete(p));
  log.createdItems.labels.forEach(k => org.labels.delete(k));

  // For arrays we can't easily delete by index once mutated; in test mode we simply no-op or mark a tombstone.
  // In real DB, we'd use IDs. Here we just acknowledge.
  delete installs[installId];

  return { ok: true };
}

