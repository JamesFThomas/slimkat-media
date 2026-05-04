'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

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
  handleProjectCardClick: (id: number) => void;
};

export const ProjectCard = ({
  id,
  title,
  description,
  imageUrl,
  imageAlt,
  handleProjectCardClick,
}: ProjectCardProps) => {
  const t = useTranslations('LandingPage');
  return (
    <div
      id='projectCard-wrapper'
      className='w-full'
      onClick={() => handleProjectCardClick(id)}
    >
      <Image
        src={imageUrl}
        alt={t(imageAlt)}
        className='w-full aspect-[875/436] lg:aspect-[400/538] object-cover rounded-xl'
        width={400}
        height={538}
      />

      <div id={`projectCard-description-${id}`} className='pt-4'>
        <h3 id={`projectCard-title-${id}`} className='text-2xl font-bold pb-4'>
          {t(title)}
        </h3>
        <p
          id={`projectCard-text-${id}`}
          className='text-xl leading-6 text-[var(--muted-foreground)]'
        >
          {t(description)}
        </p>
      </div>
    </div>
  );
};
