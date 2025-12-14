import type { OrderStatus } from "@/lib/admin/types";

function dotClass(active: boolean) {
  return active
    ? "h-2.5 w-2.5 rounded-full bg-black"
    : "h-2.5 w-2.5 rounded-full bg-slate-300";
}

function itemClass(active: boolean) {
  return active ? "text-black" : "text-slate-500";
}

export default function OrderTimeline({
  status,
  createdAt,
}: {
  status: OrderStatus;
  createdAt: string;
}) {
  const created = true;
  const paid = status === "paid" || status === "completed";
  const failed = status === "failed" || status === "cancelled";
  const pending = status === "pending";
  const accessGranted = status === "paid" || status === "completed"; // Week 1 rule

  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="text-sm font-semibold">Timeline</h2>

      <div className="mt-4 space-y-4">
        {/* Created */}
        <div className="flex gap-3">
          <div className="mt-1.5">
            <div className={dotClass(created)} />
          </div>
          <div className={itemClass(created)}>
            <div className="text-sm font-medium">Order created</div>
            <div className="text-xs text-zinc-600">
              {new Date(createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Paid / Pending / Failed */}
        <div className="flex gap-3">
          <div className="mt-1.5">
            <div className={dotClass(paid || pending || failed)} />
          </div>
          <div className={itemClass(paid || pending || failed)}>
            <div className="text-sm font-medium">
              {paid ? "Payment received" : pending ? "Payment pending" : "Payment failed"}
            </div>
            <div className="text-xs text-zinc-600">
              {paid
                ? "Funds confirmed."
                : pending
                ? "Waiting for confirmation."
                : "Customer may need to try again."}
            </div>
          </div>
        </div>

        {/* Access */}
        <div className="flex gap-3">
          <div className="mt-1.5">
            <div className={dotClass(accessGranted)} />
          </div>
          <div className={itemClass(accessGranted)}>
            <div className="text-sm font-medium">
              {accessGranted ? "Access granted" : "Access not granted"}
            </div>
            <div className="text-xs text-zinc-600">
              {accessGranted
                ? "Instant access after purchase (Week 1 behavior)."
                : "Access unlocks once payment is marked paid."}
            </div>
          </div>
        </div>

        {/* Refunded */}
        {status === "refunded" ? (
          <div className="flex gap-3">
            <div className="mt-1.5">
              <div className={dotClass(true)} />
            </div>
            <div className={itemClass(true)}>
              <div className="text-sm font-medium">Refunded</div>
              <div className="text-xs text-zinc-600">
                Payment was reversed. Access should be removed in the real system.
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

