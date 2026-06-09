import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ServicesLinks, ServiceLinkObject } from "./ServicesLinks";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockLinks: ServiceLinkObject[] = [
  { id: 1, nameKey: "services.links.legacyDocumentaries", href: "/documentaries" },
  { id: 2, nameKey: "services.links.foundation", href: "/foundation" },
];

/*
 * Story: Visitor explores services on the landing page
 * In order to navigate to a specific service,
 * a visitor wants to see and hover over service links.
 *
 * Scenario: All service links render
 *   Given a list of service links
 *   When ServicesLinks mounts
 *   Then all links should be visible
 *
 * Scenario: Each link points to the correct route
 *   Given a list of service links
 *   When ServicesLinks mounts
 *   Then each link should have the correct href
 *
 * Scenario: Hovering a link calls the hover handler with the correct id
 *   Given the service links are rendered
 *   When I hover over a link
 *   Then the hover handler should be called with that link's id
 */
describe("ServicesLinks", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders all service links", () => {
    render(
      <ServicesLinks links={mockLinks} handleServiceLinkHover={jest.fn()} />
    );
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("renders each link with the correct href", () => {
    render(
      <ServicesLinks links={mockLinks} handleServiceLinkHover={jest.fn()} />
    );
    expect(screen.getByRole("link", { name: "services.links.legacyDocumentaries" }))
      .toHaveAttribute("href", "/documentaries");
    expect(screen.getByRole("link", { name: "services.links.foundation" }))
      .toHaveAttribute("href", "/foundation");
  });

  it("calls the hover handler with the correct id on mouse enter", () => {
    const handleHover = jest.fn();
    render(
      <ServicesLinks links={mockLinks} handleServiceLinkHover={handleHover} />
    );
    fireEvent.mouseEnter(screen.getAllByRole("listitem")[0]);
    expect(handleHover).toHaveBeenCalledWith(1);
  });
});
