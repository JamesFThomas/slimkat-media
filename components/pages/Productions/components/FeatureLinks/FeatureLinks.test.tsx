import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FeatureLinks } from "./FeatureLinks";

jest.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.raw = (key: string) => {
      if (key === "productions.production1.pressLinks") {
        return {
          DeltaNewsTV: {
            label:
              "Granddaughter turns family conversations into documentary on Black land ownership",
            url: "https://www.deltanews.tv",
            info: "Delta News TV",
          },
          Adweek: {
            label:
              "Mississippi Station to Air Documentary About Black Farmers During Jim Crow Era",
            url: "https://www.adweek.com",
            info: "Adweek",
          },
        };
      }
      return {};
    };
    return t;
  },
}));

/*
 * Story: Visitor views press coverage for a production on the Our Work page
 * In order to read more about a Slim Kat Media documentary,
 * a visitor wants to see relevant press links when a production is selected.
 *
 * Scenario: Press highlights section renders when links exist
 *   Given a pressLinksKey with existing links is provided
 *   When FeatureLinks mounts
 *   Then the Press Highlights header should be visible
 *
 * Scenario: Each press link renders with correct label and href
 *   Given a pressLinksKey with two links is provided
 *   When FeatureLinks mounts
 *   Then both link labels should be visible with correct hrefs
 *
 * Scenario: Component renders nothing when no links exist
 *   Given a pressLinksKey that resolves to an empty object
 *   When FeatureLinks mounts
 *   Then nothing should be rendered
 */
describe("FeatureLinks", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the Press Highlights header when links exist", () => {
    render(<FeatureLinks pressLinksKey="productions.production1.pressLinks" />);
    expect(
      screen.getByRole("heading", { name: /press highlights/i }),
    ).toBeInTheDocument();
  });

  it("renders each press link with the correct label and href", () => {
    render(<FeatureLinks pressLinksKey="productions.production1.pressLinks" />);
    const deltLink = screen.getByRole("link", {
      name: /granddaughter turns family conversations/i,
    });
    expect(deltLink).toBeInTheDocument();
    expect(deltLink).toHaveAttribute("href", "https://www.deltanews.tv");

    const adweekLink = screen.getByRole("link", {
      name: /mississippi station to air documentary/i,
    });
    expect(adweekLink).toBeInTheDocument();
    expect(adweekLink).toHaveAttribute("href", "https://www.adweek.com");
  });

  it("renders nothing when the press links object is empty", () => {
    const { container } = render(
      <FeatureLinks pressLinksKey="productions.production2.pressLinks" />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
