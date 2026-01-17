import { APP_LINKS } from "@/config/appLinks";
import type { NavGroup } from "@/components/PortalShell";
import type { NavGroup as NavGroupV2 } from "@/components/portal/PortalShellV2";
import {
  HomeIcon,
  CubeIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  CogIcon,
  BoltIcon,
  CalendarIcon,
  PuzzlePieceIcon,
  MegaphoneIcon,
  PaintBrushIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  CalculatorIcon,
  ShoppingCartIcon,
  TagIcon,
  UsersIcon,
  KeyIcon,
  DocumentMagnifyingGlassIcon,
  AcademicCapIcon,
  SparklesIcon,
  RocketLaunchIcon,
  PresentationChartLineIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon,
  LockClosedIcon,
  CreditCardIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

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

// V2 Navigation with Icons for new dark theme portal
export function getClientNavV2(): NavGroupV2[] {
  return [
    {
      title: "Home",
      items: [
        { label: "Dashboard", href: "/portal/client", icon: HomeIcon },
      ],
    },
    {
      title: "Apps",
      items: [
        { label: "OMG Build", href: "/portal/client", icon: CubeIcon, comingSoon: true, productKey: "omg_build" },
        { label: "OMG-CRM", href: "/products/omg-crm", icon: UserGroupIcon, productKey: "omg_crm", launchUrl: APP_LINKS.omgCrm },
        { label: "SecureVault Docs", href: "/products/securevault-docs", icon: ShieldCheckIcon, productKey: "securevault_docs", launchUrl: APP_LINKS.securevaultDocs },
        { label: "OMG-Leads", href: "/products/omg-leads", icon: RocketLaunchIcon, productKey: "omg_leads", launchUrl: APP_LINKS.omgLeads },
        { label: "OMG-IQ", href: "/products/omg-iq", icon: ChartBarIcon, productKey: "omg_iq", launchUrl: APP_LINKS.omgIq },
        { label: "OMG AI Mastery", href: "/products/omg-ai-mastery", icon: AcademicCapIcon, productKey: "omg_ai_mastery", launchUrl: APP_LINKS.omgAiMastery },
        { label: "TimeGuard AI", href: "/portal/client/timeguard-ai", icon: ClockIcon, comingSoon: true, productKey: "timeguard_ai" },
      ],
    },
    {
      title: "Strategy Session",
      items: [
        { label: "Strategy Session", href: "/portal/client/strategy-session", icon: CalendarIcon },
      ],
    },
    {
      title: "Services",
      items: [
        { label: "Automations", href: "/portal/client/automations", icon: BoltIcon, comingSoon: true },
        { label: "AI Solutions", href: "/portal/client/ai-solutions", icon: SparklesIcon, comingSoon: true },
        { label: "Custom Solutions", href: "/portal/client/custom-solutions", icon: PuzzlePieceIcon, comingSoon: true },
      ],
    },
    {
      title: "Growth",
      items: [
        { label: "Ads Management", href: "/portal/client/ads-management", icon: MegaphoneIcon },
        { label: "Branding & Creative", href: "/portal/client/branding-creative", icon: PaintBrushIcon },
        { label: "Content Development", href: "/portal/client/content-development", icon: DocumentTextIcon },
      ],
    },
    {
      title: "Industry Solutions",
      items: [
        { label: "Real Estate", href: "/portal/client/industry-focused/real-estate", icon: BuildingOfficeIcon, comingSoon: true },
        { label: "Property Management", href: "/portal/client/industry-focused/property-management", icon: KeyIcon, comingSoon: true },
        { label: "Contractors", href: "/portal/client/industry-focused/contractors", icon: WrenchScrewdriverIcon, comingSoon: true },
        { label: "Accounting", href: "/portal/client/industry-focused/accounting", icon: CalculatorIcon, comingSoon: true },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Profile", href: "/portal/client/profile", icon: UserCircleIcon },
        { label: "Billing", href: "/portal/client/billing", icon: CreditCardIcon },
        { label: "Settings", href: "/portal/client/settings", icon: CogIcon },
        { label: "Security", href: "/portal/client/security", icon: LockClosedIcon },
        { label: "Help & Support", href: "/portal/client/support", icon: QuestionMarkCircleIcon },
      ],
    },
  ];
}

export function getAdminNav(): NavGroup[] {
  return [
    { title: "Overview", items: [{ label: "Admin Home", href: "/portal/admin" }] },
        {
          title: "Analytics",
          items: [
            { label: "Client Analytics", href: "/portal/admin/analytics" },
            { label: "Coupon Analytics", href: "/portal/admin/coupons/analytics" },
          ],
        },
        {
          title: "Commerce",
          items: [
            { label: "Orders", href: "/portal/admin/orders" },
            { label: "Products", href: "/portal/admin/products" },
            { label: "Coupons", href: "/portal/admin/coupons" },
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

// V2 Navigation with Icons for new dark theme portal
export function getAdminNavV2(): NavGroupV2[] {
  return [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", href: "/portal/admin", icon: HomeIcon },
      ],
    },
    {
      title: "Analytics",
      items: [
        { label: "Client Analytics", href: "/portal/admin/analytics", icon: PresentationChartLineIcon },
        { label: "Coupon Analytics", href: "/portal/admin/coupons/analytics", icon: ChartBarIcon },
      ],
    },
    {
      title: "Leads",
      items: [
        { label: "All Leads", href: "/portal/admin/leads", icon: InboxIcon },
      ],
    },
    {
      title: "Commerce",
      items: [
        { label: "Orders", href: "/portal/admin/orders", icon: ShoppingCartIcon },
        { label: "Products", href: "/portal/admin/products", icon: CubeIcon },
        { label: "Coupons", href: "/portal/admin/coupons", icon: TagIcon },
      ],
    },
    {
      title: "Users",
      items: [
        { label: "Clients", href: "/portal/clients", icon: UsersIcon },
        { label: "Access Control", href: "/portal/admin/access", icon: KeyIcon },
      ],
    },
    {
      title: "Sessions",
      items: [
        { label: "Strategy Sessions", href: "/portal/admin/strategy-sessions", icon: CalendarIcon },
      ],
    },
    {
      title: "System",
      items: [
        { label: "Audit Logs", href: "/portal/admin/logs", icon: DocumentMagnifyingGlassIcon },
        { label: "Settings", href: "/portal/admin/settings", icon: CogIcon },
      ],
    },
  ];
}

