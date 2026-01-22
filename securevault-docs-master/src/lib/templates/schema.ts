import { z } from "zod";

export const Folder = z.object({ path: z.string().min(1) });

export const Label = z.object({ key: z.string().min(1) });

export const LabelRule = z.object({
  name: z.string(),
  match: z.record(z.string(), z.any()).default({}),
  apply: z.array(z.string()).default([]),
  destFolder: z.string().optional(),
});

export const RequestTemplate = z.object({
  name: z.string(),
  items: z.array(z.string()).default([]),
  pinRequired: z.boolean().default(true),
  expiryDays: z.number().int().positive().default(7),
});

export const SharePreset = z.object({
  name: z.string(),
  watermark: z.boolean().default(true),
  pin: z.boolean().default(true),
  expiryDays: z.number().int().positive().default(7),
  allowUpload: z.boolean().default(true),
});

export const UIBlock = z.object({
  kpis: z.array(z.string()).default([]),
  quickActions: z.array(z.string()).default([]),
  checklist: z.array(z.string()).default([]),
});

export const Compat = z.object({
  minApp: z.string().default("1.0.0"),
  requires: z.object({
    features: z.array(z.string()).default([]),
    connectors: z.array(z.string()).default([]),
  }).default({ features: [], connectors: [] }),
});

export const TemplateSpec = z.object({
  templateId: z.string(),
  name: z.string(),
  version: z.number().int().positive(),
  scope: z.enum(["business", "personal"]),
  categories: z.array(z.string()).default([]),
  description: z.string().default(""),
  preview: z.object({
    folders: z.array(z.string()).default([]),
    labels: z.array(z.string()).default([]),
  }).default({ folders: [], labels: [] }),
  vault: z.object({
    folders: z.array(Folder).default([]),
    labels: z.array(Label).default([]),
    labelRules: z.array(LabelRule).default([]),
  }).default({ folders: [], labels: [], labelRules: [] }),
  requests: z.array(RequestTemplate).default([]),
  shares: z.array(SharePreset).default([]),
  automations: z.array(z.record(z.string(), z.any())).default([]),
  ui: UIBlock.default({ kpis: [], quickActions: [], checklist: [] }),
  compat: Compat.default({ minApp: "1.0.0", requires: { features: [], connectors: [] } }),
  pricing: z.object({ type: z.enum(["free", "paid"]).default("free"), priceUSD: z.number().nonnegative().default(0) }).default({ type: "free", priceUSD: 0 }),
  author: z.object({ name: z.string(), website: z.string().optional() }),
});

export type TemplateSpec = z.infer<typeof TemplateSpec>;

