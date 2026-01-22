# Cost Analysis & Pricing Strategy

## Executive Summary

This document provides a detailed cost analysis for **SecureVault Docs**, projecting operational costs for scaling from **0 to 1,000 users**. It breaks down expenses into AWS Infrastructure (Fixed & Variable) and OpenAI Integration (Variable) and proposes a stratified pricing model with **3 Personal Tiers** and **3 Business Tiers**.

**Estimated Monthly Run Rate (0-1000 Users):**
- **Low Usage (Early):** ~$250/month
- **Moderate Usage (Scaling):** ~$600/month
- **High Usage (1000 Active Users):** ~$1,400/month

---

## 1. Infrastructure Costs (AWS)

AWS costs are split into **Fixed Costs** (services running 24/7) and **Variable Costs** (usage-based).

### A. Fixed Costs (Base Infrastructure)
*Minimum monthly cost to keep the lights on.*

| Service | Instance Type / Config | Est. Monthly Cost | Notes |
|---------|------------------------|-------------------|-------|
| **RDS (PostgreSQL)** | `db.t3.medium` (Multi-AZ for Prod) | ~$72.00 | Single-AZ Dev/Staging is cheaper (~$36) |
| **ElastiCache (Redis)** | `cache.t3.micro` | ~$12.00 | Session storage & caching |
| **NAT Gateway** | Managed NAT | ~$32.00 | Required for private subnets (optional initially*) |
| **Load Balancer (ALB)** | Application Load Balancer | ~$16.00 | + LCU charges (minimal at start) |
| **Total Fixed** | | **~$132.00** | *Can optimize to ~$50/mo with single-AZ & no NAT GW initially.* |

### B. Variable Costs (Scaling with Users)
*Per-user or per-action costs based on 1000 active users.*

| Service | Metric | Unit Cost | Est. for 1000 Users |
|---------|--------|-----------|---------------------|
| **S3 Storage** | Storage (Standard) | $0.023 / GB | $23.00 (Assuming 1GB/user avg) |
| **S3 Requests** | PUT/COPY/POST/GET | $0.005 / 1k requests | $5.00 |
| **Data Transfer** | Outbound to Internet | $0.09 / GB | $45.00 (Assuming 0.5GB egress/user) |
| **CloudFront** | CDN Egress | $0.085 / GB | $42.50 |
| **Textract (OCR)** | Document Analysis | $1.50 / 1000 pages | $150.00 (Assuming 100 pages/user/mo) |
| **SQS/SNS** | Requests | $0.40 / Million | < $1.00 |
| **Total Variable** | | | **~$266.50** |

**Total Estimated AWS Cost (1000 Users):** ~$400/month

---

## 2. OpenAI Integration Costs

We assume a hybrid approach using **GPT-4o-mini** for high-volume tasks (summarization, indexing, fast chat) and **GPT-4o** for complex reasoning (complex legal doc analysis).

### Cost Drivers
1. **Document Ingestion (On Upload):** Auto-tagging, Summarization, Sentiment Analysis.
   - *Model:* GPT-4o-mini
   - *Input:* ~2,000 tokens/doc (OCR text)
   - *Output:* ~200 tokens/doc (JSON meta)
2. **User QA / Chat (On Demand):** "Ask your vault" features.
   - *Model:* GPT-4o-mini (Default) / GPT-4o (Premium)
   - *Context:* ~4,000 tokens (Retrieved chunks + history)

### Unit Economics (Per Active User)

| Action | Tier Cost (Model) | Logic | Cost / 100 Docs or Queries |
|--------|-------------------|-------|----------------------------|
| **Ingestion** | GPT-4o-mini | $0.15/1M in, $0.60/1M out | $0.04 (Cheap!) |
| **Basic Chat** | GPT-4o-mini | 4k context/turn | $0.10 per 100 turns |
| **Deep Analysis**| GPT-4o | $2.50/1M in, $10.00/1M out | $1.20 per 100 turns |

### Projected OpenAI Monthly Bill (1000 Users)
*Assumption: 10% Heavy users, 90% Light users.*

- **Ingestion:** 5,000 new docs/month total -> ~$2.00 (Negligible)
- **Chat/Query:**
  - 100 Heavy Users (300 queries/mo, GPT-4o mixed) -> ~$200.00
  - 900 Light Users (30 queries/mo, GPT-4o-mini) -> ~$27.00
- **Total OpenAI:** **~$230/month**

---

## 3. Tiered System Breakdown

We propose a **3-Tier System** for Personal Use and a **3-Tier System** for Organization/Business Use.

### A. Personal Side (B2C)

Focus: Individual Vaults, Life Admin, Personal Security.

#### Tier 1: Personal Free (Freemium)
*Entry point to capture users.*
- **Price:** $0 / month
- **AWS Cost Impact:** Low ($0.05/user)
- **OpenAI Access:** **None** or **Limits Only** (e.g., Static summaries only).
- **Features:**
  - 1 GB Storage
  - Manual Uploads Only
  - Basic Search (No AI)
  - 1 Portal link

#### Tier 2: Personal Plus
*For organized individuals.*
- **Price:** $8 / month
- **AWS Cost Impact:** Moderate ($0.30/user - mostly textract)
- **OpenAI Access:** **Basic** (GPT-4o-mini)
  - Auto-tagging & Summarization
  - "Ask your Vault" (Limit: 50 queries/mo)
- **Features:**
  - 10 GB Storage
  - Email-to-Vault
  - 50 OCR pages/mo

#### Tier 3: Personal Ultra
*For power users / families.*
- **Price:** $20 / month
- **AWS Cost Impact:** High ($1.50/user)
- **OpenAI Access:** **Advanced** (GPT-4o access)
  - Deep Document Analysis
  - Unlimited AI Chat
- **Features:**
  - 100 GB Storage
  - Family Sharing (up to 3 members)
  - 500 OCR pages/mo

---

### B. Organization Side (B2B)

Focus: Teams, Compliance, Client Portals.

#### Tier 1: Organization Starter (Teams)
*Small businesses (CPAs, Lawyers, Agencies).*
- **Price:** $49 / month (includes 5 seats)
- **Unit Cost:** ~$10 in infra/AI usage
- **Features:**
  - 100 GB Shared Storage
  - 10 Client Portals
  - Basic AI (Auto-organize incoming client docs)
  - Standard Support

#### Tier 2: Organization Business
*Growing firms heavily using automation.*
- **Price:** $149 / month (includes 15 seats) + $15/add-seat
- **Unit Cost:** Variable scaling
- **Features:**
  - 1 TB Shared Storage
  - **Unlimited Portals** (Key differentiator)
  - **Full AI Suite:** Bulk extraction, Auto-renaming, Data Loss Prevention (PII detection via AI).
  - Webhooks & API Access
  - Custom Branding

#### Tier 3: Organization Enterprise
*Large scale, compliance heavy.*
- **Price:** Contact Sales / Custom (Starts at $500/mo)
- **Features:**
  - Single Sign-On (SSO)
  - Dedicated Support
  - **Private AI Isolated Instance** (Zero-retention guarantee)
  - Custom Data Retention Policies
  - SLA 99.9%
  - Audit Logs (Immutable)

---

## 4. Profitability Analysis 

**Scenario: 1000 Total Users**
- **Breakdown:**
  - 600 Free Users (Cost: ~$30/mo total) -> **Marketing Expense**
  - 300 Personal Plus ($8/mo) -> Revenue: $2,400
  - 50 Personal Ultra ($20/mo) -> Revenue: $1,000
  - 40 Org Starter ($49/mo) -> Revenue: $1,960
  - 10 Org Business ($149/mo) -> Revenue: $1,490

**Total Monthly Revenue:** ~$6,850
**Total Monthly Cost (AWS + OpenAI):** ~$650 - $800

**Net Monthly Profit:** **~$6,000**
**Margin:** ~88%

*Note: This does not include salaries, marketing spend, or payment processing fees (Stripe 2.9%).*
