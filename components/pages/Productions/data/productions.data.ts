export interface PressLink {
  label: string;
  url: string;
  info: string;
}

export type ProductionTabType =
  | "trailer"
  | "press"
  | "filmLocator"
  | "credits"
  | "fiscalSponsors";

export interface ProductionTab {
  type: ProductionTabType;
  labelKey: string; // translation key for the tab button label
}

export interface Production {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageUrlHorizontal?: string;
  imageAlt: string;
  yearKey: string;
  categoryKey: string;
  runtimeKey: string;
  distributionKey: string;
  statusKey: string;
  longDescriptionKey: string;
  pressLinksKey: string;
  tabs?: ProductionTab[]; // ordered tabs to render; omit entirely for productions with none
}

export const productions: Production[] = [
  {
    id: 1,
    title: "productions.production1.title",
    description: "productions.production1.description",
    imageUrl: "/logo/Farming_Freedom_Logo2.png",
    imageUrlHorizontal: "/logo/Farming_Freedom_Horizontal.png",
    imageAlt: "productions.production1.imageAlt",
    yearKey: "productions.production1.year",
    categoryKey: "productions.production1.category",
    runtimeKey: "productions.production1.runtime",
    distributionKey: "productions.production1.distribution",
    statusKey: "productions.production1.status",
    longDescriptionKey: "productions.production1.longDescription",
    pressLinksKey: "productions.production1.pressLinks",
    tabs: [
      { type: "trailer", labelKey: "productions.production1.tabs.trailer" },
      { type: "press", labelKey: "productions.production1.tabs.press" },
      {
        type: "filmLocator",
        labelKey: "productions.production1.tabs.filmLocator",
      },
    ],
  },
  {
    id: 2,
    title: "productions.production2.title",
    description: "productions.production2.description",
    imageUrl: "/logo/nursing_history_logo.png",
    imageUrlHorizontal: "/logo/nursing_history_horizontal.png",
    imageAlt: "productions.production2.imageAlt",
    yearKey: "productions.production2.year",
    categoryKey: "productions.production2.category",
    runtimeKey: "productions.production2.runtime",
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
    imageUrlHorizontal: "/logo/Roots_Returns_Horizontal.png",
    imageAlt: "productions.production3.imageAlt",
    yearKey: "productions.production3.year",
    categoryKey: "productions.production3.category",
    runtimeKey: "productions.production3.runtime",
    distributionKey: "productions.production3.distribution",
    statusKey: "productions.production3.status",
    longDescriptionKey: "productions.production3.longDescription",
    pressLinksKey: "productions.production3.pressLinks",
  },
];
