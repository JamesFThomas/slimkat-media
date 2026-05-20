import { useTranslations } from "next-intl";

export const ClientTestimonials = () => {
  const t = useTranslations("DocumentariesPage");

  return (
    <div
      id="client-testimonials"
      className="flex flex-col justify-center
            p-8 md:p-12 h-full
            gap-6
            shrink-0"
    >
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
        {/* TODO: section eyebrow label */}[ Eyebrow Label ]
      </span>

      {/* Active testimonial quote */}
      <blockquote className="text-2xl md:text-3xl font-semibold leading-snug">
        &ldquo;[ Active testimonial quote ]&rdquo;
      </blockquote>

      <p className="text-sm text-gray-500">
        — [ Client Name ], [ Location or package ]
      </p>

      {/* Thumbnail controls — clicking changes active testimonial */}
      <div className="flex flex-row gap-3 mt-2">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            className="
                  w-12 h-12
                  rounded-full
                  bg-gray-200
                  border-2 border-transparent
                  hover:border-black
                  transition-colors
                  overflow-hidden
                "
          >
            <span className="sr-only">Testimonial {i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
