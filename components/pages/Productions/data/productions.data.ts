export interface PressLink {
  label: string;
  url: string;
  info: string;
}

export interface Production {
  id: number;
  title: string; // translation key
  description: string; // translation key
  imageUrl: string;
  imageAlt: string; // translation key
  yearKey: string; // translation key
  categoryKey: string; // translation key
  runtimeKey: string; // translation key
  festivalsKey: string; // translation key
  distributionKey: string; // translation key
  statusKey: string; // translation key
  longDescriptionKey: string; // translation key
  pressLinksKey: string; // base key for t.raw()
}

export const productions: Production[] = [
  {
    id: 1,
    title: "productions.production1.title",
    description: "productions.production1.description",
    imageUrl: "/logo/Farming_Freedom_Logo2.png",
    imageAlt: "productions.production1.imageAlt",
    yearKey: "productions.production1.year",
    categoryKey: "productions.production1.category",
    runtimeKey: "productions.production1.runtime",
    festivalsKey: "productions.production1.festivals",
    distributionKey: "productions.production1.distribution",
    statusKey: "productions.production1.status",
    longDescriptionKey: "productions.production1.longDescription",
    pressLinksKey: "productions.production1.pressLinks",
  },
  {
    id: 2,
    title: "productions.production2.title",
    description: "productions.production2.description",
    imageUrl: "/logo/nursing_history_logo.png",
    imageAlt: "productions.production2.imageAlt",
    yearKey: "productions.production2.year",
    categoryKey: "productions.production2.category",
    runtimeKey: "productions.production2.runtime",
    festivalsKey: "productions.production2.festivals",
    distributionKey: "productions.production2.distribution",
    statusKey: "productions.production2.status",
    longDescriptionKey: "productions.production2.longDescription",
    pressLinksKey: "productions.production2.pressLinks",
  },
  {
    id: 3,
    title: "productions.production3.title",
    description: "productions.production3.description",
    imageUrl: "/logo/Roots_Returns_logo.png",
    imageAlt: "productions.production3.imageAlt",
    yearKey: "productions.production3.year",
    categoryKey: "productions.production3.category",
    runtimeKey: "productions.production3.runtime",
    festivalsKey: "productions.production3.festivals",
    distributionKey: "productions.production3.distribution",
    statusKey: "productions.production3.status",
    longDescriptionKey: "productions.production3.longDescription",
    pressLinksKey: "productions.production3.pressLinks",
  },
];
