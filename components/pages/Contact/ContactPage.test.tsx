import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ContactPage } from "./ContactPage";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("./components/ContactForm/ContactForm", () => ({
  ContactForm: () => <div data-testid="contact-form" />,
}));

/*
 * Story: Visitor navigates to the Contact page
 * In order to get in touch with Slim Kat Media,
 * a visitor wants to see the page header and contact form.
 *
 * Scenario: Page header renders with title and subtitle
 *   Given I visit the Contact page
 *   When the ContactPage mounts
 *   Then the title and subtitle should be visible
 *
 * Scenario: ContactForm renders on the page
 *   Given I visit the Contact page
 *   When the ContactPage mounts
 *   Then the ContactForm component should be present
 */
describe("ContactPage", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the page title and subtitle", () => {
    render(<ContactPage />);
    expect(screen.getByText("header.title")).toBeInTheDocument();
    expect(screen.getByText("header.subtitle")).toBeInTheDocument();
  });

  it("renders the ContactForm", () => {
    render(<ContactPage />);
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });
});
