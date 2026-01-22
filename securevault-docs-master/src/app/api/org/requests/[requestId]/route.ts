import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: Promise<{ requestId: string }>;
};

// DELETE - Delete a portal request
export async function DELETE(_: NextRequest, { params }: Props) {
  try {
    const { query } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const { requestId } = await params;

    // Delete the request (submissions linked to this request should be handled appropriately)
    // For now, we just delete the request record
    await query(
      `DELETE FROM ${getTableName('PortalRequest')} WHERE id = $1`,
      [requestId]
    );

    console.log('[DELETE REQUEST] Request deleted successfully:', requestId);

    return NextResponse.json({
      success: true,
      message: 'Request deleted successfully',
    });
  } catch (error) {
    console.error('[DELETE REQUEST] Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete request' },
      { status: 500 }
    );
  }
}

// GET - Get a specific request
export async function GET(_: NextRequest, { params }: Props) {
  try {
    const { queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const { requestId } = await params;

    const request = await queryOne(
      `SELECT * FROM ${getTableName('PortalRequest')} WHERE id = $1`,
      [requestId]
    );

    if (!request) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ request });
  } catch (error) {
    console.error('[GET REQUEST] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch request' },
      { status: 500 }
    );
  }
}
