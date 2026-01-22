# Changelog

All notable changes to SecureVault Docs will be documented in this file.

## [2026-01-06] - Document Year Extraction & Portal Query Fixes

### Fixed

- **Portal Query Errors - Critical Database Fix**:
  - Fixed `column "portalId" does not exist` error in PortalSubmission queries
  - Updated `/api/org/[orgId]/portals` GET endpoint to join PortalRequest table to get portalId
  - Updated `/api/org/requests` to join PortalRequest for submissions query
  - Updated `/api/portals/[portalId]` DELETE endpoint to use subquery for deleting submissions
  - PortalSubmission table uses `portalRequestId` (not `portalId`) - queries now properly join through PortalRequest

- **Document Year Extraction for Financial Documents**:
  - Financial/accounting documents now use document year instead of current year for folder organization
  - Added robust date extraction from document content, Textract text, and filenames
  - Enhanced AI prompts to emphasize extracting dates from document content (not filenames)
  - Added fallback date extraction from Textract text using pattern matching
  - Supports multiple date formats including Spanish dates for contracts
  - Documents like tax returns, invoices, receipts, and contracts now organize by their actual year
  - Example: A 2022 tax filing now goes into a 2022 folder, not 2026

### Added

- **Year Extraction System**:
  - `extractDocumentYear()` function with multi-source fallback (AI issueDate → Textract receiptDate → Textract text → filename)
  - `extractDateFromText()` function for pattern-based date extraction from document text
  - `extractYearFromFilename()` function for filename-based year extraction
  - Support for financial, tax, invoice, expense, income categories and legal/employment contracts
  - Enhanced system prompts with detailed date extraction guidance for different document types

- **Improved Date Extraction**:
  - Pattern matching for various date formats (MM/DD/YYYY, YYYY-MM-DD, written dates, Spanish dates)
  - Support for contract date fields: "Effective Date", "Fecha de Inicio", "Fecha de Firma", etc.
  - Better handling of tax year extraction from tax documents
  - Improved instructions for AI to scan entire document for dates

## [2026-01-05] - Portal Upload System Fixes

### Fixed

- **Portal Document Uploads - Critical Database Constraint Fixes**:

  - Fixed `DocumentType` enum validation error by mapping MIME types (`application/pdf`, `image/jpeg`, etc.) to database enum values (`pdf`, `image`, `word`, `excel`, `other`)
  - Added `s3Bucket` column to Document INSERT statements to satisfy NOT NULL constraint
  - Added `uploadedById` column using portal owner's ID (`createdById`) to satisfy NOT NULL constraint
  - Fixed `PortalSubmission` ID generation by adding `gen_random_uuid()` for primary key
  - Fixed `UserNotification` ID generation by adding `gen_random_uuid()` for primary key

- **Portal Request Upload Status Display**:

  - Fixed admin requests view (`/api/org/[orgId]/requests`) to query `PortalSubmission` table and correctly show upload status
  - Updated request status calculation to show `complete`, `in_progress`, or `open` based on uploaded items
  - Added proper submission tracking so "X of Y documents uploaded" displays correctly

- **Client Portal "My Uploads" View**:

  - Rewrote `/api/portal/[portalId]/my-uploads` to use `PortalSubmission` table as source of truth
  - Changed query strategy from folder-name-based to submission-based lookup
  - Uses recursive CTE to build complete folder paths for all uploaded documents
  - Ensures all files uploaded through portal requests appear in client view

- **Upload Persistence**:
  - All uploads now persist to PostgreSQL database instead of in-memory storage
  - Documents survive application restarts and redeployments
  - Proper folder hierarchy maintained in `Folder` and `Document` tables

### Added

- Debug logging throughout upload pipeline for easier troubleshooting
- Comprehensive error handling for database constraint violations

## [Unreleased]

### Changed

- **Audit Logs Relocation**: Moved Audit Logs entirely under Settings
  - Summary page at `/settings/auditlogs` with blue theme
  - Full audit logs page moved from `/portals/audit-logs` to `/settings/auditlogs/all`
  - Removed Audit Logs button from Client Portals quick actions
  - Changed timestamps from relative ("5m ago") to absolute format (mm/dd/yyyy - HH:mm)

### Fixed

- **PU (Page Unit) Tracking**: Fixed critical issue where page counting always defaulted to 1 regardless of actual document pages. PDF page counts now correctly flow through the entire document analysis pipeline:
  - `pdf-converter.ts`: Returns `pageCount` from pdf.js extraction
  - `textract.ts`: Extracts page count from AWS Textract response metadata
  - `analyze/route.ts`: Includes `pageCount` in API response
  - `useDocumentAnalysis.ts`: Passes `pageCount` to result object
  - `UploadDocumentModal.tsx`: Sends `pageCount` to confirm endpoint
  - Added `PdfExtractionResult` interface and `getPdfPageCount()` helper for scanned PDFs

### Performance

- **PDF Document Analysis**: Significantly improved analysis speed by optimizing Textract polling intervals (reduced initial delay from 5s to 1s, poll interval from 3s to 1s)

## [2024-12-XX] - Recent Changes

### Features

- Made PIN mandatory for document request creation
- Improved portal list UI with View Details, Delete buttons and document stats
- Added PIN field to document request creation with no-PIN portal handling
- Added notification system database migrations

### Fixed

- Use NEXT_PUBLIC_APP_URL for share link URL in toast notification
- Improved no-PIN portal detection to handle null, undefined, and empty strings
- Added dark mode scrollbar styling to Create Request modal
- Made ClientPortal query non-fatal with error details
- Portal settings now queries database instead of mock store
- Fixed document request delete button and center modals
- Use direct S3 download for DOCX text extraction
