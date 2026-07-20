/**
 * Security and Sanitization Utilities
 * Protects against XSS, SQL Injection patterns, Malicious URL schemes, and Automated Bot/CSRF floods.
 */

/**
 * Escapes HTML characters to prevent XSS (Cross-Site Scripting) attacks in rendered strings.
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .replace(/`/g, "&#x60;");
}

/**
 * Validates and sanitizes a URL.
 * Only allows HTTP and HTTPS protocols. Rejects javascript:, data:, vbscript:, and other executable URI schemes.
 */
export function sanitizeUrl(url: string | undefined | null): string {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();

  // Explicit check for dangerous protocols
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:") ||
    lower.startsWith("file:")
  ) {
    return "";
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    // If not a full URL, ensure it doesn't contain colon protocol indicators before returning
    if (!trimmed.includes(":")) {
      return `https://${trimmed}`;
    }
  }

  return "";
}

/**
 * Strips dangerous SQL syntax signatures from strings.
 * Enforces parameter safety even in client-side search or query parameters.
 */
export function sanitizeSqlString(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/['";]/g, "") // Strip quotes and semicolons
    .replace(/--/g, "") // Strip SQL single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, "") // Strip SQL block comments
    .replace(/\b(UNION|SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|EXEC|EXECUTE|SCRIPT|TRUNCATE)\b/gi, "");
}

/**
 * Validates honeypot field.
 * Returns true if clean (honeypot field is empty), false if filled out by an automated bot.
 */
export function validateHoneypot(value: string | undefined | null): boolean {
  return !value || value.trim() === "";
}

/**
 * Client-side rate-limiting helper.
 * Prevents rapid-fire form resubmission or CSRF/replay spamming.
 */
export function checkRateLimit(actionKey: string, cooldownMs: number = 4000): boolean {
  try {
    const storageKey = `rate_limit_${actionKey}`;
    const lastTimestamp = sessionStorage.getItem(storageKey);
    const now = Date.now();

    if (lastTimestamp) {
      const timeElapsed = now - parseInt(lastTimestamp, 10);
      if (timeElapsed < cooldownMs) {
        return false; // Rate limit exceeded
      }
    }

    sessionStorage.setItem(storageKey, now.toString());
    return true;
  } catch {
    // Fallback if sessionStorage is disabled
    return true;
  }
}
