import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CarouselItem, CarouselItemData } from "./CarouselItem";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

const mockItem: CarouselItemData = {
  id: 1,
  leftImage: "/images/left.png",
  leftAlt: "Left image",
  rightImage: "/images/right.png",
  rightAlt: "Right image",
};

/*
 * Story: Visitor sees a single carousel image pair
 * In order to view Slim Kat Media's portfolio images,
 * a visitor wants each carousel item to display its left and right images.
 *
 * Scenario: CarouselItem renders both images
 *   Given a carousel item with left and right image data
 *   When the CarouselItem mounts
 *   Then both images should be visible with correct alt text
 *
 * Scenario: CarouselItem renders the item container
 *   Given a carousel item with valid data
 *   When the CarouselItem mounts
 *   Then the carousel item wrapper should be present in the DOM
 */
describe("CarouselItem", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders both the left and right images with correct alt text", () => {
    render(<CarouselItem data={mockItem} />);
    expect(screen.getByAltText("Left image")).toBeInTheDocument();
    expect(screen.getByAltText("Right image")).toBeInTheDocument();
  });

  it("renders the carousel item wrapper", () => {
    render(<CarouselItem data={mockItem} />);
    expect(document.getElementById("carousel-item")).toBeInTheDocument();
  });
});
