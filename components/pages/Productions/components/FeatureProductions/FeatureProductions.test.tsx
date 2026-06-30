// import React from "react";
// import "@testing-library/jest-dom";

// describe("FeatureProductions", () => {
//   it.todo("renders the FeatureProductions component");
// });
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
 * Scenario: FeatureLinks renders with the active production's press links key
 *   Given the component mounts with production1 active
 *   When FeatureProductions renders
 *   Then FeatureLinks should receive production1's pressLinksKey
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

  it("renders FeatureLinks with the active production's press links key", () => {
    render(<FeatureProductions />);
    expect(screen.getByTestId("feature-links")).toHaveTextContent(
      "productions.production1.pressLinks",
    );
  });
});
