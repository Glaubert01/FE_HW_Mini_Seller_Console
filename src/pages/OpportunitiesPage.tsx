import React, { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Table from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";

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
    toggleSort,
    reload,
  } = useOpportunities();

  const columns = useMemo(
    () => [
      { key: "name", header: "Name", width: 220 },
      { key: "company", header: "Company", width: 220 },
      {
        key: "value",
        header: "Value",
        width: 120,
        align: "right" as const,
        render: (o: Opportunity) => currency.format(o.value ?? 0),
      },
      { key: "stage", header: "Stage", width: 140 },
      {
        key: "createdAt",
        header: "Created",
        width: 160,
        render: (o: Opportunity) => new Date(o.createdAt).toLocaleDateString(),
      },
    ],
    []
  );

  return (
    <div className="p-6 space-y-4">
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

      {/* Estados */}
      {loading && <Loading />}
      {error && <ErrorState message={error} onRetry={reload} />}

      {/* Lista */}
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
              onSort={(key, nextDir) => toggleSort(key as OppsSortKey, nextDir)}
            />
          )}
        </>
      )}
    </div>
  );
}
