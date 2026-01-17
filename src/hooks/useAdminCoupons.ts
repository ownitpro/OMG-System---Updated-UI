import useSWR from "swr";

// Coupon types matching API response
export type CouponType = "PERCENTAGE" | "FIXED_AMOUNT";
export type CouponCategory = "PROMO" | "PARTNER" | "LOYALTY" | "SEASONAL" | "REFERRAL" | "OTHER";

export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  type: CouponType;
  value: number;
  maxUses: number | null;
  currentUses: number;
  minPurchase: number | null;
  maxDiscount: number | null;
  startsAt: string | null;
  expiresAt: string | null;
  isActive: boolean;
  category: CouponCategory;
  isPublic: boolean;
  appliesTo: string | null;
  assignedTo: string | null;
  firstTimeOnly: boolean;
  stackable: boolean;
  stackGroup: string | null;
  priority: number;
  totalSavings: number;
  note: string | null;
  organizationId: string;
  organization: {
    id: string;
    name: string;
    slug: string;
  };
  createdById?: string;
  createdBy?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface CouponStats {
  totalCoupons: number;
  activeCoupons: number;
  totalRedemptions: number;
  avgDiscount: number;
  totalSavings: number;
  expiredCoupons: number;
  expiringSoon: number;
  scheduledCoupons: number;
  categoryStats: Record<string, number>;
  topCoupons: Array<{
    id: string;
    code: string;
    currentUses: number;
    totalSavings: number;
  }>;
}

export type CouponFilters = {
  search?: string;
  status?: "active" | "inactive" | "expired" | "scheduled";
  category?: CouponCategory | string;
};

export type CreateCouponInput = {
  code: string;
  description?: string;
  type: CouponType;
  value: number;
  maxUses?: number | null;
  minPurchase?: number | null;
  maxDiscount?: number | null;
  startsAt?: string | null;
  expiresAt?: string | null;
  isActive?: boolean;
  isPublic?: boolean;
  category?: CouponCategory;
  appliesTo?: string | null;
  assignedTo?: string | null;
  firstTimeOnly?: boolean;
  stackable?: boolean;
  stackGroup?: string | null;
  priority?: number;
  note?: string | null;
  organizationId?: string;
};

export type UpdateCouponInput = Partial<CreateCouponInput> & {
  currentUses?: number;
  totalSavings?: number;
};

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  const text = await res.text();

  // Handle empty response
  if (!text) {
    throw new Error("Empty response from server");
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
  }

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch");
  }

  return data.data;
};

export function useAdminCoupons(filters: CouponFilters = {}) {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.status) params.set("status", filters.status);
  if (filters.category) params.set("category", filters.category);

  const queryString = params.toString();
  const url = `/api/admin/coupons${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR<{ coupons: Coupon[]; total: number }>(
    url,
    fetcher
  );

  // Create coupon
  const createCoupon = async (coupon: CreateCouponInput): Promise<Coupon> => {
    const res = await fetch("/api/admin/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coupon),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to create coupon");
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data.coupon;
  };

  // Update coupon
  const updateCoupon = async (id: string, updates: UpdateCouponInput): Promise<Coupon> => {
    const res = await fetch(`/api/admin/coupons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to update coupon");
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data.coupon;
  };

  // Delete coupon
  const deleteCoupon = async (id: string): Promise<void> => {
    const res = await fetch(`/api/admin/coupons/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to delete coupon");
    }

    await mutate(); // Refresh the list
  };

  // Toggle coupon active status
  const toggleCoupon = async (id: string, enabled: boolean): Promise<Coupon> => {
    return updateCoupon(id, { isActive: enabled });
  };

  // Duplicate coupon
  const duplicateCoupon = async (id: string): Promise<Coupon> => {
    const res = await fetch(`/api/admin/coupons/${id}/duplicate`, {
      method: "POST",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to duplicate coupon");
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data.coupon;
  };

  // Bulk toggle
  const bulkToggle = async (ids: string[], enabled: boolean): Promise<number> => {
    const res = await fetch("/api/admin/coupons/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: enabled ? "enable" : "disable",
        ids,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to bulk update coupons");
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data.affected;
  };

  // Bulk delete
  const bulkDelete = async (ids: string[]): Promise<number> => {
    const res = await fetch("/api/admin/coupons/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "delete",
        ids,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to bulk delete coupons");
    }

    const result = await res.json();
    await mutate(); // Refresh the list
    return result.data.affected;
  };

  return {
    coupons: data?.coupons ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
    refetch: mutate,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    toggleCoupon,
    duplicateCoupon,
    bulkToggle,
    bulkDelete,
  };
}

export function useAdminCouponStats() {
  const { data, error, isLoading, mutate } = useSWR<CouponStats>(
    "/api/admin/coupons/stats",
    fetcher
  );

  return {
    stats: data,
    isLoading,
    error,
    refetch: mutate,
  };
}

// Validate coupon for checkout
export async function validateCoupon(
  code: string,
  productId?: string,
  clientId?: string,
  subtotalCents: number = 0
): Promise<{
  valid: boolean;
  coupon?: Partial<Coupon>;
  discountCents?: number;
  discountFormatted?: string;
  message: string;
}> {
  const res = await fetch("/api/admin/coupons/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      productId,
      clientId,
      subtotalCents,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to validate coupon");
  }

  const result = await res.json();
  return result.data;
}
