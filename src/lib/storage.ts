// Namespaced localStorage wrapper with secure JSON

const NS = "msc"; // mini-seller-console

function key(k: string) {
  return `${NS}:${k}`;
}

export function storageSet<T>(k: string, value: T) {
  try {
    localStorage.setItem(key(k), JSON.stringify(value));
  } catch {
    // ignore quota/private
  }
}

export function storageGet<T>(k: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key(k));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function storageRemove(k: string) {
  try {
    localStorage.removeItem(key(k));
  } catch {
    // ignore
  }
}

export function storageClearNamespace() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(`${NS}:`))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}
