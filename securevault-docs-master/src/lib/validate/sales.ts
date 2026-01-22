// lib/validate/sales.ts

import { z } from "zod";

export const SalesLeadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  industry: z.enum(["accounting", "real_estate", "contractors", "project_management", "personal"]),
  teamSize: z.string().min(1),
  intent: z.enum(["demo", "pricing", "migration", "security"]),
  message: z.string().optional().default(""),
  acceptsContact: z.coerce.boolean().optional().default(false),
  acceptsBetaTerms: z.coerce.boolean().optional().default(false),
  website: z.string().optional().default(""), // honeypot
});

