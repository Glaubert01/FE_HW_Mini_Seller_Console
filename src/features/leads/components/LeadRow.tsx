import React from "react";
import Badge from "@/components/ui/Badge";
import type { Lead } from "@/features/leads/types";
import {
  getLeadStatusColor,
  getLeadStatusLabel,
} from "@/features/leads/constants";

type Props = {
  lead: Lead;
  onClick?: (lead: Lead) => void;
};

export default function LeadRow({ lead, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(lead)}
      className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-3 text-left shadow-sm hover:bg-gray-50"
    >
      <div className="min-w-0">
        <div className="truncate font-medium text-gray-900">{lead.name}</div>
        <div className="truncate text-sm text-gray-500">{lead.email}</div>
      </div>

      <div className="flex items-center gap-3 pl-3">
        <Badge color={getLeadStatusColor(lead.status)}>
          {getLeadStatusLabel(lead.status)}
        </Badge>
        <span className="tabular-nums text-gray-700">{lead.score}</span>
      </div>
    </button>
  );
}
