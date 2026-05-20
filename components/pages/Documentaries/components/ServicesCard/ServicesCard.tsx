import { ServiceItem } from "../ServicesPanels/ServicesPanels";

interface ServicesCardProps {
  service: ServiceItem;
}

export const ServicesCard = ({ service }: ServicesCardProps) => {
  return (
    <div
      className="
        flex flex-col
        w-full md:w-[50%]
        shrink-0
        p-8
        gap-4
        border-b md:border-b-0 md:border-r
        border-gray-200
      "
    >
      {/* Package title */}
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
        {service.title}
      </span>

      {/* Price */}
      <p className="text-3xl font-bold">{service.price}</p>

      {/* Description */}
      <p className="text-sm text-gray-600">{service.description}</p>

      {/* Feature list */}
      <ul className="flex flex-col gap-2 mt-2">
        {service.features.map((feature, i) => (
          <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className="
          mt-auto
          px-6 py-3
          bg-black text-white
          font-semibold rounded-md
          hover:bg-gray-800
          transition-colors
        "
      >
        {service.ctaLabel}
      </button>
    </div>
  );
};
