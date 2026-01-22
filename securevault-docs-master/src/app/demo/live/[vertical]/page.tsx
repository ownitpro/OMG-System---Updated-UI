// src/app/demo/live/[vertical]/page.tsx - Deep link for Live Demo only

import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ vertical: string }>;
};

export default async function LiveDemoPage({ params }: Props) {
  const { vertical } = await params;
  
  // Map vertical names to keys (e.g., "contractors" -> "construction", "pm" -> "project_management")
  const verticalMap: Record<string, string> = {
    accounting: 'accounting',
    'real-estate': 'real_estate',
    real_estate: 'real_estate',
    contractors: 'construction',
    construction: 'construction',
    pm: 'project_management',
    'project-management': 'project_management',
    project_management: 'project_management'
  };
  
  const mappedVertical = verticalMap[vertical] || vertical;
  
  // Redirect to main demo page with live tab and vertical selected
  redirect(`/demo?tab=live&v=${mappedVertical}`);
}

