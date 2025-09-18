// Sorting helper

export type SortDirection = "asc" | "desc";

/** Compare numbers with direction */
export function compareNumber(
  a: number,
  b: number,
  dir: SortDirection = "asc"
) {
  return dir === "asc" ? a - b : b - a;
}

/**
 * Sorts by "score" in DESC order by default.
 * Ex.: sortByScoreDesc(items, (x) => x.score)
 */
export function sortByScoreDesc<T>(items: T[], getScore: (x: T) => number) {
  return [...items].sort((a, b) =>
    compareNumber(getScore(a), getScore(b), "desc")
  );
}

/** Sorts generically by numeric key or string */
export function sortByKey<T>(
  items: T[],
  getKey: (x: T) => string | number,
  dir: SortDirection = "asc"
) {
  return [...items].sort((a, b) => {
    const ka = getKey(a);
    const kb = getKey(b);
    if (typeof ka === "number" && typeof kb === "number") {
      return compareNumber(ka, kb, dir);
    }
    return dir === "asc"
      ? String(ka).localeCompare(String(kb))
      : String(kb).localeCompare(String(ka));
  });
}
