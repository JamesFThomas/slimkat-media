import { useTranslations } from "next-intl";

type FeatureLinksProps = {
  pressLinksKey: string;
};

type PressLink = {
  label: string;
  url: string;
  info: string;
};

export const FeatureLinks = ({ pressLinksKey }: FeatureLinksProps) => {
  const t = useTranslations("ProductionsPage");
  const links = t.raw(pressLinksKey) as Record<string, PressLink>;
  const linkEntries = Object.entries(links);

  if (linkEntries.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 pt-4 border-t border-[var(--border)]">
      <h3 className="text-sm font-bold tracking-widest uppercase">
        Press Highlights
      </h3>
      <ul className="flex flex-col gap-4">
        {linkEntries.map(([key, link]) => (
          <li key={key}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--accent-link)] hover:underline"
            >
              {link.label}
            </a>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              {link.info}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
