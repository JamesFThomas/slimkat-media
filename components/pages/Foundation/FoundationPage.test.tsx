import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FoundationPage } from "./FoundationPage";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

jest.mock("../../shared/SubscriptionForm/SubscriptionForm", () => ({
  SubscriptionForm: () => <div data-testid="subscription-form" />,
}));

/*
 * Story: Visitor explores the James & Kayla Thomas Foundation page
 * In order to learn about the Foundation's mission and programs,
 * a visitor wants to see the logo, strategic model, mission statement,
 * and a way to stay informed about upcoming programs.
 *
 * Scenario: Foundation logo renders
 *   Given I visit the Foundation page
 *   When the FoundationPage mounts
 *   Then the JKTF logo image should be present
 *
 * Scenario: Strategic model SVG renders
 *   Given I visit the Foundation page
 *   When the FoundationPage mounts
 *   Then the strategic model SVG should be present with its aria label
 *
 * Scenario: Mission section renders
 *   Given I visit the Foundation page
 *   When the FoundationPage mounts
 *   Then the mission label and body should be visible
 *
 * Scenario: Programs section renders with subscription form
 *   Given I visit the Foundation page
 *   When the FoundationPage mounts
 *   Then the programs title and SubscriptionForm should be visible
 */
describe("FoundationPage", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the JKTF foundation logo", () => {
    render(<FoundationPage />);
    expect(
      screen.getByAltText("James & Kayla Thomas Foundation")
    ).toBeInTheDocument();
  });

  it("renders the strategic model SVG with its aria label", () => {
    render(<FoundationPage />);
    expect(
      screen.getByRole("img", { name: "JKTF Strategic Model" })
    ).toBeInTheDocument();
  });

  it("renders the mission section label and body", () => {
    render(<FoundationPage />);
    expect(screen.getByText("mission.label")).toBeInTheDocument();
    expect(screen.getByText("mission.body")).toBeInTheDocument();
  });

  it("renders the programs section title", () => {
    render(<FoundationPage />);
    expect(screen.getByText("programs.title")).toBeInTheDocument();
  });

  it("renders the SubscriptionForm in the programs section", () => {
    render(<FoundationPage />);
    expect(screen.getByTestId("subscription-form")).toBeInTheDocument();
  });
});
