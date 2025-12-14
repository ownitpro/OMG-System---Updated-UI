import { Role } from "../generated/prisma";

export interface Membership {
  orgId: string;
  role: Role;
  organization: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  memberships: Membership[];
  activeOrgId: string | null;
}

export interface Session {
  user: User;
  expires: string;
}

export type Action = 
  | "read" 
  | "write" 
  | "delete" 
  | "billing" 
  | "settings" 
  | "admin" 
  | "impersonate";

export const ROLE_PERMISSIONS: Record<Role, Action[]> = {
  ADMIN: ["read", "write", "delete", "billing", "settings", "admin", "impersonate"],
  STAFF: ["read", "write", "billing"], // read-only billing, no destructive org settings
  CLIENT: ["read"], // portal reads, their invoices/payments, create tickets
};
