import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Credits } from "./Credits";

jest.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    t.raw = (key: string) => {
      if (key === "productions.production1.credits") {
        return {
          heading: "Credits",
          crew: [
            { name: "Kayla Turner Thomas", role: "Director" },
            { name: "James F. Thomas", role: "Associate Producer" },
          ],
          castHeading: "Key Cast",
          cast: [{ name: "Dr. Albert Dorsey, Jr", role: "Himself" }],
        };
      }
      return undefined;
    };
    return t;
  },
}));

/*
 * Story: Visitor views the credits for a production on the Our Work page
 * In order to see who made a Slim Kat Media documentary,
 * a visitor wants to read the crew and key cast when the Credits tab is open.
 *
 * Scenario: Credits heading renders when credits exist
 *   Given a creditsKey with existing credits is provided
 *   When Credits mounts
 *   Then the Credits heading should be visible
 *
 * Scenario: Each crew member renders with name and role
 *   Given a creditsKey with two crew entries is provided
 *   When Credits mounts
 *   Then both crew names and roles should be visible
 *
 * Scenario: Key cast section renders with its own heading
 *   Given a creditsKey with one cast entry is provided
 *   When Credits mounts
 *   Then the Key Cast heading and the cast member should be visible
 *
 * Scenario: Component renders nothing when no credits exist
 *   Given a creditsKey that resolves to nothing
 *   When Credits mounts
 *   Then nothing should be rendered
 */
describe("Credits", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the Credits heading when credits exist", () => {
    render(<Credits creditsKey="productions.production1.credits" />);

    expect(screen.getByText("Credits")).toBeInTheDocument();
  });

  it("renders each crew member with name and role", () => {
    render(<Credits creditsKey="productions.production1.credits" />);

    expect(screen.getByText("Kayla Turner Thomas")).toBeInTheDocument();
    expect(screen.getByText("Director")).toBeInTheDocument();
    expect(screen.getByText("James F. Thomas")).toBeInTheDocument();
    expect(screen.getByText("Associate Producer")).toBeInTheDocument();
  });

  it("renders the Key Cast section with its cast members", () => {
    render(<Credits creditsKey="productions.production1.credits" />);

    expect(screen.getByText("Key Cast")).toBeInTheDocument();
    expect(screen.getByText("Dr. Albert Dorsey, Jr")).toBeInTheDocument();
    expect(screen.getByText("Himself")).toBeInTheDocument();
  });

  it("renders nothing when no credits exist", () => {
    const { container } = render(<Credits creditsKey="productions.unknown" />);

    expect(container).toBeEmptyDOMElement();
  });
});
