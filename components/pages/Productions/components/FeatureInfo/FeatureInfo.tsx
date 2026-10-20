import { useTranslations } from "next-intl";
import { type Production } from "../../data/productions.data";

type FeatureInfoProps = {
  production: Production;
};

type FeatureStat = {
  label: string;
  value: string;
  href?: string;
};

export const FeatureInfo = ({ production }: FeatureInfoProps) => {
  const t = useTranslations("ProductionsPage");

  const stats: FeatureStat[] = [
    { label: t("featureInfo.year"), value: t(production.yearKey) },
    { label: t("featureInfo.category"), value: t(production.categoryKey) },
    { label: t("featureInfo.runtime"), value: t(production.runtimeKey) },
    {
      label: t("featureInfo.distribution"),
      value: t(production.distributionKey),
      href: production.distributionUrl,
    },
    { label: t("featureInfo.status"), value: t(production.statusKey) },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map(({ label, value, href }) => (
          <div
            key={label}
            className="flex flex-col gap-1 p-3 rounded-lg bg-[var(--muted)]"
          >
            <span className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
              {label}
            </span>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--accent-link)] hover:underline"
              >
                {value}
              </a>
            ) : (
              <span className="text-sm font-medium">{value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Long description */}
      <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
        {t(production.longDescriptionKey)}
      </p>
    </div>
  );
};
