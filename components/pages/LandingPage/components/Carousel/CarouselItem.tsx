import { useTranslations } from 'next-intl';
import Image from 'next/image';

export type CarouselItemData = {
  id: number;
  leftImage: string;
  leftAlt: string;
  rightImage: string;
  rightAlt: string;
};

type CarouselItemProps = {
  data: CarouselItemData;
};

export const CarouselItem = ({ data }: CarouselItemProps) => {
  const t = useTranslations('LandingPage');
  return (
    <div id='carousel-item' className='flex flex-row gap-2 h-[520px] w-[372px]'>
      <div
        id='single-item_left'
        className='relative h-full w-[181px] bg-orange-50 rounded-tl-[5rem] rounded-br-[5rem] overflow-hidden'
      >
        <Image
          id='carousel-image-left'
          className='object-cover'
          src={data.leftImage}
          alt={data.leftAlt}
          fill
        />
      </div>
      <div
        id='single-item_right'
        className='relative h-full w-[181px] bg-emerald-50 rounded-tr-[5rem] rounded-bl-[5rem] overflow-hidden'
      >
        <Image
          id='carousel-image-right'
          className='object-cover'
          src={data.rightImage}
          alt={data.rightAlt}
          fill
        />
      </div>
    </div>
  );
};
