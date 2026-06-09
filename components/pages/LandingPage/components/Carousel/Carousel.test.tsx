import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Carousel } from "./Carousel";

jest.mock("../Carousel/CarouselItem", () => ({
  CarouselItem: ({ data }: { data: { leftAlt: string; rightAlt: string } }) => (
    <div data-testid="carousel-item">
      <img alt={data.leftAlt} />
      <img alt={data.rightAlt} />
    </div>
  ),
}));

/*
 * Story: Visitor views the landing page image carousel
 * In order to see Slim Kat Media's work at a glance,
 * a visitor on the landing page wants to see a scrolling carousel of images.
 *
 * Scenario: Carousel renders the wrapper
 *   Given I visit the landing page
 *   When the Carousel mounts
 *   Then the carousel wrapper should be present in the DOM
 *
 * Scenario: Carousel renders carousel items
 *   Given the carousel has 6 items defined
 *   When the Carousel mounts
 *   Then it should render 12 carousel items (doubled for infinite scroll)
 */
describe("Carousel", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the carousel wrapper", () => {
    render(<Carousel />);
    expect(document.getElementById("carousel-wrapper")).toBeInTheDocument();
  });

  it("renders 12 carousel items — 6 items doubled for infinite scroll", () => {
    render(<Carousel />);
    expect(screen.getAllByTestId("carousel-item")).toHaveLength(12);
  });
});
