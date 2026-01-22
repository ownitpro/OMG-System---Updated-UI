import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: Promise<{ portalId: string }>;
};

export async function GET(_: NextRequest, { params }: Props) {
  try {
    const { portalId } = await params;
    
    // Mock submission data
    const items = [
      {
        id: 'sub_1',
        portalId,
        requestId: 'req_1',
        fileKey: `mock/${portalId}/document1.pdf`,
        fileName: 'document1.pdf',
        bytes: 245760,
        ocrStatus: 'completed',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'sub_2',
        portalId,
        requestId: 'req_2',
        fileKey: `mock/${portalId}/invoice.pdf`,
        fileName: 'invoice.pdf',
        bytes: 512000,
        ocrStatus: 'pending',
        createdAt: new Date(Date.now() - 3600000).toISOString()
      }
    ];
    
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching portal submissions:', error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}

