import { NextRequest, NextResponse } from 'next/server'
import { getOrCreateFolderPath } from '@/lib/ocr/auto-folder-creator'
import type { VaultContext } from '@/types/ocr'

// POST /api/folders/create-path
// Creates a folder path from an array of path segments
// Returns the final folder ID
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pathSegments, vaultContext, personalVaultId, organizationId } = body

    // Validate required fields
    if (!pathSegments || !Array.isArray(pathSegments) || pathSegments.length === 0) {
      return NextResponse.json(
        { error: 'pathSegments array is required' },
        { status: 400 }
      )
    }

    if (!vaultContext || !['personal', 'organization'].includes(vaultContext)) {
      return NextResponse.json(
        { error: 'Invalid vaultContext. Must be "personal" or "organization"' },
        { status: 400 }
      )
    }

    if (vaultContext === 'personal' && !personalVaultId) {
      return NextResponse.json(
        { error: 'personalVaultId is required for personal vault context' },
        { status: 400 }
      )
    }

    if (vaultContext === 'organization' && !organizationId) {
      return NextResponse.json(
        { error: 'organizationId is required for organization vault context' },
        { status: 400 }
      )
    }

    console.log('[CREATE-PATH] Creating folder path:', pathSegments.join('/'))

    // Create folder path using the auto-folder-creator
    const result = await getOrCreateFolderPath(pathSegments, {
      vaultContext: vaultContext as VaultContext,
      personalVaultId,
      organizationId,
    })

    console.log('[CREATE-PATH] Result:', {
      folderId: result.id,
      path: result.path,
      created: result.created,
    })

    return NextResponse.json({
      success: true,
      folder: result,
    })
  } catch (error: any) {
    console.error('[CREATE-PATH] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create folder path' },
      { status: 500 }
    )
  }
}
