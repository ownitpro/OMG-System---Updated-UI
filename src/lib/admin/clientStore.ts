// Client store for admin coupon targeting and analytics

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
