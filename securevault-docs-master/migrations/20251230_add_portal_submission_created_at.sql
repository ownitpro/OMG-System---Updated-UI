-- Migration: Add createdAt column to PortalSubmission table
-- Date: 2025-12-30
-- Purpose: Track when submissions were created for analytics

-- Add createdAt column with default of NOW() for existing records
ALTER TABLE securevault."PortalSubmission"
ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add index for efficient date-based queries
CREATE INDEX IF NOT EXISTS idx_portal_submission_created_at
ON securevault."PortalSubmission" ("createdAt");
