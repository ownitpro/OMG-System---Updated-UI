"use client";

import * as React from "react";
import { getCouponAnalytics, type CouponEvent } from "@/lib/analytics/couponAnalytics";
import { useTableDensity } from "@/lib/admin/useTableDensity";
import { useTableScrollRestore } from "@/lib/admin/useTableScrollRestore";
import { useTableState } from "@/lib/admin/useTableState";
import MiniLineChart from "./MiniLineChart";

type Row = {
  code: string;
  applies: number;
  successes: number;
  estimatedSavingsCents: number;
  products: Record<string, number>;
};

function money(cents: number, currency: string) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(cents / 100);
}

function sumCodes(e: CouponEvent) {
  return (e.couponCodes ?? []).map((c) => c.trim().toUpperCase()).filter(Boolean);
}

function buildRows(events: CouponEvent[]): { rows: Row[]; funnel: any } {
  const funnel = {
    checkoutViews: 0,
    pickerViews: 0,
    applies: 0,
    autoApplies: 0,
    successes: 0,
  };

  const map = new Map<string, Row>();

  for (const e of events) {
    if (e.event === "checkout_view") funnel.checkoutViews += 1;
    if (e.event === "coupon_picker_view") funnel.pickerViews += 1;
    if (e.event === "coupon_apply") funnel.applies += 1;
    if (e.event === "coupon_auto_apply") funnel.autoApplies += 1;
    if (e.event === "checkout_success") funnel.successes += 1;

    const codes = sumCodes(e);
    if (!codes.length) continue;

    for (const code of codes) {
      const existing =
        map.get(code) ??
        ({
          code,
          applies: 0,
          successes: 0,
          estimatedSavingsCents: 0,
          products: {},
        } as Row);

      // Count applies
      if (e.event === "coupon_apply" || e.event === "coupon_auto_apply") {
        existing.applies += 1;
        if (typeof e.discountCents === "number") existing.estimatedSavingsCents += e.discountCents;
        existing.products[e.productId] = (existing.products[e.productId] ?? 0) + 1;
      }

      // Count successes (conversion)
      if (e.event === "checkout_success") {
        existing.successes += 1;
        existing.products[e.productId] = (existing.products[e.productId] ?? 0) + 1;
      }

      map.set(code, existing);
    }
  }

  const rows = Array.from(map.values()).sort((a, b) => b.successes - a.successes || b.applies - a.applies);
  return { rows, funnel };
}

function buildDailySeries(events: CouponEvent[], days = 14) {
  // buckets: oldest -> newest
  const now = new Date();
  const buckets: { key: string; label: string; applies: number; successes: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    d.setHours(0, 0, 0, 0);

    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString(undefined, { month: "short", day: "2-digit" });

    buckets.push({ key, label, applies: 0, successes: 0 });
  }

  const index = new Map(buckets.map((b, i) => [b.key, i]));

  for (const e of events) {
    const dayKey = new Date(e.ts).toISOString().slice(0, 10);
    const idx = index.get(dayKey);
    if (idx === undefined) continue;

    if (e.event === "coupon_apply" || e.event === "coupon_auto_apply") buckets[idx].applies += 1;
    if (e.event === "checkout_success") buckets[idx].successes += 1;
  }

  return {
    labels: buckets.map((b) => b.label),
    applies: buckets.map((b) => b.applies),
    successes: buckets.map((b) => b.successes),
  };
}

function StatCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {sub ? <div className="mt-1 text-xs text-muted-foreground">{sub}</div> : null}
    </div>
  );
}

export default function CouponsAnalyticsPanel() {
  const { density, isOverride, toggle, clearOverride } = useTableDensity("coupon-analytics");
  const compact = density === "compact";
  const { scrollRef, resetScroll } = useTableScrollRestore("coupon-analytics");

  const { state: ui, patch, reset, ready } = useTableState("coupon-analytics", {
    query: "",
    product: "all" as string,
    sort: "successes" as "successes" | "applies" | "savings",
    rangeDays: 14 as 7 | 14 | 30,
  });

  const [events, setEvents] = React.useState<CouponEvent[]>([]);
  const [rows, setRows] = React.useState<Row[]>([]);
  const [funnel, setFunnel] = React.useState<any>(null);

  const currency = "USD"; // Week 1 default display (can wire to admin settings later)

  React.useEffect(() => {
    function load() {
      const { events } = getCouponAnalytics();
      setEvents(events);

      const built = buildRows(events);
      setRows(built.rows);
      setFunnel(built.funnel);
    }

    load();
    const onUpdated = () => load();
    window.addEventListener("omg-analytics-updated", onUpdated);
    window.addEventListener("storage", onUpdated);

    return () => {
      window.removeEventListener("omg-analytics-updated", onUpdated);
      window.removeEventListener("storage", onUpdated);
    };
  }, []);

  const productOptions = React.useMemo(() => {
    const set = new Set<string>();
    for (const e of events) set.add(e.productId);
    return ["all", ...Array.from(set).sort()];
  }, [events]);

  const filtered = React.useMemo(() => {
    const q = ui.query.trim().toUpperCase();

    let base = rows.filter((r) => (q ? r.code.includes(q) : true));

    if (ui.product !== "all") {
      base = base.filter((r) => (r.products[ui.product] ?? 0) > 0);
    }

    if (ui.sort === "successes") base = [...base].sort((a, b) => b.successes - a.successes || b.applies - a.applies);
    if (ui.sort === "applies") base = [...base].sort((a, b) => b.applies - a.applies || b.successes - a.successes);
    if (ui.sort === "savings") base = [...base].sort((a, b) => b.estimatedSavingsCents - a.estimatedSavingsCents);

    return base;
  }, [rows, ui.query, ui.product, ui.sort]);

  const viewToApplyRate =
    funnel && funnel.checkoutViews > 0 ? Math.round(((funnel.applies + funnel.autoApplies) / funnel.checkoutViews) * 100) : 0;

  const applyToSuccessRate =
    funnel && (funnel.applies + funnel.autoApplies) > 0 ? Math.round((funnel.successes / (funnel.applies + funnel.autoApplies)) * 100) : 0;

  const totalSavings = rows.reduce((sum, r) => sum + r.estimatedSavingsCents, 0);

  const series = React.useMemo(
    () => buildDailySeries(events, ui.rangeDays),
    [events, ui.rangeDays]
  );

  const focusCode = filtered[0]?.code;

  if (!ready) return null;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Checkout views" value={String(funnel?.checkoutViews ?? 0)} sub="Counted on checkout load" />
        <StatCard
          title="Applies"
          value={String((funnel?.applies ?? 0) + (funnel?.autoApplies ?? 0))}
          sub={`Apply rate: ${viewToApplyRate}%`}
        />
        <StatCard title="Successes" value={String(funnel?.successes ?? 0)} sub={`Conversion: ${applyToSuccessRate}%`} />
        <StatCard title="Estimated savings" value={money(totalSavings, currency)} sub="From apply events with discount data" />
      </div>

      {/* Chart */}
      <MiniLineChart
        title={`Coupon activity (last ${ui.rangeDays} days)`}
        labels={series.labels}
        seriesA={series.applies}
        seriesB={series.successes}
        focusCode={focusCode}
      />

      {/* Controls */}
      <div className="rounded-xl border bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            value={ui.query}
            onChange={(e) => patch({ query: e.target.value })}
            placeholder="Search coupon code…"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={ui.product}
              onChange={(e) => patch({ product: e.target.value })}
              className="rounded-lg border px-3 py-2 text-sm"
              title="Filter by product"
            >
              {productOptions.map((p) => (
                <option key={p} value={p}>
                  {p === "all" ? "All products" : p}
                </option>
              ))}
            </select>

            <select
              value={ui.sort}
              onChange={(e) => patch({ sort: e.target.value as any })}
              className="rounded-lg border px-3 py-2 text-sm"
              title="Sort"
            >
              <option value="successes">Top by successes</option>
              <option value="applies">Top by applies</option>
              <option value="savings">Top by savings</option>
            </select>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Range</span>
              {[7, 14, 30].map((d) => {
                const active = ui.rangeDays === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => patch({ rangeDays: d as 7 | 14 | 30 })}
                    className={[
                      "rounded-lg border px-3 py-2 text-sm",
                      active ? "bg-black text-white border-black" : "hover:bg-white",
                    ].join(" ")}
                  >
                    {d}d
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                reset();
                resetScroll();
              }}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
            >
              Reset view
            </button>

            <button
              type="button"
              onClick={toggle}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
              title="Toggle density"
            >
              Density: {compact ? "Compact" : "Comfortable"}
            </button>

            {isOverride ? (
              <button
                type="button"
                onClick={clearOverride}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
                title="Use global density"
              >
                Use global
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-xl border bg-white ${compact ? "table-compact" : ""}`}>
        <div className="overflow-x-auto">
          <div ref={scrollRef} className="max-h-[520px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 border-t bg-slate-50 text-left">
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Applies</th>
                  <th className="px-4 py-3">Successes</th>
                  <th className="px-4 py-3">Savings</th>
                  <th className="px-4 py-3">Top product</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                      No coupon analytics yet. Try running a checkout flow with a coupon.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => {
                    const topProduct = Object.entries(r.products).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
                    return (
                      <tr key={r.code} className="border-t transition-colors hover:bg-slate-50/80">
                        <td className="px-4 py-3 font-medium">{r.code}</td>
                        <td className="px-4 py-3">{r.applies}</td>
                        <td className="px-4 py-3">{r.successes}</td>
                        <td className="px-4 py-3 text-muted-foreground">{money(r.estimatedSavingsCents, currency)}</td>
                        <td className="px-4 py-3 text-muted-foreground">{topProduct}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between border-t p-4 text-xs text-muted-foreground">
          <span>Stored in localStorage: <span className="font-mono">omg_coupon_analytics</span></span>
          <span>{filtered.length} row(s)</span>
        </div>
      </div>
    </div>
  );
}

