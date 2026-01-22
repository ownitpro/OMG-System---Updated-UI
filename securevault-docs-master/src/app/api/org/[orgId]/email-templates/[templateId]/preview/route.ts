import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Params = { params: Promise<{ orgId: string; templateId: string }> };

/**
 * POST /api/org/[orgId]/email-templates/[templateId]/preview
 * Send a test email with the template and sample data
 * Body: { testEmail: string, sampleData: Record<string, string> }
 */
export async function POST(request: NextRequest, { params }: Params) {
  const { queryOne, query } = await import('@/lib/db');
  const { getTableName } = await import('@/lib/db-utils');
  const { orgId, templateId } = await params;

  // Get authenticated user from headers
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify user has access to this organization
    const hasAccess = await query(
      `SELECT 1 FROM ${getTableName('OrganizationMember')} WHERE "organizationId" = $1 AND "userId" = $2`,
      [orgId, userId]
    );

    if (!hasAccess || hasAccess.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Fetch the template
    const template = await queryOne(
      `SELECT * FROM ${getTableName('EmailTemplate')} WHERE id = $1 AND "organizationId" = $2`,
      [templateId, orgId]
    );

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    const body = await request.json();
    const { testEmail, sampleData } = body;

    // Validate test email
    if (!testEmail || !testEmail.includes('@')) {
      return NextResponse.json(
        { error: 'Valid test email address is required' },
        { status: 400 }
      );
    }

    // Replace variables in template content
    const replaceVariables = (text: string, data: Record<string, string>): string => {
      return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data[key] || match; // Keep placeholder if data missing
      });
    };

    const subject = replaceVariables(template.subject, sampleData || {});
    const html = replaceVariables(template.htmlContent, sampleData || {});
    const text = template.textContent ? replaceVariables(template.textContent, sampleData || {}) : undefined;

    // Send the email
    const { sendEmail } = await import('@/lib/email');
    const result = await sendEmail({
      to: testEmail,
      subject: `[TEST] ${subject}`,
      html,
      text,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send test email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${testEmail}`,
      messageId: result.messageId,
    });
  } catch (error: any) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send test email' },
      { status: 500 }
    );
  }
}
