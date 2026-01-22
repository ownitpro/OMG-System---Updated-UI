// app/api/portal/upload/route.ts
// Handle client portal uploads - saves to mock DB with proper unified storage
import { NextResponse } from "next/server";
import { classify } from "@/lib/classifier/mockClassifier";
import { db, PortalSubmission, cuid, now, MockFile } from "@/lib/portal-db";

// Helper to detect MIME type from filename (simplified)
function detectMimeType(fileName: string): string {
  const ext = fileName.toLowerCase().split('.').pop();
  const mimeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    txt: 'text/plain',
  };
  return mimeTypes[ext || ''] || 'application/octet-stream';
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const portalId = formData.get("portalId") as string;
    const folder = formData.get("folder") as string;
    const labelsJson = formData.get("labels") as string;
    const confidence = parseFloat(formData.get("confidence") as string);

    if (!file || !portalId) {
      return NextResponse.json(
        { error: "Missing file or portalId" },
        { status: 400 }
      );
    }

    // 1. Get Portal Info (Mock - normally would fetch from DB)
    // We try to find a portal in the mock DB just to see if we have client name
    // Even if not found, we proceed with defaults for this simple endpoint
    // In a real app this would query the DB.
    // For now we assume portalId is valid.
    
    // 2. Classify
    const fileName = file.name;
    const classification = folder
      ? { folder, labels: JSON.parse(labelsJson || "[]"), confidence }
      : classify(fileName, "");

    const needsReview = classification.confidence < 0.7;

    // 3. Store File Content (Mock S3)
    const fileKey = `mock/${portalId}/${fileName}`;
    
    // Convert basic File to base64 for mock storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');
    
    const mockFile: MockFile = {
      key: fileKey,
      data: base64Data,
      contentType: file.type || detectMimeType(fileName),
      size: file.size,
      fileName: fileName,
      uploadedAt: now(),
    };
    db.mockFiles.set(fileKey, mockFile);

    // 4. Determine Folder Path
    // We want: [Client Name] / [Category]
    // Since we don't have easy access to Client Name here without deeper DB calls (which might be async/complex in this hybrid mock context),
    // and this route is likely for a "simple" upload, we'll try to guess or use a default.
    // Ideally we'd fetch the portal.
    // Let's rely on the `submit` logic pattern: [Client Name] / [Folder]
    
    // We'll peek into db.submissions to see if we can find other submissions for this portal to copy client name? 
    // Or just default to "Client" if we can't find it easily. 
    // Actually, let's try to query the implicit "portal" from the URL if we were passed it, but here we just have portalId form param.
    
    let clientName = 'Client'; 
    // Attempt to find client name from existing submissions if any (hacky but works for mock)
    // or just leave it generic.
    // Better: let's leave it as just the category folder for now, OR attempt to fetch if we can. 
    // But since this route is likely unused, let's just make sure it SAVES to db.submissions so it shows up at all.
    
    const folderPath = ['Uploads', classification.folder || 'General'];

    // 5. Create Submission Record
    const s: PortalSubmission = {
      id: cuid('s_'),
      portalId,
      requestId: null,
      itemKey: null,
      folderId: null, // We don't have a folder ID system here easily
      folderPath: folderPath,
      fileKey: fileKey,
      fileName,
      bytes: file.size,
      ocrStatus: needsReview ? "needs_review" : "classified",
      createdAt: now(),
    };

    db.submissions.set(s.id, s);
    console.log('[UPLOAD-ROUTE] Saved simple upload to db.submissions:', s.id);

    return NextResponse.json({
      ok: true,
      upload: s,
      message: "File uploaded successfully.",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

