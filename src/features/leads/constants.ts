import { LeadStatus, LeadSource } from "./types";

export const LEAD_STATUSES: {
  value: LeadStatus;
  label: string;
  color: string;
}[] = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-800" },
  {
    value: "contacted",
    label: "Contacted",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "qualified",
    label: "Qualified",
    color: "bg-green-100 text-green-800",
  },
  {
    value: "unqualified",
    label: "Unqualified",
    color: "bg-red-100 text-red-800",
  },
];

export const LEAD_SOURCES: { value: LeadSource; label: string }[] = [
  { value: "webform", label: "Web form" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Referral" },
  { value: "ads", label: "Ads" },
  { value: "event", label: "Event" },
];

/** Helper to get status label */
export function getLeadStatusLabel(status: LeadStatus): string {
  return LEAD_STATUSES.find((s) => s.value === status)?.label ?? status;
}

/** Helper to get classes (color) from status */
export function getLeadStatusColor(status: LeadStatus): string {
  return LEAD_STATUSES.find((s) => s.value === status)?.color ?? "";
}
