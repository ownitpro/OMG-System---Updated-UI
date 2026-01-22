// src/app/api/setup-db/route.ts
// Database health check and schema verification for Aurora PostgreSQL

import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  const results: string[] = []

  try {
    // Test database connection
    const testData = await query('SELECT 1 as test')

    results.push('Aurora PostgreSQL connection successful')

    // Check which schemas exist
    const schemas = await query(`
      SELECT schema_name
      FROM information_schema.schemata
      WHERE schema_name IN ('core', 'hub', 'securevault')
      ORDER BY schema_name
    `)

    const schemaList = schemas?.map((s: any) => s.schema_name) || []
    results.push(`Found schemas: ${schemaList.join(', ') || 'none'}`)

    // Check required schemas
    const requiredSchemas = ['core', 'hub', 'securevault']
    const missingSchemas = requiredSchemas.filter(s => !schemaList.includes(s))

    if (missingSchemas.length > 0) {
      results.push(`Missing schemas: ${missingSchemas.join(', ')}`)
      results.push('')
      results.push('Run this SQL to create missing schemas:')
      missingSchemas.forEach(s => results.push(`CREATE SCHEMA IF NOT EXISTS ${s};`))
    }

    // Check core.User table
    const userTable = await query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'core' AND table_name = 'User'
      ORDER BY ordinal_position
    `)

    if (!userTable || userTable.length === 0) {
      results.push('core.User table not found - schema may need initialization')
    } else {
      const columns = userTable.map((c: any) => c.column_name)
      results.push(`core.User columns: ${columns.join(', ')}`)
    }

    // Check hub.Subscription table
    const subTable = await query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'hub' AND table_name = 'Subscription'
      ORDER BY ordinal_position
    `)

    if (!subTable || subTable.length === 0) {
      results.push('hub.Subscription table not found')
    } else {
      const columns = subTable.map((c: any) => c.column_name)
      results.push(`hub.Subscription columns: ${columns.join(', ')}`)
    }

    // Check securevault.Document table
    const docTable = await query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'securevault' AND table_name = 'Document'
      ORDER BY ordinal_position
    `)

    if (!docTable || docTable.length === 0) {
      results.push('securevault.Document table not found')
    } else {
      const columns = docTable.map((c: any) => c.column_name)
      results.push(`securevault.Document columns: ${columns.join(', ')}`)
    }

    return NextResponse.json({
      status: 'ok',
      database: 'Aurora PostgreSQL',
      results
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Database check failed',
      details: error.message
    }, { status: 500 })
  }
}
