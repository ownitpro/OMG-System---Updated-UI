# Connectors Guide

## Overview

Connectors integrate SecureVault Docs with external services. All connectors are **mock/stub-safe** in test mode.

## Accounting & Finance

### QuickBooks Online (QBO)

**Status:** Mock connect/disconnect

**Features:**
- Show "Connected" state
- Sync preview table (mock data)
- Disconnect option

**Setup:**
1. Go to Settings → Connectors
2. Click "Connect QBO"
3. Mock OAuth flow (no real connection in test)
4. Shows "Connected" status

**Use Cases:**
- Sync invoices
- Import financial statements
- Link receipts to transactions

### Sage / FreshBooks / Xero

**Status:** Future connectors (same pattern as QBO)

**Note:** Will follow same mock pattern when implemented.

## Cloud Drives

### Google Drive

**Status:** Mock picker

**Features:**
- Mock file picker
- Import simulates files to Documents/Vault
- No real sync in test mode

**Setup:**
1. Go to Settings → Connectors
2. Click "Connect Google Drive"
3. Mock OAuth flow
4. Shows "Connected" status
5. Use "Import from Drive" button (mock picker)

### OneDrive

**Status:** Mock picker

**Features:**
- Same as Google Drive
- Mock file picker
- Import simulates files

### Dropbox

**Status:** Mock picker

**Features:**
- Same as Google Drive
- Mock file picker
- Import simulates files

### Box

**Status:** Mock picker

**Features:**
- Same as Google Drive
- Mock file picker
- Import simulates files

## Email-to-Vault

**Status:** Mock inbox

**Features:**
- Unique email address per user/org
- Posts to mock inbox
- Creates files automatically
- Auto-labeling (mocked in test)

**Setup:**
1. Go to Settings → Integrations
2. View your unique Email-to-Vault address
3. Copy address
4. Use for forwarding receipts/bills

**Use Cases:**
- Forward receipts via email
- Send documents from mobile
- Auto-organize incoming files

## eSign Handoff

**Status:** Mock integration

**Features:**
- "Send to eSign" button (mock)
- Returns signed PDF to Vault
- No real eSign service in test

**Workflow:**
1. Select document
2. Click "Send to eSign"
3. Mock eSign flow
4. Signed PDF appears in Vault

## Team Comms

### Slack

**Status:** Mock channel selection

**Features:**
- Mock channel picker
- Sends confirmation toast
- No real Slack integration in test

**Setup:**
1. Go to Settings → Connectors
2. Click "Connect Slack"
3. Mock OAuth flow
4. Select channel (mock picker)
5. Shows "Connected" status

### Microsoft Teams

**Status:** Mock channel selection

**Features:**
- Same as Slack
- Mock channel picker
- Confirmation toast

## Testing Connectors

**In Test Mode:**
- All connectors show "Connected" state
- No real API calls are made
- File imports are simulated
- OAuth flows are mocked

**For Production:**
- Replace mock OAuth with real providers
- Implement actual file sync
- Add real webhook handlers
- Set up proper credentials

## Best Practices

1. **Test All Connectors**
   - Verify "Connected" state displays
   - Test mock file pickers
   - Check import simulation

2. **Document Limitations**
   - Explain mock behavior to users
   - Note which connectors are available
   - Set expectations for production

3. **Error Handling**
   - Test disconnect flows
   - Verify error messages
   - Check reconnection flows

