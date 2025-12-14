export type MockOrder = {
  id: string;
  productName: string;
  productId: string; // e.g., "omg-crm", "securevault-docs"
  client: {
    id: string; // e.g., "client_123"
    name: string;
    email: string;
  };
  status: "completed" | "pending" | "cancelled" | "refunded";
  amountCents: number;
  currency: string;
  createdAt: string;
  source: string;
};

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ord_1234567890",
    productName: "OMG-CRM",
    productId: "omg-crm",
    client: {
      id: "client_001",
      name: "John Doe",
      email: "john@example.com",
    },
    status: "completed",
    amountCents: 3900, // $39.00
    currency: "USD",
    createdAt: "2024-01-20T10:30:00Z",
    source: "checkout.stripe.com",
  },
  {
    id: "ord_0987654321",
    productName: "SecureVault Docs",
    productId: "securevault-docs",
    client: {
      id: "client_002",
      name: "Jane Smith",
      email: "jane@example.com",
    },
    status: "completed",
    amountCents: 2900, // $29.00
    currency: "USD",
    createdAt: "2024-01-19T14:15:00Z",
    source: "checkout.stripe.com",
  },
  {
    id: "ord_1122334455",
    productName: "OMG-Leads",
    productId: "omg-leads",
    client: {
      id: "client_003",
      name: "Bob Johnson",
      email: "bob@example.com",
    },
    status: "pending",
    amountCents: 1900, // $19.00
    currency: "USD",
    createdAt: "2024-01-18T09:00:00Z",
    source: "checkout.stripe.com",
  },
  {
    id: "ord_5566778899",
    productName: "OMG-IQ",
    productId: "omg-iq",
    client: {
      id: "client_004",
      name: "Alice Williams",
      email: "alice@example.com",
    },
    status: "cancelled",
    amountCents: 900, // $9.00
    currency: "USD",
    createdAt: "2024-01-17T16:45:00Z",
    source: "checkout.stripe.com",
  },
  {
    id: "ord_9988776655",
    productName: "OMG-AI-Mastery",
    productId: "omg-ai-mastery",
    client: {
      id: "client_005",
      name: "Charlie Brown",
      email: "charlie@example.com",
    },
    status: "completed",
    amountCents: 4900, // $49.00
    currency: "USD",
    createdAt: "2024-01-16T11:20:00Z",
    source: "checkout.stripe.com",
  },
];

