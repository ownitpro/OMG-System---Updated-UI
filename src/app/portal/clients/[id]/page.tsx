import { PortalShell } from "@/components/PortalShell";
import { getAdminNav } from "@/config/portalNav";
import { MOCK_ORDERS } from "@/lib/admin/mockOrders";

function getClientOrders(clientId: string) {
  // Week 1: server page can't read localStorage.
  // We still show the core client view from MOCK_ORDERS,
  // and later we'll upgrade to DB so it includes test orders too.
  return MOCK_ORDERS.filter((o) => o.client.id === clientId).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const nav = getAdminNav();
  const orders = getClientOrders(id);
  const client = orders[0]?.client;

  if (!client) {
    return (
      <PortalShell role="admin" title="Client Not Found" nav={nav} upgradeHref="/products/plans" lockedCount={0}>
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">Client not found</h1>
            <p className="text-sm text-zinc-600">
              This client ID isn't in server mock data yet.
            </p>
          </div>

          <a href="/portal/clients" className="inline-flex rounded-lg border px-3 py-2 text-sm hover:bg-white">
            Back to Clients
          </a>
        </div>
      </PortalShell>
    );
  }

  return (
    <PortalShell role="admin" title={`Client: ${client.name}`} nav={nav} upgradeHref="/products/plans" lockedCount={0}>
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-zinc-600">
              <a href="/portal/clients" className="hover:text-black">Clients</a>
              <span className="px-2">/</span>
              <span className="text-black">{client.id}</span>
            </div>
            <h1 className="text-2xl font-semibold">{client.name}</h1>
            <p className="text-sm text-zinc-600">{client.email}</p>
          </div>

          <a href="/portal/clients" className="rounded-lg border px-3 py-2 text-sm hover:bg-white">
            Back
          </a>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <h2 className="text-sm font-semibold">Orders (server mock)</h2>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-t bg-slate-50 text-left">
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td className="px-4 py-10 text-center text-zinc-600" colSpan={5}>
                      No orders found for this client.
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id} className="border-t hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-medium">{o.id}</td>
                      <td className="px-4 py-3">{o.productName}</td>
                      <td className="px-4 py-3">{o.status}</td>
                      <td className="px-4 py-3 text-zinc-600">{new Date(o.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <a
                          href={`/portal/orders/${o.id}`}
                          className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-white"
                        >
                          View order
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-zinc-600">
            Week 1 note: test orders created in localStorage won't show here until we move orders into a DB.
          </p>
        </div>
      </div>
    </PortalShell>
  );
}
