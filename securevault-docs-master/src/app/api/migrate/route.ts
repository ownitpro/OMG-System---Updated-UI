import { NextResponse } from 'next/server'
import { Pool } from 'pg'

export async function POST() {
  const results: string[] = []

  // Create a direct pool connection for migrations
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false },
  })

  try {
    // Test connection first
    try {
      await pool.query('SELECT 1')
      results.push('Database connection successful')
    } catch (connErr: any) {
      return NextResponse.json({
        error: 'Database connection failed',
        details: connErr.message,
        hint: 'Check DATABASE_URL environment variable'
      }, { status: 500 })
    }

    // Migration 1: Add accountType column to core.User
    try {
      await pool.query(`
        ALTER TABLE core."User"
        ADD COLUMN IF NOT EXISTS "accountType" VARCHAR(20) DEFAULT 'personal'
      `)
      results.push('Added accountType column to core.User (or already exists)')
    } catch (e: any) {
      if (e.message?.includes('already exists')) {
        results.push('accountType column already exists')
      } else {
        results.push(`accountType migration error: ${e.message}`)
      }
    }

    // Migration 2: Ensure UserProfile table exists for personal vaults
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS securevault."UserProfile" (
          "userId" TEXT PRIMARY KEY,
          "storageUsedBytes" BIGINT DEFAULT 0,
          "ocrPagesUsed" INTEGER DEFAULT 0,
          "egressBytesUsed" BIGINT DEFAULT 0,
          "createdAt" TIMESTAMP DEFAULT NOW(),
          "updatedAt" TIMESTAMP DEFAULT NOW()
        )
      `)
      results.push('Ensured UserProfile table exists')
    } catch (e: any) {
      results.push(`UserProfile table: ${e.message}`)
    }

    // Migration 3: Ensure OrganizationProfile table exists
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS securevault."OrganizationProfile" (
          "organizationId" TEXT PRIMARY KEY,
          "storageUsedBytes" BIGINT DEFAULT 0,
          "ocrPagesUsed" INTEGER DEFAULT 0,
          "egressBytesUsed" BIGINT DEFAULT 0,
          "createdAt" TIMESTAMP DEFAULT NOW(),
          "updatedAt" TIMESTAMP DEFAULT NOW()
        )
      `)
      results.push('Ensured OrganizationProfile table exists')
    } catch (e: any) {
      results.push(`OrganizationProfile table: ${e.message}`)
    }

    // Migration 4: Ensure OrganizationInvite table exists
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS core."OrganizationInvite" (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          "organizationId" TEXT NOT NULL,
          email TEXT NOT NULL,
          role TEXT NOT NULL CHECK (role IN ('admin', 'member', 'viewer')),
          "invitedBy" TEXT NOT NULL,
          "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
          "expiresAt" TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
          token TEXT NOT NULL UNIQUE,
          UNIQUE("organizationId", email)
        )
      `)
      results.push('Ensured OrganizationInvite table exists')
    } catch (e: any) {
      results.push(`OrganizationInvite table: ${e.message}`)
    }

    // Migration 5: Add plan column to Organization table
    try {
      await pool.query(`
        ALTER TABLE core."Organization"
        ADD COLUMN IF NOT EXISTS "plan" VARCHAR(50) DEFAULT 'free'
      `)
      results.push('Added plan column to core.Organization (or already exists)')
    } catch (e: any) {
      results.push(`Organization plan column: ${e.message}`)
    }

    // Migration 6: Add slug column to Organization table
    try {
      await pool.query(`
        ALTER TABLE core."Organization"
        ADD COLUMN IF NOT EXISTS "slug" VARCHAR(255)
      `)
      results.push('Added slug column to core.Organization (or already exists)')
    } catch (e: any) {
      results.push(`Organization slug column: ${e.message}`)
    }

    // Migration 7: Add createdAt and updatedAt columns to OrganizationMember
    try {
      await pool.query(`
        ALTER TABLE core."OrganizationMember"
        ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMPTZ DEFAULT NOW()
      `)
      await pool.query(`
        ALTER TABLE core."OrganizationMember"
        ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMPTZ DEFAULT NOW()
      `)
      results.push('Added createdAt/updatedAt columns to OrganizationMember (or already exists)')
    } catch (e: any) {
      results.push(`OrganizationMember timestamp columns: ${e.message}`)
    }

    // Migration 8: Add emailNotificationsEnabled column to User
    try {
      await pool.query(`
        ALTER TABLE core."User"
        ADD COLUMN IF NOT EXISTS "emailNotificationsEnabled" BOOLEAN DEFAULT true
      `)
      results.push('Added emailNotificationsEnabled column to core.User (or already exists)')
    } catch (e: any) {
      results.push(`emailNotificationsEnabled column: ${e.message}`)
    }

    return NextResponse.json({
      success: true,
      message: 'Migrations completed',
      results
    })
  } catch (error: any) {
    console.error('Migration error:', error)
    return NextResponse.json({
      error: error.message,
      results
    }, { status: 500 })
  } finally {
    await pool.end()
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to run migrations',
    migrations: [
      'Add accountType column to core.User',
      'Create UserProfile table',
      'Create OrganizationProfile table',
      'Create OrganizationInvite table'
    ]
  })
}
