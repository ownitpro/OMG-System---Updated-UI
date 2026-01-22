import { NextRequest, NextResponse } from 'next/server';
import { requirePortalAuth, validators } from '@/lib/portalAuth';
import { presignPutObject, generateS3Key } from '@/lib/aws/s3';

type Props = {
  params: Promise<{ portalId: string }>;
};

async function handler(req: NextRequest, session: any, portalId: string) {
  try {
    const { fileName, fileSize, contentType } = await req.json();

    // Validate file name
    const fileNameValidation = validators.fileName(fileName);
    if (!fileNameValidation.valid) {
      return NextResponse.json(
        { error: fileNameValidation.error },
        { status: 400 }
      );
    }

    // Validate file size
    const fileSizeValidation = validators.fileSize(fileSize);
    if (!fileSizeValidation.valid) {
      return NextResponse.json(
        { error: fileSizeValidation.error },
        { status: 400 }
      );
    }

    // Validate content type
    const contentTypeValidation = validators.contentType(contentType);
    if (!contentTypeValidation.valid) {
      return NextResponse.json(
        { error: contentTypeValidation.error },
        { status: 400 }
      );
    }

    // Generate S3 key with portal prefix
    const fileKey = generateS3Key(`portals/${portalId}`, fileName);

    // Generate presigned URL for upload
    const presignResult = await presignPutObject(fileKey, contentType);

    return NextResponse.json({
      uploadUrl: presignResult.url,
      fileKey,
      headers: presignResult.headers,
      mock: presignResult.mock || false, // Include mock flag so client knows to skip S3 upload
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}

export const POST = requirePortalAuth(handler);
