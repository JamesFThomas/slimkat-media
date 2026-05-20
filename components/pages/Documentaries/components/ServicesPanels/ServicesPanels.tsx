import { ServicesCard } from "../ServicesCard/ServicesCard";
import { ServicesInfo } from "../ServicesInfo/ServicesInfo";

export interface InfoRow {
  label: string;
  value: string | boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaLabel: string;
  infoGrid: InfoRow[];
}

const services: ServiceItem[] = [
  {
    id: "single-legacy",
    title: "Single Legacy Interview",
    price: "$1,600",
    description: "A single interview capturing one family member's story.",
    features: [
      "1 interview",
      "5-minute documentary",
      "Filmed in New Orleans or Jackson, MS",
    ],
    ctaLabel: "Book This Package",
    infoGrid: [
      { label: "Number of Interviews", value: "1" },
      { label: "Documentary Length", value: "5 minutes" },
      { label: "Filming Location", value: "New Orleans or Jackson, MS" },
      { label: "Family Reunion Included", value: false },
    ],
  },
  {
    id: "standard-keepsake",
    title: "Standard Keepsake Documentary",
    price: "$10,000",
    description: "A keepsake documentary featuring two family voices.",
    features: [
      "2 interviews",
      "10-minute documentary",
      "Filmed at family's preferred location",
    ],
    ctaLabel: "Book This Package",
    infoGrid: [
      { label: "Number of Interviews", value: "2" },
      { label: "Documentary Length", value: "10 minutes" },
      { label: "Filming Location", value: "Family's preferred location" },
      { label: "Family Reunion Included", value: false },
    ],
  },
  {
    id: "standard-heritage",
    title: "Standard Heritage Documentary",
    price: "$15,000 – $20,000",
    description:
      "A heritage documentary preserving three generations of story.",
    features: [
      "3 interviews",
      "15-minute documentary",
      "Filmed at family's preferred location",
    ],
    ctaLabel: "Book This Package",
    infoGrid: [
      { label: "Number of Interviews", value: "3" },
      { label: "Documentary Length", value: "15 minutes" },
      { label: "Filming Location", value: "Family's preferred location" },
      { label: "Family Reunion Included", value: false },
    ],
  },
  {
    id: "lasting-legacy",
    title: "Lasting Legacy Documentary",
    price: "Starting at $20,000",
    description:
      "An in-depth legacy documentary for families who want the full story told.",
    features: [
      "3 interviews",
      "20-minute documentary",
      "Filmed at family's preferred location",
    ],
    ctaLabel: "Book This Package",
    infoGrid: [
      { label: "Number of Interviews", value: "3" },
      { label: "Documentary Length", value: "20 minutes" },
      { label: "Filming Location", value: "Family's preferred location" },
      { label: "Family Reunion Included", value: false },
    ],
  },
  {
    id: "family-reunion",
    title: "Family Reunion Documentary",
    price: "$25,000",
    description:
      "The ultimate package — a full documentary plus a 2-day family reunion organized and hosted by Slim Kat Media.",
    features: [
      "3 interviews",
      "20-minute documentary",
      "2-day reunion in New Orleans or Jackson, MS",
    ],
    ctaLabel: "Book This Package",
    infoGrid: [
      { label: "Number of Interviews", value: "3" },
      { label: "Documentary Length", value: "20 minutes" },
      { label: "Filming Location", value: "New Orleans or Jackson, MS" },
      { label: "Family Reunion Included", value: true },
    ],
  },
];

export const ServicesPanels = () => {
  return (
    <div className="flex flex-col w-full">
      {services.map((service) => (
        <div
          key={service.id}
          className="flex flex-col md:flex-row w-full py-12 border-b border-gray-100"
        >
          <ServicesCard service={service} />
          <div className="hidden md:block flex-1 pr-8 md:pr-12">
            <ServicesInfo service={service} />
          </div>
        </div>
      ))}
    </div>
  );
};
