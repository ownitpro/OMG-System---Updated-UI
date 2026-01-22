// /lib/types/vault.ts
// Minimal data model (front-end only for demo)

export type VaultFolder =
  | "ID" | "Bills" | "Income" | "Receipts" | "Health" | "Education" | "Legal" | "Taxes" | "Unsorted";

export type VaultLabel =
  | "Home" | "Phone" | "Utilities" | "Internet" | "Food" | "Entertainment" | "Travel"
  | "Insurance" | "RX" | "Tuition" | "Invoice" | "Statement" | "T1" | "T2" | "NOA" | "Other";

export type VaultStatus = "classified" | "needs_review" | "reclassified";

export interface VaultDoc {
  id: string;
  filename: string;
  uploadedAt: string; // ISO
  amount?: number;    // for CSV summaries if present
  folder: VaultFolder;
  labels: VaultLabel[];
  monthKey: string;   // "2025-11"
  status: VaultStatus;
  confidence: number; // 0..1 (mock)
  notes?: string;
}

