import { NextRequest, NextResponse } from 'next/server';
import { getAuditLogs, exportAuditLogsCSV } from '@/lib/auditLog';

interface Params {
  params: Promise<{ orgId: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  const { orgId } = await params;
  const { searchParams } = new URL(req.url);
  const range = searchParams.get('range') || '7d';

  // Calculate date range
  const now = new Date();
  let startDate: Date | undefined;

  switch (range) {
    case '24h':
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case '7d':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case 'all':
      startDate = undefined;
      break;
  }

  // Export audit logs as CSV
  const csv = exportAuditLogsCSV({
    organizationId: orgId,
    startDate,
  });

  // Return CSV file
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="audit-logs-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
