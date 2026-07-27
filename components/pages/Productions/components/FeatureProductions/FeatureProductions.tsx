"use client";

import { useState } from "react";
import Image from "next/image";
import { FeatureInfo } from "../FeatureInfo/FeatureInfo";
import { FeatureLinks } from "../FeatureLinks/FeatureLinks";
import { LibraryMap } from "../LibraryMap/LibraryMap";
import { productions, type Production } from "../../data/productions.data";
import { ProjectCard } from "@/components/shared/ProjectCard/ProjectCard";

const LIBRARY_DATA_PRODUCTION_ID = 1;

type ProductionsTab = "press" | "libraries";

export const FeatureProductions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<ProductionsTab>("press");
  const active: Production = productions[activeIndex];

  const hasLibraryData = active.id === LIBRARY_DATA_PRODUCTION_ID;

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
      {/* Press Highlights / Libraries tabs */}
      {hasLibraryData ? (
        <div className="flex flex-col gap-6">
          <div
            role="tablist"
            className="flex gap-6 border-b border-[var(--border)]"
          >
            <button
              role="tab"
              aria-selected={activeTab === "press"}
              onClick={() => setActiveTab("press")}
              className={`pb-2 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px
          ${
            activeTab === "press"
              ? "border-[var(--accent-link)] text-[var(--foreground)]"
              : "border-transparent text-[var(--muted-foreground,#888)] hover:text-[var(--foreground)]"
          }`}
            >
              Press Highlights
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "libraries"}
              onClick={() => setActiveTab("libraries")}
              className={`pb-2 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px
          ${
            activeTab === "libraries"
              ? "border-[var(--accent-link)] text-[var(--foreground)]"
              : "border-transparent text-[var(--muted-foreground,#888)] hover:text-[var(--foreground)]"
          }`}
            >
              Libraries
            </button>
          </div>

          <div className="w-full aspect-[1154.4/758.9]">
            {activeTab === "press" ? (
              <FeatureLinks pressLinksKey={active.pressLinksKey} />
            ) : (
              <LibraryMap />
            )}
          </div>
        </div>
      ) : (
        <FeatureLinks pressLinksKey={active.pressLinksKey} />
      )}{" "}
    </div>
  );
};
