/**
 * External App Links Configuration
 *
 * For local development: Uses localhost URLs
 * For production: Uses environment variables or falls back to localhost
 *
 * To configure production URLs, add these to your .env.local file:
 * NEXT_PUBLIC_SECUREVAULT_DOCS_URL=https://your-svd-domain.com
 * NEXT_PUBLIC_OMG_CRM_URL=https://crm.omgsystem.com
 * NEXT_PUBLIC_OMG_LEADS_URL=https://leads.omgsystem.com
 * NEXT_PUBLIC_OMG_AI_MASTERY_URL=https://ai-mastery.omgsystem.com
 * NEXT_PUBLIC_OMG_IQ_URL=https://iq.omgsystem.com
 */
export const APP_LINKS = {
  securevaultDocs: process.env.NEXT_PUBLIC_SECUREVAULT_DOCS_URL || "http://localhost:3001",
  omgCrm: process.env.NEXT_PUBLIC_OMG_CRM_URL || "http://localhost:3002",
  omgLeads: process.env.NEXT_PUBLIC_OMG_LEADS_URL || "http://localhost:3003",
  omgAiMastery: process.env.NEXT_PUBLIC_OMG_AI_MASTERY_URL || "http://localhost:3004",
  omgIq: process.env.NEXT_PUBLIC_OMG_IQ_URL || "http://localhost:3005",
} as const;

