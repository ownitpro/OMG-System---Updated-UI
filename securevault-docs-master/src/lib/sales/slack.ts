// lib/sales/slack.ts

export async function postSlack(payload: any) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  const { lead, utm } = payload;
  const emoji =
    lead.industry === "accounting"
      ? "📊"
      : lead.industry === "real_estate"
        ? "🏠"
        : lead.industry === "contractors"
          ? "🛠️"
          : lead.industry === "project_management"
            ? "📋"
            : "🗂️";
  const blocks = [
    {
      type: "header",
      text: { type: "plain_text", text: `${emoji} New sales request` },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Name*\n${lead.firstName} ${lead.lastName}`,
        },
        {
          type: "mrkdwn",
          text: `*Email*\n${lead.email}`,
        },
        {
          type: "mrkdwn",
          text: `*Company*\n${lead.company}`,
        },
        {
          type: "mrkdwn",
          text: `*Industry*\n${lead.industry}`,
        },
        {
          type: "mrkdwn",
          text: `*Team*\n${lead.teamSize}`,
        },
        {
          type: "mrkdwn",
          text: `*Intent*\n${lead.intent}`,
        },
      ],
    },
    ...(lead.message
      ? [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Message*\n${lead.message}`,
            },
          },
        ]
      : []),
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `UTM: ${utm?.source || "-"}/${utm?.medium || "-"}/${utm?.campaign || "-"}`,
        },
      ],
    },
  ];
  const body = { blocks };

  if ((process.env.SALES_INTEGRATIONS_MODE || "off") !== "live") {
    console.info("[sales:slack:dryrun]", body);
    return;
  }
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

