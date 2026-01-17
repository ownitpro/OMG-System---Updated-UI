-- CreateEnum
CREATE TYPE "DesignRequestStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('APPS', 'SOLUTIONS', 'MARKETING', 'INDUSTRIES', 'AI_AGENTS', 'CONTENT_ENGINE', 'CUSTOM_APPS', 'SMART_AUTOMATIONS', 'CONTACT');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'NURTURING', 'QUALIFIED', 'CONVERTED', 'LOST');

-- CreateTable
CREATE TABLE "design_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "designType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3),
    "budget" TEXT,
    "existingAssets" TEXT,
    "status" "DesignRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "design_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "source" "LeadSource" NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "industry" TEXT,
    "message" TEXT,
    "tags" TEXT,
    "interestedApps" TEXT,
    "crmIndustry" TEXT,
    "solutionInterested" TEXT,
    "teamSize" TEXT,
    "servicesInterested" TEXT,
    "budget" TEXT,
    "goals" TEXT,
    "companySize" TEXT,
    "challenges" TEXT,
    "agentType" TEXT,
    "agentDescription" TEXT,
    "preferredStartDate" TIMESTAMP(3),
    "contentTypes" TEXT,
    "monthlyVolume" TEXT,
    "contentChallenge" TEXT,
    "selectedModules" TEXT,
    "coreObjectives" TEXT,
    "additionalNotes" TEXT,
    "subject" TEXT,
    "timeline" TEXT,
    "formData" TEXT,
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "design_requests_userId_idx" ON "design_requests"("userId");

-- CreateIndex
CREATE INDEX "design_requests_status_idx" ON "design_requests"("status");

-- CreateIndex
CREATE INDEX "leads_source_idx" ON "leads"("source");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_email_idx" ON "leads"("email");

-- CreateIndex
CREATE INDEX "leads_createdAt_idx" ON "leads"("createdAt");

-- CreateIndex
CREATE INDEX "leads_organizationId_idx" ON "leads"("organizationId");

-- AddForeignKey
ALTER TABLE "design_requests" ADD CONSTRAINT "design_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
