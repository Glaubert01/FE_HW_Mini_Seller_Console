import type { Lead } from "../types";

/**
 * Simula latência de rede
 */
function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Busca os leads do JSON local
 */
export async function fetchLeads(): Promise<Lead[]> {
  await simulateDelay(800); // 800ms de delay para parecer "real"

  const response = await fetch("/data/leads.json");
  if (!response.ok) {
    throw new Error("Erro ao carregar leads");
  }

  const data: Lead[] = await response.json();
  return data;
}
