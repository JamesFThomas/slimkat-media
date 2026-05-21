"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface TranslatedTestimonial {
  name: string;
  location: string;
  quote: string;
}

const clientImages = [
  "/images/pages/documentaries/client-1.png",
  "/images/pages/documentaries/client-2.png",
  "/images/pages/documentaries/client-3.png",
  "/images/pages/documentaries/client-4.png",
];

export const ClientTestimonials = () => {
  const t = useTranslations("DocumentariesPage");
  const clients = t.raw("testimonials.clients") as TranslatedTestimonial[];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = clients[activeIndex];

  return (
    <div
      id="client-testimonials"
      className="flex flex-col justify-center p-8 pr-10 md:p-12 h-full gap-6 shrink-0"
    >
      {/* Eyebrow */}
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
        {t("testimonials.eyebrow")}
      </span>

      {/* Active quote */}
      <blockquote className="text-base md:text-lg font-semibold leading-snug">
        &ldquo;{active.quote}&rdquo;
      </blockquote>

      {/* Active client info */}
      <p className="text-sm text-gray-500">
        — {active.name}, {active.location}
      </p>

      {/* Single row of circular thumbnails */}
      <div className="flex flex-row justify-between mt-2 overflow-hidden">
        {clients.map((client, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`
              relative w-12 h-12 cursor-pointer
              rounded-full overflow-hidden
              border-2 transition-colors shrink-0
              ${activeIndex === i ? "border-black" : "border-transparent"}
            `}
          >
            <Image
              src={clientImages[i]}
              alt={client.name}
              fill
              className="object-cover"
            />
            <span className="sr-only">{client.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
