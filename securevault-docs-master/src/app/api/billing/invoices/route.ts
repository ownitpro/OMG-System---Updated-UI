import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getStripeClient } from '@/lib/stripe';
import { queryOne } from '@/lib/db';
import { getTableName } from '@/lib/db-utils';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user stripe ID
    const user = await queryOne<{ stripeCustomerId: string }>(
       `SELECT "stripeCustomerId" FROM ${getTableName('User')} WHERE id = $1`,
       [session.user.id]
    );

    if (!user?.stripeCustomerId) {
       // If no stripe customer, return empty list
       return NextResponse.json({ invoices: [] });
    }

    const stripe = await getStripeClient();

    // Fetch invoices from Stripe
    // Helper to get invoices including one-time payments (which create invoices in checkout)
    const invoices = await stripe.invoices.list({
       customer: user.stripeCustomerId,
       limit: 20,
       // We might want to expand PaymentIntent to get clearer status, but default is mostly fine
    });

    const mappedInvoices = invoices.data.map(inv => ({
       id: inv.number || inv.id,
       date: new Date(inv.created * 1000).toISOString(),
       amount: (inv.amount_paid / 100),
       status: inv.status,
       downloadUrl: inv.invoice_pdf || inv.hosted_invoice_url
    }));

    return NextResponse.json({ invoices: mappedInvoices });

  } catch (error) {
     console.error('Error fetching invoices:', error);
     return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}
