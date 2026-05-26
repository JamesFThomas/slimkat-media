import { useTranslations } from "next-intl";
import { type Production } from "../../data/productions.data";

type FeatureInfoProps = {
  production: Production;
};

export const FeatureInfo = ({ production }: FeatureInfoProps) => {
  const t = useTranslations("ProductionsPage");

  const stats = [
    { label: t('featureInfo.year'),         value: t(production.yearKey) },
    { label: t('featureInfo.category'),     value: t(production.categoryKey) },
    { label: t('featureInfo.runtime'),      value: t(production.runtimeKey) },
    { label: t('featureInfo.festivals'),    value: t(production.festivalsKey) },
    { label: t('featureInfo.distribution'), value: t(production.distributionKey) },
    { label: t('featureInfo.status'),       value: t(production.statusKey) },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-1 p-3 rounded-lg bg-[var(--muted)]"
          >
            <span className="text-xs text-[var(--muted-foreground)]">
              {label}
            </span>
            <span className="text-sm font-medium">{value}</span>
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
