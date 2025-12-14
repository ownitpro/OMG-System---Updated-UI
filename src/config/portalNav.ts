import { APP_LINKS } from "@/config/appLinks";
import type { NavGroup } from "@/components/PortalShell";

export function getClientNav(): NavGroup[] {
  return [
    { title: "Home", items: [{ label: "Portal Home", href: "/portal/client" }] },
    {
      title: "Apps",
      items: [
        { label: "OMG Build", href: "/portal/client", comingSoon: true },
        { label: "OMG-CRM", kind: "external" as const, externalUrl: APP_LINKS.omgCrm },
        { label: "SecureVault Docs", kind: "external" as const, externalUrl: APP_LINKS.securevaultDocs },
        { label: "OMG-Leads", kind: "external" as const, externalUrl: APP_LINKS.omgLeads },
        { label: "OMG-IQ", kind: "external" as const, externalUrl: APP_LINKS.omgIq },
        { label: "OMG-AI-Mastery", kind: "external" as const, externalUrl: APP_LINKS.omgAiMastery },
        { label: "Timeguard-AI", href: "/portal/client/timeguard-ai", comingSoon: true },
      ],
    },
    {
      title: "Work",
      items: [
        { label: "Automations", href: "/portal/client/automations" },
        { label: "Strategy-Session", href: "/portal/client/strategy-session", comingSoon: true },
        { label: "Custom-Solutions", href: "/portal/client/custom-solutions", comingSoon: true },
      ],
    },
    {
      title: "Growth",
      items: [
        { label: "Ads-Management", href: "/portal/client/ads-management" },
        { label: "Branding-Creative", href: "/portal/client/branding-creative" },
        { label: "Content-Development", href: "/portal/client/content-development" },
      ],
    },
    {
      title: "Industry-Focused",
      items: [
        { label: "Real-Estate", href: "/portal/client/industry-focused/real-estate", comingSoon: true },
        { label: "Property-Management", href: "/portal/client/industry-focused/property-management", comingSoon: true },
        { label: "Contractors", href: "/portal/client/industry-focused/contractors", comingSoon: true },
        { label: "Accounting", href: "/portal/client/industry-focused/accounting", comingSoon: true },
      ],
    },
  ];
}

export function getAdminNav(): NavGroup[] {
  return [
    { title: "Overview", items: [{ label: "Admin Home", href: "/portal/admin" }] },
        {
          title: "Commerce",
          items: [
            { label: "Orders", href: "/portal/admin/orders" },
            { label: "Products", href: "/portal/admin/products" },
            { label: "Coupons", href: "/portal/admin/coupons" },
            { label: "Coupons Analytics", href: "/portal/admin/coupons/analytics" },
          ],
        },
        {
          title: "Users",
          items: [
            { label: "Clients", href: "/portal/admin/users" },
            { label: "Access", href: "/portal/admin/access" },
          ],
        },
    {
      title: "System",
      items: [
        { label: "Logs", href: "/portal/admin/logs" },
        { label: "Settings", href: "/portal/admin/settings" },
      ],
    },
  ];
}

