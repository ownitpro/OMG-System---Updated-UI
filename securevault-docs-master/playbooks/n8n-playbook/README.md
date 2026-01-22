# N8N Playbook

Complete N8N workflow documentation and ready-to-import workflow files for SecureVault Docs.

## Table of Contents

1. [Overview](#overview)
2. [Workflow Index](#workflow-index)
3. [AI Workflows](#ai-workflows)
4. [Webhook Configuration](#webhook-configuration)
5. [External Integrations](#external-integrations)
6. [Import Instructions](#import-instructions)

---

## Overview

This playbook contains all N8N workflows needed to power SecureVault Docs. Each workflow is documented with:
- Purpose and use case
- Node-by-node breakdown
- Input/output specifications
- Webhook endpoints
- External service connections
- Ready-to-import JSON files

### Prerequisites

- N8N instance (cloud or self-hosted)
- AWS credentials configured
- Stripe API keys
- Database access
- Email service (SendGrid/Mailgun)
- Environment variables set

### Environment Variables Required

```bash
# App Configuration
APP_API_BASE=https://securevaultdocs.com
SVD_ENV=prod
SVD_BACKOFFICE_BASE=https://backoffice.securevaultdocs.com

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
S3_BUCKET_NAME=securevault-docs-prod
S3_BUCKET_PERSONAL=securevault-docs-personal-prod

# Stripe
STRIPE_API_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database
DATABASE_URL=postgresql://...

# Email
SENDGRID_API_KEY=SG...
EMAIL_FROM=noreply@securevaultdocs.com

# OCR
TEXTRACT_MODE=analyze_expense
OCR_SAMPLE_PCT=100
```

---

## Workflow Index

### Core Workflows

1. **00_core_healthcheck.json** - System health monitoring
2. **01_contact_sales_router.json** - Sales lead routing
3. **02_signup_trial_org_provision.json** - User signup and org creation
4. **03_portal_invite_sender.json** - Client portal invitation emails
5. **04_request_files_link_generator.json** - Document request link generation
6. **05_email_to_vault_ingest.json** - Email-to-vault document processing
7. **06_drive_poll_connectors.json** - Drive connector polling
8. **07_usage_metering_caps_alerts.json** - Usage monitoring and alerts
9. **08_stripe_billing_webhooks.json** - Stripe webhook processing
10. **09_marketplace_template_install.json** - Template marketplace installation
11. **10_support_intake_router.json** - Support ticket routing
12. **11_status_pings.json** - Status page monitoring
13. **12_demo_seed_switcher.json** - Demo data management
14. **13_beta_terms_gate_logger.json** - Beta terms acceptance tracking
15. **14_daily_ops_digest.json** - Daily operations summary
16. **15_qbo_connect_stub.json** - QuickBooks Online integration
17. **16_share_link_revoke_sweeper.json** - Expired share link cleanup
17. **17_security_anomaly_watch.json** - Security monitoring

### AI-Powered Workflows

See [AI Workflows](#ai-workflows) section for complete list.

---

## AI Workflows

All AI workflows are ready to import and use the latest AI models. Each workflow includes:
- Model configuration
- Prompt engineering
- Input/output mappings
- Error handling
- Cost optimization

### AI Workflow 1: Document Classification AI

**File**: `ai_01_document_classification.json`

**Purpose**: Automatically classify uploaded documents into folders and apply labels using AI.

**Models Used**:
- **Primary**: OpenAI GPT-4o-mini (cost-effective for classification)
- **Fallback**: Anthropic Claude 3 Haiku

**Workflow**:
1. **Webhook Trigger**: Receives document upload event
2. **Extract Metadata**: Get filename, OCR text, file type
3. **AI Classification Node**: 
   - Model: `gpt-4o-mini`
   - Temperature: 0.1 (deterministic)
   - Max Tokens: 200
   - Prompt: Classification prompt with document context
4. **Parse Response**: Extract folder and labels
5. **Update Database**: Save classification to database
6. **Notify API**: Update document status via API

**Input**:
```json
{
  "documentId": "doc_123",
  "filename": "receipt_starbucks_2025-01-15.pdf",
  "ocrText": "Starbucks Coffee\nDate: 2025-01-15\nTotal: $12.50\nThank you!",
  "fileType": "application/pdf",
  "orgId": "org_abc123"
}
```

**Output**:
```json
{
  "documentId": "doc_123",
  "folder": "Receipts",
  "labels": ["Entertainment", "Food"],
  "confidence": 0.95,
  "status": "classified"
}
```

**Prompt Template**:
```
You are a document classification assistant. Classify the following document into one of these folders and apply relevant labels.

Folders: ID, Bills, Income, Receipts, Health, Education, Legal, Taxes, Unsorted

Labels: Home, Phone, Utilities, Internet, Food, Entertainment, Travel, Insurance, RX, Tuition, Invoice, Statement, T1, T2, NOA, Other

Document:
Filename: {{filename}}
Content: {{ocrText}}

Respond in JSON format:
{
  "folder": "folder_name",
  "labels": ["label1", "label2"],
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation"
}
```

---

### AI Workflow 2: OCR Text Extraction Enhancement

**File**: `ai_02_ocr_enhancement.json`

**Purpose**: Enhance OCR results using AI to correct errors and extract structured data.

**Models Used**:
- **Primary**: OpenAI GPT-4o (for complex documents)
- **Fallback**: Anthropic Claude 3.5 Sonnet

**Workflow**:
1. **Webhook Trigger**: Receives OCR completion event
2. **Get OCR Text**: Retrieve raw OCR text from S3/Textract
3. **AI Enhancement Node**:
   - Model: `gpt-4o`
   - Temperature: 0.2
   - Max Tokens: 1000
   - Prompt: Enhancement prompt with OCR text
4. **Extract Structured Data**: Parse dates, amounts, merchants
5. **Update Document**: Save enhanced text and metadata

**Input**:
```json
{
  "documentId": "doc_123",
  "ocrText": "Starbuks Cofee\nDat: 2025-01-15\nTotl: $12.50",
  "documentType": "receipt"
}
```

**Output**:
```json
{
  "documentId": "doc_123",
  "enhancedText": "Starbucks Coffee\nDate: 2025-01-15\nTotal: $12.50",
  "structuredData": {
    "merchant": "Starbucks Coffee",
    "date": "2025-01-15",
    "amount": 12.50,
    "currency": "USD"
  }
}
```

---

### AI Workflow 3: Document Request Template Generation

**File**: `ai_03_template_generation.json`

**Purpose**: Generate document request templates using AI based on business type and use case.

**Models Used**:
- **Primary**: Anthropic Claude 3.5 Sonnet
- **Fallback**: OpenAI GPT-4o

**Workflow**:
1. **Webhook Trigger**: Receives template generation request
2. **Get Context**: Business type, industry, use case
3. **AI Template Generation**:
   - Model: `claude-3-5-sonnet-20241022`
   - Temperature: 0.7 (creative)
   - Max Tokens: 2000
4. **Validate Template**: Check against schema
5. **Save Template**: Store in database

**Input**:
```json
{
  "businessType": "accounting",
  "useCase": "tax_preparation",
  "industry": "small_business",
  "requiredDocuments": ["T4", "receipts", "NOA"]
}
```

**Output**:
```json
{
  "templateId": "tpl_123",
  "title": "Year-End Tax Package Request",
  "description": "Please upload the following documents for your 2024 tax preparation",
  "items": [
    {"key": "t4", "label": "T4 Statement of Remuneration", "required": true},
    {"key": "receipts", "label": "Business Expense Receipts", "required": true},
    {"key": "noa", "label": "Notice of Assessment (2023)", "required": false}
  ]
}
```

---

### AI Workflow 4: Client Portal Invite Email Personalization

**File**: `ai_04_email_personalization.json`

**Purpose**: Generate personalized client portal invitation emails using AI.

**Models Used**:
- **Primary**: OpenAI GPT-4o-mini
- **Fallback**: Anthropic Claude 3 Haiku

**Workflow**:
1. **Webhook Trigger**: Portal creation event
2. **Get Client Info**: Client name, business type, context
3. **AI Email Generation**:
   - Model: `gpt-4o-mini`
   - Temperature: 0.5
   - Max Tokens: 500
4. **Format Email**: Apply email template
5. **Send Email**: Via SendGrid/Mailgun

**Input**:
```json
{
  "portalId": "portal_123",
  "clientName": "Acme Corp",
  "clientEmail": "contact@acme.com",
  "businessType": "accounting",
  "pin": "246810"
}
```

**Output**:
```json
{
  "subject": "Your Secure Document Portal is Ready - Acme Corp",
  "body": "Hi Acme Corp team,\n\nYour secure document portal is ready...",
  "htmlBody": "<html>...</html>"
}
```

---

### AI Workflow 5: Document Search Query Enhancement

**File**: `ai_05_search_enhancement.json`

**Purpose**: Enhance user search queries to improve document search results.

**Models Used**:
- **Primary**: OpenAI GPT-4o-mini
- **Fallback**: Anthropic Claude 3 Haiku

**Workflow**:
1. **Webhook Trigger**: Search query from app
2. **Get Query**: User's search text
3. **AI Query Enhancement**:
   - Model: `gpt-4o-mini`
   - Temperature: 0.3
   - Max Tokens: 200
4. **Generate Search Terms**: Extract keywords, synonyms
5. **Execute Search**: Use enhanced query in database search

**Input**:
```json
{
  "query": "starbucks receipt from last month",
  "orgId": "org_abc123",
  "userId": "user_123"
}
```

**Output**:
```json
{
  "originalQuery": "starbucks receipt from last month",
  "enhancedQuery": "starbucks coffee receipt",
  "keywords": ["starbucks", "coffee", "receipt"],
  "dateRange": {
    "start": "2024-12-01",
    "end": "2024-12-31"
  },
  "synonyms": ["coffee shop", "cafe"]
}
```

---

### AI Workflow 6: Anomaly Detection in Document Access

**File**: `ai_06_anomaly_detection.json`

**Purpose**: Detect unusual patterns in document access for security monitoring.

**Models Used**:
- **Primary**: OpenAI GPT-4o (for pattern analysis)
- **Fallback**: Custom ML model

**Workflow**:
1. **Scheduled Trigger**: Runs every hour
2. **Get Access Logs**: Recent document access events
3. **AI Anomaly Detection**:
   - Model: `gpt-4o`
   - Temperature: 0.1
   - Max Tokens: 500
4. **Flag Anomalies**: Unusual access patterns
5. **Alert Security Team**: Send alerts for suspicious activity

**Input**:
```json
{
  "timeRange": "last_hour",
  "orgId": "org_abc123",
  "accessLogs": [...]
}
```

**Output**:
```json
{
  "anomalies": [
    {
      "type": "unusual_time_access",
      "severity": "medium",
      "description": "Document accessed at 3am from new IP",
      "documentId": "doc_123",
      "userId": "user_456"
    }
  ]
}
```

---

### AI Workflow 7: Automated Document Summarization

**File**: `ai_07_document_summarization.json`

**Purpose**: Generate AI summaries of long documents for quick review.

**Models Used**:
- **Primary**: Anthropic Claude 3.5 Sonnet
- **Fallback**: OpenAI GPT-4o

**Workflow**:
1. **Webhook Trigger**: Document upload for long documents (>10 pages)
2. **Get Document Text**: Full OCR text
3. **AI Summarization**:
   - Model: `claude-3-5-sonnet-20241022`
   - Temperature: 0.3
   - Max Tokens: 1000
4. **Extract Key Points**: Important dates, amounts, parties
5. **Save Summary**: Store in database

**Input**:
```json
{
  "documentId": "doc_123",
  "ocrText": "Full document text...",
  "pageCount": 15
}
```

**Output**:
```json
{
  "documentId": "doc_123",
  "summary": "This contract outlines...",
  "keyPoints": [
    "Contract date: 2025-01-15",
    "Parties: Acme Corp and XYZ Inc",
    "Amount: $50,000",
    "Term: 12 months"
  ],
  "wordCount": 150
}
```

---

### AI Workflow 8: Smart Folder Suggestions

**File**: `ai_08_folder_suggestions.json`

**Purpose**: Suggest folder organization improvements based on document patterns.

**Models Used**:
- **Primary**: OpenAI GPT-4o
- **Fallback**: Anthropic Claude 3.5 Sonnet

**Workflow**:
1. **Scheduled Trigger**: Weekly analysis
2. **Get Document Patterns**: Analyze existing folder structure
3. **AI Analysis**:
   - Model: `gpt-4o`
   - Temperature: 0.4
   - Max Tokens: 800
4. **Generate Suggestions**: Folder reorganization recommendations
5. **Notify User**: Send suggestions via email/in-app

**Input**:
```json
{
  "orgId": "org_abc123",
  "documents": [...],
  "currentFolders": ["Unsorted", "Receipts", "Bills"]
}
```

**Output**:
```json
{
  "suggestions": [
    {
      "action": "create_folder",
      "folderName": "Tax Documents",
      "reason": "You have 45 tax-related documents in Unsorted",
      "documentsToMove": ["doc_1", "doc_2", ...]
    }
  ]
}
```

---

### AI Workflow 9: Client Communication Auto-Response

**File**: `ai_09_auto_response.json`

**Purpose**: Generate automated responses to common client portal questions.

**Models Used**:
- **Primary**: OpenAI GPT-4o-mini
- **Fallback**: Anthropic Claude 3 Haiku

**Workflow**:
1. **Webhook Trigger**: Client message in portal
2. **Get Message**: Client question/request
3. **AI Response Generation**:
   - Model: `gpt-4o-mini`
   - Temperature: 0.6
   - Max Tokens: 300
4. **Review Response**: Optional human review flag
5. **Send Response**: Auto-reply or queue for review

**Input**:
```json
{
  "messageId": "msg_123",
  "clientEmail": "client@example.com",
  "message": "How do I upload documents?",
  "portalId": "portal_123"
}
```

**Output**:
```json
{
  "response": "Hi! To upload documents, click the 'Upload' button...",
  "confidence": 0.95,
  "requiresReview": false
}
```

---

### AI Workflow 10: Usage Pattern Analysis & Recommendations

**File**: `ai_10_usage_analysis.json`

**Purpose**: Analyze usage patterns and provide optimization recommendations.

**Models Used**:
- **Primary**: OpenAI GPT-4o
- **Fallback**: Anthropic Claude 3.5 Sonnet

**Workflow**:
1. **Scheduled Trigger**: Monthly analysis
2. **Get Usage Data**: Uploads, storage, OCR usage
3. **AI Analysis**:
   - Model: `gpt-4o`
   - Temperature: 0.2
   - Max Tokens: 1000
4. **Generate Recommendations**: Cost savings, efficiency tips
5. **Send Report**: Monthly usage report email

**Input**:
```json
{
  "orgId": "org_abc123",
  "month": "2025-01",
  "usage": {
    "uploads": 150,
    "storageGB": 12.5,
    "ocrPages": 450
  }
}
```

**Output**:
```json
{
  "insights": [
    "You're using 85% of your OCR page limit",
    "Consider upgrading to avoid hitting limits"
  ],
  "recommendations": [
    "Upgrade to Growth plan for 2x OCR pages",
    "Archive old documents to free storage"
  ]
}
```

---

## Webhook Configuration

### App → N8N Webhooks

All webhooks from the app to N8N use the base URL: `https://your-n8n-instance.com/webhook/`

#### Webhook Endpoints

1. **Contact Sales**: `POST /webhook/svd/contact-sales`
2. **Signup/Trial**: `POST /webhook/svd/signup`
3. **Portal Invite**: `POST /webhook/svd/portal-invite`
4. **Document Upload**: `POST /webhook/svd/document-upload`
5. **Email to Vault**: `POST /webhook/svd/email-to-vault`
6. **Stripe Webhook**: `POST /webhook/svd/stripe`
7. **Support Ticket**: `POST /webhook/svd/support`
8. **Document Request**: `POST /webhook/svd/request-docs`

### N8N → App API Calls

All N8N workflows call back to the app API at: `{{$env.APP_API_BASE}}/api/...`

#### API Endpoints Used

- `/api/org/[orgId]/documents` - Document management
- `/api/portal/[portalId]/invite` - Portal invitations
- `/api/classification/job` - Classification requests
- `/api/ocr/process` - OCR processing
- `/api/billing/event` - Billing events
- `/api/notifications/send` - Send notifications

---

## External Integrations

### AWS Services

#### S3 (Storage)
- **Node**: AWS S3 node
- **Credentials**: AWS Access Key + Secret
- **Operations**: Upload, Download, List, Delete
- **Buckets**: 
  - `securevault-docs-prod` (Business)
  - `securevault-docs-personal-prod` (Personal)

#### Textract (OCR)
- **Node**: AWS Textract node
- **Credentials**: Same AWS credentials
- **Operations**: DetectDocumentText, AnalyzeExpense
- **Configuration**: Region, Bucket, Key

#### SNS (Notifications)
- **Node**: AWS SNS node
- **Purpose**: Send notifications for events
- **Topics**: Document uploads, Classification complete, Alerts

### Stripe

#### Stripe Node
- **Credentials**: Stripe API Key
- **Operations**: 
  - Retrieve customer
  - Update subscription
  - Create invoice
  - Handle webhooks

### Email Services

#### SendGrid
- **Node**: SendGrid node
- **Credentials**: SendGrid API Key
- **Operations**: Send transactional emails
- **Templates**: Portal invites, Alerts, Reports

#### Mailgun (Alternative)
- **Node**: HTTP Request node
- **API**: Mailgun REST API
- **Purpose**: Email delivery

### Database

#### PostgreSQL
- **Node**: Postgres node
- **Credentials**: Database connection string
- **Operations**: Query, Insert, Update, Delete
- **Tables**: Documents, Portals, Users, Subscriptions

---

## Import Instructions

### Step 1: Set Up N8N Instance

1. **Deploy N8N**:
   - Cloud: Sign up at n8n.io
   - Self-hosted: Docker or npm install
   - Recommended: n8n cloud for reliability

2. **Configure Environment Variables**:
   - Go to Settings → Environment Variables
   - Add all required variables (see [Overview](#overview))

3. **Set Up Credentials**:
   - AWS: Add AWS credentials
   - Stripe: Add Stripe API key
   - SendGrid: Add SendGrid API key
   - Database: Add PostgreSQL connection

### Step 2: Import Workflows

1. **Download Workflow Files**:
   - All workflow JSON files are in `/workflows/` directory
   - AI workflows are in `/workflows/ai/` directory

2. **Import to N8N**:
   - Open N8N interface
   - Click "Workflows" → "Import from File"
   - Select the JSON file
   - Click "Import"

3. **Configure Workflow**:
   - Update webhook URLs if needed
   - Verify credentials are connected
   - Test webhook endpoints

4. **Activate Workflow**:
   - Toggle "Active" switch
   - Workflow is now live

### Step 3: Test Workflows

1. **Test Webhooks**:
   - Use Postman or curl to send test payloads
   - Check N8N execution logs
   - Verify API calls succeed

2. **Monitor Executions**:
   - Check N8N execution history
   - Look for errors
   - Fix any credential/configuration issues

### Step 4: Connect to App

1. **Update App Webhook URLs**:
   - In app environment variables, set:
     - `N8N_WEBHOOK_BASE=https://your-n8n-instance.com/webhook`
   - Update API routes to call N8N webhooks

2. **Test End-to-End**:
   - Trigger action in app
   - Verify webhook received in N8N
   - Check workflow execution
   - Confirm API callbacks work

---

## Workflow Documentation

Each workflow has detailed documentation in its respective file. See individual workflow files for:
- Complete node configuration
- Input/output examples
- Error handling
- Testing procedures

---

**Next Steps**: 
1. Import all core workflows
2. Import AI workflows
3. Configure credentials
4. Test each workflow
5. Connect to production app

**Questions?** Refer to individual workflow documentation or contact the engineering team.

**Last Updated**: [Current Date]

