// src/lib/billing/mockConfig.ts
// Shared billing configuration for mock mode

export const COST = {
  storageGb: 0.06,
  egressGb: 0.12,
  textractPerPage: 0.02,
}; // CAD est. (informational only)

export const BUSINESS = {
  starter: {
    priceUsd: 59.99,
    capCad: 15.00,
    textractPages: 250,
    storageGb: 100,
    egressGb: 25,
  },
  growth: {
    priceUsd: 109.99,
    capCad: 27.50,
    textractPages: 700,
    storageGb: 140,
    egressGb: 45,
  },
  pro: {
    priceUsd: 219.99,
    capCad: 55.00,
    textractPages: 1700,
    storageGb: 170,
    egressGb: 55,
  },
};

export const ALARMS = {
  thresholds: [0.7, 0.8, 0.9, 0.95],
  softStop: 1.0,
  burstStop: 1.03,
};

export const TOPUPS = {
  textract: {
    packPages: 1000,
    priceUsd: 15,
    maxPacks: { starter: 3, growth: 10, pro: 20 },
    autoBuyAt: 0.95,
  },
  storage: {
    packGb: 250,
    priceUsd: 10,
  },
  egress: {
    packGb: 200,
    priceUsd: 20,
  },
};

export const SEAT_CAPS = {
  starter: { base: 5, extraMax: 3, priceUsdPerSeat: 5 },
  growth: { base: 15, extraMax: 5, priceUsdPerSeat: 3 },
  pro: { base: 40, extraMax: 10, priceUsdPerSeat: 2 },
};

export const CONNECTORS = {
  starter: {
    accounting: ['QBO-basic'],
    drives: ['google-drive-import', 'onedrive-import'],
    email: ['email-to-vault'],
    esign: ['basic-esign-handoff'],
    comms: ['slack-1', 'teams-1'],
    automations: ['n8n-webhook', 'make-webhook'],
    marketplace: ['install-templates'],
  },
  growth: {
    accounting: ['QBO-deep', 'xero', 'freshbooks'],
    drives: ['dropbox-import', 'box-import'],
    email: ['email-to-vault'],
    esign: ['basic-esign-handoff'],
    comms: ['slack-multi', 'teams-multi'],
    automations: ['n8n-scheduled', 'make-scheduled'],
    marketplace: ['install-templates'],
  },
  pro: {
    accounting: ['QBO-deep', 'xero', 'freshbooks', 'sage-business-cloud'],
    drives: ['dropbox-import', 'box-import', 'drive-rules'],
    email: ['email-to-vault'],
    esign: ['basic-esign-handoff'],
    comms: ['slack-rules', 'teams-rules'],
    automations: ['n8n-advanced', 'make-advanced'],
    marketplace: ['install-templates', 'publish-private-templates'],
  },
};

// Personal tiers
export const PERSONAL = {
  starter: {
    priceUsd: 9.99,
    capCad: 2.5,
    textractPages: 150,
    storageGb: 25,
    egressGb: 8,
  },
  growth: {
    priceUsd: 14.99,
    capCad: 3.75,
    textractPages: 350,
    storageGb: 60,
    egressGb: 15,
  },
  pro: {
    priceUsd: 24.99,
    capCad: 6.25,
    textractPages: 900,
    storageGb: 120,
    egressGb: 30,
  },
};

