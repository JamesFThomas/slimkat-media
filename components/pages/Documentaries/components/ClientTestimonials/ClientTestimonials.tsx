"use client";

import { useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Patricia Williams",
    location: "Jackson, MS",
    quote:
      "Slim Kat Media gave our family something we will treasure for generations. Watching my mother tell her story on screen was one of the most emotional and beautiful experiences of my life.",
    image: "/images/pages/documentaries/client-1.png",
  },
  {
    id: 2,
    name: "Marcus & Denise Johnson",
    location: "New Orleans, LA",
    quote:
      "We had no idea how powerful this would be. Our grandmother had never told some of these stories before. Now they live forever.",
    image: "/images/pages/documentaries/client-2.png",
  },
  {
    id: 3,
    name: "Renée Thibodaux",
    location: "Baton Rouge, LA",
    quote:
      "The crew made everyone feel completely at ease. The final documentary brought our whole family to tears — the good kind.",
    image: "/images/pages/documentaries/client-3.png",
  },
  {
    id: 4,
    name: "The Caldwell Family",
    location: "Atlanta, GA",
    quote:
      "From the first call to the final film, every detail was handled with such care and professionalism. This was worth every penny.",
    image: "/images/pages/documentaries/client-4.png",
  },
  // {
  //   id: 5,
  //   name: "Darnell & Sandra Pierce",
  //   location: "Memphis, TN",
  //   quote:
  //     "Our family reunion documentary was beyond anything we imagined. Slim Kat Media turned a weekend into a legacy.",
  //   image: "/images/pages/documentaries/client-5.png",
  // },
];

export const ClientTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  return (
    <div
      id="client-testimonials"
      className="flex flex-col justify-center p-8 pr-10 md:p-12 h-full gap-6 shrink-0"
    >
      {/* Eyebrow */}
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
        Every family has a story, let&apos;s capture yours.
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
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActiveIndex(i)}
            className={`
              relative w-12 h-12
              rounded-full overflow-hidden
              border-2 transition-colors shrink-0
              ${activeIndex === i ? "border-black" : "border-transparent"}
            `}
          >
            <Image src={t.image} alt={t.name} fill className="object-cover" />
            <span className="sr-only">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
