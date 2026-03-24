/** True if href is a usable http(s) URL (excludes `#`, empty, and relative fragments). */
export function isValidExternalHref(href) {
  if (href == null || typeof href !== "string") return false;
  return /^https?:\/\//i.test(href.trim());
}
