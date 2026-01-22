import { TemplateSpec } from "@/lib/templates/schema";

export const catalog: TemplateSpec[] = [
  {
    templateId: "personal-life-admin-v1",
    name: "Personal – Life Admin",
    version: 1,
    scope: "personal",
    categories: ["Personal","Life"],
    description: "Bills, IDs, insurance, and receipts. Ready in minutes.",
    preview: { folders: ["Bills/2025","IDs","Insurance","Receipts/By Month"], labels: ["Bill","ID","Policy","Receipt"] },
    vault: {
      folders: [{ path: "Bills/2025" }, { path: "IDs" }, { path: "Insurance" }, { path: "Receipts/By Month" }],
      labels: [{ key: "Bill" }, { key: "ID" }, { key: "Policy" }, { key: "Receipt" }],
      labelRules: [
        { name: "Auto-label receipts", match: { filename: "receipt" }, apply: ["Receipt"], destFolder: "Receipts/By Month" }
      ],
    },
    requests: [
      { name: "New Job Onboarding", items: ["Gov ID","Bank Void Cheque","Resume"], pinRequired: true, expiryDays: 5 },
    ],
    shares: [
      { name: "Secure Upload (Personal)", watermark: true, pin: true, expiryDays: 5, allowUpload: true },
    ],
    automations: [],
    ui: { kpis: ["docs_added_week","shares_active","requests_outstanding"], quickActions: ["request_files"], checklist: ["enable_receipt_ocr","email_to_vault_setup"] },
    compat: { minApp: "1.0.0", requires: { features: ["labels","request_links"], connectors: [] } },
    pricing: { type: "free", priceUSD: 0 },
    author: { name: "SVD Starter" },
  },
  {
    templateId: "business-general-ops-v1",
    name: "Business – General Ops",
    version: 1,
    scope: "business",
    categories: ["Business","Operations"],
    description: "Contracts, invoices, receipts by month, HR, compliance.",
    preview: { folders: ["Contracts","Invoices","Receipts/2025","HR","Compliance"], labels: ["Contract","Invoice","Receipt","HR","Policy"] },
    vault: {
      folders: [
        { path: "Contracts" }, { path: "Invoices" }, { path: "Receipts/2025" }, { path: "HR" }, { path: "Compliance" }
      ],
      labels: [ { key: "Contract" }, { key: "Invoice" }, { key: "Receipt" }, { key: "HR" }, { key: "Policy" } ],
      labelRules: [
        { name: "Auto-label invoices", match: { filename: "invoice" }, apply: ["Invoice"], destFolder: "Invoices" },
        { name: "Receipts to 2025", match: { filename: "receipt" }, apply: ["Receipt"], destFolder: "Receipts/2025" }
      ]
    },
    requests: [
      { name: "Vendor Onboarding Pack", items: ["W9/W8","Void Cheque","Insurance Cert"], pinRequired: true, expiryDays: 7 }
    ],
    shares: [ { name: "Secure Upload (Business)", watermark: true, pin: true, expiryDays: 7, allowUpload: true } ],
    automations: [ { name: "Email-to-Vault: invoices@", type: "email_rule", match: { to: "invoices@org.svd" }, destFolder: "Invoices", apply: ["Invoice"] } ],
    ui: { kpis: ["docs_added_week","requests_outstanding","ar_outstanding"], quickActions: ["send_estimate_pack","request_files"], checklist: ["brand_firm_logo","enable_object_lock","invite_bookkeepers"] },
    compat: { minApp: "1.0.0", requires: { features: ["labels","request_links","shares"], connectors: [] } },
    pricing: { type: "free", priceUSD: 0 },
    author: { name: "SVD Starter" },
  }
];

