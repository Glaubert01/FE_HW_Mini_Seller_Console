import React from "react";
import Table, { type SortDir, type Column } from "@/components/ui/Table";
import type { Opportunity } from "@/features/leads/opportunities/types";

type Props = {
  data: Opportunity[];
  sortKey: string;
  sortDir: SortDir;
  onSort: (key: string, nextDir: SortDir) => void;
  onRowClick?: (row: Opportunity) => void;
};

export default function OpportunitiesTable({
  data,
  sortKey,
  sortDir,
  onSort,
  onRowClick,
}: Props) {
  const columns: Column<Opportunity>[] = [
    { key: "name", header: "Name", sortable: true, width: 220 },
    { key: "company", header: "Company", sortable: true, width: 200 },
    { key: "stage", header: "Stage", sortable: true, width: 140 },
    {
      key: "value",
      header: "Value",
      sortable: true,
      align: "right",
      width: 120,
      render: (o) => (
        <span className="tabular-nums">${o.value?.toLocaleString() ?? 0}</span>
      ),
    },
    { key: "createdAt", header: "Created", sortable: true, width: 160 },
  ];

  return (
    <Table
      data={data}
      columns={columns}
      rowKey={(row) => row.id}
      sortKey={sortKey}
      sortDir={sortDir}
      onSort={onSort}
      onRowClick={onRowClick}
    />
  );
}
