-- Migration: Create GoldSetExample table for AI learning
-- Part of AI Analysis Improvements (Phase 4)
-- This table stores correctly classified document examples to improve future classifications
-- Database: Aurora PostgreSQL (securevault schema)

-- Create the table in the securevault schema
CREATE TABLE IF NOT EXISTS securevault."GoldSetExample" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(50) NOT NULL,
  subtype VARCHAR(100),
  "textSample" TEXT NOT NULL,
  "folderPath" TEXT NOT NULL,
  source VARCHAR(50) DEFAULT 'user_correction',
  "organizationId" UUID REFERENCES core."Organization"(id) ON DELETE CASCADE,
  "userId" UUID NOT NULL REFERENCES core."User"(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_gold_set_category ON securevault."GoldSetExample"(category);
CREATE INDEX IF NOT EXISTS idx_gold_set_org ON securevault."GoldSetExample"("organizationId");
CREATE INDEX IF NOT EXISTS idx_gold_set_user ON securevault."GoldSetExample"("userId");

-- Comments
COMMENT ON TABLE securevault."GoldSetExample" IS 'Gold set examples for AI classification learning. Stores correctly classified documents to improve future predictions.';
COMMENT ON COLUMN securevault."GoldSetExample".category IS 'Document category (identity, financial, tax, etc.)';
COMMENT ON COLUMN securevault."GoldSetExample".subtype IS 'Document subtype (drivers_license, bank_statement, etc.)';
COMMENT ON COLUMN securevault."GoldSetExample"."textSample" IS 'First 500 characters of OCR text for similarity matching';
COMMENT ON COLUMN securevault."GoldSetExample"."folderPath" IS 'Folder path where document was placed';
COMMENT ON COLUMN securevault."GoldSetExample".source IS 'How this example was added: user_correction, seed, or admin';
