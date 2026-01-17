import useSWR from "swr";

interface DashboardOverview {
  totalUsers: number;
  activeSubscriptions: number;
  totalRevenue: number;
  openTickets: number;
}

interface DashboardRevenue {
  thisMonth: number;
  lastMonth: number;
  growth: number;
}

interface DashboardUsers {
  total: number;
  byRole: Record<string, number>;
  newThisMonth: number;
}

interface DashboardInvoices {
  pending: number;
  pendingAmount: number;
}

interface DashboardSessions {
  upcoming: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string | null;
  customerName: string;
  customerEmail: string;
  product: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  organization: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export interface AdminDashboardData {
  overview: DashboardOverview;
  revenue: DashboardRevenue;
  users: DashboardUsers;
  invoices: DashboardInvoices;
  sessions: DashboardSessions;
  recentOrders: RecentOrder[];
}

interface AuditLogsPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface AuditLogsResponse {
  auditLogs: unknown[];
  pagination: AuditLogsPagination;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  const json = await res.json();
  return json.data || json;
};

export function useAdminDashboard() {
  const { data, error, isLoading, mutate } = useSWR<AdminDashboardData>(
    "/api/admin/analytics/dashboard",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // Cache for 30 seconds
    }
  );

  return {
    data,
    isLoading,
    error,
    refetch: mutate,
  };
}

export function useAdminAuditLogs(page = 1, limit = 10) {
  const { data, error, isLoading, mutate } = useSWR<AuditLogsResponse>(
    `/api/admin/audit?page=${page}&limit=${limit}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    auditLogs: data?.auditLogs ?? [],
    pagination: data?.pagination ?? { page: 1, limit: 10, total: 0, pages: 0 },
    isLoading,
    error,
    refetch: mutate,
  };
}

export function useAdminOrdersCount() {
  const { data, error, isLoading } = useSWR<{ orders: unknown[]; total: number }>(
    "/api/admin/orders?limit=1",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    }
  );

  return {
    totalOrders: data?.total ?? 0,
    isLoading,
    error,
  };
}
