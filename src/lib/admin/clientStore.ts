// Client store for admin coupon targeting and analytics

export type ClientNote = {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
};

export type ClientTag = {
  id: string;
  name: string;
  color: string;
};

export type ClientActivity = {
  id: string;
  type: "note_added" | "status_changed" | "email_sent" | "order_placed" | "tag_added" | "tag_removed" | "plan_changed";
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  company?: string;
  plan: "free" | "starter" | "pro" | "enterprise";
  status: "active" | "inactive" | "churned";
  createdAt: string;
  lastActiveAt: string;
  totalSpent: number; // in cents
  ordersCount: number;
  notes?: ClientNote[];
  tags?: string[]; // tag IDs
  activity?: ClientActivity[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  category: "automation" | "ai" | "tools" | "consulting" | "training";
  color: string;
};

// Mock products available for coupon targeting
export const PRODUCTS: Product[] = [
  {
    id: "securevault-docs",
    name: "SecureVault Docs",
    description: "Secure document management",
    priceCents: 2900,
    category: "tools",
    color: "#47BD79",
  },
  {
    id: "omg-crm",
    name: "OMG-CRM",
    description: "Customer relationship management",
    priceCents: 3900,
    category: "tools",
    color: "#3B82F6",
  },
  {
    id: "omg-leads",
    name: "OMG-Leads",
    description: "Lead generation automation",
    priceCents: 1900,
    category: "automation",
    color: "#A855F7",
  },
  {
    id: "omg-iq",
    name: "OMG-IQ",
    description: "AI-powered business intelligence",
    priceCents: 900,
    category: "ai",
    color: "#F59E0B",
  },
  {
    id: "omg-ai-mastery",
    name: "OMG-AI-Mastery",
    description: "AI training program",
    priceCents: 4900,
    category: "training",
    color: "#EC4899",
  },
  {
    id: "omg-build",
    name: "OMG-Build",
    description: "Custom development solutions",
    priceCents: 9900,
    category: "consulting",
    color: "#8B5CF6",
  },
  {
    id: "timeguard-ai",
    name: "TimeGuard AI",
    description: "AI-powered time tracking",
    priceCents: 1900,
    category: "ai",
    color: "#06B6D4",
  },
  {
    id: "strategy-session",
    name: "Strategy Session",
    description: "1-on-1 consulting session",
    priceCents: 29900,
    category: "consulting",
    color: "#F97316",
  },
];

// Mock clients for coupon targeting
export const MOCK_CLIENTS: Client[] = [
  {
    id: "client_001",
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Corp",
    plan: "pro",
    status: "active",
    createdAt: "2024-06-15T10:00:00Z",
    lastActiveAt: "2025-01-05T14:30:00Z",
    totalSpent: 15800,
    ordersCount: 4,
  },
  {
    id: "client_002",
    name: "Jane Smith",
    email: "jane@techstartup.io",
    company: "Tech Startup Inc",
    plan: "enterprise",
    status: "active",
    createdAt: "2024-03-10T09:00:00Z",
    lastActiveAt: "2025-01-06T08:45:00Z",
    totalSpent: 48900,
    ordersCount: 12,
  },
  {
    id: "client_003",
    name: "Bob Johnson",
    email: "bob@realestate.com",
    company: "Johnson Realty",
    plan: "starter",
    status: "active",
    createdAt: "2024-08-20T11:30:00Z",
    lastActiveAt: "2025-01-04T16:20:00Z",
    totalSpent: 5800,
    ordersCount: 2,
  },
  {
    id: "client_004",
    name: "Alice Williams",
    email: "alice@lawfirm.com",
    company: "Williams & Associates",
    plan: "pro",
    status: "active",
    createdAt: "2024-04-05T14:00:00Z",
    lastActiveAt: "2025-01-03T10:15:00Z",
    totalSpent: 22400,
    ordersCount: 6,
  },
  {
    id: "client_005",
    name: "Charlie Brown",
    email: "charlie@accounting.co",
    company: "Brown Accounting",
    plan: "starter",
    status: "active",
    createdAt: "2024-09-12T08:45:00Z",
    lastActiveAt: "2025-01-02T11:00:00Z",
    totalSpent: 3800,
    ordersCount: 1,
  },
  {
    id: "client_006",
    name: "Diana Martinez",
    email: "diana@marketing.agency",
    company: "Martinez Marketing",
    plan: "enterprise",
    status: "active",
    createdAt: "2024-01-20T16:30:00Z",
    lastActiveAt: "2025-01-06T09:30:00Z",
    totalSpent: 89400,
    ordersCount: 24,
  },
  {
    id: "client_007",
    name: "Edward Chen",
    email: "edward@contractor.biz",
    company: "Chen Construction",
    plan: "pro",
    status: "inactive",
    createdAt: "2024-05-18T10:00:00Z",
    lastActiveAt: "2024-12-15T14:00:00Z",
    totalSpent: 12600,
    ordersCount: 3,
  },
  {
    id: "client_008",
    name: "Fiona O'Brien",
    email: "fiona@property.mgmt",
    company: "O'Brien Properties",
    plan: "pro",
    status: "active",
    createdAt: "2024-07-22T13:15:00Z",
    lastActiveAt: "2025-01-05T17:45:00Z",
    totalSpent: 18700,
    ordersCount: 5,
  },
  {
    id: "client_009",
    name: "George Kim",
    email: "george@consulting.io",
    company: "Kim Consulting",
    plan: "enterprise",
    status: "active",
    createdAt: "2024-02-14T09:30:00Z",
    lastActiveAt: "2025-01-06T10:00:00Z",
    totalSpent: 67200,
    ordersCount: 18,
  },
  {
    id: "client_010",
    name: "Hannah Lee",
    email: "hannah@designstudio.com",
    company: "Lee Design Studio",
    plan: "starter",
    status: "churned",
    createdAt: "2024-10-05T11:00:00Z",
    lastActiveAt: "2024-11-20T09:00:00Z",
    totalSpent: 2900,
    ordersCount: 1,
  },
];

const CLIENTS_KEY = "omg_clients";

export function readClients(): Client[] {
  try {
    const raw = localStorage.getItem(CLIENTS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    // Initialize with mock data if empty
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(MOCK_CLIENTS));
    return MOCK_CLIENTS;
  } catch {
    return MOCK_CLIENTS;
  }
}

export function writeClients(clients: Client[]) {
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
  window.dispatchEvent(new Event("omg-clients-updated"));
}

export function getClientById(id: string): Client | undefined {
  return readClients().find((c) => c.id === id);
}

export function getClientsByIds(ids: string[]): Client[] {
  const clients = readClients();
  return ids.map((id) => clients.find((c) => c.id === id)).filter(Boolean) as Client[];
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByIds(ids: string[]): Product[] {
  return ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as Product[];
}

// ============================================
// Client Statistics and Analytics
// ============================================

export type ClientStats = {
  total: number;
  active: number;
  inactive: number;
  churned: number;
  newThisMonth: number;
  totalRevenueCents: number;
  avgOrderValueCents: number;
  churnRate: number;
};

export function getClientStats(): ClientStats {
  const clients = readClients();
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const total = clients.length;
  const active = clients.filter((c) => c.status === "active").length;
  const inactive = clients.filter((c) => c.status === "inactive").length;
  const churned = clients.filter((c) => c.status === "churned").length;
  const newThisMonth = clients.filter((c) => new Date(c.createdAt) >= startOfMonth).length;

  const totalRevenueCents = clients.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalOrders = clients.reduce((sum, c) => sum + c.ordersCount, 0);
  const avgOrderValueCents = totalOrders > 0 ? Math.round(totalRevenueCents / totalOrders) : 0;
  const churnRate = total > 0 ? Math.round((churned / total) * 100) : 0;

  return {
    total,
    active,
    inactive,
    churned,
    newThisMonth,
    totalRevenueCents,
    avgOrderValueCents,
    churnRate,
  };
}

// ============================================
// Bulk Operations
// ============================================

export function bulkUpdateClientStatus(ids: string[], status: Client["status"]) {
  const clients = readClients();
  const updated = clients.map((c) =>
    ids.includes(c.id) ? { ...c, status, lastActiveAt: new Date().toISOString() } : c
  );
  writeClients(updated);
}

export function updateClientStatus(id: string, status: Client["status"]) {
  bulkUpdateClientStatus([id], status);
}

// ============================================
// Export Functionality
// ============================================

export function exportClientsToCSV(clients: Client[]): string {
  const headers = [
    "Name",
    "Email",
    "Company",
    "ID",
    "Plan",
    "Status",
    "Orders",
    "Total Spent",
    "Joined",
    "Last Active",
  ];

  const rows = clients.map((c) => [
    c.name,
    c.email,
    c.company || "",
    c.id,
    c.plan,
    c.status,
    c.ordersCount,
    `$${(c.totalSpent / 100).toFixed(2)}`,
    new Date(c.createdAt).toLocaleDateString(),
    new Date(c.lastActiveAt).toLocaleDateString(),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  return csvContent;
}

export function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

// ============================================
// Filter and Sort Helpers
// ============================================

export type ClientSortKey = "name" | "createdAt" | "totalSpent" | "ordersCount" | "lastActiveAt";
export type SortDirection = "asc" | "desc";

export function sortClients(
  clients: Client[],
  sortKey: ClientSortKey,
  direction: SortDirection
): Client[] {
  return [...clients].sort((a, b) => {
    let comparison = 0;

    switch (sortKey) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "createdAt":
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case "totalSpent":
        comparison = a.totalSpent - b.totalSpent;
        break;
      case "ordersCount":
        comparison = a.ordersCount - b.ordersCount;
        break;
      case "lastActiveAt":
        comparison = new Date(a.lastActiveAt).getTime() - new Date(b.lastActiveAt).getTime();
        break;
    }

    return direction === "asc" ? comparison : -comparison;
  });
}

export function filterClients(
  clients: Client[],
  filters: {
    search?: string;
    status?: Client["status"] | "all";
    plan?: Client["plan"] | "all";
  }
): Client[] {
  return clients.filter((c) => {
    // Search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchesSearch =
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        (c.company?.toLowerCase().includes(q) ?? false);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status && filters.status !== "all" && c.status !== filters.status) {
      return false;
    }

    // Plan filter
    if (filters.plan && filters.plan !== "all" && c.plan !== filters.plan) {
      return false;
    }

    return true;
  });
}

// ============================================
// Relative Time Helper
// ============================================

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return date.toLocaleDateString();
}

// ============================================
// Tags System
// ============================================

const TAGS_KEY = "omg_client_tags";

export const DEFAULT_TAGS: ClientTag[] = [
  { id: "tag_vip", name: "VIP", color: "#F59E0B" },
  { id: "tag_priority", name: "Priority", color: "#EF4444" },
  { id: "tag_new", name: "New", color: "#47BD79" },
  { id: "tag_enterprise", name: "Enterprise", color: "#A855F7" },
  { id: "tag_at_risk", name: "At Risk", color: "#F97316" },
  { id: "tag_upsell", name: "Upsell Opportunity", color: "#3B82F6" },
  { id: "tag_referral", name: "Referral", color: "#EC4899" },
  { id: "tag_demo", name: "Demo Account", color: "#6B7280" },
];

export function readTags(): ClientTag[] {
  try {
    const raw = localStorage.getItem(TAGS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    localStorage.setItem(TAGS_KEY, JSON.stringify(DEFAULT_TAGS));
    return DEFAULT_TAGS;
  } catch {
    return DEFAULT_TAGS;
  }
}

export function writeTags(tags: ClientTag[]) {
  localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
  window.dispatchEvent(new Event("omg-tags-updated"));
}

export function getTagById(id: string): ClientTag | undefined {
  return readTags().find((t) => t.id === id);
}

export function getTagsByIds(ids: string[]): ClientTag[] {
  const tags = readTags();
  return ids.map((id) => tags.find((t) => t.id === id)).filter(Boolean) as ClientTag[];
}

export function createTag(name: string, color: string): ClientTag {
  const tags = readTags();
  const newTag: ClientTag = {
    id: `tag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    color,
  };
  tags.push(newTag);
  writeTags(tags);
  return newTag;
}

// ============================================
// Notes System
// ============================================

export function addClientNote(clientId: string, content: string, createdBy: string = "Admin"): ClientNote {
  const clients = readClients();
  const newNote: ClientNote = {
    id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    content,
    createdAt: new Date().toISOString(),
    createdBy,
  };

  const updated = clients.map((c) => {
    if (c.id === clientId) {
      const notes = c.notes || [];
      const activity = c.activity || [];
      return {
        ...c,
        notes: [newNote, ...notes],
        activity: [
          {
            id: `act_${Date.now()}`,
            type: "note_added" as const,
            description: `Note added by ${createdBy}`,
            timestamp: new Date().toISOString(),
            metadata: { noteId: newNote.id },
          },
          ...activity,
        ],
        lastActiveAt: new Date().toISOString(),
      };
    }
    return c;
  });

  writeClients(updated);
  return newNote;
}

export function deleteClientNote(clientId: string, noteId: string) {
  const clients = readClients();
  const updated = clients.map((c) => {
    if (c.id === clientId) {
      return {
        ...c,
        notes: (c.notes || []).filter((n) => n.id !== noteId),
      };
    }
    return c;
  });
  writeClients(updated);
}

// ============================================
// Client Tags Management
// ============================================

export function addTagToClient(clientId: string, tagId: string) {
  const clients = readClients();
  const tag = getTagById(tagId);
  const updated = clients.map((c) => {
    if (c.id === clientId) {
      const tags = c.tags || [];
      if (tags.includes(tagId)) return c;
      const activity = c.activity || [];
      return {
        ...c,
        tags: [...tags, tagId],
        activity: [
          {
            id: `act_${Date.now()}`,
            type: "tag_added" as const,
            description: `Tag "${tag?.name || tagId}" added`,
            timestamp: new Date().toISOString(),
            metadata: { tagId },
          },
          ...activity,
        ],
        lastActiveAt: new Date().toISOString(),
      };
    }
    return c;
  });
  writeClients(updated);
}

export function removeTagFromClient(clientId: string, tagId: string) {
  const clients = readClients();
  const tag = getTagById(tagId);
  const updated = clients.map((c) => {
    if (c.id === clientId) {
      const activity = c.activity || [];
      return {
        ...c,
        tags: (c.tags || []).filter((t) => t !== tagId),
        activity: [
          {
            id: `act_${Date.now()}`,
            type: "tag_removed" as const,
            description: `Tag "${tag?.name || tagId}" removed`,
            timestamp: new Date().toISOString(),
            metadata: { tagId },
          },
          ...activity,
        ],
      };
    }
    return c;
  });
  writeClients(updated);
}

// ============================================
// Activity Tracking
// ============================================

export function addClientActivity(
  clientId: string,
  type: ClientActivity["type"],
  description: string,
  metadata?: Record<string, any>
) {
  const clients = readClients();
  const updated = clients.map((c) => {
    if (c.id === clientId) {
      const activity = c.activity || [];
      return {
        ...c,
        activity: [
          {
            id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type,
            description,
            timestamp: new Date().toISOString(),
            metadata,
          },
          ...activity,
        ],
        lastActiveAt: new Date().toISOString(),
      };
    }
    return c;
  });
  writeClients(updated);
}

export function getClientActivity(clientId: string, limit: number = 20): ClientActivity[] {
  const client = getClientById(clientId);
  return (client?.activity || []).slice(0, limit);
}

// ============================================
// Email Tracking
// ============================================

export function recordEmailSent(clientId: string, subject: string, emailType: string = "manual") {
  addClientActivity(clientId, "email_sent", `Email sent: "${subject}"`, {
    subject,
    emailType,
  });
}
