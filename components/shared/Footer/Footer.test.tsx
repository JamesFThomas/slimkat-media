import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

/*
 * Story: Visitor sees the footer on any page
 * In order to identify the site and find legal info,
 * a visitor wants to see the site footer.
 *
 * Scenario: Footer renders the SlimKat Media logo
 *   Given I am on any page
 *   When the Footer mounts
 *   Then the SlimKat Media logo should be visible
 *
 * Scenario: Footer renders the copyright text
 *   Given I am on any page
 *   When the Footer mounts
 *   Then the SlimKat Media copyright text should be visible
 */
describe("Footer", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the SlimKat Media logo", () => {
    render(<Footer />);
    expect(screen.getByAltText("SlimKat Media Logo")).toBeInTheDocument();
  });

  it("renders the copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/SlimKat Media\. All rights reserved\./i)
    ).toBeInTheDocument();
  });
});
