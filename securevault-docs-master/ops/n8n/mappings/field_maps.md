# Field Maps

Canonical field mappings for leads, orgs, portals, requests, and billing across workflows.

## Leads (Contact Sales, CRM)

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `timestamp` | ISO8601 | When lead was created | Webhook `ts` |
| `name` | string | Contact name | Webhook `name` |
| `email` | string | Contact email (unique) | Webhook `email` |
| `company` | string | Company name | Webhook `company` |
| `size` | string | Company size range | Webhook `size` (e.g., "5-15", "50-200") |
| `interest` | string | Use case/interest | Webhook `interest` |
| `message` | text | Free-form message | Webhook `message` |
| `enriched` | boolean | Whether Clearbit enrichment ran | Workflow |
| `score` | number | Lead score (0-100) | Workflow (02) |
| `lastEnriched` | ISO8601 | Last enrichment timestamp | Workflow (02) |

## Organizations

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `orgId` | string | Unique org identifier | App/DB |
| `name` | string | Organization name | App/DB |
| `planId` | string | Current plan ID | Billing |
| `trialEndsAt` | ISO8601 | Trial expiration | Signup |
| `status` | string | `active`, `trial`, `suspended` | App/DB |
| `createdAt` | ISO8601 | Org creation timestamp | App/DB |

## Portal Invites

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `timestamp` | ISO8601 | Invite sent timestamp | Workflow |
| `orgId` | string | Organization ID | Webhook |
| `portalId` | string | Portal identifier | Webhook |
| `inviteeEmail` | string | Recipient email | Webhook |
| `inviteeName` | string | Recipient name | Webhook |
| `inviterEmail` | string | Sender email | Webhook |
| `inviterName` | string | Sender name | Webhook |
| `pin` | string | 6-digit PIN | Workflow (04) |
| `expiresAt` | ISO8601 | Invite expiration | Webhook |

## Request Docs Links

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `timestamp` | ISO8601 | Request created timestamp | Workflow |
| `orgId` | string | Organization ID | Webhook |
| `requestId` | string | Unique request identifier | Webhook |
| `requesterEmail` | string | Who requested | Webhook |
| `clientEmail` | string | Who receives the link | Webhook |
| `expiresAt` | ISO8601 | Link expiration | Webhook |
| `checklist` | array | Required document types | Webhook |

## Usage Meters

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `timestamp` | ISO8601 | Meter update timestamp | Workflow |
| `orgId` | string | Organization ID | Webhook |
| `period` | string | Billing period (YYYY-MM) | Webhook |
| `uploads_gb` | number | Storage used (GB) | Webhook |
| `ocr_pages` | number | OCR pages processed | Webhook |
| `egress_gb` | number | Data egress (GB) | Webhook |
| `maxPercent` | number | Max % of any cap | Workflow (08) |
| `threshold` | string | `ok`, `info`, `notice`, `warning`, `critical`, `exceeded` | Workflow (08) |

## Billing

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `orgId` | string | Organization ID | Stripe metadata |
| `planId` | string | Plan identifier | Stripe metadata |
| `subscriptionId` | string | Stripe subscription ID | Stripe webhook |
| `customerId` | string | Stripe customer ID | Stripe webhook |
| `amount` | number | Amount in cents | Stripe |
| `currency` | string | Currency code | Stripe |
| `status` | string | Subscription status | Stripe webhook |

## Support Tickets

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `timestamp` | ISO8601 | Ticket created timestamp | Workflow |
| `ticketId` | string | Unique ticket ID | Workflow (14) |
| `userId` | string | User identifier | Webhook |
| `orgId` | string | Organization ID | Webhook |
| `email` | string | Contact email | Webhook |
| `subject` | string | Ticket subject | Webhook |
| `message` | text | Ticket message | Webhook |
| `severity` | string | `low`, `medium`, `high` | Webhook |
| `status` | string | `open`, `in_progress`, `resolved` | Workflow |

## Beta Terms Acceptances

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `timestamp` | ISO8601 | Acceptance timestamp | Workflow |
| `userId` | string | User identifier | Webhook |
| `email` | string | User email | Webhook |
| `version` | string | Terms version | Webhook |
| `acceptedAt` | ISO8601 | When accepted | Webhook `ts` |

