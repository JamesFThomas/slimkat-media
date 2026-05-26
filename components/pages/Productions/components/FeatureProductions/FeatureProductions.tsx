"use client";

import { useState } from "react";
import Image from "next/image";
import { FeatureInfo } from "../FeatureInfo/FeatureInfo";
import { FeatureLinks } from "../FeatureLinks/FeatureLinks";
import { productions, type Production } from "../../data/productions.data";
import { ProjectCard } from "@/components/shared/ProjectCard/ProjectCard";

export const FeatureProductions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active: Production = productions[activeIndex];

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
            imageAlt={active.imageAlt}
            namespace="ProductionsPage"
            showText={false}
            handleProjectCardClick={() => {}}
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

      {/* Press links */}
      <FeatureLinks pressLinksKey={active.pressLinksKey} />
    </div>
  );
};
