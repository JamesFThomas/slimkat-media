"use client";

import { useTranslations } from "next-intl";
import { Carousel } from "./components/Carousel/Carousel";
import { ServicesLinks } from "./components/Services/ServicesLinks";
import { ServicesImageList } from "./components/Services/ServicesImageList";
import { useState } from "react";
import { ProjectCardList } from "./components/Projects/ProjectCardList";

export const LandingPage = () => {
  const t = useTranslations("LandingPage");

  const [activeServiceId, setActiveServiceId] = useState<number>(1);

  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  const handleServiceLinkHover = (id: number) => {
    setActiveServiceId(id);
  };

  const handleProjectCardClick = (id: number) => {
    setActiveProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <main className="flex flex-col grow w-full items-center mx-auto gap-4">
        {/* Hero Section */}
        <section
          id="hero"
          className="flex flex-col items-center text-center w-full pt-32 py-12 min-h-[100vh] justify-evenly"
        >
          <div className="flex flex-col items-center gap-1">
            <>
              {/* Logo alternates for light and dark modes */}
              <img
                src="/logo/SlimKat_Logo_Black.png"
                alt="Slim Kat Media"
                className="logo-light h-16 sm:h-20 w-auto"
              />
              <img
                src="/logo/SlimKat_Logo_White1.png"
                alt="Slim Kat Media"
                className="logo-dark h-16 sm:h-20 w-auto"
              />
            </>
            <span
              id="subtitle"
              className="text-base sm:text-xl md:text-2xl font-normal text-[var(--muted-foreground)]"
            >
              {t("hero.title")}
            </span>
          </div>

          <Carousel />
        </section>

        {/* Description Section */}
        <section
          id="description"
          className=" pb-24 md:pb-32 text-center max-w-4xl mx-auto text-4xl font-semibold leading-tight space-y-1"
        >
          <p>{t("about.aboutLine1")}</p>
          <p>{t("about.aboutLine2")}</p>
          <p>{t("about.aboutLine3")}</p>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full">
          <div
            id="services-wrapper"
            className="flex flex-col items-center gap-4 px-4 py-16 md:py-24 w-full max-w-[1280px] mx-auto text-[var(--foreground)]"
          >
            <div
              id="services-header-wrapper"
              className="flex flex-col items-center gap-4"
            >
              <h1
                id="services-header"
                className="text-5xl md:text-6xl xl:text-8xl font-bold"
              >
                {t("services.header")}
              </h1>

              <p
                id="services-description"
                className="text-center text-xl font-medium max-w-2xl mx-auto text-[var(--foreground)]/70"
              >
                {t("services.description")}
              </p>
            </div>
            <div
              id="services-list-grid"
              className="grid grid-cols-1 lg:grid-cols-7 gap-16 m-3 w-full max-w-[1400px] mx-auto"
            >
              <div
                id="services-images"
                className="hidden lg:block lg:col-span-2"
              >
                <ServicesImageList activeImageId={activeServiceId} />
              </div>
              <div id="services-list" className="md:col-span-6 lg:col-span-5">
                <ServicesLinks
                  handleServiceLinkHover={handleServiceLinkHover}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full">
          <div
            id="projects-wrapper"
            className="flex flex-col items-center gap-4 px-4 py-16 md:py-24 w-full mx-auto"
          >
            <h1
              id="projects-header"
              className="text-5xl md:text-6xl xl:text-8xl font-bold text-center"
            >
              {t("projects.header")}
            </h1>

            <p
              id="projects-description"
              className="text-center text-xl font-medium max-w-2xl mx-auto text-[var(--foreground)]/70"
            >
              {t("projects.description")}
            </p>

            <div
              id="projects-cards"
              className="w-full mt-12 flex fit-content justify-center"
            >
              <ProjectCardList
                activeCardId={activeProjectId}
                handleProjectCardClick={handleProjectCardClick}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
