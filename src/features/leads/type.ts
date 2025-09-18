// Domain types for Leads

export type LeadStatus = "new" | "contacted" | "qualified" | "unqualified";
export type LeadSource = "webform" | "linkedin" | "referral" | "ads" | "event";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  status: LeadStatus;
  source: LeadSource;
  score: number; // 0–100
  createdAt: string; // ISO date string
  notes?: string;
}

/** Minimal shape for create/update operations */
export type LeadUpdate = Partial<
  Pick<
    Lead,
    "name" | "email" | "company" | "status" | "source" | "score" | "notes"
  >
>;

/** Narrow type guard */
export function isLead(value: unknown): value is Lead {
  const v = value as Record<string, unknown>;
  return (
    !!v &&
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.email === "string" &&
    typeof v.company === "string" &&
    typeof v.status === "string" &&
    typeof v.source === "string" &&
    typeof v.score === "number" &&
    typeof v.createdAt === "string"
  );
}
