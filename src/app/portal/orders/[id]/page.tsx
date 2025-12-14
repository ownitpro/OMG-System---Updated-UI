import { MOCK_ORDERS } from "@/lib/admin/mockOrders";
import Link from "next/link";
import CopyActions from "./CopyActions";
import OrderTimeline from "./OrderTimeline";
import RelatedInfo from "./RelatedInfo";

function StatusPill({ status }: { status: string }) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium";

  const styles =
    status === "paid" || status === "completed"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "pending"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : status === "failed" || status === "cancelled"
      ? "bg-red-50 text-red-700 border-red-200"
      : status === "refunded"
      ? "bg-slate-50 text-slate-700 border-slate-200"
      : "bg-slate-50 text-slate-700 border-slate-200";

  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return <span className={`${base} ${styles}`}>{label}</span>;
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = MOCK_ORDERS.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-zinc-50 p-6">
        <div className="mx-auto max-w-4xl space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">Order not found</h1>
            <p className="text-sm text-zinc-600">
              That order ID isn't in the mock list.
            </p>
          </div>

          <Link href="/portal/admin/orders" className="inline-flex rounded-lg border px-3 py-2 text-sm hover:bg-white">
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
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <nav className="text-sm text-zinc-600">
              <a href="/portal/orders" className="hover:text-black">
                Orders
              </a>
              <span className="px-2">/</span>
              <span className="text-black">{order.id}</span>
            </nav>

            <h1 className="text-2xl font-semibold">{order.id}</h1>
            <p className="text-sm text-zinc-600">
              {order.productName} • {order.client.email}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <CopyActions orderId={order.id} email={order.client.email} />

            <a href="/portal/orders" className="rounded-lg border px-3 py-2 text-sm hover:bg-white">
              Back
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-4">
            <h2 className="text-sm font-semibold">Client</h2>
            <div className="mt-2 text-sm">
              <div className="font-medium">{order.client.name}</div>
              <div className="text-zinc-600">{order.client.email}</div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-4">
            <h2 className="text-sm font-semibold">Order</h2>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Status</span>
                <StatusPill status={order.status} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Amount</span>
                <span className="font-medium">{amount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Created</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Source</span>
                <span>{order.source}</span>
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

        <div className="rounded-xl border bg-white p-4">
          <h2 className="text-sm font-semibold">Notes</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Week 1 mock order detail page. Later: connect to Stripe + database.
          </p>
        </div>
      </div>
    </div>
  );
}

