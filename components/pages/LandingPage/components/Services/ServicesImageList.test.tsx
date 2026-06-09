import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ServicesImageList } from "./ServicesImageList";
import { ImageCardData } from "@/components/shared/ImageCard/ImageCard";

jest.mock("@/components/shared/ImageCard/ImageCard", () => ({
  ImageCard: ({ title }: { title: string }) => (
    <div data-testid="image-card">{title}</div>
  ),
}));

const mockImages: ImageCardData[] = [
  {
    id: 1,
    title: "Legacy Documentaries",
    description: "Description one",
    imageUrl: "/img/1.png",
    imageAlt: "Image one",
  },
  {
    id: 2,
    title: "The Foundation",
    description: "Description two",
    imageUrl: "/img/2.png",
    imageAlt: "Image two",
  },
];

/*
 * Story: Visitor hovers over a service link and sees the matching image
 * In order to visually explore Slim Kat Media's services,
 * a visitor wants to see an image appear when hovering a service link.
 *
 * Scenario: ServicesImageList renders the wrapper
 *   Given a list of images and an active image id
 *   When ServicesImageList mounts
 *   Then the wrapper should be present in the DOM
 *
 * Scenario: Only the active image is visible
 *   Given activeImageId is 1
 *   When ServicesImageList renders
 *   Then only the image with id 1 should be visible
 *
 * Scenario: Non-active images are hidden
 *   Given activeImageId is 1
 *   When ServicesImageList renders
 *   Then the image with id 2 should be hidden
 */
describe("ServicesImageList", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the services image list wrapper", () => {
    render(<ServicesImageList images={mockImages} activeImageId={1} />);
    expect(
      document.getElementById("servicesImageList-wrapper")
    ).toBeInTheDocument();
  });

  it("shows only the image matching the active image id", () => {
    render(<ServicesImageList images={mockImages} activeImageId={1} />);
    const cards = screen.getAllByTestId("image-card");
    const activeWrapper = cards[0].closest("[hidden]");
    expect(activeWrapper).toBeNull();
  });

  it("hides images that do not match the active image id", () => {
    render(<ServicesImageList images={mockImages} activeImageId={1} />);
    const allWrappers = document
      .getElementById("servicesImageList-wrapper")!
      .querySelectorAll("[hidden]");
    expect(allWrappers.length).toBe(1);
  });
});
