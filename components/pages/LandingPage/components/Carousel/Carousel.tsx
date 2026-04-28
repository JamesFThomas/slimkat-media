import { CarouselItem } from '../Carousel/CarouselItem';

export const Carousel = () => {
  return (
    <div
      id='carousel-wrapper'
      className='flex flex-row flex-nowrap w-full gap-4 overflow-hidden'
    >
      <CarouselItem />
      <CarouselItem />
      <CarouselItem />
      <CarouselItem />
    </div>
  );
};
