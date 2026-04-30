import { useTranslations } from 'next-intl';

// We may need to reuse the car somewhere else so it should be move and renamed Image card
export const ImageCard = ()=> {
    const t = useTranslations('ImageCrad');

    return (
      <div
        id='imageCard-wrapper'
      >
      </div>
    );
};