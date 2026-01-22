# n8n Credentials Schema

Create these credentials in **n8n > Credentials** (names must match exactly):

## Required Credentials

### SMTP (SES)
- **Name:** `svd_SES`
- **Type:** SMTP
- **Fields:**
  - Host: `email-smtp.ca-central-1.amazonaws.com`
  - Port: `587`
  - User: SES SMTP username
  - Password: SES SMTP password
  - Region: `ca-central-1`

### Stripe API
- **Name:** `svd_Stripe`
- **Type:** HTTP Basic Auth (or Stripe API if available)
- **Fields:**
  - Username: `sk_live_...` or `sk_test_...`
  - Password: (leave empty or use API key as username)

### Slack
- **Name:** `svd_Slack`
- **Type:** Slack Incoming Webhook
- **Fields:**
  - Webhook URL: `https://hooks.slack.com/services/...`

### QuickBooks Online
- **Name:** `svd_QBO`
- **Type:** OAuth2
- **Fields:**
  - Client ID
  - Client Secret
  - Authorization URL: `https://appcenter.intuit.com/connect/oauth2`
  - Access Token URL: `https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer`
  - Scope: `com.intuit.quickbooks.accounting`

### Google Drive
- **Name:** `svd_GDrive`
- **Type:** Google API (OAuth2 or Service Account)
- **Fields:**
  - Service Account Email (if service account)
  - Private Key (JSON or key file)

### OneDrive
- **Name:** `svd_OneDrive`
- **Type:** Microsoft OneDrive OAuth2
- **Fields:**
  - Client ID
  - Client Secret
  - Authorization URL: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`
  - Access Token URL: `https://login.microsoftonline.com/common/oauth2/v2.0/token`
  - Scope: `Files.ReadWrite offline_access`

### Dropbox
- **Name:** `svd_Dropbox`
- **Type:** Dropbox API
- **Fields:**
  - Access Token: Dropbox OAuth2 access token

### Box
- **Name:** `svd_Box`
- **Type:** Box OAuth2
- **Fields:**
  - Client ID
  - Client Secret
  - Authorization URL: `https://account.box.com/api/oauth2/authorize`
  - Access Token URL: `https://api.box.com/oauth2/token`
  - Scope: `root_readwrite`

### PostgreSQL
- **Name:** `svd_Postgres`
- **Type:** PostgreSQL
- **Fields:**
  - Host
  - Port: `5432`
  - Database
  - User
  - Password

## Optional Credentials

### AWS S3
- **Name:** `svd_AWS_S3`
- **Type:** AWS
- **Fields:**
  - Access Key ID
  - Secret Access Key
  - Region: `ca-central-1`

### Status Ping
- **Name:** `svd_StatusPing`
- **Type:** HTTP Basic Auth (if needed)
- **Fields:**
  - Username
  - Password

## Notes

- The exported workflow JSONs reference these credential names, so imports will fail if names don't match.
- Store sensitive values in n8n's credential store, never in workflow JSONs or environment variables.
- Use separate credentials for dev/stage/prod environments.
