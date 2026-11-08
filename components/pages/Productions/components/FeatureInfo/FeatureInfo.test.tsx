import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FeatureInfo } from "./FeatureInfo";
import { type Production } from "../../data/productions.data";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const baseProduction: Production = {
  id: 1,
  title: "productions.production1.title",
  description: "productions.production1.description",
  imageUrl: "/logo/example.png",
  imageAlt: "productions.production1.imageAlt",
  yearKey: "productions.production1.year",
  categoryKey: "productions.production1.category",
  runtimeKey: "productions.production1.runtime",
  distributionKey: "productions.production1.distribution",
  statusKey: "productions.production1.status",
  longDescriptionKey: "productions.production1.longDescription",
  pressLinksKey: "productions.production1.pressLinks",
};

/*
 * Story: Visitor reads the details of a production on the Our Work page
 * In order to learn where a Slim Kat Media documentary can be obtained,
 * a visitor wants the Distribution value to link out to the distributor when one is known.
 *
 * Scenario: Distribution renders as a link when a distributionUrl exists
 *   Given a production carrying a distributionUrl
 *   When FeatureInfo mounts
 *   Then the distribution value should be a link pointing at that url
 *
 * Scenario: Distribution link opens safely in a new tab
 *   Given a production carrying a distributionUrl
 *   When FeatureInfo mounts
 *   Then the link should target a new tab with noopener and noreferrer
 *
 * Scenario: Distribution renders as plain text when no distributionUrl exists
 *   Given a production with no distributionUrl
 *   When FeatureInfo mounts
 *   Then the distribution value should be visible but should not be a link
 *
 * Scenario: The remaining stats never render as links
 *   Given a production carrying a distributionUrl
 *   When FeatureInfo mounts
 *   Then exactly one link should be present in the stats grid
 */
describe("FeatureInfo", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders distribution as a link when a distributionUrl exists", () => {
    render(
      <FeatureInfo
        production={{
          ...baseProduction,
          distributionUrl:
            "https://www.collectiveeye.org/products/farming-freedom",
        }}
      />,
    );

    const link = screen.getByRole("link", {
      name: "productions.production1.distribution",
    });

    expect(link).toHaveAttribute(
      "href",
      "https://www.collectiveeye.org/products/farming-freedom",
    );
  });

  it("opens the distribution link in a new tab with safe rel attributes", () => {
    render(
      <FeatureInfo
        production={{
          ...baseProduction,
          distributionUrl:
            "https://www.collectiveeye.org/products/farming-freedom",
        }}
      />,
    );

    const link = screen.getByRole("link", {
      name: "productions.production1.distribution",
    });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders distribution as plain text when no distributionUrl exists", () => {
    render(<FeatureInfo production={baseProduction} />);

    expect(
      screen.getByText("productions.production1.distribution"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders only the distribution stat as a link", () => {
    render(
      <FeatureInfo
        production={{
          ...baseProduction,
          distributionUrl:
            "https://www.collectiveeye.org/products/farming-freedom",
        }}
      />,
    );

    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});
