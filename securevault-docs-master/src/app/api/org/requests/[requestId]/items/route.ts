import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: Promise<{ requestId: string }>;
};

// POST - Add a new item to a request (requestId is actually portalId)
export async function POST(req: NextRequest, { params }: Props) {
  try {
    const { query, queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');
    const { randomUUID } = await import('crypto');

    const { requestId: portalId } = await params;
    const body = await req.json();

    if (!body.label) {
      return NextResponse.json({ error: 'Item label is required' }, { status: 400 });
    }

    // Get the current highest order for items in this request
    const maxOrder = await queryOne<{ max: number }>(
      `SELECT COALESCE(MAX("order"), -1) as max FROM ${getTableName('PortalRequest')} WHERE "portalId" = $1`,
      [portalId]
    );

    const newOrder = (maxOrder?.max ?? -1) + 1;
    const itemId = randomUUID();

    await query(
      `INSERT INTO ${getTableName('PortalRequest')} (id, "portalId", title, description, required, "order")
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [itemId, portalId, body.label, body.description || null, body.required ?? true, newOrder]
    );

    console.log('[ADD ITEM] Item added to request:', { portalId, itemId, label: body.label });

    return NextResponse.json({
      success: true,
      item: {
        id: itemId,
        key: itemId,
        label: body.label,
        required: body.required ?? true,
        uploaded: false,
      },
    });
  } catch (error) {
    console.error('[ADD ITEM] Error:', error);
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}

// DELETE - Remove an item from a request
export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { query } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const { requestId: portalId } = await params;
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get('itemId');

    if (!itemId) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    // Delete any submissions for this item first
    await query(
      `DELETE FROM ${getTableName('PortalSubmission')} WHERE "portalRequestId" = $1`,
      [itemId]
    );

    // Delete the request item
    await query(
      `DELETE FROM ${getTableName('PortalRequest')} WHERE id = $1 AND "portalId" = $2`,
      [itemId, portalId]
    );

    console.log('[DELETE ITEM] Item deleted:', { portalId, itemId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE ITEM] Error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}

// PATCH - Update an item (re-request = clear uploaded status)
export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const { query } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const { requestId: portalId } = await params;
    const body = await req.json();
    const { itemId, action } = body;

    if (!itemId) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    if (action === 're-request') {
      // Delete any submissions for this item to clear uploaded status
      const result = await query(
        `DELETE FROM ${getTableName('PortalSubmission')} WHERE "portalRequestId" = $1`,
        [itemId]
      );

      console.log('[RE-REQUEST] Cleared submissions for item:', { portalId, itemId });

      return NextResponse.json({
        success: true,
        message: 'Item re-requested, upload status cleared'
      });
    }

    // Update item properties (label, required)
    if (body.label !== undefined || body.required !== undefined) {
      const updates: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;

      if (body.label !== undefined) {
        updates.push(`title = $${paramIndex++}`);
        values.push(body.label);
      }
      if (body.required !== undefined) {
        updates.push(`required = $${paramIndex++}`);
        values.push(body.required);
      }

      values.push(itemId, portalId);

      await query(
        `UPDATE ${getTableName('PortalRequest')}
         SET ${updates.join(', ')}
         WHERE id = $${paramIndex++} AND "portalId" = $${paramIndex}`,
        values
      );

      console.log('[UPDATE ITEM] Item updated:', { portalId, itemId });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[UPDATE ITEM] Error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}
