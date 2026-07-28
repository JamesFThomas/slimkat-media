"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import { FeatureInfo } from "../FeatureInfo/FeatureInfo";
import { FeatureLinks } from "../FeatureLinks/FeatureLinks";
import { LibraryMap } from "../LibraryMap/LibraryMap";
import { useTranslations } from "next-intl";

import {
  productions,
  type Production,
  type ProductionTabType,
} from "../../data/productions.data";

import { ProjectCard } from "@/components/shared/ProjectCard/ProjectCard";

import { Trailer } from "@/components/shared/Trailer/Trailer";

const TAB_ASPECT_CLASS: Partial<Record<ProductionTabType, string>> = {
  filmLocator: "aspect-[1154.4/758.9]",
  trailer: "aspect-video",
};

export const FeatureProductions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations("ProductionsPage");
  const [activeTab, setActiveTab] = useState<ProductionTabType | undefined>(
    productions[0].tabs?.[0]?.type,
  );
  const active: Production = productions[activeIndex];

  const TAB_CONTENT: Partial<
    Record<ProductionTabType, (production: Production) => ReactNode>
  > = {
    press: (production) => (
      <FeatureLinks pressLinksKey={production.pressLinksKey} />
    ),
    filmLocator: () => <LibraryMap />,
    trailer: (production) => (
      <Trailer
        videoId="1212487625"
        title={t(production.title)}
        thumbnailUrl={production.imageUrlHorizontal ?? production.imageUrl}
        thumbnailAlt={t(production.imageAlt)}
      />
    ),
  };

  return (
    <div className="flex flex-col gap-6 w-full p-4">
      {/* Featured row: card left, info right */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        <div className="w-full lg:w-[300px] lg:min-w-[300px] lg:max-w-[300px] shrink-0 [&_img]:lg:h-[380px] [&_img]:lg:w-[300px]">
          <ProjectCard
            id={active.id}
            title={active.title}
            description={active.description}
            imageUrl={active.imageUrl}
            imageUrlHorizontal={active.imageUrlHorizontal}
            imageAlt={active.imageAlt}
            namespace="ProductionsPage"
            showText={false}
            handleProjectCardClick={() => {}} // passing an empty function because click handler will be on the filmstrip buttons below, not the card itself
          />
        </div>
        <div className="w-full min-w-0">
          <FeatureInfo production={active} />
        </div>
      </div>
      {/* Filmstrip */}
      <div className="flex flex-row gap-3 pt-2 border-t border-[var(--border)]">
        {productions.map((production, index) => (
          <button
            key={production.id}
            onClick={() => setActiveIndex(index)}
            className={`relative w-16 h-24 rounded-lg overflow-hidden shrink-0 transition-all duration-200
              ${
                activeIndex === index
                  ? "outline outline-2 outline-[var(--accent-link)] opacity-100"
                  : "opacity-50 hover:opacity-75"
              }`}
          >
            <Image
              src={production.imageUrl}
              alt={String(production.id)}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Production Tabs */}
      {active.tabs && active.tabs.length > 0 ? (
        <div className="flex flex-col gap-4">
          <div
            role="tablist"
            className="flex gap-6 border-b border-[var(--border)]"
          >
            {active.tabs.map((tab) => (
              <button
                key={tab.type}
                role="tab"
                aria-selected={activeTab === tab.type}
                onClick={() => setActiveTab(tab.type)}
                className={`pb-2 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px
            ${
              activeTab === tab.type
                ? "border-[var(--accent-link)] text-[var(--foreground)]"
                : "border-transparent text-[var(--muted-foreground,#888)] hover:text-[var(--foreground)]"
            }`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          <div
            className={`relative w-full ${activeTab ? (TAB_ASPECT_CLASS[activeTab] ?? "") : ""}`}
          >
            {activeTab && TAB_CONTENT[activeTab]?.(active)}
          </div>
        </div>
      ) : (
        <FeatureLinks pressLinksKey={active.pressLinksKey} />
      )}
    </div>
  );
};
