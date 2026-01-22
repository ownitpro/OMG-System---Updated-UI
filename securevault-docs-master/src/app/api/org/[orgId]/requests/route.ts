// src/app/api/org/[orgId]/requests/route.ts

import { NextResponse } from "next/server";
import type { RequestTemplateItem } from "@/data/request-templates";
import { getFolderNameForDocumentType, normalizeFolderName } from "@/lib/documentFolderMapping";

type Params = { params: Promise<{ orgId: string }> };

export async function GET(req: Request, { params }: Params) {
  const { query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { orgId } = await params;

  try {
    // Fetch portal requests from database with JOIN to Portal table
    const requests = await query(
      `SELECT pr.*, p.id as "portalId", p."organizationId", p."clientName", p."clientEmail"
       FROM ${getTableName('PortalRequest')} pr
       INNER JOIN ${getTableName('Portal')} p ON pr."portalId" = p.id
       WHERE p."organizationId" = $1
       ORDER BY pr."createdAt" DESC`,
      [orgId]
    );

    // Fetch all submissions for these requests
    const requestIds = (requests || []).map((r: any) => r.id);
    let submissions: any[] = [];
    
    if (requestIds.length > 0) {
      const placeholders = requestIds.map((_, i) => `$${i + 1}`).join(', ');
      submissions = await query(
        `SELECT "portalRequestId", status FROM ${getTableName('PortalSubmission')} WHERE "portalRequestId" IN (${placeholders})`,
        requestIds
      ) || [];
    }

    const submissionMap = new Map(submissions.map((s: any) => [s.portalRequestId, s.status]));

    // Group requests by portalId and create mockDb-compatible format
    const groupedRequests: any = {};

    (requests || []).forEach((req: any) => {
      const key = `${req.portalId}_${req.createdAt}`;
      if (!groupedRequests[key]) {
        groupedRequests[key] = {
          id: req.id,
          orgId,
          portalId: req.portalId,
          templateKey: 'custom', // We don't store this in DB
          items: [],
          dueAt: null,
          status: 'open',
          createdAt: req.createdAt,
          title: 'Document Request',
          clientName: req.clientName || req.clientEmail,
        };
      }

      const isUploaded = submissionMap.has(req.id);
      groupedRequests[key].items.push({
        key: req.id,
        label: req.title,
        required: req.required,
        uploaded: isUploaded,
      });
    });

    // Update overall status based on items
    const enhancedRequests = Object.values(groupedRequests).map((request: any) => {
      const allUploaded = request.items.every((item: any) => item.uploaded);
      const someUploaded = request.items.some((item: any) => item.uploaded);
      
      return {
        ...request,
        status: allUploaded ? 'complete' : someUploaded ? 'in_progress' : 'open',
      };
    });

    return NextResponse.json({ requests: enhancedRequests });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: Params) {
  const { query, queryOne } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { randomUUID } = await import('crypto');
  const { orgId } = await params;
  const body = await req.json().catch(() => ({} as any));
  const items: RequestTemplateItem[] = body.items || [];

  if (!body.portalId) {
    return NextResponse.json({ error: 'Portal ID is required' }, { status: 400 });
  }

  try {
    // Step 1: Verify portal exists and get client name
    const portal = await queryOne(
      `SELECT id, "clientName", "clientEmail", "organizationId"
       FROM ${getTableName('Portal')}
       WHERE id = $1`,
      [body.portalId]
    );

    if (!portal) {
      return NextResponse.json({ error: 'Portal not found' }, { status: 404 });
    }

    const clientName = portal.clientName || portal.clientEmail.split('@')[0];

    // Step 2: Verify organization exists in database
    const orgData = await queryOne(
      `SELECT id FROM ${getTableName('Organization')} WHERE id = $1`,
      [orgId]
    );

    let clientFolderId = undefined;

    if (orgData) {
      // Step 3: Create or find the client's root folder
      const clientFolderName = normalizeFolderName(clientName);

      // Check if client folder already exists
      const existingFolders = await query(
        `SELECT * FROM ${getTableName('Folder')}
         WHERE "organizationId" = $1 AND name = $2 AND "parentId" IS NULL`,
        [orgId, clientFolderName]
      );

      let clientFolder;
      if (existingFolders && existingFolders.length > 0) {
        clientFolder = existingFolders[0];
        console.log(`Using existing client folder: ${clientFolder.id}`);
      } else {
        // Create the client's root folder
        const folderId = randomUUID();
        clientFolder = await queryOne(
          `INSERT INTO ${getTableName('Folder')} (id, name, "organizationId", "parentId")
           VALUES ($1, $2, $3, NULL)
           RETURNING *`,
          [folderId, clientFolderName, orgId]
        );

        if (!clientFolder) {
          throw new Error('Failed to create client folder');
        }

        console.log(`Created new client folder: ${clientFolder.id}`);
      }

      clientFolderId = clientFolder.id;

      // Step 4: Create subfolders and portal requests for each item
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const folderName = getFolderNameForDocumentType(item.key);

        // Check if subfolder already exists
        const existingSubfolders = await query(
          `SELECT * FROM ${getTableName('Folder')}
           WHERE "organizationId" = $1 AND name = $2 AND "parentId" = $3`,
          [orgId, folderName, clientFolder.id]
        );

        let subfolder;
        if (existingSubfolders && existingSubfolders.length > 0) {
          subfolder = existingSubfolders[0];
          console.log(`Using existing subfolder: ${subfolder.id} (${folderName})`);
        } else {
          // Create the subfolder
          const subfolderId = randomUUID();
          subfolder = await queryOne(
            `INSERT INTO ${getTableName('Folder')} (id, name, "organizationId", "parentId")
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [subfolderId, folderName, orgId, clientFolder.id]
          );

          if (!subfolder) {
            throw new Error(`Failed to create subfolder: ${folderName}`);
          }

          console.log(`Created new subfolder: ${subfolder.id} (${folderName})`);
        }

        // Insert the portal request
        const requestId = randomUUID();
        await query(
          `INSERT INTO ${getTableName('PortalRequest')} (id, "portalId", title, description, required, "order")
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [requestId, body.portalId, item.label, null, item.required ?? true, i]
        );
      }
    } else {
      // Organization not in database, just create portal requests without folders
      console.warn(`Organization ${orgId} not found in database. Creating requests without folders.`);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const requestId = randomUUID();

        await query(
          `INSERT INTO ${getTableName('PortalRequest')} (id, "portalId", title, description, required, "order")
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [requestId, body.portalId, item.label, null, item.required ?? true, i]
        );
      }
    }

    // Send Request Created email to client
    if (portal.clientEmail && items.length > 0) {
      try {
        const { sendRequestCreatedEmail } = await import('@/lib/email');

        // Get organization name
        const org = await queryOne(
          `SELECT name FROM ${getTableName('Organization')} WHERE id = $1`,
          [orgId]
        );
        const orgName = org?.name || 'Your Business';

        // Build portal URL
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const portalUrl = `${baseUrl}/portal/${body.portalId}`;

        await sendRequestCreatedEmail({
          clientEmail: portal.clientEmail,
          clientName,
          orgName,
          items: items.map(item => ({ label: item.label, required: item.required ?? true })),
          portalUrl,
          dueDate: body.dueAt || null,
          organizationId: orgId,
        });

        console.log('[REQUEST API] Request created email sent to:', portal.clientEmail);
      } catch (emailError) {
        // Don't fail the request creation if email fails
        console.error('[REQUEST API] Failed to send request email:', emailError);
      }
    }

    return NextResponse.json({
      id: body.portalId,
      clientFolderId,
      message: `Request created for ${clientName}`,
    });
  } catch (error: any) {
    console.error('Error in POST /api/org/[orgId]/requests:', error);
    return NextResponse.json({
      error: error.message || 'Failed to create request'
    }, { status: 500 });
  }
}
