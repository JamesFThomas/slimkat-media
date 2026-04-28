import { CarouselItem, CarouselItemData } from '../Carousel/CarouselItem';

export const Carousel = () => {
  const carouselItems: CarouselItemData[] = [
    {
      id: 1,
      leftImage: '/images/item1-left.jpg',
      leftAlt: 'Item 1 Left',
      rightImage: '/images/item1-right.jpg',
      rightAlt: 'Item 1 Right',
    },
    {
      id: 2,
      leftImage: '/images/item2-left.jpg',
      leftAlt: 'Item 2 Left',
      rightImage: '/images/item2-right.jpg',
      rightAlt: 'Item 2 Right',
    },
    {
      id: 3,
      leftImage: '/images/item3-left.jpg',
      leftAlt: 'Item 3 Left',
      rightImage: '/images/item3-right.jpg',
      rightAlt: 'Item 3 Right',
    },
    {
      id: 4,
      leftImage: '/images/item4-left.jpg',
      leftAlt: 'Item 4 Left',
      rightImage: '/images/item4-right.jpg',
      rightAlt: 'Item 4 Right',
    },
    {
      id: 5,
      leftImage: '/images/item5-left.jpg',
      leftAlt: 'Item 5 Left',
      rightImage: '/images/item5-right.jpg',
      rightAlt: 'Item 5 Right',
    },
    {
      id: 6,
      leftImage: '/images/item6-left.jpg',
      leftAlt: 'Item 6 Left',
      rightImage: '/images/item6-right.jpg',
      rightAlt: 'Item 6 Right',
    },
  ];

  return (
    <div id='carousel-wrapper' className='w-full overflow-hidden'>
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
