// /lib/classifier/mockClassifier.ts
// Mock "classifier" (works now; easy to swap later)

import { VaultDoc, VaultFolder, VaultLabel } from "@/lib/types/vault";

const rules: Array<{ test: RegExp; folder: VaultFolder; labels?: VaultLabel[] }> = [
  { test: /driver|passport|id|license/i, folder: "ID" },
  { test: /hydro|gas|water|utility|enbridge|hydro one/i, folder: "Bills", labels: ["Utilities"] },
  { test: /rogers|bell|telus|internet|phone/i, folder: "Bills", labels: ["Internet"] },
  { test: /rent|mortgage|property tax/i, folder: "Bills", labels: ["Home"] },
  { test: /paystub|pay slip|salary|deposit/i, folder: "Income", labels: ["Invoice"] },
  { test: /receipt|visa|mastercard|amex|purchase/i, folder: "Receipts", labels: ["Other"] },
  { test: /movie|netflix|spotify|concert/i, folder: "Receipts", labels: ["Entertainment"] },
  { test: /air(?:\s)?canada|westjet|uber|lyft|hotel/i, folder: "Receipts", labels: ["Travel"] },
  { test: /pharmacy|rx|prescription|clinic|dentist/i, folder: "Health", labels: ["RX"] },
  { test: /tuition|school|university|college/i, folder: "Education" },
  { test: /contract|agreement|law|legal/i, folder: "Legal" },
  { test: /t1|t2|notice of assessment|noa|tax/i, folder: "Taxes" },
];

export function classify(fileName: string, ocrText = ""): { folder: VaultFolder; labels: VaultLabel[]; confidence: number } {
  const hay = `${fileName}\n${ocrText}`;
  for (const r of rules) {
    if (r.test.test(hay)) {
      return { folder: r.folder, labels: r.labels ?? [], confidence: 0.85 };
    }
  }
  return { folder: "Unsorted" as VaultFolder, labels: [] as VaultLabel[], confidence: 0.45 };
}

