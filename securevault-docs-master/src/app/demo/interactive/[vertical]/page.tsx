// src/app/demo/interactive/[vertical]/page.tsx - Deep link for Interactive Demo only

import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ vertical: string }>;
};

export default async function InteractiveDemoPage({ params }: Props) {
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
  
  // Redirect to main demo page with interactive tab and vertical selected
  redirect(`/demo?tab=interactive&v=${mappedVertical}`);
}

