// src/app/api/folders/route.ts
// Folder CRUD operations - Aurora PostgreSQL

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const searchParams = request.nextUrl.searchParams
    const personalVaultId = searchParams.get('personalVaultId')
    const organizationId = searchParams.get('organizationId')
    const parentId = searchParams.get('parentId')
    const includeAll = searchParams.get('includeAll') === 'true'

    if (!personalVaultId && !organizationId) {
      return NextResponse.json(
        { error: 'Either personalVaultId or organizationId is required' },
        { status: 400 }
      )
    }

    let sql = `SELECT * FROM ${getTableName('Folder')} WHERE `
    const params: any[] = []
    let paramIndex = 1

    if (personalVaultId) {
      sql += `"personalVaultId" = $${paramIndex++}`
      params.push(personalVaultId)
    } else if (organizationId) {
      sql += `"organizationId" = $${paramIndex++}`
      params.push(organizationId)
    }

    // Filter by parent folder if not including all
    if (!includeAll) {
      if (parentId) {
        sql += ` AND "parentId" = $${paramIndex++}`
        params.push(parentId)
      } else {
        sql += ` AND "parentId" IS NULL`
      }
    }

    sql += ` ORDER BY name ASC`

    const folders = await query(sql, params)

    return NextResponse.json({ folders })
  } catch (error: any) {
    console.error('Error in GET /api/folders:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')
    const { randomUUID } = await import('crypto')

    const body = await request.json()
    const { name, personalVaultId, organizationId, parentId } = body

    console.log('Creating folder with:', { name, personalVaultId, organizationId, parentId })

    if (!name) {
      return NextResponse.json({ error: 'Folder name is required' }, { status: 400 })
    }

    if (!personalVaultId && !organizationId) {
      return NextResponse.json(
        { error: 'Either personalVaultId or organizationId is required' },
        { status: 400 }
      )
    }

    const folderId = randomUUID()
    const folder = await queryOne(
      `INSERT INTO ${getTableName('Folder')} (id, name, "personalVaultId", "organizationId", "parentId", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING *`,
      [folderId, name, personalVaultId || null, organizationId || null, parentId || null]
    )

    console.log('Folder created successfully:', folder)
    return NextResponse.json({ folder }, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST /api/folders:', error)
    return NextResponse.json({
      error: error.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}
