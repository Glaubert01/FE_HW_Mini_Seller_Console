import React, { useMemo } from "react";
import Button from "@/components/ui/Button";
import Table, { type Column } from "@/components/ui/Table";
import Loading from "@/components/feedback/Loading";
import ErrorState from "@/components/feedback/ErrorState";
import EmptyState from "@/components/ui/EmptyState";

import useOpportunities, {
  type OppsSortKey,
} from "@/features/leads/hooks/useOpportunities";
import type { Opportunity } from "@/features/leads/opportunities/types";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function OpportunitiesPage() {
  const {
    opportunities,
    loading,
    error,
    sortKey,
    sortDir,
    // ⬇️ use setters to track onSort(key, nextDir)
    setSortKey,
    setSortDir,
    toggleSort,
    reload,
  } = useOpportunities();

  const columns: Column<Opportunity>[] = useMemo(
    () => [
      // Shows the leadId (when available) or the opportunity ID
      {
        key: "id",
        header: "ID",
        width: 220,
        sortable: false,
        render: (o) => (
          <span
            className="font-mono text-xs text-gray-800"
            title={(o.leadId ?? o.id) || ""}
          >
            {o.leadId ?? o.id}
          </span>
        ),
      },
      { key: "name", header: "Name", width: 220, sortable: true },
      { key: "company", header: "Account", width: 220, sortable: true },
      {
        key: "value",
        header: "Amount",
        width: 120,
        align: "right",
        sortable: true,
        render: (o) => currency.format(o.value ?? 0),
      },
      { key: "stage", header: "Stage", width: 140, sortable: true },
      {
        key: "createdAt",
        header: "Created",
        width: 160,
        sortable: true,
        render: (o) => new Date(o.createdAt).toLocaleDateString(),
      },
    ],
    []
  );

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Opportunities</h1>
        <Button
          onClick={reload}
          variant="primary"
          aria-label="Reload opportunities"
        >
          Reload
        </Button>
      </div>

      {loading && <Loading />}
      {error && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && (
        <>
          {opportunities.length === 0 ? (
            <EmptyState
              title="No opportunities"
              message="Create a new one above."
            />
          ) : (
            <Table
              columns={columns}
              data={opportunities}
              rowKey={(row) => row.id}
              sortKey={sortKey}
              sortDir={sortDir}
              // ✅ uses the direction calculated by Table
              onSort={(key, nextDir) => {
                setSortKey(key as OppsSortKey);
                setSortDir(nextDir);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
