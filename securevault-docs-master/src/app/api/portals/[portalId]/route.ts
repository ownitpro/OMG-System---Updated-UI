// API route for portal CRUD operations
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getMockPortal } from '@/lib/mockPortalDb';

const BCRYPT_SALT_ROUNDS = 10;

type Props = {
  params: Promise<{ portalId: string }>;
};

interface ClientPortalRecord {
  id: string;
  organizationId: string;
  clientName: string | null;
  clientEmail: string | null;
  pin: string | null;
  expiresAt: string | null;
  description: string | null;
}

// GET portal details
export async function GET(_: NextRequest, { params }: Props) {
  try {
    const { queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const { portalId } = await params;

    // First, try to get portal from the database
    const portalTable = getTableName('Portal');
    const dbPortal = await queryOne<{
      id: string;
      name: string | null;
      organizationId: string;
      clientName: string | null;
      clientEmail: string | null;
      pin: string | null;
      expiresAt: string | null;
      description?: string | null;
      createdAt: string | null;
    }>(
      `SELECT * FROM ${portalTable} WHERE id = $1`,
      [portalId]
    );

    // Fall back to mock portal for demo purposes
    const mockPortal = getMockPortal(portalId);

    if (!dbPortal && !mockPortal) {
      return NextResponse.json(
        { error: 'Portal not found' },
        { status: 404 }
      );
    }

    // Get additional data from ClientPortal table if exists (legacy metadata)
    // Wrap in try-catch since this table may not exist in all environments
    let clientPortal: ClientPortalRecord | null = null;
    try {
      clientPortal = await queryOne<ClientPortalRecord>(
        `SELECT * FROM ${getTableName('ClientPortal')} WHERE id = $1`,
        [portalId]
      );
    } catch (err) {
      // ClientPortal table may not exist - that's OK, it's legacy
      console.log('[GET PORTAL] ClientPortal query failed (table may not exist):', err);
    }

    // Build portal response - prefer database, fall back to mock
    const portal = dbPortal ? {
      id: dbPortal.id,
      name: dbPortal.name,
      orgId: dbPortal.organizationId,
      organizationId: dbPortal.organizationId,
      clientName: dbPortal.clientName,
      clientEmail: dbPortal.clientEmail,
      pin: dbPortal.pin,
      expiresAt: dbPortal.expiresAt,
      description: dbPortal.description || null, // Optional column - may not exist until migration
      createdAt: dbPortal.createdAt,
    } : {
      ...mockPortal,
      organizationId: mockPortal?.orgId,
    };

    return NextResponse.json({
      portal: {
        ...portal,
        // Merge ClientPortal metadata if exists (but don't override core fields)
        ...(clientPortal ? {
          clientName: clientPortal.clientName || portal.clientName,
          clientEmail: clientPortal.clientEmail || portal.clientEmail,
          pin: clientPortal.pin || portal.pin,
          expiresAt: clientPortal.expiresAt || portal.expiresAt,
          description: clientPortal.description || portal.description,
        } : {}),
      },
    });
  } catch (error: any) {
    console.error('Error fetching portal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portal', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}

// PATCH - Update portal settings
export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const { query, queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const { portalId } = await params;
    const body = await req.json();

    const { clientName, clientEmail, pin, expiresAt, description } = body;

    // Check if portal exists in database
    const portalTable = getTableName('Portal');
    const dbPortal = await queryOne<{ id: string; organizationId: string }>(
      `SELECT id, "organizationId" FROM ${portalTable} WHERE id = $1`,
      [portalId]
    );

    // Fall back to mock portal for demo purposes
    const mockPortal = getMockPortal(portalId);

    if (!dbPortal && !mockPortal) {
      return NextResponse.json(
        { error: 'Portal not found' },
        { status: 404 }
      );
    }

    const organizationId = dbPortal?.organizationId || mockPortal?.orgId;

    // Update mock portal if it exists (for backwards compatibility)
    if (mockPortal) {
      if (clientName) mockPortal.clientName = clientName;
      if (clientEmail) mockPortal.clientEmail = clientEmail;
    }

    // Build update fields dynamically for the main Portal table
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    if (clientName) {
      updateFields.push(`"clientName" = $${paramIndex++}`);
      updateValues.push(clientName);
    }
    if (clientEmail) {
      updateFields.push(`"clientEmail" = $${paramIndex++}`);
      updateValues.push(clientEmail);
    }
    if (pin) {
      updateFields.push(`pin = $${paramIndex++}`);
      const hashedPin = await bcrypt.hash(pin, BCRYPT_SALT_ROUNDS);
      updateValues.push(hashedPin);
    }
    if (expiresAt !== undefined) {
      updateFields.push(`"expiresAt" = $${paramIndex++}`);
      updateValues.push(expiresAt || null);
    }
    // Description column may not exist until migration is run
    // Track separately so we can retry without it if needed
    const hasDescription = description !== undefined;
    if (hasDescription) {
      updateFields.push(`description = $${paramIndex++}`);
      updateValues.push(description);
    }

    // Update the main Portal table if portal exists there
    if (dbPortal && updateFields.length > 0) {
      updateValues.push(portalId);
      try {
        await query(
          `UPDATE ${portalTable} SET ${updateFields.join(', ')} WHERE id = $${paramIndex}`,
          updateValues
        );
        console.log('[PATCH PORTAL] Updated portal in Portal table:', portalId);
      } catch (error: any) {
        // If description column doesn't exist, retry without it
        if (hasDescription && error.message?.includes('description')) {
          console.warn('[PATCH PORTAL] Description column may not exist, retrying without it');
          const fieldsWithoutDesc = updateFields.filter(f => !f.includes('description'));
          const valuesWithoutDesc = [...updateValues];
          // Remove description value (it was added after the other values)
          valuesWithoutDesc.splice(updateFields.indexOf(`description = $${paramIndex - 1}`), 1);
          // Re-add portalId
          valuesWithoutDesc.push(portalId);

          if (fieldsWithoutDesc.length > 0) {
            try {
              // Rebuild query with correct parameter indices
              let newParamIndex = 1;
              const rebuiltFields = fieldsWithoutDesc.map(f => {
                const col = f.split(' = ')[0];
                return `${col} = $${newParamIndex++}`;
              });
              await query(
                `UPDATE ${portalTable} SET ${rebuiltFields.join(', ')} WHERE id = $${newParamIndex}`,
                valuesWithoutDesc.slice(0, fieldsWithoutDesc.length).concat([portalId])
              );
              console.log('[PATCH PORTAL] Updated portal without description');
            } catch (retryError) {
              console.error('Error updating portal on retry:', retryError);
              return NextResponse.json(
                { error: 'Failed to update portal in database' },
                { status: 500 }
              );
            }
          }
        } else {
          console.error('Error updating portal:', error);
          return NextResponse.json(
            { error: 'Failed to update portal in database' },
            { status: 500 }
          );
        }
      }
    }

    // Also update ClientPortal table for legacy compatibility
    const clientPortalTable = getTableName('ClientPortal');
    const existingClientPortal = await queryOne<{ id: string }>(
      `SELECT id FROM ${clientPortalTable} WHERE id = $1`,
      [portalId]
    );

    if (existingClientPortal) {
      // Update existing ClientPortal record
      if (updateFields.length > 0) {
        // Reset for ClientPortal update
        const clientUpdateFields: string[] = [];
        const clientUpdateValues: any[] = [];
        let clientParamIndex = 1;

        if (clientName) {
          clientUpdateFields.push(`"clientName" = $${clientParamIndex++}`);
          clientUpdateValues.push(clientName);
        }
        if (clientEmail) {
          clientUpdateFields.push(`"clientEmail" = $${clientParamIndex++}`);
          clientUpdateValues.push(clientEmail);
        }
        if (pin) {
          clientUpdateFields.push(`pin = $${clientParamIndex++}`);
          const hashedPin = await bcrypt.hash(pin, BCRYPT_SALT_ROUNDS);
          clientUpdateValues.push(hashedPin);
        }
        if (expiresAt !== undefined) {
          clientUpdateFields.push(`"expiresAt" = $${clientParamIndex++}`);
          clientUpdateValues.push(expiresAt || null);
        }
        if (description !== undefined) {
          clientUpdateFields.push(`description = $${clientParamIndex++}`);
          clientUpdateValues.push(description);
        }

        if (clientUpdateFields.length > 0) {
          clientUpdateValues.push(portalId);
          try {
            await query(
              `UPDATE ${clientPortalTable} SET ${clientUpdateFields.join(', ')} WHERE id = $${clientParamIndex}`,
              clientUpdateValues
            );
          } catch (error) {
            console.error('Error updating ClientPortal:', error);
            // Non-critical, continue
          }
        }
      }
    } else if (organizationId) {
      // Create new ClientPortal record
      const insertFields = ['id', '"organizationId"'];
      const insertValues: any[] = [portalId, organizationId];
      const insertPlaceholders = ['$1', '$2'];
      let insertIndex = 3;

      if (clientName) {
        insertFields.push('"clientName"');
        insertValues.push(clientName);
        insertPlaceholders.push(`$${insertIndex++}`);
      }
      if (clientEmail) {
        insertFields.push('"clientEmail"');
        insertValues.push(clientEmail);
        insertPlaceholders.push(`$${insertIndex++}`);
      }
      if (pin) {
        insertFields.push('pin');
        const hashedPin = await bcrypt.hash(pin, BCRYPT_SALT_ROUNDS);
        insertValues.push(hashedPin);
        insertPlaceholders.push(`$${insertIndex++}`);
      }
      if (expiresAt !== undefined) {
        insertFields.push('"expiresAt"');
        insertValues.push(expiresAt || null);
        insertPlaceholders.push(`$${insertIndex++}`);
      }
      if (description !== undefined) {
        insertFields.push('description');
        insertValues.push(description);
        insertPlaceholders.push(`$${insertIndex++}`);
      }

      try {
        await query(
          `INSERT INTO ${clientPortalTable} (${insertFields.join(', ')}) VALUES (${insertPlaceholders.join(', ')})`,
          insertValues
        );
      } catch (error) {
        console.error('Error creating ClientPortal record:', error);
        // Don't fail if this errors
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Portal updated successfully',
    });
  } catch (error) {
    console.error('Error updating portal:', error);
    return NextResponse.json(
      { error: 'Failed to update portal' },
      { status: 500 }
    );
  }
}

// DELETE - Delete portal and all associated data
export async function DELETE(_: NextRequest, { params }: Props) {
  try {
    const { query } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    const { portalId } = await params;

    // Delete associated portal submissions first (to maintain referential integrity)
    try {
      await query(
        `DELETE FROM ${getTableName('PortalSubmission')} 
         WHERE "portalRequestId" IN (
           SELECT id FROM ${getTableName('PortalRequest')} WHERE "portalId" = $1
         )`,
        [portalId]
      );
      console.log('[DELETE PORTAL] Deleted submissions for portal:', portalId);
    } catch (error) {
      console.log('[DELETE PORTAL] No submissions to delete or error:', error);
    }

    // Delete associated portal requests
    try {
      await query(
        `DELETE FROM ${getTableName('PortalRequest')} WHERE "portalId" = $1`,
        [portalId]
      );
      console.log('[DELETE PORTAL] Deleted requests for portal:', portalId);
    } catch (error) {
      console.log('[DELETE PORTAL] No requests to delete or error:', error);
    }

    // Delete from ClientPortal table (legacy metadata)
    try {
      await query(
        `DELETE FROM ${getTableName('ClientPortal')} WHERE id = $1`,
        [portalId]
      );
    } catch (error) {
      // Not critical if this fails
      console.log('[DELETE PORTAL] ClientPortal record not found or already deleted');
    }

    // Delete the main portal record
    await query(
      `DELETE FROM ${getTableName('Portal')} WHERE id = $1`,
      [portalId]
    );
    console.log('[DELETE PORTAL] Portal deleted successfully:', portalId);

    return NextResponse.json({
      success: true,
      message: 'Portal deleted successfully',
    });
  } catch (error) {
    console.error('[DELETE PORTAL] Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete portal' },
      { status: 500 }
    );
  }
}
