// Domain types for Opportunities

export type Stage =
  | "prospecting"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export interface Opportunity {
  id: string;
  leadId?: string; // optional: source of converted lead
  name: string; // usually the name of the contact/account
  company?: string;
  email?: string;
  value?: number; // opportunity value (USD)
  stage: Stage;
  createdAt: string; // ISO string
  notes?: string;
}

/** Minimum data to create/update */
export type OpportunityInput = Partial<
  Pick<
    Opportunity,
    "leadId" | "name" | "company" | "email" | "value" | "stage" | "notes"
  >
>;
