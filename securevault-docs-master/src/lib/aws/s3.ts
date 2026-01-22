// AWS S3 Integration
// Supports both mock mode (for development) and real S3 (for production)

import { randomUUID } from 'crypto';

// Support both MOCK_UPLOADS=1 and USE_MOCK_S3=true
const USE_MOCK_S3 = process.env.USE_MOCK_S3 === 'true' || process.env.MOCK_UPLOADS === '1';
const AWS_REGION = process.env.AWS_REGION || 'ca-central-1';
const S3_BUCKET = process.env.S3_BUCKET_DATA || process.env.S3_BUCKET || 'securevault-documents';
const S3_PREFIX_PERSONAL = process.env.S3_PREFIX_PERSONAL || 'personal/';
const S3_PREFIX_ORG = process.env.S3_PREFIX_ORG || 'org/';

if (!S3_BUCKET) {
  console.warn('[S3] S3_BUCKET_DATA is not set');
}

export type PresignResult = {
  mock?: boolean;
  url: string;
  key: string;
  headers: Record<string, string>;
};

export type UploadResult = {
  key: string;
  url: string;
  bucket: string;
};

// ============================================================================
// PRESIGNED URL GENERATION
// ============================================================================

// Alias for presignPutObject - matches the new API pattern
export async function presignUpload(
  key: string,
  contentType: string = "application/octet-stream"
): Promise<PresignResult> {
  return presignPutObject(key, contentType);
}

export async function presignPutObject(
  key: string,
  contentType: string | undefined,
  expiresIn: number = 900 // 15 minutes default
): Promise<PresignResult> {
  if (USE_MOCK_S3) {
    console.log('[MOCK S3] presignPutObject called for:', key);
    return {
      mock: true,
      url: `https://example.com/mock-upload/${encodeURIComponent(key)}`,
      key,
      headers: {
        'Content-Type': contentType || 'application/octet-stream',
      },
    };
  }

  // Real S3 implementation
  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
  const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');

  const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    ContentType: contentType || 'application/octet-stream',
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn });

  return {
    url,
    key,
    headers: {
      'Content-Type': contentType || 'application/octet-stream',
    },
  };
}

export async function presignGetObject(
  key: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<string> {
  if (USE_MOCK_S3) {
    console.log('[MOCK S3] presignGetObject called for:', key);
    return `https://mock-s3.example.com/${key}`;
  }

  // Real S3 implementation
  const { S3Client, GetObjectCommand } = await import('@aws-sdk/client-s3');
  const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');

  const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

// ============================================================================
// DIRECT FILE OPERATIONS
// ============================================================================

export async function uploadFile(
  file: Buffer | Uint8Array,
  key: string,
  contentType: string
): Promise<UploadResult> {
  if (USE_MOCK_S3) {
    console.log('[MOCK S3] uploadFile called for:', key);
    return {
      key,
      url: `https://mock-s3.example.com/${key}`,
      bucket: S3_BUCKET,
    };
  }

  // Real S3 implementation
  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');

  const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await s3Client.send(command);

  return {
    key,
    url: `https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`,
    bucket: S3_BUCKET,
  };
}

export async function downloadFile(key: string): Promise<Buffer> {
  if (USE_MOCK_S3) {
    console.log('[MOCK S3] downloadFile called for:', key);
    return Buffer.from(`Mock file content for ${key}`);
  }

  // Real S3 implementation
  const { S3Client, GetObjectCommand } = await import('@aws-sdk/client-s3');

  const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
  });

  const response = await s3Client.send(command);
  const stream = response.Body;

  if (!stream) {
    throw new Error('No file body returned from S3');
  }

  // Convert stream to buffer
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream as any) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function deleteFile(key: string): Promise<void> {
  if (USE_MOCK_S3) {
    console.log('[MOCK S3] deleteFile called for:', key);
    return;
  }

  // Real S3 implementation
  const { S3Client, DeleteObjectCommand } = await import('@aws-sdk/client-s3');

  const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
  });

  await s3Client.send(command);
}

export async function deleteFiles(keys: string[]): Promise<void> {
  if (USE_MOCK_S3) {
    console.log('[MOCK S3] deleteFiles called for:', keys.length, 'files');
    return;
  }

  // Real S3 implementation
  const { S3Client, DeleteObjectsCommand } = await import('@aws-sdk/client-s3');

  const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const command = new DeleteObjectsCommand({
    Bucket: S3_BUCKET,
    Delete: {
      Objects: keys.map(key => ({ Key: key })),
    },
  });

  await s3Client.send(command);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function generateS3Key(prefix: string, fileName: string): string {
  const sanitized = fileName.replace(/[^a-zA-Z0-9_.-]/g, '_');
  const uuid = randomUUID();
  return `${prefix}/${uuid}-${sanitized}`;
}

export function getS3Url(key: string): string {
  if (USE_MOCK_S3) {
    return `https://mock-s3.example.com/${key}`;
  }
  return `https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`;
}

// Backward compatibility
export async function getSignedUrl(key: string) {
  return presignGetObject(key);
}
