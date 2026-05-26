"use client";

import { useTranslations } from "next-intl";

export const FoundationPage = () => {
  const t = useTranslations("FoundationPage");

  return (
    <div>
      <main className="flex flex-col grow w-full items-center mx-auto gap-4">
        <section id="header" className="flex flex-col text-center gap-2 p-4">
          <h3 id="title" className="text-3xl">
            {t("header.title")}
          </h3>
          <span id="subtitle" className="text-xl text font-medium p-2">
            {t("header.subtitle")}
          </span>
        </section>
      </main>
    </div>
  );
};
