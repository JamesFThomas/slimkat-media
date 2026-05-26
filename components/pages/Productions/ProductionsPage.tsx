"use client";

import { useTranslations } from "next-intl";
import { FeatureProductions } from "./components/FeatureProductions/FeatureProductions";

export const ProductionsPage = () => {
  const t = useTranslations("ProductionsPage");

  return (
    <div>
      <main className="flex flex-col grow w-full items-center mx-auto gap-4">
        <section id="header" className="flex flex-col text-center gap-2 p-4">
          <h1 id="title" className="text-5xl">
            {t("header.title")}
          </h1>
          <span id="subtitle" className="text-xl text font-medium p-2">
            {t("header.subtitle")}
          </span>
        </section>
        <section id="featured" className="w-full max-w-[1100px] mx-auto px-4">
          <FeatureProductions />
        </section>

        <section
          id="speaking"
          className="flex flex-col gap-4 p-4 bg-amber-500 h-[250px] w-full"
        ></section>
      </main>
    </div>
  );
};
