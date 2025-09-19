import type { Lead, LeadUpdate } from "../types";
import { storageGet, storageSet } from "@/lib/storage";

const K_LEADS_OVERRIDES = "leads:overrides:v1";

type LeadOverrides = Record<string, LeadUpdate>;

function loadOverrides(): LeadOverrides {
  return storageGet<LeadOverrides>(K_LEADS_OVERRIDES, {});
}
function saveOverrides(map: LeadOverrides) {
  storageSet(K_LEADS_OVERRIDES, map);
}

function applyOverrides(base: Lead[], overrides: LeadOverrides): Lead[] {
  return base.map((l) => ({ ...l, ...(overrides[l.id] ?? {}) }));
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Fetches leads from JSON and applies persisted overrides */
export async function fetchLeads(): Promise<Lead[]> {
  await sleep(600);
  const res = await fetch("/data/leads.json");
  if (!res.ok) throw new Error("Erro ao carregar leads");
  const base: Lead[] = await res.json();
  const merged = applyOverrides(base, loadOverrides());
  return merged;
}

/** Updates and persists lead fields (email/status/etc.)*/
export async function updateLead(id: string, patch: LeadUpdate): Promise<void> {
  await sleep(300);
  const overrides = loadOverrides();
  overrides[id] = { ...(overrides[id] ?? {}), ...patch };
  saveOverrides(overrides);
}

/** Optional: Remove override from a lead */
export async function clearLeadOverride(id: string): Promise<void> {
  const overrides = loadOverrides();
  delete overrides[id];
  saveOverrides(overrides);
}

/** Optional: Clear all overrides */
export async function clearAllLeadOverrides(): Promise<void> {
  saveOverrides({});
}
