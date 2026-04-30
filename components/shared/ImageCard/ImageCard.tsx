import { useTranslations } from 'next-intl';
import Image from 'next/image';

export type ImageCardData = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
};

export const ImageCard = ({
  id,
  title,
  description,
  imageUrl,
  imageAlt,
}: ImageCardData) => {
  const t = useTranslations('LandingPage');

  return (
    <div id='imageCard-wrapper' className='w-[290px]'>
      <Image
        id={`imageCard-image-${id}`}
        className='w-full aspect-[4/3] rounded-xl'
        src={imageUrl}
        alt={t(imageAlt)}
        width={560}
        height={420}
        sizes='(min-width: 768px) 280px, 100vw'
      />

      <div id={`imageCard-description-${id}`} className='pt-4'>
        <h3 id={`imageCard-title-${id}`} className='text-xl font-bold pb-4'>
          {t(title)}
        </h3>
        <p
          id={`imageCard-text-${id}`}
          className='text-sm leading-6 text-[var(--muted-foreground)]'
        >
          {t(description)}
        </p>
      </div>
    </div>
  );
};
