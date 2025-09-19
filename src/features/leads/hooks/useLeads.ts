import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  Lead,
  LeadStatus,
  LeadSource,
  LeadUpdate,
} from "@/features/leads/types";
import {
  fetchLeads,
  updateLead as apiUpdateLead,
} from "@/features/leads/api/leads.api";
import { debounce } from "@/lib/utils";
import { sortByKey } from "@/lib/sort";
import { isEmail } from "@/lib/email";
import { storageGet, storageSet } from "@/lib/storage";

export type LeadsSortKey =
  | "score"
  | "name"
  | "email"
  | "company"
  | "createdAt"
  | "status";
export type SortDir = "asc" | "desc";

type Filters = {
  query: string;
  status: LeadStatus | "all";
  source: LeadSource | "all";
};

type UseLeadsOptions = {
  /** sort inicial (default: score desc) */
  initialSortKey?: LeadsSortKey;
  initialSortDir?: SortDir;
};

// ---- Persistência ----------------------------------------------------------
const PREFS_KEY = "leads:prefs:v1";
type Prefs = { filters: Filters; sortKey: LeadsSortKey; sortDir: SortDir };
const DEFAULT_FILTERS: Filters = { query: "", status: "all", source: "all" };
// ---------------------------------------------------------------------------

export function useLeads(opts: UseLeadsOptions = {}) {
  // carrega preferências salvas (se houver)
  const saved = storageGet<Prefs | null>(PREFS_KEY, null);

  const [raw, setRaw] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<Filters>(
    saved?.filters ?? DEFAULT_FILTERS
  );

  const [sortKey, setSortKey] = useState<LeadsSortKey>(
    saved?.sortKey ?? opts.initialSortKey ?? "score"
  );
  const [sortDir, setSortDir] = useState<SortDir>(
    saved?.sortDir ?? opts.initialSortDir ?? "desc"
  );

  // ---- load ---------------------------------------------------------------
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLeads();
      setRaw(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ---- salvar preferências -------------------------------------------------
  useEffect(() => {
    const prefs: Prefs = { filters, sortKey, sortDir };
    storageSet(PREFS_KEY, prefs);
  }, [filters, sortKey, sortDir]);

  // ---- search (debounced setter) ------------------------------------------
  const setQuery = useMemo(
    () =>
      debounce((q: string) => {
        setFilters((prev) => ({ ...prev, query: q }));
      }, 300),
    []
  );

  const setStatus = (s: Filters["status"]) =>
    setFilters((prev) => ({ ...prev, status: s }));

  const setSource = (s: Filters["source"]) =>
    setFilters((prev) => ({ ...prev, source: s }));

  // ---- sorting (aceita próximo dir opcional) ------------------------------
  const toggleSort = useCallback((key: LeadsSortKey, explicitDir?: SortDir) => {
    if (explicitDir) {
      setSortKey(key);
      setSortDir(explicitDir);
      return;
    }
    // fallback: alterna internamente
    setSortKey((prevKey) => {
      if (prevKey !== key) {
        setSortDir("asc");
        return key;
      }
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
      return prevKey;
    });
  }, []);

  // ---- derived list --------------------------------------------------------
  const list = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    const filtered = raw.filter((l) => {
      const matchQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q);
      const matchStatus =
        filters.status === "all" || l.status === filters.status;
      const matchSource =
        filters.source === "all" || l.source === filters.source;
      return matchQuery && matchStatus && matchSource;
    });

    // ordenar
    const keyGetter = (x: Lead) => {
      switch (sortKey) {
        case "score":
          return x.score;
        case "name":
          return x.name;
        case "email":
          return x.email;
        case "company":
          return x.company;
        case "createdAt":
          return x.createdAt;
        case "status":
          return x.status;
        default:
          return "";
      }
    };

    return sortByKey(filtered, keyGetter, sortDir);
  }, [raw, filters, sortKey, sortDir]);

  // ---- update lead (email/status/etc) -------------------------------------
  const updating = useRef<Set<string>>(new Set());

  async function updateLead(id: string, patch: LeadUpdate) {
    // validação rápida de e-mail quando presente
    if (
      patch.email !== undefined &&
      patch.email !== "" &&
      !isEmail(patch.email)
    ) {
      throw new Error("Invalid e-mail");
    }

    // optimistic update
    setRaw((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    updating.current.add(id);

    try {
      await apiUpdateLead(id, patch);
    } catch (e) {
      // rollback on error: recarrega tudo
      console.error(e);
      await load();
      throw e;
    } finally {
      updating.current.delete(id);
    }
  }

  return {
    // data
    leads: list,
    total: list.length,
    loading,
    error,
    // raw (se precisar)
    all: raw,

    // filters
    filters,
    setQuery, // debounced
    setStatus,
    setSource,

    // sort (controlado)
    sortKey,
    sortDir,
    toggleSort, // <- use na Table: onSort={(key, dir) => toggleSort(key as LeadsSortKey, dir)}
    setSortKey, // opcionais, caso queira controlar manualmente
    setSortDir,

    // actions
    reload: load,
    updateLead,
    isUpdating: (id: string) => updating.current.has(id),
  };
}

export default useLeads;
