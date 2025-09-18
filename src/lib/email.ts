// Simple email validation (UI-sufficient)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

/** Normalizes and validates; returns error message or null */
export function validateEmail(value: string): string | null {
  const v = value.trim();
  if (!v) return "E-mail is required";
  if (!isEmail(v)) return "Invalid e-mail";
  return null;
}
