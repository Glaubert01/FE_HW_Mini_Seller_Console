import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  Opportunity,
  OpportunityInput,
  Stage,
} from "@/features/leads/opportunities/types";
import {
  listOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from "@/features/leads/opportunities/api/opportunities.api";
import { sortByKey } from "@/lib/sort";

export type OppsSortKey = "createdAt" | "name" | "company" | "value" | "stage";
export type SortDir = "asc" | "desc";

export function useOpportunities() {
  const [items, setItems] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<OppsSortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listOpportunities();
      setItems(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // sorting
  const toggleSort = (key: OppsSortKey) => {
    setSortKey((prev) => {
      if (prev !== key) {
        setSortDir("asc");
        return key;
      }
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return prev;
    });
  };

  const list = useMemo(() => {
    const getter = (o: Opportunity) => {
      switch (sortKey) {
        case "name":
          return o.name;
        case "company":
          return o.company ?? "";
        case "value":
          return o.value ?? 0;
        case "stage":
          return o.stage;
        case "createdAt":
        default:
          return o.createdAt;
      }
    };
    return sortByKey(items, getter, sortDir);
  }, [items, sortKey, sortDir]);

  // actions
  const creating = useRef(false);

  async function add(input: OpportunityInput) {
    creating.current = true;
    try {
      const created = await createOpportunity(input);
      setItems((prev) => [created, ...prev]);
      return created;
    } finally {
      creating.current = false;
    }
  }

  async function patch(id: string, input: OpportunityInput) {
    // optimistic
    setItems((prev) => prev.map((o) => (o.id === id ? { ...o, ...input } : o)));
    try {
      const saved = await updateOpportunity(id, input);
      setItems((prev) => prev.map((o) => (o.id === id ? saved : o)));
      return saved;
    } catch (e) {
      console.error(e);
      await load(); // rollback
      throw e;
    }
  }

  async function remove(id: string) {
    const before = items;
    setItems((prev) => prev.filter((o) => o.id !== id));
    try {
      await deleteOpportunity(id);
    } catch (e) {
      console.error(e);
      setItems(before); // rollback
      throw e;
    }
  }

  return {
    opportunities: list,
    total: list.length,
    loading,
    error,
    sortKey,
    sortDir,
    setSortKey,
    setSortDir,
    toggleSort,
    reload: load,
    add,
    patch,
    remove,
    isCreating: () => creating.current,
  };
}

export default useOpportunities;
