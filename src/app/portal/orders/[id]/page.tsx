import { MOCK_ORDERS } from "@/lib/admin/mockOrders";
import Link from "next/link";
import CopyActions from "./CopyActions";
import OrderTimeline from "./OrderTimeline";
import RelatedInfo from "./RelatedInfo";

function StatusPill({ status }: { status: string }) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium";

  const styles =
    status === "paid" || status === "completed"
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : status === "pending"
      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
      : status === "failed" || status === "cancelled"
      ? "bg-red-500/20 text-red-400 border-red-500/30"
      : status === "refunded"
      ? "bg-white/10 text-white/60 border-white/20"
      : "bg-white/10 text-white/60 border-white/20";

  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return <span className={`${base} ${styles}`}>{label}</span>;
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = MOCK_ORDERS.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#0f172a] p-6">
        <div className="mx-auto max-w-4xl space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Order not found</h1>
            <p className="text-sm text-white/60">
              That order ID isn't in the mock list.
            </p>
          </div>

          <Link href="/portal/admin/orders" className="inline-flex rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition-all">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const amount = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: order.currency,
  }).format(order.amountCents / 100);

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <nav className="text-sm text-white/60">
              <a href="/portal/orders" className="hover:text-white">
                Orders
              </a>
              <span className="px-2">/</span>
              <span className="text-white">{order.id}</span>
            </nav>

            <h1 className="text-2xl font-semibold text-white">{order.id}</h1>
            <p className="text-sm text-white/60">
              {order.productName} • {order.client.email}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <CopyActions orderId={order.id} email={order.client.email} />

            <a href="/portal/orders" className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition-all">
              Back
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <h2 className="text-sm font-semibold text-white">Client</h2>
            <div className="mt-2 text-sm">
              <div className="font-medium text-white">{order.client.name}</div>
              <div className="text-white/60">{order.client.email}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <h2 className="text-sm font-semibold text-white">Order</h2>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Status</span>
                <StatusPill status={order.status} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/60">Amount</span>
                <span className="font-medium text-white">{amount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/60">Created</span>
                <span className="text-white">{new Date(order.createdAt).toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/60">Source</span>
                <span className="text-white">{order.source}</span>
              </div>
            </div>
          </div>
        </div>

        <OrderTimeline status={order.status} createdAt={order.createdAt} />

        <RelatedInfo
          orderId={order.id}
          clientId={order.client.id}
          clientEmail={order.client.email}
          productId={order.productId}
          productName={order.productName}
        />

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
          <h2 className="text-sm font-semibold text-white">Notes</h2>
          <p className="mt-2 text-sm text-white/60">
            Week 1 mock order detail page. Later: connect to Stripe + database.
          </p>
        </div>
      </div>
    </div>
  );
}

