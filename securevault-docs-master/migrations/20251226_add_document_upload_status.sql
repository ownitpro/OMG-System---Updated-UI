-- Migration: Add uploadStatus column to Document table
-- This enables "pending" state for documents during AI analysis
-- Documents with uploadStatus='pending' are hidden from the vault view
-- until the user confirms or cancels the upload

-- Add the uploadStatus column with default 'confirmed' for existing documents
ALTER TABLE securevault."Document"
ADD COLUMN IF NOT EXISTS "uploadStatus" VARCHAR(20) DEFAULT 'confirmed';

-- Update any NULL values to 'confirmed' (existing documents)
UPDATE securevault."Document"
SET "uploadStatus" = 'confirmed'
WHERE "uploadStatus" IS NULL;

-- Add an index for filtering by uploadStatus (commonly queried)
CREATE INDEX IF NOT EXISTS "idx_document_upload_status"
ON securevault."Document" ("uploadStatus");

-- Note: Valid values are 'pending' and 'confirmed'
-- 'pending' = Document uploaded but awaiting user confirmation
-- 'confirmed' = Document confirmed by user (visible in vault)
