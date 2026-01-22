# SecureVault Docs — n8n Pack (Production‑Ready, Non‑Scaffolding)

> Paste this whole folder tree and files into your repo. It **does not scaffold or run in your Next.js app**. It's for versioning the n8n assets your engineering team will import to n8n. Credentials stay in n8n only.

## What is this?

A versioned pack of n8n workflows for SecureVault Docs. Import them into n8n to power leads, demos, usage metering, caps/alerts, connectors, billing events, and marketplace installs. This folder **does not run** in your Next.js app.

## How to use

1. Provision n8n and create the credentials in §3.
2. Import workflows from `ops/n8n/workflows/*.json`.
3. Configure variables from `ops/n8n/env.example` in n8n.
4. Point your app's webhooks to the endpoints in §4.

## Conventions

* Credential names are fixed to keep imports smooth.
* All external calls tagged with `svd_*` headers for audit.
* Dev uses mock app endpoints. Prod uses real API.

## Purpose & Non‑Scaffolding Rules

* Lives under `/ops/n8n/` only. No imports from `app/` or `src/`.
* All webhooks target **n8n** domains (e.g., `https://n8n.yourdomain.com/webhook/...`). Your app calls these; they do **not** autowire into Next.js.
* All secrets are **n8n credentials** (OAuth/API keys, SMTP, Stripe, AWS) — **not** `.env` in the app.

## Webhook Contracts (App → n8n)

**Mount these paths in n8n**; your app or mock API will POST here.

* `POST /webhook/svd/contact-sales` → lead intake
* `POST /webhook/svd/request-docs-created` → a user created a Request Files link
* `POST /webhook/svd/portal-invite` → org invited a client to a portal
* `POST /webhook/svd/email-to-vault` → email bridge (phase‑1 push)
* `POST /webhook/svd/usage/meters` → metering event (uploads_gb, ocr_pages, egress_gb)
* `POST /webhook/svd/stripe` → Stripe webhook relay (checkout.session.completed etc.)
* `POST /webhook/svd/templates/install` → marketplace install request

## Workflow Catalog

See individual workflow files in `workflows/` directory. Each JSON is importable into n8n.

## Testing Playbooks (Dev‑Safe)

* Use `tests/webhooks_smoke.http` (VSCode REST Client) to send sample payloads to your n8n.
* Stripe: set **test** keys. Workflow 10 returns mock URL if `SVD_ENV=dev`.
* Upload/Drive ingests: point to your **mock** Next.js endpoints (`/api/demo/*`). No S3 used in dev.
* Caps/Alerts: thresholds computed but only **notify** in dev; no hard‑stops.

## Go‑Live Checklist (Ops)

1. Stand up n8n behind HTTPS (`n8n.yourdomain.com`), enable basic auth + owner API key.
2. Create credentials listed in §3.
3. Import all workflows; set environment variables (§2).
4. Swap mock app endpoints to real (`APP_API_BASE`).
5. Configure Stripe live keys + webhook secret; flip `SVD_ENV=prod`.
6. Enable AWS S3/Textract roles; update 06/07 workflows to call presign + S3 upload.
7. Validate caps alerts w/ a canary org; confirm 70/80/90/95/100/103 signals.
8. Turn on 99_ops_daily_digest.

## Notes on Safety & Testing Mode

* These assets keep your **testing mode intact**: no hard dependencies on AWS/Stripe unless you flip to prod.
* Webhook schemas are stable, so your front‑end can call them now with mock payloads.
* You can add/remove workflows without touching the app repo.

## Next Steps (when you're ready)

* Hook **Contact Sales** page form → `/webhook/svd/contact-sales`.
* Wire **Try Demo** toggles → `/webhook/svd/demo/switch`.
* Post **usage meters** nightly from mock API → `/webhook/svd/usage/meters`.
* Enable **template marketplace**: call `/webhook/svd/templates/install` from `/marketplace` page.
* Gradually flip connectors (Drive/Email) to real S3 presigns once infra is ready.

## Contact

Ops owner: [ops@securevaultdocs.com](mailto:ops@securevaultdocs.com)
