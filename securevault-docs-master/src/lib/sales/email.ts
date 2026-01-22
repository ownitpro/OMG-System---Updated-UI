// lib/sales/email.ts

export function buildSalesEmail({
  lead,
  utm,
  meta,
}: {
  lead: any;
  utm: any;
  meta: any;
}) {
  const subject = `New sales request — ${lead.industry} — ${lead.company}`;
  const lines = [
    `First: ${lead.firstName} ${lead.lastName}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
    `Industry: ${lead.industry}`,
    `Team size: ${lead.teamSize}`,
    `Intent: ${lead.intent}`,
    `Message: ${lead.message || "(none)"}`,
    "",
    `UTM: ${JSON.stringify(utm)}`,
    `IP: ${meta.ip}`,
    `UA: ${meta.ua}`,
  ].join("\n");
  return { subject, text: lines };
}

// Minimal SES sender (pseudo; replace with your SES SDK call)
export async function sendSalesEmail(payload: any) {
  const { subject, text } = buildSalesEmail(payload);
  if (!process.env.SALES_INBOX) return; // guard
  if ((process.env.SALES_INTEGRATIONS_MODE || "off") !== "live") {
    console.info("[sales:email:dryrun]", { subject, text });
    return;
  }
  // TODO: AWS SES v3 client here
  // await ses.send(new SendEmailCommand({...}))
}

