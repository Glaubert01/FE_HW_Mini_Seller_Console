import type { Lead } from "../types";

/**
 * Simulates network latency
 */
function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch leads from local JSON
 */
export async function fetchLeads(): Promise<Lead[]> {
  await simulateDelay(800); // 800ms delay to look "real"

  const response = await fetch("/data/leads.json");
  if (!response.ok) {
    throw new Error("Erro ao carregar leads");
  }

  const data: Lead[] = await response.json();
  return data;
}
