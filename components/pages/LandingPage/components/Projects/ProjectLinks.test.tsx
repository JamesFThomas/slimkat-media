import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProjectLinks, PressLinkObject } from "./ProjectLinks";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockLinks: PressLinkObject[] = [
  {
    id: 1,
    title: "projects.project1.links.NPR.label",
    href: "https://npr.org",
    info: "projects.project1.links.NPR.info",
  },
  {
    id: 2,
    title: "projects.project2.links.WashingtonPost.label",
    href: "https://washingtonpost.com",
    info: "projects.project2.links.WashingtonPost.info",
  },
];

/*
 * Story: Visitor views press coverage links for an active project
 * In order to read more about a Slim Kat Media production,
 * a visitor wants to see relevant press links when a project card is expanded.
 *
 * Scenario: Press links header renders
 *   Given an active card id is provided
 *   When ProjectLinks mounts
 *   Then the press links header should be visible
 *
 * Scenario: Only links matching the active card id are visible
 *   Given links for multiple projects exist
 *   When activeCardId is 1
 *   Then only the link with id 1 should be visible
 *
 * Scenario: Links render with correct href
 *   Given an active card id of 1
 *   When ProjectLinks mounts
 *   Then the visible link should point to the correct URL
 */
describe("ProjectLinks", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the press links header", () => {
    render(<ProjectLinks links={mockLinks} activeCardId={1} />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("shows only the link matching the active card id", () => {
    render(<ProjectLinks links={mockLinks} activeCardId={1} />);
    const visibleLink = screen.getByText(
      "projects.project1.links.NPR.label"
    );
    expect(visibleLink).toBeInTheDocument();
  });

  it("renders the visible link with the correct href", () => {
    render(<ProjectLinks links={mockLinks} activeCardId={1} />);
    const anchor = screen.getByRole("link", {
      name: "projects.project1.links.NPR.label",
    });
    expect(anchor).toHaveAttribute("href", "https://npr.org");
  });
});
