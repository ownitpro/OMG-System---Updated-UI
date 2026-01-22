import { NextRequest, NextResponse } from 'next/server';
import { db, PortalSubmission, cuid } from '@/lib/portal-db';
import { requirePortalAuth, validators } from '@/lib/portalAuth';
import { sendClientUploadNotificationEmail, sendUploadConfirmationEmail } from '@/lib/email';
import { randomUUID } from 'crypto';

type Props = {
  params: Promise<{ portalId: string }>;
};

function now() {
  return new Date().toISOString();
}

// Helper to detect MIME type from filename
function detectMimeType(fileName: string): string {
  const ext = fileName.toLowerCase().split('.').pop();
  const mimeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    zip: 'application/zip',
    txt: 'text/plain',
    csv: 'text/csv',
  };
  return mimeTypes[ext || ''] || 'application/octet-stream';
}

// Helper to map MIME type to DocumentType enum
function mapToDocumentType(mimeType: string): string {
  if (mimeType.includes('pdf')) return 'pdf';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.includes('word') || mimeType.includes('document')) return 'word';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'excel';
  return 'other';
}

type QueryFunc = <T = any>(text: string, params?: any[]) => Promise<T[]>;
type QueryOneFunc = <T = any>(text: string, params?: any[]) => Promise<T | null>;

// Helper to create or find a folder path hierarchy
async function createOrFindFolderPath(
  query: QueryFunc,
  queryOne: QueryOneFunc,
  getTableName: (name: string) => string,
  orgId: string,
  folderPath: string[]
): Promise<string | null> {
  if (folderPath.length === 0) return null;

  let parentId: string | null = null;
  let currentFolderId: string | null = null;

  for (const folderName of folderPath) {
    // Try to find existing folder
    const existingFolder: { id: string } | null = await queryOne<{ id: string }>(
      parentId
        ? `SELECT id FROM ${getTableName('Folder')}
           WHERE "organizationId" = $1 AND name = $2 AND "parentId" = $3`
        : `SELECT id FROM ${getTableName('Folder')}
           WHERE "organizationId" = $1 AND name = $2 AND "parentId" IS NULL`,
      parentId ? [orgId, folderName, parentId] : [orgId, folderName]
    );

    if (existingFolder) {
      currentFolderId = existingFolder.id;
    } else {
      // Create new folder
      const folderId = randomUUID();
      const newFolder: { id: string } | null = await queryOne<{ id: string }>(
        `INSERT INTO ${getTableName('Folder')}
         (id, name, "organizationId", "parentId", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         RETURNING id`,
        [folderId, folderName, orgId, parentId]
      );

      if (newFolder) {
        currentFolderId = newFolder.id;
        console.log('[SUBMIT] Created smart folder:', folderName, 'with id:', currentFolderId);
      } else {
        console.error('[SUBMIT] Failed to create folder:', folderName);
        return null;
      }
    }

    parentId = currentFolderId;
  }

  return currentFolderId;
}

interface PortalRequestWithOrg {
  id: string;
  portalId: string;
  organizationId: string;
  clientName: string | null;
  label: string;
}

interface PortalOrg {
  organizationId: string;
  clientName: string | null;
}

interface PortalWithCreator {
  id: string;
  name: string;
  organizationId: string | null;
  createdById: string;
  clientName: string | null;
  clientEmail: string | null;
}

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
}

interface FolderRecord {
  id: string;
}

// AI Analysis data from the upload page
interface AIAnalysisData {
  category: string;
  subtype: string;
  confidence: number;
  suggestedFolderPath: string[];
  expirationDate: string | null;
}

async function handler(req: NextRequest, session: any, portalId: string) {
  try {
    const { query, queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const { fileName, originalFileName, bytes, requestId, itemKey, fileKey, purpose, aiAnalysis } = await req.json() as {
      fileName: string;
      originalFileName?: string;
      bytes: number;
      requestId?: string;
      itemKey?: string;
      fileKey?: string;
      purpose?: string;
      aiAnalysis?: AIAnalysisData;
    };

    // Validate file name
    const fileNameValidation = validators.fileName(fileName);
    if (!fileNameValidation.valid) {
      return NextResponse.json(
        { ok: false, error: fileNameValidation.error },
        { status: 400 }
      );
    }

    // Validate file size
    const fileSizeValidation = validators.fileSize(bytes);
    if (!fileSizeValidation.valid) {
      return NextResponse.json(
        { ok: false, error: fileSizeValidation.error },
        { status: 400 }
      );
    }

    // Sanitize purpose field if provided
    let sanitizedPurpose = '';
    if (purpose) {
      sanitizedPurpose = validators.sanitizeText(purpose, 200);
    }

    let targetFolderId: string | null = null;
    let orgId: string | null = null;
    let finalFolderPath: string[] = ['Uploads', new Date().getFullYear().toString()];

    // If this upload is for a specific request item, handle folder routing
    if (requestId && itemKey) {
      // Fetch the request from database with portal's organizationId
      const portalRequest = await queryOne<PortalRequestWithOrg & { createdById: string }>(
        `SELECT pr.*, p."organizationId", p."clientName", p."createdById"
         FROM ${getTableName('PortalRequest')} pr
         INNER JOIN ${getTableName('Portal')} p ON pr."portalId" = p.id
         WHERE pr.id = $1`,
        [requestId]
      );

      if (!portalRequest) {
        return NextResponse.json(
          { ok: false, error: 'Request not found' },
          { status: 404 }
        );
      }

      // Verify the request belongs to this portal
      if (portalRequest.portalId !== portalId) {
        return NextResponse.json(
          { ok: false, error: 'Unauthorized' },
          { status: 403 }
        );
      }

      // Note: In the new schema, each PortalRequest is a single item, not a collection
      // So requestId corresponds directly to the portal request item
      orgId = portalRequest.organizationId;
      
      // Fix: Create specific folder for this request
      if (orgId) {
        const clientName = portalRequest.clientName || 'Client';
        const requestLabel = portalRequest.label || 'Requested Document';
        
        // Format: [Client Name] / Requests / [Request Label]
        const requestFolderPath = [clientName, 'Requests', requestLabel];
        finalFolderPath = requestFolderPath;
        
        try {
          targetFolderId = await createOrFindFolderPath(query, queryOne, getTableName, orgId, requestFolderPath);
          console.log('[SUBMIT] Request upload - created/found folder:', requestFolderPath.join('/'), 'ID:', targetFolderId);
        } catch (err) {
          console.error('[SUBMIT] Failed to create request folder path:', err);
        }
      }

      let newDocId: string | null = null;
      const s3Bucket = process.env.S3_BUCKET || 'securevault-documents';

      // Create document in the target folder (if folder exists)
      if (targetFolderId && orgId) {
        try {
          const mimeType = detectMimeType(fileName);
          const docType = mapToDocumentType(mimeType);
          const newDoc = await queryOne<{ id: string }>(
            `INSERT INTO ${getTableName('Document')}
             (id, name, "folderId", "organizationId", "sizeBytes", "s3Key", "s3Bucket", type, "uploadedById", "createdAt", "updatedAt")
             VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
             RETURNING id`,
            [
              fileName,
              targetFolderId,
              orgId,
              bytes,
              fileKey || `mock/${portalId}/${fileName}`,
              s3Bucket,
              docType,
              portalRequest.createdById
            ]
          );
          if (newDoc) {
            newDocId = newDoc.id;
          }
        } catch (docInsertError) {
          console.error('Error inserting document:', docInsertError);
          // Don't fail the request, but log the error
        }
      }

      // Create PortalSubmission record in database to mark as uploaded
      if (newDocId) {
        console.log('[SUBMIT] Creating PortalSubmission for requestId:', requestId, 'documentId:', newDocId);
        try {
          await query(
            `INSERT INTO ${getTableName('PortalSubmission')}
             (id, "portalRequestId", "documentId", status, "createdAt")
             VALUES (gen_random_uuid(), $1, $2, $3, NOW())`,
            [
              requestId,
              newDocId, // Use real document ID
              'submitted'
            ]
          );
          console.log('[SUBMIT] PortalSubmission created successfully');
        } catch (submissionError) {
          console.error('[SUBMIT] Error creating portal submission:', submissionError);
        }
      } else {
        console.error('[SUBMIT] Cannot create submission: Document ID missing');
      }
    } else if (sanitizedPurpose || aiAnalysis) {
      // Handle general upload with purpose field and/or AI analysis
      // Get portal to find the org
      const portal = await queryOne<PortalOrg & { createdById: string }>(
        `SELECT "organizationId", "clientName", "createdById" FROM ${getTableName('Portal')} WHERE id = $1`,
        [portalId]
      );

      if (portal) {
        orgId = portal.organizationId;
        const clientName = portal.clientName || 'Client';

        // Use AI-suggested folder path if available, otherwise use purpose
        let folderPath: string[] = [];
        let subPath: string[] = [];

        if (aiAnalysis?.suggestedFolderPath && aiAnalysis.suggestedFolderPath.length > 0) {
          // Use AI-suggested smart folder path
          subPath = aiAnalysis.suggestedFolderPath;
          console.log('[SUBMIT] Using AI-suggested folder subpath:', subPath.join('/'));
        } else if (sanitizedPurpose) {
          // Fallback to purpose-based folder
          const folderName = sanitizedPurpose.trim().split(/\s+/).slice(0, 3).join(' ');
          subPath = [folderName];
        } else {
          // Default fallback
          subPath = ['Uploads', new Date().getFullYear().toString()];
        }
        
        // Prepend client name to folder path
        folderPath = [clientName, ...subPath];
        finalFolderPath = folderPath;

        // Create or find the folder hierarchy
        try {
          targetFolderId = await createOrFindFolderPath(query, queryOne, getTableName, orgId, folderPath);

          // Detect mime type from filename
          const mimeType = detectMimeType(fileName);
          const docType = mapToDocumentType(mimeType);
          const s3Bucket = process.env.S3_BUCKET || 'securevault-documents';

          // Create document in the folder
          if (targetFolderId) {
            await query(
              `INSERT INTO ${getTableName('Document')}
               (id, name, "folderId", "organizationId", "sizeBytes", "s3Key", "s3Bucket", type, "uploadedById", "createdAt", "updatedAt")
               VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())`,
              [
                fileName,
                targetFolderId,
                orgId,
                bytes,
                fileKey || `mock/${portalId}/${fileName}`,
                s3Bucket,
                docType,
                portal.createdById
              ]
            );
            console.log('[SUBMIT] Document created in folder:', targetFolderId, 'with category:', aiAnalysis?.category);
          }
        } catch (err) {
          console.error('Error handling general upload folder:', err);
        }
      }
    } else {
      return NextResponse.json(
        { ok: false, error: 'Either requestId/itemKey or purpose is required' },
        { status: 400 }
      );
    }

    // Create submission record
    const s: PortalSubmission = {
      id: cuid('s_'),
      portalId,
      requestId: requestId || null,
      itemKey: itemKey || null,
      folderId: targetFolderId,
      folderPath: finalFolderPath, // Store the folder path for display
      fileKey: fileKey || `mock/${portalId}/${fileName}`,
      fileName,
      bytes,
      ocrStatus: 'pending',
      createdAt: now(),
    };

    db.submissions.set(s.id, s);
    console.log('[SUBMIT] Stored submission:', s.id, 'for portal:', portalId);
    console.log('[SUBMIT] Folder path:', finalFolderPath);
    console.log('[SUBMIT] Total submissions now:', db.submissions.size);

    // Send in-app bell notification AND email notification to admin(s)
    try {
      // Fetch portal details with creator info
      const portalDetails = await queryOne<PortalWithCreator>(
        `SELECT id, name, "organizationId", "createdById", "clientName", "clientEmail"
         FROM ${getTableName('Portal')} WHERE id = $1`,
        [portalId]
      );

      if (portalDetails) {
        const adminsToNotify: AdminUser[] = [];

        // Get the portal creator
        const creator = await queryOne<AdminUser>(
          `SELECT id, email, name FROM ${getTableName('User')} WHERE id = $1`,
          [portalDetails.createdById]
        );
        if (creator) {
          adminsToNotify.push(creator);
        }

        // If portal belongs to an organization, also notify org admins
        if (portalDetails.organizationId) {
          const orgAdmins = await query<AdminUser>(
            `SELECT u.id, u.email, u.name
             FROM ${getTableName('User')} u
             INNER JOIN ${getTableName('OrganizationMember')} om ON u.id = om."userId"
             WHERE om."organizationId" = $1 AND om.role IN ('owner', 'admin')
             AND u.id != $2
             LIMIT 5`,
            [portalDetails.organizationId, portalDetails.createdById]
          );
          adminsToNotify.push(...orgAdmins);
        }

        // Format file size for display
        const formatFileSize = (b: number): string => {
          if (!b || b === 0) return '0 B';
          const k = 1024;
          const sizes = ['B', 'KB', 'MB', 'GB'];
          const i = Math.min(Math.floor(Math.log(b) / Math.log(k)), sizes.length - 1);
          return `${(b / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
        };

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const viewUrl = `${baseUrl}/dashboard/client-uploads`;

        // Determine folder path for notification message
        const folderPathDisplay = finalFolderPath.join('/') || 'Uploads';
        const clientName = session?.clientName || portalDetails.clientName || 'Client';

        // Create in-app (bell) notifications for each admin
        const bellNotificationPromises = adminsToNotify.map(async (admin) => {
          try {
            await query(
              `INSERT INTO ${getTableName('UserNotification')} (id, "userId", "type", "title", "message", "createdAt")
               VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW())`,
              [
                admin.id,
                'client_upload',
                `${clientName} uploaded "${fileName}"`,
                `${clientName} uploaded "${fileName}" to ${folderPathDisplay} in ${portalDetails.name}`
              ]
            );
          } catch (bellErr) {
            console.error(`Failed to create bell notification for ${admin.id}:`, bellErr);
          }
        });

        await Promise.all(bellNotificationPromises);
        console.log(`[SUBMIT] Created bell notifications for ${adminsToNotify.length} admins`);

        // Send email to each admin (in parallel)
        const emailPromises = adminsToNotify.map((admin) =>
          sendClientUploadNotificationEmail({
            adminEmail: admin.email,
            adminName: admin.name || 'Admin',
            clientName: clientName,
            clientEmail: session?.clientEmail || portalDetails.clientEmail || 'Unknown',
            fileName,
            fileSize: formatFileSize(bytes),
            portalName: portalDetails.name,
            uploadDate: new Date(),
            viewUrl,
            organizationId: portalDetails.organizationId || undefined,
          }).catch((err) => {
            console.error(`Failed to send email to ${admin.email}:`, err);
            return { ok: false, error: String(err) };
          })
        );

        await Promise.all(emailPromises);
      }
    } catch (emailError) {
      // Don't fail the upload if notification fails
      console.error('Error sending upload notification:', emailError);
    }

    // Send upload confirmation email to client
    try {
      const portalForConfirmation = await queryOne<PortalWithCreator>(
        `SELECT id, name, "organizationId", "createdById", "clientName", "clientEmail"
         FROM ${getTableName('Portal')} WHERE id = $1`,
        [portalId]
      );

      if (portalForConfirmation?.clientEmail) {
        // Get organization name
        let orgName = 'Your Business';
        if (portalForConfirmation.organizationId) {
          const org = await queryOne<{ name: string }>(
            `SELECT name FROM ${getTableName('Organization')} WHERE id = $1`,
            [portalForConfirmation.organizationId]
          );
          if (org?.name) orgName = org.name;
        }

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const portalUrl = `${baseUrl}/portal/${portalId}`;

        await sendUploadConfirmationEmail({
          clientEmail: portalForConfirmation.clientEmail!,
          clientName: session?.clientName || portalForConfirmation.clientName || 'Client',
          fileName,
          portalUrl,
          orgName,
          organizationId: portalForConfirmation.organizationId || undefined,
        });

        console.log('[SUBMIT] Upload confirmation email sent to:', portalForConfirmation.clientEmail);
      }
    } catch (confirmEmailError) {
      // Don't fail the upload if email fails
      console.error('Error sending upload confirmation email:', confirmEmailError);
    }

    return NextResponse.json({ ok: true, submission: s });
  } catch (error) {
    console.error('Error submitting file:', error);
    return NextResponse.json({ ok: false, error: 'Failed to submit file' }, { status: 500 });
  }
}

export const POST = requirePortalAuth(handler);
