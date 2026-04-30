import { useTranslations } from 'next-intl';
import Image from 'next/image';

export type ImageCardData = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

export const ImageCard = ({
  id,
  title,
  description,
  imageUrl,
}: ImageCardData) => {
  const t = useTranslations('ImageCard');

  return (
    <div id='imageCard-wrapper' className='w-full max-w-[280px]'>
      <Image
        id={`imageCard-image-${id}`}
        className='w-full aspect-[4/3] rounded-xl bg-purple-100'
        src={imageUrl}
        alt={t('imageAlt', { title })}
        width={290}
        height={240}
      />

      <div id={`imageCard-description-${id}`} className='pt-4'>
        <h3 id={`imageCard-title-${id}`} className='text-xl font-bold'>
          {title}
        </h3>
        <p
          id={`imageCard-text-${id}`}
          className='text-sm leading-6 text-[var(--muted-foreground)]'
        >
          {description}
        </p>
      </div>
    </div>
  );
};
