import { CarouselItem, CarouselItemData } from '../Carousel/CarouselItem';

export const Carousel = () => {
  const carouselItems: CarouselItemData[] = [
    {
      id: 1,
      leftImage: '/images/carousel/item1-left.png',
      leftAlt: 'Item 1 Left',
      rightImage: '/images/carousel/item1-right.png',
      rightAlt: 'Item 1 Right',
    },
    {
      id: 2,
      leftImage: '/images/carousel/item2-left.png',
      leftAlt: 'Item 2 Left',
      rightImage: '/images/carousel/item2-right.png',
      rightAlt: 'Item 2 Right',
    },
    {
      id: 3,
      leftImage: '/images/carousel/item3-left.png',
      leftAlt: 'Item 3 Left',
      rightImage: '/images/carousel/item3-right.png',
      rightAlt: 'Item 3 Right',
    },
    {
      id: 4,
      leftImage: '/images/carousel/item4-left.png',
      leftAlt: 'Item 4 Left',
      rightImage: '/images/carousel/item4-right.png',
      rightAlt: 'Item 4 Right',
    },
    {
      id: 5,
      leftImage: '/images/carousel/item5-left.png',
      leftAlt: 'Item 5 Left',
      rightImage: '/images/carousel/item5-right.png',
      rightAlt: 'Item 5 Right',
    },
    {
      id: 6,
      leftImage: '/images/carousel/item6-left.png',
      leftAlt: 'Item 6 Left',
      rightImage: '/images/carousel/item6-right.png',
      rightAlt: 'Item 6 Right',
    },
  ];

  return (
    <div id='carousel-wrapper' className='w-full overflow-hidden py-8 md:py-12'>
      <div
        id='carousel-track'
        className='flex w-max flex-nowrap gap-4 animate-[marquee_35s_linear_infinite]'
      >
        {[...carouselItems, ...carouselItems].map((item, index) => (
          <CarouselItem key={`${item.id}-${index}`} data={item} />
        ))}
      </div>
    </div>
  );
};
