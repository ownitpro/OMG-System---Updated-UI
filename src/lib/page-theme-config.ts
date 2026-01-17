export type ThemeColor = {
  name: string;
  rgb: string; // "71, 189, 121"
  hex: string; // "#47BD79"
};

export const PAGE_THEMES: Record<string, ThemeColor> = {
  // Default
  default: { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },

  // ═══════════════════════════════════════════════════════════════
  // APPS - Each app has its own theme color
  // ═══════════════════════════════════════════════════════════════
  "/apps/omg-ai-mastery": { name: "amber", rgb: "245, 158, 11", hex: "#F59E0B" },
  "/apps/omg-iq": { name: "purple", rgb: "168, 85, 247", hex: "#A855F7" },
  "/apps/omg-leads": { name: "blue", rgb: "37, 99, 235", hex: "#2563EB" },
  "/apps/securevault": { name: "emerald", rgb: "16, 185, 129", hex: "#10B981" },
  "/apps/securevault-docs": { name: "teal", rgb: "20, 184, 166", hex: "#14B8A6" },
  "/apps/leadflow": { name: "blue", rgb: "37, 99, 235", hex: "#2563EB" },
  "/apps/leadflow-engine": { name: "blue", rgb: "37, 99, 235", hex: "#2563EB" },
  "/apps/crm": { name: "sky", rgb: "56, 189, 248", hex: "#38BDF8" },
  "/apps/crm-demo": { name: "sky", rgb: "56, 189, 248", hex: "#38BDF8" },
  "/apps/demo": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/apps": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },

  // ═══════════════════════════════════════════════════════════════
  // PRODUCTS - Match their corresponding app colors
  // ═══════════════════════════════════════════════════════════════
  "/products/omg-iq": { name: "purple", rgb: "168, 85, 247", hex: "#A855F7" },
  "/products/omg-ai-mastery": { name: "amber", rgb: "245, 158, 11", hex: "#F59E0B" },
  "/products/securevault": { name: "emerald", rgb: "16, 185, 129", hex: "#10B981" },
  "/products/securevault-docs": { name: "teal", rgb: "20, 184, 166", hex: "#14B8A6" },
  "/products/leadflow": { name: "blue", rgb: "37, 99, 235", hex: "#2563EB" },
  "/products/crm": { name: "sky", rgb: "56, 189, 248", hex: "#38BDF8" },
  "/products": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },

  // ═══════════════════════════════════════════════════════════════
  // MARKETING AGENCY SERVICES - Individual colors per service
  // ═══════════════════════════════════════════════════════════════
  "/marketing/ads-management": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/marketing/branding-creative": { name: "purple", rgb: "168, 85, 247", hex: "#A855F7" },
  "/marketing/content-development": { name: "emerald", rgb: "16, 185, 129", hex: "#10B981" },
  "/marketing/email-marketing": { name: "amber", rgb: "245, 158, 11", hex: "#F59E0B" },
  "/marketing/seo-services": { name: "teal", rgb: "20, 184, 166", hex: "#14B8A6" },
  "/marketing/social-media": { name: "pink", rgb: "236, 72, 153", hex: "#EC4899" },
  "/marketing/web-design": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/marketing/tiers": { name: "rose", rgb: "244, 63, 94", hex: "#F43F5E" },
  "/marketing/how-it-works": { name: "rose", rgb: "244, 63, 94", hex: "#F43F5E" },
  "/marketing/services": { name: "rose", rgb: "244, 63, 94", hex: "#F43F5E" },
  "/marketing": { name: "rose", rgb: "244, 63, 94", hex: "#F43F5E" },

  // ═══════════════════════════════════════════════════════════════
  // INDUSTRIES - Cyan theme for all industry pages
  // ═══════════════════════════════════════════════════════════════
  "/industries/accounting": { name: "cyan", rgb: "6, 182, 212", hex: "#06B6D4" },
  "/industries/contractors": { name: "cyan", rgb: "6, 182, 212", hex: "#06B6D4" },
  "/industries/property-management": { name: "cyan", rgb: "6, 182, 212", hex: "#06B6D4" },
  "/industries/real-estate": { name: "cyan", rgb: "6, 182, 212", hex: "#06B6D4" },
  "/industries/healthcare": { name: "cyan", rgb: "6, 182, 212", hex: "#06B6D4" },
  "/industries/legal": { name: "cyan", rgb: "6, 182, 212", hex: "#06B6D4" },
  "/industries/finance": { name: "cyan", rgb: "6, 182, 212", hex: "#06B6D4" },
  "/industries/retail": { name: "cyan", rgb: "6, 182, 212", hex: "#06B6D4" },
  "/industries": { name: "cyan", rgb: "6, 182, 212", hex: "#06B6D4" },

  // ═══════════════════════════════════════════════════════════════
  // SOLUTIONS - Teal theme for solution pages
  // ═══════════════════════════════════════════════════════════════
  "/solutions/automations": { name: "teal", rgb: "20, 184, 166", hex: "#14B8A6" },
  "/solutions/custom-solutions": { name: "teal", rgb: "20, 184, 166", hex: "#14B8A6" },
  "/solutions/strategy-session": { name: "teal", rgb: "20, 184, 166", hex: "#14B8A6" },
  "/solutions/timeguard-ai": { name: "amber", rgb: "245, 158, 11", hex: "#F59E0B" },
  "/solutions": { name: "teal", rgb: "20, 184, 166", hex: "#14B8A6" },

  // ═══════════════════════════════════════════════════════════════
  // ADMIN DASHBOARD - Slate/professional color for admin areas
  // ═══════════════════════════════════════════════════════════════
  "/admin/analytics": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/admin/users": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/admin/settings": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/admin/organizations": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/admin/subscriptions": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/admin/feedback": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/admin/tickets": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/admin/notifications": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/admin/feature-flags": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/admin/coupons": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/admin/launch-plans": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/admin": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },

  // ═══════════════════════════════════════════════════════════════
  // PORTAL - Indigo theme for portal management
  // ═══════════════════════════════════════════════════════════════
  "/portal/admin/analytics": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal/admin/users": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal/admin/settings": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal/admin/organizations": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal/admin/subscriptions": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal/admin/feedback": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal/admin/tickets": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal/admin/notifications": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal/admin/feature-flags": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal/admin/coupons": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal/admin/launch-plans": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal/admin": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal/client": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },
  "/portal": { name: "indigo", rgb: "99, 102, 241", hex: "#6366F1" },

  // ═══════════════════════════════════════════════════════════════
  // DASHBOARD - Blue theme for customer dashboard
  // ═══════════════════════════════════════════════════════════════
  "/dashboard/admin/analytics": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/admin/users": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/admin/settings": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/admin/organizations": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/admin/subscriptions": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/admin/feedback": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/admin/tickets": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/admin/notifications": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/admin/feature-flags": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/admin/coupons": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/admin/launch-plans": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/admin": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/client/automations": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/client/workflows": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/client": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/settings": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/support": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/usage": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard/workflows": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/dashboard": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },

  // ═══════════════════════════════════════════════════════════════
  // AUTOMATIONS & WORKFLOWS - Teal theme
  // ═══════════════════════════════════════════════════════════════
  "/automations": { name: "teal", rgb: "20, 184, 166", hex: "#14B8A6" },
  "/workflows": { name: "teal", rgb: "20, 184, 166", hex: "#14B8A6" },

  // ═══════════════════════════════════════════════════════════════
  // AUTH & USER PAGES - Green theme
  // ═══════════════════════════════════════════════════════════════
  "/login": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/register": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/signup": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/forgot-password": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/reset-password": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/verify-email": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/profile": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/account": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },

  // ═══════════════════════════════════════════════════════════════
  // CHECKOUT & BILLING - Emerald theme
  // ═══════════════════════════════════════════════════════════════
  "/checkout/start": { name: "emerald", rgb: "16, 185, 129", hex: "#10B981" },
  "/checkout/success": { name: "emerald", rgb: "16, 185, 129", hex: "#10B981" },
  "/checkout/cancel": { name: "emerald", rgb: "16, 185, 129", hex: "#10B981" },
  "/checkout": { name: "emerald", rgb: "16, 185, 129", hex: "#10B981" },
  "/pricing": { name: "emerald", rgb: "16, 185, 129", hex: "#10B981" },
  "/billing": { name: "emerald", rgb: "16, 185, 129", hex: "#10B981" },
  "/invoices": { name: "emerald", rgb: "16, 185, 129", hex: "#10B981" },

  // ═══════════════════════════════════════════════════════════════
  // CONTACT & SUPPORT - Blue theme
  // ═══════════════════════════════════════════════════════════════
  "/contact": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/support": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/help": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },
  "/faq": { name: "blue", rgb: "59, 130, 246", hex: "#3B82F6" },

  // ═══════════════════════════════════════════════════════════════
  // PUBLIC PAGES - Purple theme for About
  // ═══════════════════════════════════════════════════════════════
  "/about": { name: "purple", rgb: "168, 85, 247", hex: "#A855F7" },
  "/careers": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/privacy": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/terms": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/blog": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/case-studies": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/testimonials": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },

  // ═══════════════════════════════════════════════════════════════
  // DEMO & TRIAL PAGES - Green theme
  // ═══════════════════════════════════════════════════════════════
  "/try-live-demo": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/demo": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/trial": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },
  "/get-started": { name: "green", rgb: "71, 189, 121", hex: "#47BD79" },

  // ═══════════════════════════════════════════════════════════════
  // BETA & TESTING PAGES
  // ═══════════════════════════════════════════════════════════════
  "/beta": { name: "amber", rgb: "245, 158, 11", hex: "#F59E0B" },
  "/beta-users": { name: "amber", rgb: "245, 158, 11", hex: "#F59E0B" },

  // ═══════════════════════════════════════════════════════════════
  // API & DEVELOPER PAGES
  // ═══════════════════════════════════════════════════════════════
  "/api": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/developers": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
  "/docs": { name: "slate", rgb: "100, 116, 139", hex: "#64748B" },
};

export function getPageTheme(pathname: string): ThemeColor {
  // Exact match first
  if (PAGE_THEMES[pathname]) {
    return PAGE_THEMES[pathname];
  }

  // Prefix match for nested routes (sorted by length descending for specificity)
  const routes = Object.keys(PAGE_THEMES)
    .filter((route) => route !== "default")
    .sort((a, b) => b.length - a.length);

  for (const route of routes) {
    if (pathname.startsWith(route)) {
      return PAGE_THEMES[route];
    }
  }

  return PAGE_THEMES.default;
}
