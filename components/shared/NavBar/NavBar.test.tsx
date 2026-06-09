import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NavBar } from "./NavBar";

jest.mock("next-intl", () => ({
  useLocale: () => "en",
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, "aria-label": ariaLabel }: { href: string; children: React.ReactNode; "aria-label"?: string }) => (
    <a href={href} aria-label={ariaLabel}>{children}</a>
  ),
}));

jest.mock("./components/PageLinks", () => ({
  PageLinks: () => <nav aria-label="Page links" data-testid="page-links" />,
  links: [],
}));

/*
 * Story: Visitor navigates the site using the NavBar
 * In order to move between pages and switch language,
 * a visitor wants to see navigation links and a language toggle.
 *
 * Scenario: NavBar renders the page links
 *   Given I visit any page
 *   When the NavBar mounts
 *   Then the PageLinks component should be present
 *
 * Scenario: NavBar renders the language toggle link
 *   Given I visit any page
 *   When the NavBar mounts
 *   Then a language toggle link should be visible
 *
 * Scenario: Language toggle shows EN underlined for English locale
 *   Given the current locale is English
 *   When the NavBar mounts
 *   Then EN should have the underline class and FR should not
 */
describe("NavBar", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the PageLinks component", () => {
    render(<NavBar />);
    expect(screen.getByTestId("page-links")).toBeInTheDocument();
  });

  it("renders the language toggle link", () => {
    render(<NavBar />);
    expect(
      screen.getByRole("link", { name: "Toggle language" })
    ).toBeInTheDocument();
  });

  it("underlines EN when the locale is English", () => {
    render(<NavBar />);
    const enSpan = screen.getByText("EN");
    expect(enSpan).toHaveClass("underline");
  });

  it("does not underline FR when the locale is English", () => {
    render(<NavBar />);
    const frSpan = screen.getByText("FR");
    expect(frSpan).toHaveClass("no-underline");
  });
});
