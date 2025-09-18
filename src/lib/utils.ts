// Utils generics (includes debounce)

/** Wait N ms (useful in mocks/tests) */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Debounce: executes fn after a period of no new calls */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait = 300
) {
  let t: number | undefined;
  return (...args: Parameters<T>) => {
    window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), wait);
  };
}

/** Merge de classes utilitário (se usar clsx fora dos componentes) */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Safe JSON parse com fallback */
export function safeJsonParse<T>(value: string | null, fallback: T): T {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** Generates a simple id (ex.: to mocks) */
export const uid = (prefix = "id") =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
