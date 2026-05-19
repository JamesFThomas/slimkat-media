"use client";

import { useTranslations } from "next-intl";
import { ContactForm } from "./components/ContactForm/ContactForm";

export const ContactPage = () => {
  const t = useTranslations("ContactPage");

  return (
    <div>
      <main className="flex flex-col grow w-full items-center mx-auto gap-4">
        <section id="header" className="flex flex-col text-center gap-2 p-4">
          <h1 id="title" className="text-5xl">
            {t("header.title")}
          </h1>
          <span id="subtitle" className="text-xl text font-bold p-2">
            {t("header.subtitle")}
          </span>
        </section>
        <ContactForm />
      </main>
    </div>
  );
};
