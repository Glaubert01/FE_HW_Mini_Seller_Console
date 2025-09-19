import React, { useMemo, useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";

import Loading from "@/components/feedback/Loading";
import ErrorState from "@/components/feedback/ErrorState";
import EmptyState from "@/components/ui/EmptyState";

import type { LeadsSortKey } from "@/features/leads/hooks/useLeads";
import useLeads from "@/features/leads/hooks/useLeads";
import type { Lead, LeadStatus, LeadSource } from "@/features/leads/types";
import {
  getLeadStatusColor,
  getLeadStatusLabel,
} from "@/features/leads/constants";

// filter options
const STATUS_OPTIONS: Array<{ value: LeadStatus | "all"; label: string }> = [
  { value: "all", label: "All statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "unqualified", label: "Unqualified" },
];

const SOURCE_OPTIONS: Array<{ value: LeadSource | "all"; label: string }> = [
  { value: "all", label: "All sources" },
  { value: "webform", label: "Web form" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Referral" },
  { value: "ads", label: "Ads" },
  { value: "event", label: "Event" },
];

export default function LeadsPage() {
  const {
    leads,
    total,
    loading,
    error,
    setQuery,
    setStatus,
    setSource,
    sortKey,
    sortDir,
    toggleSort,
    reload,
  } = useLeads({ initialSortKey: "score", initialSortDir: "desc" });

  const [q, setQ] = useState("");

  function onSearchChange(v: string) {
    setQ(v);
    setQuery(v); // the hook already debounces internally
  }

  const columns = useMemo(
    () => [
      { key: "name", header: "Name", width: 220 },
      { key: "email", header: "Email", width: 220 },
      { key: "company", header: "Company", width: 200 },
      {
        key: "status",
        header: "Status",
        width: 140,
        render: (l: Lead) => (
          <Badge className={getLeadStatusColor(l.status)}>
            {getLeadStatusLabel(l.status)}
          </Badge>
        ),
      },
      { key: "score", header: "Score", width: 90, align: "right" as const },
    ],
    []
  );

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Leads</h1>
        <Button onClick={reload} variant="primary" aria-label="Reload leads">
          Reload
        </Button>
      </div>

      {/* Filtros */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Input
          value={q}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search name, email or company…"
          aria-label="Search leads"
        />

        <Select
          defaultValue="all"
          onChange={(e) => setStatus(e.target.value as any)}
          aria-label="Filter by status"
          options={STATUS_OPTIONS.map((o) => ({
            value: o.value,
            label: o.label,
          }))}
        />

        <Select
          defaultValue="all"
          onChange={(e) => setSource(e.target.value as any)}
          aria-label="Filter by source"
          options={SOURCE_OPTIONS.map((o) => ({
            value: o.value,
            label: o.label,
          }))}
        />
      </div>

      {/* Loading/Error States */}
      {loading && <Loading />}
      {error && <ErrorState message={error} onRetry={reload} />}

      {/* List */}
      {!loading && !error && (
        <>
          <p className="text-sm text-gray-600">
            <strong>{total}</strong> result(s)
          </p>

          {leads.length === 0 ? (
            <EmptyState
              title="No leads found"
              message="Try adjusting the filters."
            />
          ) : (
            <Table
              columns={columns}
              data={leads}
              rowKey={(row) => row.id}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={(key, nextDir) =>
                toggleSort(key as LeadsSortKey, nextDir)
              }
            />
          )}
        </>
      )}
    </div>
  );
}
