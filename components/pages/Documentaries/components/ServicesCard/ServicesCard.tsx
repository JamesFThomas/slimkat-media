import { ServiceItem } from "../ServicesPanels/ServicesPanels";

interface ServicesCardProps {
  service: ServiceItem;
}

import Link from "next/link";
import { useTranslations } from "next-intl";

export const ServicesCard = ({ service }: ServicesCardProps) => {
  const t = useTranslations("DocumentariesPage");
  return (
    <div
      className="
  flex flex-col
  w-[calc(100%-2rem)] md:w-[35%]
  shrink-0
  p-10 md:p-12
  mx-4 md:mx-8
  gap-6
  bg-gray-50 rounded-lg
  border-b md:border-b-0
  border-gray-200
"
    >
      {/* Package title */}
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
        {service.title}
      </span>

      {/* Price */}
      <p className="text-4xl font-bold">{service.price}</p>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {service.description}
      </p>

      {/* Feature list */}
      <ul className="flex flex-col gap-3">
        {service.features.map((feature, i) => (
          <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA — full width mobile, centered auto width desktop */}
      <div className="mt-auto flex justify-start">
        <Link
          href={`/contact?service=documentary&package=${encodeURIComponent(service.title)}`}
          className="
    w-[calc(100%-2rem)] md:w-auto
    px-10 py-3
    bg-black text-white
    font-semibold rounded-md
    hover:bg-gray-800
    transition-colors
    text-center
  "
        >
          {t("servicesCard.cta")}
        </Link>
      </div>
    </div>
  );
};
