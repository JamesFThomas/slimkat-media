import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { LandingPage } from "./LandingPage";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("./components/Carousel/Carousel", () => ({
  Carousel: () => <div data-testid="carousel" />,
}));

jest.mock("./components/Services/ServicesLinks", () => ({
  ServicesLinks: ({ handleServiceLinkHover }: { handleServiceLinkHover: (id: number) => void }) => (
    <div data-testid="services-links" onMouseEnter={() => handleServiceLinkHover(2)} />
  ),
}));

jest.mock("./components/Services/ServicesImageList", () => ({
  ServicesImageList: ({ activeImageId }: { activeImageId: number }) => (
    <div data-testid="services-image-list" data-active={activeImageId} />
  ),
}));

jest.mock("./components/Projects/ProjectCardList", () => ({
  ProjectCardList: ({
    activeCardId,
    handleProjectCardClick,
  }: {
    activeCardId: number | null;
    handleProjectCardClick: (id: number) => void;
  }) => (
    <div
      data-testid="project-card-list"
      data-active={activeCardId}
      onClick={() => handleProjectCardClick(1)}
    />
  ),
}));

/*
 * Story: Visitor lands on the Slim Kat Media home page
 * In order to learn about Slim Kat Media and explore their work,
 * a visitor wants to see the hero, services, and projects sections.
 *
 * Scenario: Hero section renders with logo and subtitle
 *   Given I visit the landing page
 *   When the LandingPage mounts
 *   Then I should see the Slim Kat Media logos and subtitle
 *
 * Scenario: Carousel renders in the hero section
 *   Given the LandingPage has mounted
 *   When I view the hero section
 *   Then the Carousel component should be present
 *
 * Scenario: Services section renders with links and image list
 *   Given the LandingPage has mounted
 *   When I view the services section
 *   Then both ServicesLinks and ServicesImageList should be present
 *
 * Scenario: Hovering a service link updates the active service image
 *   Given the services section is visible
 *   When I hover over a service link
 *   Then the active image id should update to match the hovered link
 *
 * Scenario: Projects section renders the project card list
 *   Given the LandingPage has mounted
 *   When I view the projects section
 *   Then the ProjectCardList should be present
 *
 * Scenario: Clicking a project card sets it as active
 *   Given the projects section is visible
 *   When I click a project card
 *   Then that card's id should become the active card id
 *
 * Scenario: Clicking an active project card deselects it
 *   Given a project card is already active
 *   When I click it again
 *   Then the active card id should return to null
 */
describe("LandingPage", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders both logo images in the hero section", () => {
    render(<LandingPage />);
    const logos = screen.getAllByAltText("Slim Kat Media");
    expect(logos).toHaveLength(2);
  });

  it("renders the hero subtitle", () => {
    render(<LandingPage />);
    expect(screen.getByText("hero.title")).toBeInTheDocument();
  });

  it("renders the Carousel in the hero section", () => {
    render(<LandingPage />);
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  it("renders the ServicesLinks and ServicesImageList", () => {
    render(<LandingPage />);
    expect(screen.getByTestId("services-links")).toBeInTheDocument();
    expect(screen.getByTestId("services-image-list")).toBeInTheDocument();
  });

  it("updates the active service image id when a service link is hovered", () => {
    render(<LandingPage />);
    const servicesList = screen.getByTestId("services-links");
    fireEvent.mouseEnter(servicesList);
    expect(screen.getByTestId("services-image-list")).toHaveAttribute(
      "data-active",
      "2"
    );
  });

  it("renders the ProjectCardList in the projects section", () => {
    render(<LandingPage />);
    expect(screen.getByTestId("project-card-list")).toBeInTheDocument();
  });

  it("sets the active project card id when a card is clicked", () => {
    render(<LandingPage />);
    fireEvent.click(screen.getByTestId("project-card-list"));
    expect(screen.getByTestId("project-card-list")).toHaveAttribute(
      "data-active",
      "1"
    );
  });

  it("deselects the active card when the same card is clicked again", () => {
    render(<LandingPage />);
    const cardList = screen.getByTestId("project-card-list");
    fireEvent.click(cardList);
    fireEvent.click(cardList);
    expect(cardList.getAttribute("data-active")).toBeNull();
  });
  
});
