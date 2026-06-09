import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: { year: number }) =>
    key === "footer.copyright" || key.includes("copyright")
      ? `© ${params?.year ?? 2026} SlimKat Media. All rights reserved.`
      : key,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

const mockPathname = jest.fn(() => "/");

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

/*
 * Story: Visitor sees the footer on any page
 * In order to identify the site and find legal info,
 * a visitor wants to see the correct footer based on the current page.
 *
 * Scenario: Standard footer renders on non-foundation pages
 *   Given I am on a standard page
 *   When the Footer mounts
 *   Then the SlimKat Media logo and copyright text should be visible
 *
 * Scenario: Foundation footer renders on the foundation page
 *   Given I am on the /foundation page
 *   When the Footer mounts
 *   Then the foundation copyright and incorporation text should be visible
 *
 * Scenario: Foundation footer renders on the French foundation route
 *   Given I am on the /fr/foundation page
 *   When the Footer mounts
 *   Then the foundation footer should render instead of the standard footer
 */
describe("Footer", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    mockPathname.mockReturnValue("/");
  });

  it("renders the SlimKat Media logo on standard pages", () => {
    render(<Footer />);
    expect(screen.getByAltText("SlimKat Media Logo")).toBeInTheDocument();
  });

  it("renders the copyright text on standard pages", () => {
    render(<Footer />);
    expect(
      screen.getByText(/SlimKat Media\. All rights reserved\./i)
    ).toBeInTheDocument();
  });

  it("renders the foundation footer on the /foundation route", () => {
    mockPathname.mockReturnValue("/foundation");
    render(<Footer />);
    expect(screen.getByText("foundation.incorporation")).toBeInTheDocument();
  });

  it("renders the foundation footer on the /fr/foundation route", () => {
    mockPathname.mockReturnValue("/fr/foundation");
    render(<Footer />);
    expect(screen.getByText("foundation.incorporation")).toBeInTheDocument();
  });

  it("does not render the foundation footer on standard pages", () => {
    render(<Footer />);
    expect(
      screen.queryByText("foundation.incorporation")
    ).not.toBeInTheDocument();
  });
});
