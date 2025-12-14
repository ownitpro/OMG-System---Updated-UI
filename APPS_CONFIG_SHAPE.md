# apps_config.ts Type Definition

This document shows the complete structure of `apps_config.ts` for reference.

## Type Definitions

```typescript
// App ID type - union of all possible app IDs
export type AppId = "svd" | "crm" | "leads" | "iq" | "learn";

// Main app configuration type
export type AppConfig = {
  id: AppId;                    // Unique identifier (matches AppId type)
  slug: string;                 // URL slug used by /apps/[id] dynamic route
  label: string;                // Display name (e.g., "OMGCRM", "SecureVault Docs")
  code: string;                 // Internal code name (e.g., "svd_app", "crm_app")
  href: string;                 // Full URL path for navigation & links
  tagline: string;              // Short tagline (e.g., "Capture once. Organize forever.")
  summary: string;              // Longer description/summary paragraph
  status: "live" | "coming_soon"; // Current status
  theme: "securevault" | "crm" | "leads" | "iq" | "learn"; // Theme identifier
  primaryColor?: string;        // Optional hex color code (e.g., "#00C57A")
};
```

## Example App Config Entry

```typescript
{
  id: "svd",
  slug: "securevault-docs",
  label: "SecureVault Docs",
  code: "svd_app",
  href: "/apps/securevault-docs",
  tagline: "Capture once. Organize forever.",
  summary: "Give your team and clients one secure place to upload, organize, and share documents—without email chaos.",
  status: "live",
  theme: "securevault",
  primaryColor: "#00C57A", // emerald
}
```

## Helper Functions

```typescript
// Get app by slug (used in dynamic routes)
export function getAppBySlug(slug: string): AppConfig | undefined {
  return appsConfig.find((app) => app.slug === slug);
}

// Get app by ID (throws error if not found)
export function getAppById(id: AppId): AppConfig {
  const app = appsConfig.find((a) => a.id === id);
  if (!app) {
    throw new Error(`App not found for id: ${id}`);
  }
  return app;
}

// Get multiple apps by IDs (used for featured apps)
export function getAppsByIds(ids: AppId[]): AppConfig[] {
  return appsConfig.filter((app) => ids.includes(app.id));
}
```

## Complete appsConfig Array

```typescript
export const appsConfig: AppConfig[] = [
  {
    id: "svd",
    slug: "securevault-docs",
    label: "SecureVault Docs",
    code: "svd_app",
    href: "/apps/securevault-docs",
    tagline: "Capture once. Organize forever.",
    summary: "Give your team and clients one secure place to upload, organize, and share documents—without email chaos.",
    status: "live",
    theme: "securevault",
    primaryColor: "#00C57A", // emerald
  },
  {
    id: "crm",
    slug: "crm",
    label: "OMGCRM",
    code: "crm_app",
    href: "/apps/crm",
    tagline: "The CRM that adapts to your workflow.",
    summary: "Unify your leads, clients, pipelines, tasks, and documents in one clean, automation-ready CRM.",
    status: "live",
    theme: "crm",
    primaryColor: "#3A86FF", // blue
  },
  {
    id: "leads",
    slug: "omg-leads",
    label: "OMG Leads",
    code: "leadflow_app",
    href: "/apps/omg-leads",
    tagline: "Turn ads into predictable revenue.",
    summary: "Connect your ads to your CRM with smart scoring, automated follow-up, and real ROI tracking.",
    status: "live",
    theme: "leads",
    primaryColor: "#8C3AFF", // neon purple
  },
  {
    id: "iq",
    slug: "industryiq",
    label: "OMG IQ",
    code: "iq_app",
    href: "/apps/industryiq",
    tagline: "Daily insights for smarter decisions.",
    summary: "See benchmarks, trends, and predictive analytics across your industry so you can move first, not last.",
    status: "live",
    theme: "iq",
    primaryColor: "#1A1A1A", // graphite (dashboard feel)
  },
  {
    id: "learn",
    slug: "omg-learn",
    label: "OMG Learn",
    code: "learn_app",
    href: "/apps/omg-learn",
    tagline: "Learn how to prompt and build with AI.",
    summary: "A learning hub that teaches you how to prompt, design automations, and use AI across your business.",
    status: "coming_soon",
    theme: "learn",
    primaryColor: "#FFC94F", // gold (education feel)
  },
];
```

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|---------|-------------|
| `id` | `AppId` | ✅ | Unique identifier, must match one of the union types |
| `slug` | `string` | ✅ | URL-friendly identifier used in dynamic routes (`/apps/[slug]`) |
| `label` | `string` | ✅ | Display name shown in UI |
| `code` | `string` | ✅ | Internal code name (for API/system references) |
| `href` | `string` | ✅ | Full URL path (usually `/apps/{slug}`) |
| `tagline` | `string` | ✅ | Short, punchy tagline (1 sentence) |
| `summary` | `string` | ✅ | Longer description (1-2 sentences) |
| `status` | `"live" \| "coming_soon"` | ✅ | Current availability status |
| `theme` | `Theme` | ✅ | Theme identifier for styling |
| `primaryColor` | `string?` | ❌ | Optional hex color for theme customization |

## Usage Examples

### In Dynamic Route
```typescript
// app/apps/[id]/page.tsx
import { getAppBySlug } from "@/config/apps_config";

export default function AppPage({ params }: { params: { id: string } }) {
  const app = getAppBySlug(params.id);
  if (!app) return notFound();
  
  return <div>{app.label}</div>;
}
```

### In Featured Apps Section
```typescript
// Get featured apps for a solution
import { getAppsByIds } from "@/config/apps_config";

const featuredAppIds: AppId[] = ["crm", "svd"];
const featuredApps = getAppsByIds(featuredAppIds);
```

### In Navigation
```typescript
// Use href directly in navigation
import { appsConfig } from "@/config/apps_config";

appsConfig.map((app) => (
  <Link href={app.href}>{app.label}</Link>
));
```

## Notes

- The `slug` field is used by the dynamic route `/apps/[id]` where `[id]` is the slug
- The `href` field is used for navigation links and should match the route structure
- The `id` field is used for internal references and filtering
- The `theme` field can be used for conditional styling
- The `primaryColor` is optional and can be used for dynamic theming

