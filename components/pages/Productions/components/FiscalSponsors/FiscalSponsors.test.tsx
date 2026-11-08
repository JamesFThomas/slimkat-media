import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FiscalSponsors } from "./FiscalSponsors";

jest.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.raw = (key: string) => {
      if (key === "productions.production1.fiscalSponsors") {
        return {
          heading: "Fiscal Sponsors",
          grantStatement:
            "This documentary was made possible in part by a grant from the Mississippi Humanities Council (MHC).",
          sponsorsIntro:
            "Additional sponsors who helped make Farming Freedom possible include:",
          sponsors: ["Roslin Harris Foreman", "The Cathey Family"],
        };
      }
      return undefined;
    };
    return t;
  },
}));

/*
 * Story: Visitor views the funding credits for a production on the Our Work page
 * In order to see who funded a Slim Kat Media documentary,
 * a visitor wants to read the grant statement and sponsor list when the Fiscal Sponsors tab is open.
 *
 * Scenario: Fiscal Sponsors heading renders when content exists
 *   Given a fiscalSponsorsKey with existing content is provided
 *   When FiscalSponsors mounts
 *   Then the Fiscal Sponsors heading should be visible
 *
 * Scenario: Grant statement renders in full
 *   Given a fiscalSponsorsKey with a grant statement is provided
 *   When FiscalSponsors mounts
 *   Then the grant statement text should be visible
 *
 * Scenario: Each sponsor renders in the list
 *   Given a fiscalSponsorsKey with two sponsors is provided
 *   When FiscalSponsors mounts
 *   Then both sponsor names should be visible
 *
 * Scenario: Component renders nothing when no content exists
 *   Given a fiscalSponsorsKey that resolves to nothing
 *   When FiscalSponsors mounts
 *   Then nothing should be rendered
 */
describe("FiscalSponsors", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the Fiscal Sponsors heading when content exists", () => {
    render(
      <FiscalSponsors fiscalSponsorsKey="productions.production1.fiscalSponsors" />,
    );

    expect(screen.getByText("Fiscal Sponsors")).toBeInTheDocument();
  });

  it("renders the grant statement", () => {
    render(
      <FiscalSponsors fiscalSponsorsKey="productions.production1.fiscalSponsors" />,
    );

    expect(
      screen.getByText(/Mississippi Humanities Council/),
    ).toBeInTheDocument();
  });

  it("renders each sponsor in the list", () => {
    render(
      <FiscalSponsors fiscalSponsorsKey="productions.production1.fiscalSponsors" />,
    );

    expect(screen.getByText("Roslin Harris Foreman")).toBeInTheDocument();
    expect(screen.getByText("The Cathey Family")).toBeInTheDocument();
  });

  it("renders nothing when no content exists", () => {
    const { container } = render(
      <FiscalSponsors fiscalSponsorsKey="productions.unknown" />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
