import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DocumentariesPage } from "./DocumentariesPage";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

jest.mock("./components/CallToAction/CallToAction", () => ({
  CallToAction: () => <div data-testid="call-to-action" />,
}));

jest.mock("./components/ClientTestimonials/ClientTestimonials", () => ({
  ClientTestimonials: () => <div data-testid="client-testimonials" />,
}));

jest.mock("./components/TestimonialVideo/TestimonialVideo", () => ({
  TestimonialVideo: () => <div data-testid="testimonial-video" />,
}));

jest.mock("./components/ServicesPanels/ServicesPanels", () => ({
  ServicesPanels: () => <div data-testid="services-panels" />,
}));

/*
 * Story: Visitor explores the Documentaries page
 * In order to learn about Slim Kat Media's documentary services,
 * a visitor wants to see the hero image, testimonials, and service packages.
 *
 * Scenario: Hero image renders
 *   Given I visit the Documentaries page
 *   When the DocumentariesPage mounts
 *   Then the hero image should be present with its alt text
 *
 * Scenario: CallToAction renders in the hero section
 *   Given I visit the Documentaries page
 *   When the DocumentariesPage mounts
 *   Then the CallToAction component should be present
 *
 * Scenario: ClientTestimonials renders in the testimonials section
 *   Given I visit the Documentaries page
 *   When the DocumentariesPage mounts
 *   Then the ClientTestimonials component should be present
 *
 * Scenario: TestimonialVideo renders in the testimonials section
 *   Given I visit the Documentaries page
 *   When the DocumentariesPage mounts
 *   Then the TestimonialVideo component should be present
 *
 * Scenario: ServicesPanels renders in the services section
 *   Given I visit the Documentaries page
 *   When the DocumentariesPage mounts
 *   Then the ServicesPanels component should be present
 */
describe("DocumentariesPage", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the hero image with correct alt text", () => {
    render(<DocumentariesPage />);
    expect(
      screen.getByAltText("A family gathered together sharing stories")
    ).toBeInTheDocument();
  });

  it("renders the CallToAction in the hero section", () => {
    render(<DocumentariesPage />);
    expect(screen.getByTestId("call-to-action")).toBeInTheDocument();
  });

  it("renders the ClientTestimonials in the testimonials section", () => {
    render(<DocumentariesPage />);
    expect(screen.getByTestId("client-testimonials")).toBeInTheDocument();
  });

  it("renders the TestimonialVideo in the testimonials section", () => {
    render(<DocumentariesPage />);
    expect(screen.getByTestId("testimonial-video")).toBeInTheDocument();
  });

  it("renders the ServicesPanels in the services section", () => {
    render(<DocumentariesPage />);
    expect(screen.getByTestId("services-panels")).toBeInTheDocument();
  });
});
