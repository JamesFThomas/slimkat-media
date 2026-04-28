import { useTranslations } from 'next-intl';

export const CarouselItem = () => {
  const t = useTranslations('LandingPage');
  return (
    <div id='carousel-item' className='flex flex-row gap-2 h-[520px] w-[372px]'>
      <div
        id='single-item_left'
        className='h-full w-1/2 bg-orange-50 rounded-tl-[5rem] rounded-br-[5rem] overflow-hidden'
      >
        {/* Add images later */}
      </div>
      <div
        id='single-item_right'
        className='h-full w-1/2 bg-emerald-50 rounded-tr-[5rem] rounded-bl-[5rem] overflow-hidden'
      >
        {/* Add images later */}
      </div>
    </div>
  );
};
