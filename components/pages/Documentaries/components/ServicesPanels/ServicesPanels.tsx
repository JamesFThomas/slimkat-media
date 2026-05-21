import { useTranslations } from "next-intl";
import { ServicesCard } from "../ServicesCard/ServicesCard";
import { ServicesInfo } from "../ServicesInfo/ServicesInfo";

export interface InfoRow {
  label: string;
  value: string | boolean;
}

export interface ServiceItem {
  title: string;
  price: string;
  description: string;
  features: string[];
  infoGrid: InfoRow[];
}

export const ServicesPanels = () => {
  const t = useTranslations("DocumentariesPage");
  const services = t.raw("services.panels") as ServiceItem[];

  return (
    <div className="flex flex-col w-full">
      {services.map((service, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row w-full py-12 border-b border-gray-100"
        >
          <ServicesCard service={service} />
          <div className="hidden md:block flex-1 pr-8 md:pr-12">
            <ServicesInfo service={service} />
          </div>
        </div>
      ))}
    </div>
  );
};
