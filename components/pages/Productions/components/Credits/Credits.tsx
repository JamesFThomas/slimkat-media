import { useTranslations } from "next-intl";

type CreditsProps = {
  creditsKey: string;
};

type CreditEntry = {
  name: string;
  role: string;
};

type CreditsContent = {
  heading: string;
  crew: CreditEntry[];
  castHeading: string;
  cast: CreditEntry[];
};

export const Credits = ({ creditsKey }: CreditsProps) => {
  const t = useTranslations("ProductionsPage");
  const content = creditsKey
    ? (t.raw(creditsKey) as CreditsContent | undefined)
    : undefined;

  const crew = content?.crew ?? [];
  const cast = content?.cast ?? [];

  if (crew.length === 0 && cast.length === 0) return null;

  const renderEntries = (entries: CreditEntry[]) => (
    <ul className="flex flex-col gap-4">
      {entries.map((entry, index) => (
        <li key={`${entry.name}-${entry.role}-${index}`}>
          <p className="text-sm font-medium">{entry.name}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            {entry.role}
          </p>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col gap-6 pt-4 border-t border-[var(--border)]">
      {crew.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold tracking-widest uppercase">
            {content?.heading}
          </h3>
          {renderEntries(crew)}
        </div>
      )}

      {cast.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold tracking-widest uppercase">
            {content?.castHeading}
          </h3>
          {renderEntries(cast)}
        </div>
      )}
    </div>
  );
};
