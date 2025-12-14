import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/common/section";
import { WorkflowEntryScreen } from "@/components/workflow/WorkflowEntryScreen";
import { EnhancedWorkflowBuilder } from "@/components/workflow/EnhancedWorkflowBuilder";

export const metadata: Metadata = {
  title: "Workflow Builder | OMGsystems",
  description: "Build custom automations with our visual workflow builder. Drag, drop, configure, and deploy your business processes.",
  openGraph: {
    title: "Workflow Builder | OMGsystems",
    description: "Build custom automations with our visual workflow builder. Drag, drop, configure, and deploy your business processes.",
    type: "website",
  },
};

interface WorkflowBuilderPageProps {
  searchParams: Promise<{
    type?: string;
    mode?: 'wizard' | 'canvas';
  }>;
}

export default async function WorkflowBuilderPage({ searchParams }: WorkflowBuilderPageProps) {
  const { type, mode = 'wizard' } = await searchParams;

  if (type) {
    return <EnhancedWorkflowBuilder workflowId={type} mode={mode} />;
  }

  return <WorkflowEntryScreen />;
}