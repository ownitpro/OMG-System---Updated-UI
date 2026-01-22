// src/app/api/org/[orgId]/request-templates/route.ts
// Request templates by industry (replaces vertical-based)

import { NextResponse } from 'next/server';
import { templatesByIndustry } from '@/data/request-templates';

type Params = { params: Promise<{ orgId: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { orgId } = await params;
  
  // Get industry from mock store or default
  // In production, this would come from the org record in the database
  // For now, we'll use a default and let the client override via localStorage
  let industry = 'default';
  
  // Note: In a real implementation, fetch industry from org record
  // const org = await getOrgById(orgId);
  // industry = org?.industry || 'default';
  
  const templates = templatesByIndustry[industry] || templatesByIndustry['default'] || [];
  return NextResponse.json({ industry, templates });
}
