// lib/sales/crm.ts

export async function postCrm(payload: any) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return;
  const { lead, utm } = payload;
  const body = {
    createdAt: new Date().toISOString(),
    ...lead,
    utm,
    source: "svd_web",
  };
  if ((process.env.SALES_INTEGRATIONS_MODE || "off") !== "live") {
    console.info("[sales:crm:dryrun]", body);
    return;
  }
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

