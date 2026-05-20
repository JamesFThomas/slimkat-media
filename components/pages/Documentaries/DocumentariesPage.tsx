"use client";

import { useTranslations } from "next-intl";

export const DocumentariesPage = () => {
  const t = useTranslations("DocumentariesPage");

  return (
    <div className="flex flex-col w-full">
      {/* ─── Hero Section ─────────────────────────────────────────────────────
          Layout: [Image(70) | Text(30)] at md+
                  [Text, Image] stacked on mobile                            */}
      <section
        id="hero"
        className="
          flex flex-col-reverse md:flex-row
          w-full min-h-[500px]
          items-stretch
        "
      >
        {/* Hero — Image block (70% on md+, bottom on mobile) */}
        <div
          id="hero-image"
          className="
            w-full md:w-[70%]
            bg-gray-200
            min-h-[300px] md:min-h-[500px]
            shrink-0
          "
        >
          {/* TODO: replace with <Image> component */}
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            [ Hero Image ]
          </div>
        </div>

        {/* Hero — Text block (30% on md+, top on mobile) */}
        <div
          id="hero-text"
          className="
            w-full md:w-[30%]
            flex flex-col justify-center
            p-8 md:p-12
            gap-4
            shrink-0
          "
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            {/* TODO: section eyebrow label */}[ Eyebrow Label ]
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {/* TODO: hero headline */}[ Hero Headline ]
          </h1>
          <p className="text-base text-gray-600">
            {/* TODO: hero body copy */}[ Hero body copy goes here ]
          </p>
          <div className="mt-4">
            {/* TODO: CTA button — links to /contact?service=documentary */}
            <button className="px-6 py-3 bg-black text-white font-semibold rounded-md">
              [ CTA Button ]
            </button>
          </div>
        </div>
      </section>

      {/* ─── Testimonials Section ─────────────────────────────────────────────
          Layout: [Text+controls(30) | Video(70)] at md+
                  [Text+controls, Video] stacked on mobile                   */}
      <section
        id="testimonials"
        className="
          flex flex-col md:flex-row
          w-full min-h-[500px]
          items-stretch
        "
      >
        {/* Testimonials — Text + controls block (30% on md+, top on mobile) */}
        <div
          id="testimonials-text"
          className="
            w-full md:w-[30%]
            flex flex-col justify-center
            p-8 md:p-12
            gap-6
            shrink-0
          "
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

        {/* Testimonials — Video block (70% on md+, bottom on mobile) */}
        <div
          id="testimonials-video"
          className="
            w-full md:w-[70%]
            bg-gray-100
            min-h-[300px] md:min-h-[500px]
            shrink-0
          "
        >
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            [ Looping Testimonial Videos ]
          </div>
        </div>
      </section>
    </div>
  );
};
