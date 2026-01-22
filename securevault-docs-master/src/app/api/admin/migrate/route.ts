
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { SCHEMA_MAP } from '@/lib/db-utils';

export async function POST(request: Request) {
  try {
    const secret = request.headers.get('x-admin-secret');

    // Simple protection - require a key
    if (secret !== process.env.MIGRATION_KEY && secret !== 'migrate-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await pool.connect();
    const logs: string[] = [];

    try {
        const addColumn = async (table: string, column: string, type: string) => {
            const schema = SCHEMA_MAP[table] || 'public';
            const tableName = `${schema}."${table}"`;
            
            logs.push(`Attempting to add ${column} to ${tableName}...`);
            
            try {
                await client.query(`ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS "${column}" ${type}`);
                logs.push(`✅ Added ${column} to ${tableName}`);
            } catch (e: any) {
                logs.push(`❌ Failed on ${tableName}: ${e.message}`);
                throw e; // Fail hard if we can't modify the correct table
            }
        };

        // Run migrations
        await addColumn('User', 'stripeCustomerId', 'TEXT');
        await addColumn('User', 'stripeSubscriptionId', 'TEXT');
        await addColumn('User', 'stripeSubscriptionStatus', 'TEXT');
        await addColumn('User', 'stripePriceId', 'TEXT');
        await addColumn('User', 'subscriptionPeriodEnd', 'TIMESTAMP WITH TIME ZONE');
        await addColumn('User', 'trialExpiresAt', 'TIMESTAMP WITH TIME ZONE');
        await addColumn('User', 'accountType', "TEXT DEFAULT 'personal'");

        // Fix for "dueDateTrackingEnabled does not exist" error
        await addColumn('Document', 'dueDateTrackingEnabled', 'BOOLEAN DEFAULT false');

        await addColumn('Organization', 'stripeCustomerId', 'TEXT');
        // Add other org columns similarly if needed
        
        return NextResponse.json({ success: true, logs });

    } finally {
        client.release();
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
