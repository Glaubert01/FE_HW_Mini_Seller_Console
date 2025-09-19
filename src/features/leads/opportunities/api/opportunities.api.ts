import type { Opportunity, OpportunityInput, Stage } from "../types";
import { storageGet, storageSet } from "@/lib/storage";

const K_OPPS = "opportunities:v1";

// ----------------- helpers -----------------
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const uid = (p = "opp") => `${p}_${Math.random().toString(36).slice(2, 9)}`;

function load(): Opportunity[] {
  return storageGet<Opportunity[]>(K_OPPS, []);
}

function save(db: Opportunity[]) {
  storageSet(K_OPPS, db);
}

// seed opcional
function seedIfEmpty() {
  const db = load();
  if (db.length === 0) {
    const now = new Date().toISOString();
    const seeded: Opportunity[] = [
      {
        id: uid(),
        name: "Acme - Website Revamp",
        company: "Acme Inc.",
        email: "cto@acme.example.com",
        value: 12000,
        stage: "prospecting",
        createdAt: now,
        notes: "Initial contact by referral",
      },
    ];
    save(seeded);
  }
}
seedIfEmpty();

// ----------------- API -----------------

export async function listOpportunities(delay = 400): Promise<Opportunity[]> {
  await sleep(delay);
  return load();
}

export async function createOpportunity(
  input: OpportunityInput,
  delay = 400
): Promise<Opportunity> {
  await sleep(delay);
  const db = load();

  const opp: Opportunity = {
    id: uid(),
    name: input.name ?? "Untitled",
    company: input.company ?? "",
    email: input.email ?? "",
    value: input.value ?? 0,
    stage: (input.stage as Stage) ?? "prospecting",
    createdAt: new Date().toISOString(),
    notes: input.notes ?? "",
    leadId: input.leadId,
  };

  db.unshift(opp);
  save(db);
  return opp;
}

export async function updateOpportunity(
  id: string,
  patch: OpportunityInput,
  delay = 400
): Promise<Opportunity> {
  await sleep(delay);
  const db = load();
  const idx = db.findIndex((o) => o.id === id);
  if (idx === -1) throw new Error("Opportunity not found");

  db[idx] = { ...db[idx], ...patch };
  save(db);
  return { ...db[idx] };
}

export async function deleteOpportunity(
  id: string,
  delay = 300
): Promise<void> {
  await sleep(delay);
  const db = load();
  const next = db.filter((o) => o.id !== id);
  if (next.length === db.length) throw new Error("Opportunity not found");
  save(next);
}

export async function resetOpportunities(seed = true): Promise<void> {
  save([]);
  if (seed) seedIfEmpty();
}
