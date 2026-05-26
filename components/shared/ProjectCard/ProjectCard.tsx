"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

export type ProjectCardData = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
};

type ProjectCardProps = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  namespace?: string;
  showText?: boolean;
  handleProjectCardClick: (id: number) => void;
};

export const ProjectCard = ({
  id,
  title,
  description,
  imageUrl,
  imageAlt,
  namespace = "LandingPage",
  showText = true,
  handleProjectCardClick,
}: ProjectCardProps) => {
  const t = useTranslations(namespace);

  return (
    <div
      id="projectCard-wrapper"
      className="w-full"
      onClick={() => handleProjectCardClick(id)}
    >
      <Image
        src={imageUrl}
        alt={t(imageAlt)}
        className="w-full aspect-[875/436] lg:aspect-[400/538] object-cover rounded-xl"
        width={400}
        height={538}
      />

      {showText && (
        <div id={`projectCard-description-${id}`} className="pt-4">
          <div
            id="projectCard-title-wrapper"
            className="flex items-center gap-2 pb-4"
          >
            <span
              id="projectCard-title-decoration"
              className="h-4 w-4 rounded-full bg-[var(--accent-link)]"
            />
            <h3 id={`projectCard-title-${id}`} className="text-xl font-bold">
              {t(title)}
            </h3>
          </div>
          <p
            id={`projectCard-text-${id}`}
            className="text-xl leading-6 text-[var(--muted-foreground)]"
          >
            {t(description)}
          </p>
        </div>
      )}
    </div>
  );
};
