# Classification Labels

Shared label taxonomy used by templates and classification workflows.

## Tax Labels

| Label | Description | Use Case |
|-------|-------------|----------|
| `T1` | T1 General Income Tax Return | Personal tax filing |
| `T2` | T2 Corporation Income Tax Return | Business tax filing |
| `T3` | T3 Trust Income Tax Return | Trust tax filing |
| `T4` | T4 Statement of Remuneration Paid | Employment income |
| `T5` | T5 Statement of Investment Income | Investment income |
| `GST/HST` | Goods and Services Tax / Harmonized Sales Tax | Sales tax returns |
| `CRA` | Canada Revenue Agency correspondence | Government communications |

## Financial Labels

| Label | Description | Use Case |
|-------|-------------|----------|
| `Invoice` | Vendor invoices | Accounts payable |
| `Receipt` | Purchase receipts | Expense tracking |
| `Statement` | Bank/credit card statements | Financial records |
| `Payroll` | Payroll documents | HR/accounting |
| `Bookkeeping` | General bookkeeping documents | Accounting |
| `Banking` | Bank documents | Financial records |

## Legal Labels

| Label | Description | Use Case |
|-------|-------------|----------|
| `Contract` | Legal contracts | Legal documents |
| `Agreement` | Legal agreements | Legal documents |
| `NDA` | Non-disclosure agreements | Legal documents |
| `License` | Business licenses | Compliance |
| `Certificate` | Certificates (incorporation, etc.) | Compliance |

## Personal Labels

| Label | Description | Use Case |
|-------|-------------|----------|
| `ID` | Identification documents | Personal records |
| `Passport` | Passport documents | Personal records |
| `Insurance` | Insurance documents | Personal records |
| `Medical` | Medical records | Personal records |
| `Education` | Educational documents | Personal records |

## Business Labels

| Label | Description | Use Case |
|-------|-------------|----------|
| `Incorporation` | Incorporation documents | Business setup |
| `Annual Return` | Annual return filings | Compliance |
| `Shareholder` | Shareholder documents | Corporate records |
| `Board Meeting` | Board meeting minutes | Corporate governance |
| `Financial Statement` | Financial statements | Accounting |

## Document Types

| Label | Description | Use Case |
|-------|-------------|----------|
| `PDF` | PDF documents | General |
| `Image` | Image files (scans, photos) | General |
| `Spreadsheet` | Excel/CSV files | Data files |
| `Word` | Word documents | General |
| `Email` | Email attachments | Communication |

## Status Labels

| Label | Description | Use Case |
|-------|-------------|----------|
| `Draft` | Draft documents | Work in progress |
| `Final` | Final documents | Completed |
| `Archived` | Archived documents | Long-term storage |
| `Pending Review` | Pending review | Workflow |
| `Approved` | Approved documents | Workflow |

## Usage Notes

- Labels are case-sensitive
- Multiple labels can be applied to a single document
- Labels are used for:
  - Template organization (see `templates_catalog.json`)
  - Classification workflows
  - Search and filtering in the app
  - Folder organization suggestions

## Adding New Labels

When adding new labels:
1. Add to this taxonomy
2. Update relevant templates in `templates_catalog.json`
3. Update classification workflows if needed
4. Document in app UI if user-facing

