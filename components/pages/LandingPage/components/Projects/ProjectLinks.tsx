"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export type PressLinkObject = {
  id: number;
  title: string;
  href: string;
  info: string;
};

const pressLinkObjects: PressLinkObject[] = [
  {
    id: 1,
    title: "projects.project1.links.Adweek.label",
    href: "https://www.adweek.com/tvspy/mississippi-station-to-air-documentary-about-black-farmers-during-jim-crow-era/",
    info: "projects.project1.links.Adweek.info",
  },
  {
    id: 1,
    title: "projects.project1.links.WLBT.label",
    href: "https://www.wlbt.com/2025/05/05/farming-freedom-director-kayla-thomas-discusses-her-documentary-about-mississippis-african-american-farmers/",
    info: "projects.project1.links.WLBT.info",
  },
  {
    id: 1,
    title: "projects.project1.links.TVNewsCheck.label",
    href: "https://tvnewscheck.com/programming/article/mississippi-documentary-farming-freedom-secures-educational-distribution-through-collective-eye-films/#mai-popup-67d86609b75b5",
    info: "projects.project1.links.TVNewsCheck.info",
  },
];

type ProjectLinksProps = {
  links?: PressLinkObject[];
  activeCardId: number | null;
};

export const ProjectLinks = ({
  links = pressLinkObjects,
  activeCardId,
}: ProjectLinksProps) => {
  const t = useTranslations("LandingPage");

  return (
    <ul
      id="projectLinks-list"
      className="w-full flex flex-col gap-4 mt-8 list-disc pl-6"
    >
      <div
        id="projectLinks-header"
        className="font-semibold text-[var(--foreground)]/70 text-center text-3xl"
      >
        <h1>{t("projects.projectLinksHeader")}</h1>
      </div>
      {links.filter((link) => link.id === activeCardId).length === 0 && (
        <li className="w-full text-center text-[var(--muted-foreground)] py-4">
          {t("projects.noPressLinks")}
        </li>
      )}
      {links.map((link) => (
        <li
          id="projectLink-item"
          hidden={link.id !== activeCardId}
          key={link.id}
          className="w-full border-[var(--muted-foreground)]/30 py-4"
        >
          <Link
            href={link.href}
            className="block text-lg font-semibold tracking-wide text-[var(--accent-link)] hover:text-[color:var(--accent-link-hover)] transition-colors duration-300 ease-out hover:underline underline-offset-4"
          >
            {t(link.title)}
          </Link>
          <p className="text-md leading-6 text-[var(--muted-foreground)] mt-1">
            {t(link.info)}
          </p>
        </li>
      ))}
    </ul>
  );
};
