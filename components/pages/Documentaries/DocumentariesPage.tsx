"use client";

import { useTranslations } from "next-intl";
import { CallToAction } from "./components/CallToAction/CallToAction";
import { ClientTestimonials } from "./components/ClientTestimonials/ClientTestimonials";
import { TestimonialVideo } from "./components/TestimonialVideo/TestimonialVideo";
import { ServicesPanels } from "./components/ServicesPanels/ServicesPanels";
// import { ServicesPanels } from "./components/ServicesPanels/ServicesPanels";

export const DocumentariesPage = () => {
  const t = useTranslations("DocumentariesPage");

  return (
    <div className="flex flex-col w-full">
      <section
        id="hero"
        className="
          flex flex-col-reverse md:flex-row
          w-full min-h-[500px]
          items-stretch
        "
      >
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

        <div id="hero-text" className=" w-full md:w-[30%]">
          <CallToAction />
        </div>
      </section>

      <section
        id="testimonials"
        className="
          flex flex-col md:flex-row
          w-full min-h-[500px]
          items-stretch
        "
      >
        <div id="testimonials-text" className="w-full md:w-[30%]">
          <ClientTestimonials />
        </div>

        <div
          id="testimonials-video"
          className="
            w-full md:w-[70%]
          "
        >
          <TestimonialVideo />
        </div>
      </section>
      <section
        id="services"
        className="
    flex flex-col
    w-full
  "
      >
        {/* TODO: replace with <ServicesPanels /> component */}
        <div className="w-full flex items-center justify-center text-gray-400 text-sm py-12">
          <ServicesPanels />
        </div>
      </section>
    </div>
  );
};
