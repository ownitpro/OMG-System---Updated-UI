// API route to get uploads for the authenticated client (not admin)
import { NextRequest, NextResponse } from 'next/server';
import { requirePortalAuth } from '@/lib/portalAuth';

interface UploadedFile {
  id: string;
  name: string;
  fileSize: number;
  uploadedAt: string;
  folderPath: string[];
}

async function handler(req: NextRequest, session: any, portalId: string) {
  try {
    const { query } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    console.log('[MY-UPLOADS] Fetching uploads for portalId:', portalId);

    // Query strategy: Find all documents that were submitted through this portal
    // by joining PortalSubmission -> PortalRequest -> Document
    // Then build folder paths using recursive CTE
    
    const sql = `
      WITH RECURSIVE FolderPaths AS (
        -- Anchor: Start with folders that have no parent (root folders)
        SELECT 
          id, 
          name, 
          "parentId", 
          "organizationId",
          ARRAY[name] as path
        FROM ${getTableName('Folder')}
        WHERE "parentId" IS NULL
        
        UNION ALL
        
        -- Recursive: Build paths for child folders
        SELECT 
          f.id, 
          f.name, 
          f."parentId",
          f."organizationId",
          fp.path || f.name
        FROM ${getTableName('Folder')} f
        INNER JOIN FolderPaths fp ON f."parentId" = fp.id
      ),
      PortalDocuments AS (
        -- Find all documents submitted through this portal
        SELECT DISTINCT d.id as "documentId"
        FROM ${getTableName('PortalSubmission')} ps
        INNER JOIN ${getTableName('PortalRequest')} pr ON ps."portalRequestId" = pr.id
        INNER JOIN ${getTableName('Document')} d ON ps."documentId" = d.id
        WHERE pr."portalId" = $1
      )
      SELECT 
        d.id,
        d.name,
        d."sizeBytes",
        d."createdAt",
        COALESCE(fp.path, ARRAY['Uploads']) as "folderPath"
      FROM ${getTableName('Document')} d
      INNER JOIN PortalDocuments pd ON d.id = pd."documentId"
      LEFT JOIN FolderPaths fp ON d."folderId" = fp.id
      ORDER BY d."createdAt" DESC
    `;

    const documents = await query<{
      id: string;
      name: string;
      sizeBytes: any;
      createdAt: string;
      folderPath: string[];
    }>(sql, [portalId]);

    console.log(`[MY-UPLOADS] Found ${documents.length} documents for portal`);

    // Map to response format
    const uploads: UploadedFile[] = documents.map(doc => ({
      id: doc.id,
      name: doc.name,
      fileSize: Number(doc.sizeBytes),
      uploadedAt: doc.createdAt,
      folderPath: doc.folderPath || ['Uploads']
    }));

    return NextResponse.json({ uploads });
  } catch (error) {
    console.error('Error fetching portal uploads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch uploads' },
      { status: 500 }
    );
  }
}

export const GET = requirePortalAuth(handler);
