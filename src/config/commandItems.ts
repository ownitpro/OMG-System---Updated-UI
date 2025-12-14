import { APP_LINKS } from "@/config/appLinks";
import type { CommandItem } from "@/components/CommandSearch";

export const CLIENT_COMMAND_ITEMS: CommandItem[] = [
  { label: "Portal Home", description: "Back to your main dashboard", kind: "internal", href: "/portal/client" },
  { label: "Billing", description: "Manage your plan and payments", kind: "internal", href: "/portal/client/billing" },
  { label: "Support", description: "Get help fast", kind: "internal", href: "/portal/client/support" },

  { label: "OMG Build", description: "Build workflows and systems (coming soon)", kind: "internal", href: "/portal/client" },

  { label: "OMG-CRM", description: "Leads, clients, follow-ups", kind: "external", href: APP_LINKS.omgCrm },
  { label: "SecureVault Docs", description: "Store and protect documents", kind: "external", href: APP_LINKS.securevaultDocs },
  { label: "OMG-Leads", description: "Capture and manage leads", kind: "external", href: APP_LINKS.omgLeads },
  { label: "OMG-IQ", description: "Daily updates that matter", kind: "external", href: APP_LINKS.omgIq },
  { label: "OMG-AI-Mastery", description: "Learn AI step-by-step", kind: "external", href: APP_LINKS.omgAiMastery },
];

