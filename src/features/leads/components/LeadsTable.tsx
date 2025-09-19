import React from "react";
import Table, { type SortDir } from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import type { Lead } from "@/features/leads/types";
import {
  getLeadStatusColor,
  getLeadStatusLabel,
} from "@/features/leads/constants";

export type LeadsSortKey =
  | "name"
  | "company"
  | "status"
  | "score"
  | "createdAt";

type Props = {
  leads: Lead[];
  sortKey: string;
  sortDir: SortDir;
  onSort: (key: LeadsSortKey, nextDir: SortDir) => void;
  onOpenDetail?: (lead: Lead) => void;
};

export default function LeadsTable({
  leads,
  sortKey,
  sortDir,
  onSort,
  onOpenDetail,
}: Props) {
  return (
    <Table<Lead>
      data={leads}
      rowKey={(row) => row.id}
      sortKey={sortKey}
      sortDir={sortDir}
      onRowClick={onOpenDetail}
      onSort={(key, nextDir) => onSort(key as LeadsSortKey, nextDir)}
      columns={[
        {
          key: "name",
          header: "Name",
          sortable: true,
          render: (row) => (
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{row.name}</span>
              <span className="text-xs text-gray-500">{row.createdAt}</span>
            </div>
          ),
        },
        { key: "email", header: "Email", sortable: true },
        { key: "company", header: "Company", sortable: true },
        {
          key: "status",
          header: "Status",
          sortable: true,
          render: (row) => (
            <Badge color={getLeadStatusColor(row.status)}>
              {getLeadStatusLabel(row.status)}
            </Badge>
          ),
        },
        {
          key: "score",
          header: "Score",
          sortable: true,
          align: "right",
          width: 96,
          render: (row) => <span className="tabular-nums">{row.score}</span>,
        },
      ]}
    />
  );
}
