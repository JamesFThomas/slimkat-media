import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProductionsPage } from "./ProductionsPage";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("./components/FeatureProductions/FeatureProductions", () => ({
  FeatureProductions: () => <div data-testid="feature-productions" />,
}));

jest.mock("./components/SpeakingEngagements/SpeakingEngagements", () => ({
  SpeakingEngagements: () => <div data-testid="speaking-engagements" />,
}));

/*
 * Story: Visitor explores the Productions page
 * In order to learn about Slim Kat Media's productions and speaking work,
 * a visitor wants to see the page header, featured productions,
 * and speaking engagements sections.
 *
 * Scenario: Page header renders with title and subtitle
 *   Given I visit the Productions page
 *   When the ProductionsPage mounts
 *   Then the title and subtitle should be visible
 *
 * Scenario: FeatureProductions section renders
 *   Given I visit the Productions page
 *   When the ProductionsPage mounts
 *   Then the FeatureProductions component should be present
 *
 * Scenario: SpeakingEngagements section renders
 *   Given I visit the Productions page
 *   When the ProductionsPage mounts
 *   Then the SpeakingEngagements component should be present
 */
describe("ProductionsPage", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the page title and subtitle", () => {
    render(<ProductionsPage />);
    expect(screen.getByText("header.title")).toBeInTheDocument();
    expect(screen.getByText("header.subtitle")).toBeInTheDocument();
  });

  it("renders the FeatureProductions section", () => {
    render(<ProductionsPage />);
    expect(screen.getByTestId("feature-productions")).toBeInTheDocument();
  });

  it("renders the SpeakingEngagements section", () => {
    render(<ProductionsPage />);
    expect(screen.getByTestId("speaking-engagements")).toBeInTheDocument();
  });
});
