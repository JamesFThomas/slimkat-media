import { ServicesCard } from "../ServicesCard/ServicesCard";
import { ServicesInfo } from "../ServicesInfo/ServicesInfo";

export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaLabel: string;
}

const services: ServiceItem[] = [
  {
    id: "single-legacy",
    title: "[ Package Title ]",
    price: "[ $0,000 ]",
    description: "[ Package description placeholder ]",
    features: ["[ Feature 1 ]", "[ Feature 2 ]", "[ Feature 3 ]"],
    ctaLabel: "[ CTA Label ]",
  },
  // TODO: add remaining service objects
];

export const ServicesPanels = () => {
  return (
    <div className="flex flex-col w-full">
      {services.map((service) => (
        <div key={service.id} className="flex flex-col md:flex-row w-full">
          <ServicesCard service={service} />
          <div className="hidden md:block flex-1">
            <ServicesInfo service={service} />
          </div>
        </div>
      ))}
    </div>
  );
};
