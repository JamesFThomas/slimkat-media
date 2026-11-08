/*
 * Guards applied to the public form submission routes before anything is
 * written to the spreadsheet or sent through Resend.
 *
 * Neither check is strong alone. They sit behind the Vercel WAF rate limit
 * rule, which handles volume, and cover the two cases volume limiting
 * cannot: a bot driving the real page in a browser, and a script posting
 * directly with no browser context at all.
 */

/**
 * Name of the honeypot field carried by every submission form.
 *
 * Deliberately not a name a browser or password manager would autofill,
 * since an autofilled value would silently discard a real submission. A
 * visitor never reaches the input, so a value means the request came from
 * something that read the DOM and filled every field it found.
 */
export const HONEYPOT_FIELD = "submissionRef";

/**
 * True when the honeypot field arrived with a value.
 *
 * Callers answer these with the same success response a real submission
 * receives, while writing no row and sending no email. A bot told it
 * succeeded moves on; a bot told it failed retries without the field.
 */
export const isHoneypotFilled = (body: unknown): boolean => {
  const value = (body as Record<string, unknown> | null)?.[HONEYPOT_FIELD];

  return typeof value === "string" && value.trim() !== "";
};

/**
 * True when the request came from a browser on this same site.
 *
 * Compared against the request's own host rather than a configured domain,
 * so preview deployments and localhost keep working with no per environment
 * value to maintain. A missing Origin header fails, which is what turns away
 * a plain scripted POST, at the cost of rejecting the rare client that
 * strips the header.
 */
export const isSameOrigin = (request: Request): boolean => {
  const origin = request.headers.get("origin");

  if (!origin) return false;

  const host = request.headers.get("host") ?? new URL(request.url).host;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};
