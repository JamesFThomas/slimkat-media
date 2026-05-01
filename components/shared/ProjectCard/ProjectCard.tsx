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

export const ProjectCard = ({
  id,
  title,
  description,
  imageUrl,
  imageAlt,
}: ProjectCardData) => {
  const t = useTranslations('LandingPage');
  return (
    <div id='projectCard-wrapper' className='w-full max-w-[400px] h-[627px]'>
      <Image
        src={imageUrl}
        alt={t(imageAlt)}
        className='w-full rounded-xl'
        width={400}
        height={538}
      />

      <div id={`projectCard-description-${id}`} className='pt-4'>
        <h3 id={`projectCard-title-${id}`} className='text-xl font-bold pb-4'>
          {t(title)}
        </h3>
        <p
          id={`projectCard-text-${id}`}
          className='text-sm leading-6 text-[var(--muted-foreground)]'
        >
          {t(description)}
        </p>
      </div>
    </div>
  );
};
