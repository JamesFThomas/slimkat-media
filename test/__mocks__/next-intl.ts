/*
 * Test double for next-intl.
 *
 * Reads the real messages/en.json rather than a hand maintained map, so
 * tests assert the copy visitors actually see and the two cannot drift
 * apart. Namespace aware, matching useTranslations("Namespace") in the
 * components.
 */
import messages from "../../messages/en.json";

const lookup = (path: string): unknown =>
  path
    .split(".")
    .reduce<unknown>(
      (value, part) =>
        value && typeof value === "object"
          ? (value as Record<string, unknown>)[part]
          : undefined,
      messages,
    );

export const useLocale = () => "en";

export const useTranslations = (namespace?: string) => {
  const resolve = (key: string) =>
    namespace ? `${namespace}.${key}` : key;

  const t = (key: string): string => {
    const value = lookup(resolve(key));
    // Fall back to the key path, so a missing string fails loudly in the
    // assertion rather than silently rendering as empty.
    return typeof value === "string" ? value : resolve(key);
  };

  // Structured data (e.g. press links) is read with t.raw()
  t.raw = (key: string): unknown => lookup(resolve(key));

  return t;
};
