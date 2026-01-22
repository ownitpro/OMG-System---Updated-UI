// /lib/vault/store.ts
// Storage + service layer (demo-safe)

import { VaultDoc } from "@/lib/types/vault";

const KEY = "svd_demo_vault_docs";

export function loadDocs(): VaultDoc[] {
  try {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveDocs(docs: VaultDoc[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(docs));
  // Trigger storage event for cross-tab sync
  window.dispatchEvent(new Event('storage'));
}

export function addDoc(doc: VaultDoc) {
  const docs = loadDocs();
  docs.unshift(doc);
  saveDocs(docs);
}

export function reclassifyDoc(id: string, folder: VaultDoc["folder"], labels: VaultDoc["labels"]) {
  const docs = loadDocs().map(d =>
    d.id === id ? { ...d, folder, labels, status: "reclassified" as const } : d
  );
  saveDocs(docs);
}

export function docsBy(folder?: string, monthKey?: string) {
  return loadDocs().filter(d =>
    (folder ? d.folder === folder : true) &&
    (monthKey ? d.monthKey === monthKey : true)
  );
}

export function getNeedsReview(): VaultDoc[] {
  return loadDocs().filter(d => d.status === "needs_review");
}

export function getAvailableMonths(): string[] {
  const docs = loadDocs();
  const months = new Set(docs.map(d => d.monthKey));
  return Array.from(months).sort().reverse();
}

export function deleteDoc(id: string) {
  const docs = loadDocs().filter(d => d.id !== id);
  saveDocs(docs);
}

