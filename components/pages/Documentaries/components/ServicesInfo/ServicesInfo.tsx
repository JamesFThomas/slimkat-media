import { ServiceItem } from "../ServicesPanels/ServicesPanels";
import { useTranslations } from "next-intl";

interface ServicesInfoProps {
  service: ServiceItem;
}

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M4 10l4.5 4.5L16 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 10h10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const ServicesInfo = ({ service }: ServicesInfoProps) => {
  const t = useTranslations("DocumentariesPage");
  return (
    <div className="flex flex-col w-full h-full p-10 md:p-12 justify-center gap-0 border border-gray-200 rounded-lg">
      {/* Header row */}
      <div className="flex flex-row justify-between items-end pb-6 border-b border-gray-200">
        <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
          {t("services.pricingFeatures")}
        </span>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-gray-400">{service.title}</span>
          <span className="text-xl font-bold">{service.price}</span>
        </div>
      </div>

      {/* Grid rows */}
      {service.infoGrid.map((row, i) => (
        <div
          key={i}
          className="flex flex-row justify-between items-center py-6 border-b border-gray-200"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-600">
            {row.label}
          </span>
          <div className="text-sm text-gray-800 font-medium">
            {typeof row.value === "boolean" ? (
              row.value ? (
                <CheckIcon />
              ) : (
                <DashIcon />
              )
            ) : (
              <span>{row.value}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
