import { routing } from "@/i18n/routing";

/**
 * Resolves the locale a submission email should be rendered in.
 *
 * Forms post to an unprefixed /api path, so the locale travels in the
 * request body rather than the route segment. Anything unrecognised falls
 * back to the default locale, so a malformed or absent value still produces
 * a readable email rather than an error.
 */
export const resolveLocale = (value: unknown): string =>
  typeof value === "string" &&
  (routing.locales as readonly string[]).includes(value)
    ? value
    : routing.defaultLocale;
