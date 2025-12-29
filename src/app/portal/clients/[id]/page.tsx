import { MOCK_ORDERS } from "@/lib/admin/mockOrders";
import Link from "next/link";

function getClientOrders(clientId: string) {
  // Week 1: server page can't read localStorage.
  // We still show the core client view from MOCK_ORDERS,
  // and later we'll upgrade to DB so it includes test orders too.
  return MOCK_ORDERS.filter((o) => o.client.id === clientId).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

function StatusPill({ status }: { status: string }) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium";

  const styles =
    status === "paid" || status === "completed"
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : status === "pending"
      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
      : status === "failed" || status === "cancelled"
      ? "bg-red-500/20 text-red-400 border-red-500/30"
      : "bg-white/10 text-white/60 border-white/20";

  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return <span className={`${base} ${styles}`}>{label}</span>;
}

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orders = getClientOrders(id);
  const client = orders[0]?.client;

  if (!client) {
    return (
      <div className="min-h-screen bg-[#0f172a] p-6">
        <div className="mx-auto max-w-4xl space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Client not found</h1>
            <p className="text-sm text-white/60">
              This client ID isn't in server mock data yet.
            </p>
          </div>

          <Link href="/portal/clients" className="inline-flex rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition-all">
            Back to Clients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-white/60">
              <Link href="/portal/clients" className="hover:text-white">Clients</Link>
              <span className="px-2">/</span>
              <span className="text-white">{client.id}</span>
            </div>
            <h1 className="text-2xl font-semibold text-white">{client.name}</h1>
            <p className="text-sm text-white/60">{client.email}</p>
          </div>

          <Link href="/portal/clients" className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition-all">
            Back
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
          <h2 className="text-sm font-semibold text-white">Orders (server mock)</h2>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 backdrop-blur-sm">
                <tr className="text-xs uppercase tracking-wide text-white/50 border-b border-white/10">
                  <th className="px-4 py-3 text-left">Order</th>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Created</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.length === 0 ? (
                  <tr>
                    <td className="px-4 py-10 text-center text-white/50" colSpan={5}>
                      No orders found for this client.
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id} className="transition-colors hover:bg-white/5">
                      <td className="px-4 py-3 font-medium text-white">{o.id}</td>
                      <td className="px-4 py-3 text-white">{o.productName}</td>
                      <td className="px-4 py-3"><StatusPill status={o.status} /></td>
                      <td className="px-4 py-3 text-white/60">{new Date(o.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/portal/orders/${o.id}`}
                          className="rounded-xl border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-all"
                        >
                          View order
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-white/50">
            Week 1 note: test orders created in localStorage won't show here until we move orders into a DB.
          </p>
        </div>
      </div>
    </div>
  );
}
