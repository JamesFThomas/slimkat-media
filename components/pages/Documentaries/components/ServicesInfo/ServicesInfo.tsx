import { ServiceItem } from "../ServicesPanels/ServicesPanels";

interface ServicesInfoProps {
  service: ServiceItem;
}

export const ServicesInfo = ({ service }: ServicesInfoProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm p-8">
      [ Services Info Grid — {service.title} ]
    </div>
  );
};
