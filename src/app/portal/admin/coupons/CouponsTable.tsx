"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTableState } from "@/lib/admin/useTableState";
import { useTableDensity } from "@/lib/admin/useTableDensity";
import { useTableScrollRestore } from "@/lib/admin/useTableScrollRestore";
import {
  useAdminCoupons,
  useAdminCouponStats,
  type Coupon as APICoupon,
  type CouponCategory as APICouponCategory,
  type CreateCouponInput,
} from "@/hooks/useAdminCoupons";

// Local coupon type matching the UI needs (transformed from API)
type CouponCategory = "promo" | "partner" | "loyalty" | "seasonal" | "referral" | "other";

type Coupon = {
  id: string;
  code: string;
  enabled: boolean;
  percentOff: number;
  appliesTo: "all" | string[];
  assignedTo: "all" | string[];
  maxRedemptions?: number;
  redeemedCount: number;
  startsAt?: string;
  endsAt?: string;
  createdAt: string;
  note?: string;
  discountType: "percent" | "fixed";
  category?: CouponCategory;
  minPurchaseCents?: number;
  firstTimeOnly?: boolean;
  isPublic?: boolean;
  totalSavingsCents?: number;
  amountOffCents?: number;
};
import { PRODUCTS, type Product } from "@/lib/admin/clientStore";

// Client type for user selection (fetched from API)
type Client = {
  id: string;
  name: string | null;
  email: string;
  company?: string | null;
};
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ChevronUpDownIcon,
  PlusIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  XMarkIcon,
  TagIcon,
  UserGroupIcon,
  CubeIcon,
  TrashIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  FolderIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

type SortKey = "createdAt" | "code" | "percentOff" | "enabled" | "category";
type SortDir = "desc" | "asc";
type EnabledFilter = "all" | "enabled" | "disabled" | "expired" | "scheduled";
type CategoryFilter = "all" | CouponCategory;

const CATEGORY_OPTIONS: { value: CouponCategory; label: string; color: string }[] = [
  { value: "promo", label: "Promo", color: "#47BD79" },
  { value: "partner", label: "Partner", color: "#3B82F6" },
  { value: "loyalty", label: "Loyalty", color: "#A855F7" },
  { value: "seasonal", label: "Seasonal", color: "#F59E0B" },
  { value: "referral", label: "Referral", color: "#EC4899" },
  { value: "other", label: "Other", color: "#6B7280" },
];

// Transform API coupon to UI coupon format
function transformApiCoupon(apiCoupon: APICoupon): Coupon {
  let appliesTo: "all" | string[] = "all";
  if (apiCoupon.appliesTo) {
    try {
      const parsed = JSON.parse(apiCoupon.appliesTo);
      appliesTo = parsed === "all" ? "all" : (Array.isArray(parsed) ? parsed : "all");
    } catch {
      appliesTo = "all";
    }
  }

  let assignedTo: "all" | string[] = "all";
  if (apiCoupon.assignedTo) {
    try {
      const parsed = JSON.parse(apiCoupon.assignedTo);
      assignedTo = parsed === "all" ? "all" : (Array.isArray(parsed) ? parsed : "all");
    } catch {
      assignedTo = "all";
    }
  }

  return {
    id: apiCoupon.id,
    code: apiCoupon.code,
    enabled: apiCoupon.isActive,
    percentOff: apiCoupon.type === "PERCENTAGE" ? apiCoupon.value : 0,
    amountOffCents: apiCoupon.type === "FIXED_AMOUNT" ? apiCoupon.value : undefined,
    discountType: apiCoupon.type === "PERCENTAGE" ? "percent" : "fixed",
    appliesTo,
    assignedTo,
    maxRedemptions: apiCoupon.maxUses ?? undefined,
    redeemedCount: apiCoupon.currentUses,
    startsAt: apiCoupon.startsAt ?? undefined,
    endsAt: apiCoupon.expiresAt ?? undefined,
    createdAt: apiCoupon.createdAt,
    note: apiCoupon.note ?? undefined,
    category: (apiCoupon.category?.toLowerCase() ?? "other") as CouponCategory,
    minPurchaseCents: apiCoupon.minPurchase ?? undefined,
    firstTimeOnly: apiCoupon.firstTimeOnly,
    isPublic: apiCoupon.isPublic ?? false,
    totalSavingsCents: apiCoupon.totalSavings ?? 0,
  };
}

// Export coupons to CSV (client-side from transformed data)
function exportCouponsToCSV(coupons: Coupon[]): string {
  const headers = [
    "Code",
    "Status",
    "Discount Type",
    "Discount Value",
    "Category",
    "Redemptions",
    "Max Redemptions",
    "Min Purchase",
    "First Time Only",
    "Starts At",
    "Ends At",
    "Created At",
    "Note",
  ];

  const rows = coupons.map((c) => [
    c.code,
    c.enabled ? "Enabled" : "Disabled",
    c.discountType,
    c.discountType === "fixed" ? `$${((c.amountOffCents || 0) / 100).toFixed(2)}` : `${c.percentOff}%`,
    c.category || "other",
    c.redeemedCount,
    c.maxRedemptions || "Unlimited",
    c.minPurchaseCents ? `$${(c.minPurchaseCents / 100).toFixed(2)}` : "None",
    c.firstTimeOnly ? "Yes" : "No",
    c.startsAt ? new Date(c.startsAt).toLocaleDateString() : "N/A",
    c.endsAt ? new Date(c.endsAt).toLocaleDateString() : "N/A",
    new Date(c.createdAt).toLocaleDateString(),
    c.note || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  return csvContent;
}

function stopRowClick(e: React.MouseEvent) {
  e.stopPropagation();
}

function compare(a: any, b: any) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

// Status pill component
function StatusPill({ coupon }: { coupon: Coupon }) {
  const now = new Date();
  const endsAt = coupon.endsAt ? new Date(coupon.endsAt) : null;
  const startsAt = coupon.startsAt ? new Date(coupon.startsAt) : null;
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Check if expired
  if (endsAt && endsAt < now) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium bg-red-500/20 text-red-400 border-red-500/30">
        <XMarkIcon className="w-3 h-3" />
        Expired
      </span>
    );
  }

  // Check if scheduled (not yet started)
  if (startsAt && startsAt > now) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 border-blue-500/30">
        <ClockIcon className="w-3 h-3" />
        Scheduled
      </span>
    );
  }

  // Check if expiring soon (within 7 days)
  if (endsAt && endsAt <= sevenDaysFromNow) {
    const daysLeft = Math.ceil((endsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return (
      <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium bg-amber-500/20 text-amber-400 border-amber-500/30">
        <ExclamationTriangleIcon className="w-3 h-3" />
        {daysLeft}d left
      </span>
    );
  }

  // Regular enabled/disabled status
  if (coupon.enabled) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium bg-[#47BD79]/20 text-[#47BD79] border-[#47BD79]/30">
        <CheckIcon className="w-3 h-3" />
        Active
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium bg-white/10 text-white/50 border-white/20">
      Disabled
    </span>
  );
}

// Category badge component
function CategoryBadge({ category }: { category?: CouponCategory }) {
  const cat = CATEGORY_OPTIONS.find((c) => c.value === category) || CATEGORY_OPTIONS[5]; // default to "other"
  return (
    <span
      className="inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
    >
      <FolderIcon className="w-3 h-3" />
      {cat.label}
    </span>
  );
}

// Usage progress bar component
function UsageBar({ used, max }: { used: number; max?: number }) {
  if (!max) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-white/60 text-sm">{used}</span>
        <span className="text-white/30 text-xs">/ ∞</span>
      </div>
    );
  }

  const percentage = Math.min(100, (used / max) * 100);
  const isNearLimit = percentage >= 80;
  const isAtLimit = used >= max;

  return (
    <div className="w-full max-w-[120px]">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className={isAtLimit ? "text-red-400" : "text-white/60"}>
          {used} / {max}
        </span>
        <span className={isAtLimit ? "text-red-400" : isNearLimit ? "text-amber-400" : "text-white/40"}>
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isAtLimit ? "bg-red-500" : isNearLimit ? "bg-amber-500" : "bg-[#47BD79]"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
      title="Copy code"
    >
      {copied ? (
        <>
          <CheckIcon className="w-3 h-3 text-[#47BD79]" />
          Copied
        </>
      ) : (
        <>
          <ClipboardDocumentIcon className="w-3 h-3" />
          Copy
        </>
      )}
    </button>
  );
}

function Modal({
  open,
  title,
  children,
  onClose,
  size = "xl",
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  size?: "md" | "xl" | "2xl" | "3xl";
}) {
  if (!open) return null;
  const sizeClass = {
    md: "max-w-md",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full ${sizeClass} rounded-2xl border border-white/10 bg-[#0f172a] p-6 shadow-2xl max-h-[90vh] overflow-y-auto`}
        style={{ boxShadow: "0 0 40px rgba(71, 189, 121, 0.15)" }}
      >
        <div className="flex items-start justify-between gap-3 sticky top-0 bg-[#0f172a] pb-4 -mt-2 pt-2 -mx-6 px-6 border-b border-white/10">
          <div>
            <div className="text-lg font-semibold text-white">{title}</div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/20 bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white transition-all"
            type="button"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function MultiSelect({
  label,
  icon: Icon,
  items,
  selected,
  onChange,
  renderItem,
  idKey = "id",
  color,
  compact = false,
}: {
  label: string;
  icon: React.ElementType;
  items: any[];
  selected: string[];
  onChange: (ids: string[]) => void;
  renderItem: (item: any) => { name: string; sub?: string };
  idKey?: string;
  color: string;
  compact?: boolean;
}) {
  const [search, setSearch] = React.useState("");

  const filtered = items.filter((item) => {
    const { name, sub } = renderItem(item);
    const q = search.toLowerCase();
    return name.toLowerCase().includes(q) || (sub?.toLowerCase().includes(q) ?? false);
  });

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const selectAll = () => onChange(items.map((i) => i[idKey]));
  const clearAll = () => onChange([]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="text-xs font-medium text-white">{label}</span>
          <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: `${color}30`, color }}>
            {selected.length}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="text-[10px] text-white/50 hover:text-white transition-colors"
          >
            All
          </button>
          <span className="text-white/20">|</span>
          <button
            type="button"
            onClick={clearAll}
            className="text-[10px] text-white/50 hover:text-white transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="relative mb-2">
        <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-lg border border-white/10 bg-white/5 pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-white/40 outline-none focus:border-white/20"
        />
      </div>

      <div className={`${compact ? "max-h-32" : "max-h-48"} overflow-y-auto space-y-0.5 scrollbar-thin`}>
        {filtered.map((item) => {
          const { name, sub } = renderItem(item);
          const id = item[idKey];
          const isSelected = selected.includes(id);

          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={`w-full flex items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-all ${
                isSelected
                  ? "bg-white/10"
                  : "hover:bg-white/5"
              }`}
            >
              <div
                className={`w-4 h-4 rounded flex items-center justify-center transition-all flex-shrink-0 ${
                  isSelected
                    ? "bg-gradient-to-br from-[#47BD79] to-[#3da968]"
                    : "border border-white/20 bg-white/5"
                }`}
              >
                {isSelected && <CheckIcon className="w-2.5 h-2.5 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white truncate">{name}</div>
                {sub && !compact && <div className="text-[10px] text-white/40 truncate">{sub}</div>}
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center text-xs text-white/40 py-3">No items found</div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, sub }: { label: string; value: string | number; icon: React.ElementType; color: string; sub?: string }) {
  return (
    <div
      className="rounded-xl border border-white/10 bg-white/5 p-4"
      style={{ boxShadow: `0 0 20px ${color}10` }}
    >
      <div className="flex items-center gap-2 text-xs text-white/50">
        <Icon className="w-4 h-4" style={{ color }} />
        {label}
      </div>
      <div className="mt-1 text-xl font-bold" style={{ color }}>
        {value}
      </div>
      {sub && <div className="text-xs text-white/40 mt-0.5">{sub}</div>}
    </div>
  );
}

// Empty state component
function EmptyState({ onCreateNew }: { onCreateNew: () => void }) {
  return (
    <div className="px-4 py-16 text-center">
      <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#47BD79]/20 to-[#3B82F6]/20 flex items-center justify-center mb-6">
        <TagIcon className="w-10 h-10 text-[#47BD79]" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">No coupons yet</h3>
      <p className="text-white/50 max-w-sm mx-auto mb-6">
        Create your first coupon to offer discounts for promos, partnerships, loyalty rewards, and more.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#47BD79] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3da968] transition-all"
        >
          <PlusIcon className="w-4 h-4" />
          Create your first coupon
        </button>
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {[
          { icon: TagIcon, label: "Promo codes", desc: "Launch campaigns" },
          { icon: UserGroupIcon, label: "Partner deals", desc: "Exclusive offers" },
          { icon: SparklesIcon, label: "Loyalty rewards", desc: "Retain customers" },
          { icon: CalendarDaysIcon, label: "Seasonal sales", desc: "Holiday specials" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-left">
            <item.icon className="w-5 h-5 text-[#47BD79] mb-2" />
            <div className="text-sm font-medium text-white">{item.label}</div>
            <div className="text-xs text-white/40">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CouponsTable() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const editCode = searchParams.get("edit");
  const suggest = searchParams.get("suggest");

  const { density, isOverride, toggle, clearOverride } = useTableDensity("admin-coupons");
  const compact = density === "compact";
  const { scrollRef, resetScroll } = useTableScrollRestore("admin-coupons");

  const { state: ui, patch, reset, ready } = useTableState("admin-coupons", {
    query: "",
    enabled: "all" as EnabledFilter,
    category: "all" as CategoryFilter,
    sortKey: "createdAt" as SortKey,
    sortDir: "desc" as SortDir,
  });

  // Use API hooks for data
  const {
    coupons: apiCoupons,
    isLoading: couponsLoading,
    error: couponsError,
    createCoupon,
    updateCoupon,
    deleteCoupon: apiDeleteCoupon,
    toggleCoupon: apiToggleCoupon,
    duplicateCoupon: apiDuplicateCoupon,
    bulkToggle,
    bulkDelete,
    refetch: refetchCoupons,
  } = useAdminCoupons();

  const { stats: apiStats, isLoading: statsLoading, refetch: refetchStats } = useAdminCouponStats();

  // Transform API coupons to UI format
  const rows = React.useMemo(() => {
    return apiCoupons.map(transformApiCoupon);
  }, [apiCoupons]);

  // Use API stats or fallback
  const stats = React.useMemo(() => ({
    totalCoupons: apiStats?.totalCoupons ?? 0,
    activeCoupons: apiStats?.activeCoupons ?? 0,
    totalRedemptions: apiStats?.totalRedemptions ?? 0,
    avgDiscount: apiStats?.avgDiscount ?? 0,
    totalSavingsCents: (apiStats?.totalSavings ?? 0) * 100, // Convert to cents for UI
    expiredCoupons: apiStats?.expiredCoupons ?? 0,
    expiringSoon: apiStats?.expiringSoon ?? 0,
    scheduledCoupons: apiStats?.scheduledCoupons ?? 0,
  }), [apiStats]);

  const [clients, setClients] = React.useState<Client[]>([]);
  const [openNew, setOpenNew] = React.useState(false);
  const [editId, setEditId] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState("");
  const [confirmDelete, setConfirmDelete] = React.useState<string | null>(null);
  const [confirmBulkDelete, setConfirmBulkDelete] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  // Bulk selection state
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [selectMode, setSelectMode] = React.useState(false);

  // Load clients from database API (real users, not mock data)
  React.useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch("/api/admin/users?role=CLIENT");
        if (res.ok) {
          const data = await res.json();
          const users = data.data?.users || [];
          setClients(users.map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            company: u.company,
          })));
        }
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    }
    fetchClients();
  }, []);

  function flash(text: string) {
    setMsg(text);
    window.setTimeout(() => setMsg(""), 1100);
  }

  const filtered = React.useMemo(() => {
    const q = ui.query.trim().toLowerCase();
    const now = new Date();

    const base = rows
      .filter((c) => {
        // Status filter
        if (ui.enabled === "all") return true;
        if (ui.enabled === "enabled") return c.enabled;
        if (ui.enabled === "disabled") return !c.enabled;
        if (ui.enabled === "expired") return c.endsAt && new Date(c.endsAt) < now;
        if (ui.enabled === "scheduled") return c.startsAt && new Date(c.startsAt) > now;
        return true;
      })
      .filter((c) => {
        // Category filter
        if (ui.category === "all") return true;
        return (c.category || "other") === ui.category;
      })
      .filter((c) => {
        if (!q) return true;
        return (
          c.code.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          (c.note ?? "").toLowerCase().includes(q) ||
          (c.category ?? "").toLowerCase().includes(q)
        );
      });

    const dir = ui.sortDir === "asc" ? 1 : -1;

    return base.sort((a, b) => {
      if (ui.sortKey === "createdAt") return compare(a.createdAt, b.createdAt) * dir;
      if (ui.sortKey === "code") return compare(a.code, b.code) * dir;
      if (ui.sortKey === "percentOff") return compare(a.percentOff, b.percentOff) * dir;
      if (ui.sortKey === "category") return compare(a.category || "other", b.category || "other") * dir;
      return compare(Number(a.enabled), Number(b.enabled)) * dir;
    });
  }, [rows, ui.query, ui.enabled, ui.category, ui.sortKey, ui.sortDir]);

  // Form state
  const [code, setCode] = React.useState("OMG10");
  const [discountType, setDiscountType] = React.useState<"percent" | "fixed">("percent");
  const [percentOff, setPercentOff] = React.useState(10);
  const [amountOffCents, setAmountOffCents] = React.useState(500); // $5.00
  const [enabled, setEnabled] = React.useState(true);
  const [appliesTo, setAppliesTo] = React.useState<"all" | "list">("all");
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);
  const [assignedTo, setAssignedTo] = React.useState<"all" | "list">("all");
  const [selectedClients, setSelectedClients] = React.useState<string[]>([]);
  const [maxRedemptions, setMaxRedemptions] = React.useState<string>("");
  const [startsAt, setStartsAt] = React.useState<string>("");
  const [endsAt, setEndsAt] = React.useState<string>("");
  const [note, setNote] = React.useState<string>("");
  const [category, setCategory] = React.useState<CouponCategory>("promo");
  const [minPurchaseCents, setMinPurchaseCents] = React.useState<string>("");
  const [firstTimeOnly, setFirstTimeOnly] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);

  // Reset form
  function resetForm() {
    setCode("OMG10");
    setDiscountType("percent");
    setPercentOff(10);
    setAmountOffCents(500);
    setEnabled(true);
    setAppliesTo("all");
    setSelectedProducts([]);
    setAssignedTo("all");
    setSelectedClients([]);
    setMaxRedemptions("");
    setStartsAt("");
    setEndsAt("");
    setNote("");
    setCategory("promo");
    setMinPurchaseCents("");
    setFirstTimeOnly(false);
    setIsPublic(false);
    setEditId(null);
  }

  // Handle edit mode from URL
  React.useEffect(() => {
    if (!editCode || couponsLoading) return;

    const codeUpper = editCode.toUpperCase();
    const existing = rows.find((c) => c.code.toUpperCase() === codeUpper);

    if (!existing) {
      setMsg(`Coupon ${codeUpper} not found`);
      window.setTimeout(() => setMsg(""), 1200);
      return;
    }

    setEditId(existing.id);
    setOpenNew(true);
    loadCouponToForm(existing);

    if (suggest === "+5") {
      setPercentOff((p) => Math.min(100, Number(p) + 5));
      setMsg("Suggestion applied: +5% off");
      window.setTimeout(() => setMsg(""), 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCode, rows, couponsLoading]);

  function loadCouponToForm(coupon: Coupon) {
    setCode(coupon.code);
    setDiscountType(coupon.discountType || "percent");
    setPercentOff(coupon.percentOff);
    setAmountOffCents(coupon.amountOffCents || 500);
    setEnabled(coupon.enabled);
    setCategory(coupon.category || "promo");
    setMinPurchaseCents(coupon.minPurchaseCents ? String(coupon.minPurchaseCents / 100) : "");
    setFirstTimeOnly(coupon.firstTimeOnly || false);
    setIsPublic(coupon.isPublic || false);

    if (coupon.appliesTo === "all") {
      setAppliesTo("all");
      setSelectedProducts([]);
    } else {
      setAppliesTo("list");
      setSelectedProducts(coupon.appliesTo as string[]);
    }

    if (coupon.assignedTo === "all") {
      setAssignedTo("all");
      setSelectedClients([]);
    } else {
      setAssignedTo("list");
      setSelectedClients(coupon.assignedTo as string[]);
    }

    setMaxRedemptions(coupon.maxRedemptions ? String(coupon.maxRedemptions) : "");
    setStartsAt(coupon.startsAt ? coupon.startsAt.slice(0, 16) : "");
    setEndsAt(coupon.endsAt ? coupon.endsAt.slice(0, 16) : "");
    setNote(coupon.note || "");
  }

  async function saveCoupon() {
    setIsSaving(true);
    try {
      const apiPayload: CreateCouponInput = {
        code: code.trim().toUpperCase(),
        type: discountType === "percent" ? "PERCENTAGE" : "FIXED_AMOUNT",
        value: discountType === "percent"
          ? Math.max(0, Math.min(100, Number(percentOff) || 0))
          : Math.max(0, Number(amountOffCents) || 0),
        isActive: enabled,
        category: category.toUpperCase() as APICouponCategory,
        appliesTo: appliesTo === "all" ? '"all"' : JSON.stringify(selectedProducts),
        assignedTo: assignedTo === "all" ? '"all"' : JSON.stringify(selectedClients),
        maxUses: maxRedemptions.trim() ? Number(maxRedemptions) : null,
        startsAt: startsAt ? new Date(startsAt).toISOString() : null,
        expiresAt: endsAt ? new Date(endsAt).toISOString() : null,
        note: note.trim() || null,
        minPurchase: minPurchaseCents.trim() ? Math.round(parseFloat(minPurchaseCents) * 100) : null,
        firstTimeOnly,
        isPublic,
      };

      if (editId) {
        await updateCoupon(editId, apiPayload);
        flash("Coupon updated");
      } else {
        await createCoupon(apiPayload);
        flash("Coupon created");
      }

      // Refresh stats after save
      refetchStats();

      setOpenNew(false);
      resetForm();
      router.replace("/portal/admin/coupons");
    } catch (error: any) {
      flash(error.message || "Failed to save coupon");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await apiDeleteCoupon(id);
      setConfirmDelete(null);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      flash("Coupon deleted");
      refetchStats();
    } catch (error: any) {
      flash(error.message || "Failed to delete coupon");
    }
  }

  async function handleDuplicate(id: string) {
    try {
      const newCoupon = await apiDuplicateCoupon(id);
      if (newCoupon) {
        flash(`Duplicated as ${newCoupon.code}`);
        refetchStats();
      }
    } catch (error: any) {
      flash(error.message || "Failed to duplicate coupon");
    }
  }

  function handleExportCSV() {
    const csv = exportCouponsToCSV(rows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `coupons-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    flash("Exported to CSV");
  }

  // Bulk action handlers
  async function handleBulkEnable() {
    try {
      const count = await bulkToggle(Array.from(selectedIds), true);
      flash(`${count} coupons enabled`);
      setSelectedIds(new Set());
      setSelectMode(false);
      refetchStats();
    } catch (error: any) {
      flash(error.message || "Failed to enable coupons");
    }
  }

  async function handleBulkDisable() {
    try {
      const count = await bulkToggle(Array.from(selectedIds), false);
      flash(`${count} coupons disabled`);
      setSelectedIds(new Set());
      setSelectMode(false);
      refetchStats();
    } catch (error: any) {
      flash(error.message || "Failed to disable coupons");
    }
  }

  async function handleBulkDelete() {
    try {
      const count = await bulkDelete(Array.from(selectedIds));
      flash(`${count} coupons deleted`);
      setSelectedIds(new Set());
      setSelectMode(false);
      setConfirmBulkDelete(false);
      refetchStats();
    } catch (error: any) {
      flash(error.message || "Failed to delete coupons");
    }
  }

  function toggleSelectAll() {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((c) => c.id)));
    }
  }

  function toggleSelectOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function getClientNames(ids: string[]): string {
    return ids
      .slice(0, 3)
      .map((id) => {
        const client = clients.find((c) => c.id === id);
        return client?.name || client?.email || id;
      })
      .join(", ") + (ids.length > 3 ? ` +${ids.length - 3} more` : "");
  }

  function getProductNames(ids: string[]): string {
    return ids
      .slice(0, 3)
      .map((id) => PRODUCTS.find((p) => p.id === id)?.name || id)
      .join(", ") + (ids.length > 3 ? ` +${ids.length - 3} more` : "");
  }

  if (!ready) return null;

  // Show loading state
  if (couponsLoading && rows.length === 0) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 animate-pulse">
              <div className="h-4 w-20 bg-white/10 rounded mb-2" />
              <div className="h-6 w-12 bg-white/20 rounded" />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10" />
            <div className="h-4 w-48 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (couponsError) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <ExclamationTriangleIcon className="w-10 h-10 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-red-400 mb-2">Failed to load coupons</h3>
        <p className="text-sm text-red-300/60 mb-4">{couponsError.message || "Unknown error"}</p>
        <button
          onClick={() => refetchCoupons()}
          className="inline-flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/30 transition-all"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats - Enhanced with more metrics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        <StatCard label="Total Coupons" value={stats.totalCoupons} icon={TagIcon} color="#47BD79" />
        <StatCard label="Active" value={stats.activeCoupons} icon={CheckIcon} color="#3B82F6" />
        <StatCard label="Redemptions" value={stats.totalRedemptions} icon={ChartBarIcon} color="#A855F7" />
        <StatCard label="Avg Discount" value={`${stats.avgDiscount}%`} icon={CubeIcon} color="#F59E0B" />
        <StatCard
          label="Total Savings"
          value={`$${(stats.totalSavingsCents / 100).toFixed(0)}`}
          icon={BanknotesIcon}
          color="#EC4899"
          sub="Given to customers"
        />
        <StatCard
          label="Expiring Soon"
          value={stats.expiringSoon}
          icon={ExclamationTriangleIcon}
          color={stats.expiringSoon > 0 ? "#EF4444" : "#6B7280"}
          sub="Within 7 days"
        />
      </div>

      <div
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
        style={{ boxShadow: "0 0 20px rgba(71, 189, 121, 0.1)" }}
      >
        {/* Controls */}
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              value={ui.query}
              onChange={(e) => patch({ query: e.target.value })}
              placeholder="Search coupon code, id, or note..."
              className="w-full rounded-xl border border-white/20 bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#47BD79]/50 focus:ring-2 focus:ring-[#47BD79]/20 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {msg ? <span className="text-xs text-[#47BD79]">{msg}</span> : null}

            <select
              value={ui.enabled}
              onChange={(e) => patch({ enabled: e.target.value as EnabledFilter })}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#47BD79]/50"
              title="Status filter"
            >
              <option value="all" className="bg-zinc-900">All Status</option>
              <option value="enabled" className="bg-zinc-900">Active</option>
              <option value="disabled" className="bg-zinc-900">Disabled</option>
              <option value="expired" className="bg-zinc-900">Expired</option>
              <option value="scheduled" className="bg-zinc-900">Scheduled</option>
            </select>

            <select
              value={ui.category}
              onChange={(e) => patch({ category: e.target.value as CategoryFilter })}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#47BD79]/50"
              title="Category filter"
            >
              <option value="all" className="bg-zinc-900">All Categories</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-zinc-900">
                  {cat.label}
                </option>
              ))}
            </select>

            <select
              value={ui.sortKey}
              onChange={(e) => patch({ sortKey: e.target.value as SortKey })}
              className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#47BD79]/50"
              title="Sort"
            >
              <option value="createdAt" className="bg-zinc-900">Date</option>
              <option value="code" className="bg-zinc-900">Code</option>
              <option value="percentOff" className="bg-zinc-900">% Off</option>
              <option value="category" className="bg-zinc-900">Category</option>
              <option value="enabled" className="bg-zinc-900">Status</option>
            </select>

            <button
              type="button"
              onClick={() => patch({ sortDir: ui.sortDir === "desc" ? "asc" : "desc" })}
              className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
              title="Toggle direction"
            >
              <ChevronUpDownIcon className="w-4 h-4" />
              {ui.sortDir === "desc" ? "Desc" : "Asc"}
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
              title="Export to CSV"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Export
            </button>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setOpenNew(true);
              }}
              className="flex items-center gap-1 rounded-xl bg-[#47BD79] px-4 py-2 text-sm font-medium text-white hover:bg-[#3da968] transition-all"
            >
              <PlusIcon className="w-4 h-4" />
              New coupon
            </button>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {rows.length > 0 && (
          <div className="flex items-center gap-3 px-4 pb-3 border-b border-white/10">
            <button
              type="button"
              onClick={() => {
                setSelectMode(!selectMode);
                if (selectMode) setSelectedIds(new Set());
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                selectMode
                  ? "bg-[#47BD79] text-white"
                  : "border border-white/20 bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <CheckIcon className="w-3.5 h-3.5" />
              {selectMode ? `${selectedIds.size} selected` : "Select"}
            </button>

            {selectMode && (
              <>
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="text-xs text-white/50 hover:text-white transition-colors"
                >
                  {selectedIds.size === filtered.length ? "Deselect all" : "Select all"}
                </button>

                {selectedIds.size > 0 && (
                  <>
                    <div className="h-4 w-px bg-white/20" />
                    <button
                      type="button"
                      onClick={handleBulkEnable}
                      className="flex items-center gap-1 rounded-lg border border-[#47BD79]/30 bg-[#47BD79]/10 px-2.5 py-1.5 text-xs font-medium text-[#47BD79] hover:bg-[#47BD79]/20 transition-all"
                    >
                      <CheckIcon className="w-3 h-3" />
                      Enable
                    </button>
                    <button
                      type="button"
                      onClick={handleBulkDisable}
                      className="flex items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/60 hover:bg-white/10 transition-all"
                    >
                      <XMarkIcon className="w-3 h-3" />
                      Disable
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmBulkDelete(true)}
                      className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <TrashIcon className="w-3 h-3" />
                      Delete
                    </button>
                  </>
                )}
              </>
            )}

            <div className="flex-1" />

            <button
              type="button"
              onClick={() => {
                reset();
                resetScroll();
                flash("View reset");
              }}
              className="flex items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs text-white/50 hover:bg-white/10 hover:text-white transition-all"
            >
              <ArrowPathIcon className="w-3.5 h-3.5" />
              Reset
            </button>

            <button
              type="button"
              onClick={toggle}
              className="rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs text-white/50 hover:bg-white/10 hover:text-white transition-all"
              title="Toggle density"
            >
              {compact ? "Compact" : "Comfortable"}
            </button>

            {isOverride && (
              <button
                type="button"
                onClick={clearOverride}
                className="rounded-lg border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs text-white/50 hover:bg-white/10 hover:text-white transition-all"
                title="Use global density"
              >
                Use global
              </button>
            )}
          </div>
        )}

        {/* Table */}
        <div className={`rounded-xl border border-white/10 m-4 overflow-hidden ${compact ? "table-compact" : ""}`}>
          <div ref={scrollRef} className="max-h-[520px] overflow-auto">
            {rows.length === 0 ? (
              <EmptyState onCreateNew={() => { resetForm(); setOpenNew(true); }} />
            ) : filtered.length === 0 ? (
              <div className="px-4 py-12 text-center text-white/50">
                No coupons match your filters. Try adjusting your search or filters.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-[#0f172a]/95 backdrop-blur-sm">
                  <tr className="text-xs uppercase tracking-wide text-white/50 border-b border-white/10">
                    {selectMode && <th className="px-3 py-3.5 w-10"></th>}
                    <th className="px-4 py-3.5 text-left">Code</th>
                    <th className="px-4 py-3.5 text-left">Category</th>
                    <th className="px-4 py-3.5 text-left">Discount</th>
                    <th className="px-4 py-3.5 text-left">Targeting</th>
                    <th className="px-4 py-3.5 text-left">Usage</th>
                    <th className="px-4 py-3.5 text-left">Status</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      className={`group transition-colors hover:bg-white/5 focus:outline-none ${
                        selectedIds.has(c.id) ? "bg-[#47BD79]/10" : ""
                      }`}
                    >
                      {selectMode && (
                        <td className="px-3 py-3" onClick={stopRowClick}>
                          <button
                            type="button"
                            onClick={() => toggleSelectOne(c.id)}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              selectedIds.has(c.id)
                                ? "border-[#47BD79] bg-[#47BD79]"
                                : "border-white/20 bg-white/5 hover:border-white/40"
                            }`}
                          >
                            {selectedIds.has(c.id) && <CheckIcon className="w-3 h-3 text-white" />}
                          </button>
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#47BD79]/20 flex items-center justify-center">
                            <TagIcon className="w-4 h-4 text-[#47BD79]" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{c.code}</div>
                            <div className="text-xs text-white/40">{c.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <CategoryBadge category={c.category} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-white">
                          {c.discountType === "fixed" && c.amountOffCents
                            ? `$${(c.amountOffCents / 100).toFixed(2)} off`
                            : `${c.percentOff}% off`}
                        </div>
                        {c.minPurchaseCents && (
                          <div className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                            <CurrencyDollarIcon className="w-3 h-3" />
                            Min ${(c.minPurchaseCents / 100).toFixed(0)}
                          </div>
                        )}
                        {c.firstTimeOnly && (
                          <div className="text-xs text-[#A855F7] flex items-center gap-1 mt-0.5">
                            <UserPlusIcon className="w-3 h-3" />
                            New customers
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <CubeIcon className="w-3.5 h-3.5 text-[#3B82F6]" />
                            <span className="text-white/60 text-xs">
                              {c.appliesTo === "all"
                                ? "All products"
                                : `${(c.appliesTo as string[]).length} products`}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <UserGroupIcon className="w-3.5 h-3.5 text-[#A855F7]" />
                            <span className="text-white/60 text-xs">
                              {c.assignedTo === "all"
                                ? "All clients"
                                : `${(c.assignedTo as string[]).length} clients`}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <UsageBar used={c.redeemedCount} max={c.maxRedemptions} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill coupon={c} />
                      </td>
                      <td className="px-4 py-3 text-right" onClick={stopRowClick}>
                        <div className="flex items-center justify-end gap-1.5">
                          <CopyCode code={c.code} />

                          <button
                            type="button"
                            onClick={() => handleDuplicate(c.id)}
                            className="rounded-xl border border-white/20 bg-white/5 p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-all"
                            title="Duplicate coupon"
                          >
                            <DocumentDuplicateIcon className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              loadCouponToForm(c);
                              setEditId(c.id);
                              setOpenNew(true);
                            }}
                            className="rounded-xl border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
                            title="Edit coupon"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={async () => {
                              try {
                                await apiToggleCoupon(c.id, !c.enabled);
                                flash(c.enabled ? "Coupon disabled" : "Coupon enabled");
                                refetchStats();
                              } catch (error: any) {
                                flash(error.message || "Failed to toggle coupon");
                              }
                            }}
                            className="rounded-xl border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
                          >
                            {c.enabled ? "Disable" : "Enable"}
                          </button>

                          <button
                            type="button"
                            onClick={() => setConfirmDelete(c.id)}
                            className="rounded-xl border border-red-500/30 bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500/20 transition-all"
                            title="Delete coupon"
                          >
                            <TrashIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 p-4 text-xs text-white/40">
          <span>Stored in database via API</span>
          <span>{filtered.length} coupon{filtered.length !== 1 ? "s" : ""}{rows.length !== filtered.length ? ` (${rows.length} total)` : ""}</span>
        </div>

        {/* Create/Edit Modal */}
        <Modal
          open={openNew}
          title={editId ? "Edit Coupon" : "Create New Coupon"}
          onClose={() => {
            setOpenNew(false);
            resetForm();
            router.replace("/portal/admin/coupons");
          }}
          size="2xl"
        >
          <div className="space-y-5">
            {/* Section: Basic Info */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                <TagIcon className="w-3.5 h-3.5 text-[#47BD79]" />
                Basic Info
              </h3>
              <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="text-[10px] uppercase tracking-wide text-white/40 mb-1 block">Code</label>
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#47BD79]/50 focus:bg-white/[0.08]"
                    placeholder="OMG10"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wide text-white/40 mb-1 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CouponCategory)}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#47BD79]/50"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat.value} value={cat.value} className="bg-zinc-900">
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wide text-white/40 mb-1 block">Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as "percent" | "fixed")}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#47BD79]/50"
                  >
                    <option value="percent" className="bg-zinc-900">% Off</option>
                    <option value="fixed" className="bg-zinc-900">$ Off</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wide text-white/40 mb-1 block">
                    {discountType === "percent" ? "Percent" : "Amount"}
                  </label>
                  {discountType === "percent" ? (
                    <div className="relative">
                      <input
                        value={percentOff}
                        onChange={(e) => setPercentOff(Number(e.target.value))}
                        type="number"
                        min={0}
                        max={100}
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 pr-8 text-sm text-white outline-none focus:border-[#47BD79]/50"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">%</span>
                    </div>
                  ) : (
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">$</span>
                      <input
                        value={(amountOffCents / 100).toFixed(2)}
                        onChange={(e) => setAmountOffCents(Math.round(parseFloat(e.target.value || "0") * 100))}
                        type="number"
                        min={0}
                        step={0.01}
                        className="w-full rounded-lg border border-white/15 bg-white/5 pl-7 pr-3 py-2 text-sm text-white outline-none focus:border-[#47BD79]/50"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section: Settings Row */}
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
              <div>
                <label className="text-[10px] uppercase tracking-wide text-white/40 mb-1 block">Status</label>
                <select
                  value={enabled ? "enabled" : "disabled"}
                  onChange={(e) => setEnabled(e.target.value === "enabled")}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#47BD79]/50"
                >
                  <option value="enabled" className="bg-zinc-900">Enabled</option>
                  <option value="disabled" className="bg-zinc-900">Disabled</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wide text-white/40 mb-1 block">Max Uses</label>
                <input
                  value={maxRedemptions}
                  onChange={(e) => setMaxRedemptions(e.target.value)}
                  type="number"
                  min={1}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#47BD79]/50"
                  placeholder="Unlimited"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wide text-white/40 mb-1 block">Min Purchase</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">$</span>
                  <input
                    value={minPurchaseCents}
                    onChange={(e) => setMinPurchaseCents(e.target.value)}
                    type="number"
                    min={0}
                    step={1}
                    className="w-full rounded-lg border border-white/15 bg-white/5 pl-7 pr-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#47BD79]/50"
                    placeholder="None"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wide text-white/40 mb-1 block">Note</label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#47BD79]/50"
                  placeholder="Internal note..."
                />
              </div>
            </div>

            {/* Section: Date Range */}
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
              <div>
                <label className="text-[10px] uppercase tracking-wide text-white/40 mb-1 flex items-center gap-1">
                  <CalendarDaysIcon className="w-3 h-3" />
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#47BD79]/50"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wide text-white/40 mb-1 flex items-center gap-1">
                  <CalendarDaysIcon className="w-3 h-3" />
                  End Date
                </label>
                <input
                  type="datetime-local"
                  value={endsAt}
                  onChange={(e) => setEndsAt(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#47BD79]/50"
                />
              </div>
            </div>

            {/* Section: New Customers Only */}
            <button
              type="button"
              onClick={() => {
                const newValue = !firstTimeOnly;
                setFirstTimeOnly(newValue);
                // If turning ON firstTimeOnly, auto-reset client selection to "all"
                if (newValue) {
                  setAssignedTo("all");
                  setSelectedClients([]);
                }
              }}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                firstTimeOnly
                  ? "bg-[#A855F7]/20 border border-[#A855F7]/40 text-[#A855F7]"
                  : "border border-white/15 bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <UserPlusIcon className="w-4 h-4" />
              <span className="flex-1 text-left">New customers only</span>
              {firstTimeOnly && <CheckIcon className="w-4 h-4" />}
            </button>

            {/* Section: Targeting - Side by Side */}
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
              {/* Product Targeting */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CubeIcon className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-xs font-medium text-white">Products</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setAppliesTo("all")}
                      className={`rounded px-2 py-1 text-[10px] font-medium transition-all ${
                        appliesTo === "all"
                          ? "bg-[#3B82F6] text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      onClick={() => setAppliesTo("list")}
                      className={`rounded px-2 py-1 text-[10px] font-medium transition-all ${
                        appliesTo === "list"
                          ? "bg-[#3B82F6] text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>

                {appliesTo === "list" ? (
                  <MultiSelect
                    label="Products"
                    icon={CubeIcon}
                    items={PRODUCTS}
                    selected={selectedProducts}
                    onChange={setSelectedProducts}
                    renderItem={(p: Product) => ({ name: p.name, sub: `$${(p.priceCents / 100).toFixed(2)}` })}
                    color="#3B82F6"
                    compact
                  />
                ) : (
                  <div className="flex items-center gap-2 py-3 px-3 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                    <CheckIcon className="w-4 h-4 text-[#3B82F6]" />
                    <span className="text-xs text-[#3B82F6]">Applies to all products</span>
                  </div>
                )}
              </div>

              {/* Client Targeting */}
              <div className={`rounded-xl border border-white/10 bg-white/[0.02] p-3 ${firstTimeOnly ? "opacity-60" : ""}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <UserGroupIcon className="w-4 h-4 text-[#A855F7]" />
                    <span className="text-xs font-medium text-white">Clients</span>
                    {firstTimeOnly && (
                      <span className="text-[9px] text-amber-400/80 bg-amber-400/10 px-1.5 py-0.5 rounded">
                        Auto: New users only
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setAssignedTo("all")}
                      className={`rounded px-2 py-1 text-[10px] font-medium transition-all ${
                        assignedTo === "all" || firstTimeOnly
                          ? "bg-[#A855F7] text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      onClick={() => !firstTimeOnly && setAssignedTo("list")}
                      disabled={firstTimeOnly}
                      title={firstTimeOnly ? "Cannot select specific clients when 'New Customers Only' is enabled" : undefined}
                      className={`rounded px-2 py-1 text-[10px] font-medium transition-all ${
                        assignedTo === "list" && !firstTimeOnly
                          ? "bg-[#A855F7] text-white"
                          : firstTimeOnly
                          ? "text-white/20 cursor-not-allowed"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>

                {assignedTo === "list" && !firstTimeOnly ? (
                  <MultiSelect
                    label="Clients"
                    icon={UserGroupIcon}
                    items={clients}
                    selected={selectedClients}
                    onChange={setSelectedClients}
                    renderItem={(c: Client) => ({ name: c.name || c.email, sub: c.company || c.email })}
                    color="#A855F7"
                    compact
                  />
                ) : firstTimeOnly ? (
                  <div className="flex items-center gap-2 py-3 px-3 rounded-lg bg-amber-400/10 border border-amber-400/20">
                    <UserPlusIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-amber-400">Only users without orders can use this</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 py-3 px-3 rounded-lg bg-[#A855F7]/10 border border-[#A855F7]/20">
                    <CheckIcon className="w-4 h-4 text-[#A855F7]" />
                    <span className="text-xs text-[#A855F7]">Available to all clients</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setOpenNew(false);
                  resetForm();
                }}
                className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCoupon}
                disabled={isSaving}
                className="rounded-lg bg-gradient-to-r from-[#47BD79] to-[#3da968] px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : editId ? "Save Changes" : "Create Coupon"}
              </button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          open={!!confirmDelete}
          title="Delete Coupon?"
          onClose={() => setConfirmDelete(null)}
          size="md"
        >
          <div className="space-y-4">
            <p className="text-white/60">
              Are you sure you want to delete this coupon? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => confirmDelete && handleDelete(confirmDelete)}
                className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>

        {/* Bulk Delete Confirmation Modal */}
        <Modal
          open={confirmBulkDelete}
          title={`Delete ${selectedIds.size} Coupons?`}
          onClose={() => setConfirmBulkDelete(false)}
          size="md"
        >
          <div className="space-y-4">
            <p className="text-white/60">
              Are you sure you want to delete {selectedIds.size} coupon{selectedIds.size !== 1 ? "s" : ""}? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmBulkDelete(false)}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkDelete}
                className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition-all"
              >
                Delete {selectedIds.size} Coupon{selectedIds.size !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
