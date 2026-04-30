import {
  ImageCard,
  ImageCardData,
} from '@/components/shared/ImageCard/ImageCard';

type ServicesImageListProps = {
  images?: ImageCardData[];
  activeImageId: number;
};

// All test needs to be localized once testing is done
const imagesList: ImageCardData[] = [
  {
    id: 1,
    title: 'Legacy Documentaries',
    description:
      'Discover our impactful documentaries that preserve history and inspire change.',
    imageUrl: '/services/legacy-documentaries.jpg',
  },
  {
    id: 2,
    title: 'The Foundation',
    description:
      'Learn about our foundation’s mission to support emerging filmmakers and storytellers.',
    imageUrl: '/services/the-foundation.jpg',
  },
  {
    id: 3,
    title: 'Our Work',
    description:
      'Explore our diverse portfolio of productions that captivate audiences worldwide.',
    imageUrl: '/services/our-work.jpg',
  },
];

export const ServicesImageList = ({
  images = imagesList,
  activeImageId,
}: ServicesImageListProps) => {
  return (
    <div
      id='servicesImageList-wrapper'
      className='w-full flex flex-col gap-6 md:mt-8'
    >
      {images?.map((image) => (
        <div
          key={image.id}
          hidden={image.id !== activeImageId}
          className='w-full max-w-[280px] animate-in fade-in duration-300'
        >
          <ImageCard {...image} />
        </div>
      ))}
    </div>
  );
};
