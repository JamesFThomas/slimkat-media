import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { FeatureProductions } from "./FeatureProductions";

jest.mock("../../data/productions.data", () => ({
  productions: [
    {
      id: 1,
      title: "productions.production1.title",
      description: "productions.production1.description",
      imageUrl: "/logo/Farming_Freedom_Logo2.png",
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
      imageAlt: "productions.production3.imageAlt",
      yearKey: "productions.production3.year",
      categoryKey: "productions.production3.category",
      runtimeKey: "productions.production3.runtime",
      distributionKey: "productions.production3.distribution",
      statusKey: "productions.production3.status",
      longDescriptionKey: "productions.production3.longDescription",
      pressLinksKey: "productions.production3.pressLinks",
    },
  ],
}));

jest.mock("../FeatureInfo/FeatureInfo", () => ({
  FeatureInfo: ({ production }: { production: { id: number } }) => (
    <div data-testid="feature-info">FeatureInfo for {production.id}</div>
  ),
}));

jest.mock("../FeatureLinks/FeatureLinks", () => ({
  FeatureLinks: ({ pressLinksKey }: { pressLinksKey: string }) => (
    <div data-testid="feature-links">{pressLinksKey}</div>
  ),
}));

jest.mock("../LibraryMap/LibraryMap", () => ({
  LibraryMap: () => <div data-testid="library-map" />,
}));

jest.mock("@/components/shared/Trailer/Trailer", () => ({
  Trailer: ({ title }: { title: string }) => (
    <div data-testid="trailer">{title}</div>
  ),
}));

jest.mock("@/components/shared/ProjectCard/ProjectCard", () => ({
  ProjectCard: ({ imageUrl }: { imageUrl: string }) => (
    <div data-testid="project-card">{imageUrl}</div>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

/*
 * Story: Visitor browses the productions on the Our Work page
 * In order to explore Slim Kat Media's documentary projects,
 * a visitor wants to see a featured production with its details and switch between productions.
 *
 * Scenario: First production is active by default on mount
 *   Given the FeatureProductions component mounts
 *   When no interaction has occurred
 *   Then the first production's info should be visible
 *
 * Scenario: Filmstrip renders a button for each production
 *   Given the productions array has 3 entries
 *   When FeatureProductions mounts
 *   Then 3 filmstrip buttons should be visible
 *
 * Scenario: Clicking a filmstrip button switches the active production
 *   Given the component is mounted with production1 active
 *   When the visitor clicks the second filmstrip button
 *   Then the FeatureInfo should update to show production2
 *
 * Story: Visitor navigates a production's tabs (data-driven)
 * In order to view trailer, press, and film locator content for a production,
 * a visitor wants tabs to render only when a production defines them, defaulting
 * to the first declared tab and switching content on click.
 *
 * (Scenarios below are stubbed as it.todo — production1 now carries a tabs
 * array, so the old "FeatureLinks renders by default" assumption no longer
 * holds; it defaults to whichever tab is first in that production's array.)
 */
describe("FeatureProductions", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the first production's info by default on mount", () => {
    render(<FeatureProductions />);
    expect(screen.getByTestId("feature-info")).toHaveTextContent(
      "FeatureInfo for 1",
    );
  });

  it("renders a filmstrip button for each production", () => {
    render(<FeatureProductions />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("switches the active production when a filmstrip button is clicked", () => {
    render(<FeatureProductions />);
    fireEvent.click(screen.getAllByRole("button")[1]);
    expect(screen.getByTestId("feature-info")).toHaveTextContent(
      "FeatureInfo for 2",
    );
  });

  // Given a production with a tabs array (e.g. production1)
  // When FeatureProductions mounts
  // Then a tablist should render with one tab button per entry in tabs
  it.todo(
    "renders a tab button for each tab in the active production's tabs array",
  );

  // Given a production with a tabs array
  // When FeatureProductions mounts with no tab clicked yet
  // Then the content for the first tab in that production's tabs array should render
  it.todo("defaults to rendering the first tab's content on mount");

  // Given the tablist is rendered for production1 (trailer, press, filmLocator)
  // When the visitor clicks the "press" tab
  // Then FeatureLinks should render with production1's pressLinksKey
  it.todo("renders FeatureLinks when the press tab is clicked");

  // Given the tablist is rendered for production1
  // When the visitor clicks the "filmLocator" tab
  // Then LibraryMap should render
  it.todo("renders LibraryMap when the filmLocator tab is clicked");

  // Given the tablist is rendered for production1
  // When the visitor clicks the "trailer" tab
  // Then Trailer should render with the production's translated title
  it.todo("renders Trailer when the trailer tab is clicked");

  // Given a visitor has a non-first tab active on production1
  // When they switch to a production with no tabs (e.g. production2)
  // Then no tablist should render, and FeatureLinks should render directly
  // via the no-tabs fallback branch
  it.todo(
    "falls back to rendering FeatureLinks directly for productions with no tabs array",
  );

  // Given a visitor has a non-first tab active on production1
  // When they switch back to production1 via the filmstrip
  // Then the active tab should reset to production1's first declared tab
  it.todo(
    "resets the active tab to the new production's first tab when switching productions via the filmstrip",
  );
});
