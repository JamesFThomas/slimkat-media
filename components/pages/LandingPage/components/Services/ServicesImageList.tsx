import {
  ImageCard,
  ImageCardData,
} from "@/components/shared/ImageCard/ImageCard";

// All text needs to be localized once testing is done
const imagesList: ImageCardData[] = [
  {
    id: 1,
    title: "imageCards.legacyDocumentaries.title",
    description: "imageCards.legacyDocumentaries.description",
    imageUrl: "/images/pages/landing/services/legacy-documentaries2.png",
    imageAlt: "imageCards.legacyDocumentaries.imageAlt",
  },
  {
    id: 2,
    title: "imageCards.foundation.title",
    description: "imageCards.foundation.description",
    imageUrl: "/images/pages/landing/services/the-foundation2.png",
    imageAlt: "imageCards.foundation.imageAlt",
  },
  {
    id: 3,
    title: "imageCards.ourWork.title",
    description: "imageCards.ourWork.description",
    imageUrl: "/images/pages/landing/services/our-work3.png",
    imageAlt: "imageCards.ourWork.imageAlt",
  },
];

type ServicesImageListProps = {
  images?: ImageCardData[];
  activeImageId: number;
};

export const ServicesImageList = ({
  images = imagesList,
  activeImageId,
}: ServicesImageListProps) => {
  return (
    <div
      id="servicesImageList-wrapper"
      className="w-full flex flex-col gap-6 md:mt-8 min-h-[400px]"
    >
      {images?.map((image) => (
        <div
          key={image.id}
          hidden={image.id !== activeImageId}
          className="w-full max-w-[280px] animate-in fade-in duration-300"
        >
          <ImageCard {...image} />
        </div>
      ))}
    </div>
  );
};
