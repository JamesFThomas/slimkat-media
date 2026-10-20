import { useTranslations } from "next-intl";

type FiscalSponsorsProps = {
  fiscalSponsorsKey: string;
};

type FiscalSponsorsContent = {
  heading: string;
  grantStatement: string;
  sponsorsIntro: string;
  sponsors: string[];
};

export const FiscalSponsors = ({ fiscalSponsorsKey }: FiscalSponsorsProps) => {
  const t = useTranslations("ProductionsPage");
  const content = fiscalSponsorsKey
    ? (t.raw(fiscalSponsorsKey) as FiscalSponsorsContent | undefined)
    : undefined;

  const sponsors = content?.sponsors ?? [];

  if (!content?.grantStatement && sponsors.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 pt-4 border-t border-[var(--border)]">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold tracking-widest uppercase">
          {content?.heading}
        </h3>
        {content?.grantStatement && (
          <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
            {content.grantStatement}
          </p>
        )}
      </div>

      {sponsors.length > 0 && (
        <div className="flex flex-col gap-3">
          {content?.sponsorsIntro && (
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
              {content.sponsorsIntro}
            </p>
          )}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {sponsors.map((sponsor, index) => (
              <li key={`${sponsor}-${index}`} className="text-sm font-medium">
                {sponsor}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
