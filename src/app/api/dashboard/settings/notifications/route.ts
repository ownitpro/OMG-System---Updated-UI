import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { Role } from '@/generated/prisma';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Placeholder notification preferences
    const preferences = {
      email: true,
      usageAlerts: true,
      workflowNotifications: true,
      marketingEmails: false,
      securityAlerts: true,
      billingNotifications: true
    };

    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, usageAlerts, workflowNotifications, marketingEmails, securityAlerts, billingNotifications } = body;

    // In a real app, you'd save these to a user preferences table
    const preferences = {
      email,
      usageAlerts,
      workflowNotifications,
      marketingEmails,
      securityAlerts,
      billingNotifications
    };

    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}