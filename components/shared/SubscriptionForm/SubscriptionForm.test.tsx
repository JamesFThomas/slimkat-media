import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubscriptionForm } from "./SubscriptionForm";

function stubFetch(ok: boolean, body: object): void {
  (global as unknown as { fetch: unknown }).fetch = jest
    .fn()
    .mockResolvedValue({ ok, json: async () => body });
}

/*
 * Story: Visitor subscribes to Foundation updates
 * In order to stay informed about the James & Kayla Thomas Foundation,
 * a visitor wants to enter their email and subscribe.
 *
 * Scenario: Form renders with email input and subscribe button
 *   Given I visit a page with the SubscriptionForm
 *   When the form mounts
 *   Then I should see the email input and subscribe button
 *
 * Scenario: Submit button is disabled when email is empty
 *   Given the email field is empty
 *   When I view the form
 *   Then the subscribe button should be disabled
 *
 * Scenario: Submit button enables for a valid email
 *   Given I type a valid email address
 *   When the input updates
 *   Then the subscribe button should be enabled
 *
 * Scenario: Error message shows for invalid email format
 *   Given I type an invalid email
 *   When I click subscribe
 *   Then an email format error should appear
 *
 * Scenario: Successful submission clears the input
 *   Given I type a valid email and the API returns success
 *   When I click subscribe
 *   Then the input should be cleared
 *
 * Scenario: Successful submission shows a success message
 *   Given I type a valid email and the API returns success
 *   When I click subscribe
 *   Then a success message should appear
 *
 * Scenario: Failed API response shows an error message
 *   Given I type a valid email and the API returns an error
 *   When I click subscribe
 *   Then an error message should appear
 */
describe("SubscriptionForm", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it("renders the email input and subscribe button", () => {
    render(<SubscriptionForm />);
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
  });

  it("submit button is disabled when email is empty", () => {
    render(<SubscriptionForm />);
    expect(screen.getByRole("button", { name: "Subscribe" })).toBeDisabled();
  });

  it("enables the submit button when a valid email is entered", async () => {
    render(<SubscriptionForm />);
    await userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      "valid@example.com"
    );
    expect(screen.getByRole("button", { name: "Subscribe" })).toBeEnabled();
  });

  it("shows an error message for an invalid email format", async () => {
    render(<SubscriptionForm />);
    await userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      "invalid-email"
    );
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(
      screen.getByText("email@address.com format is required")
    ).toBeInTheDocument();
  });

  it("clears the input after a successful submission", async () => {
    stubFetch(true, { status: "success" });
    render(<SubscriptionForm />);
    const input = screen.getByPlaceholderText("Enter your email") as HTMLInputElement;
    await userEvent.type(input, "valid@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    await waitFor(() => expect(input.value).toBe(""));
  });

  it("shows a success message after a successful submission", async () => {
    stubFetch(true, { status: "success" });
    render(<SubscriptionForm />);
    await userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      "valid@example.com"
    );
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    await waitFor(() => {
      expect(screen.getByText("Thanks for subscribing!")).toBeInTheDocument();
    });
  });

  it("shows an error message when the API returns a failure", async () => {
    stubFetch(false, { status: "error" });
    render(<SubscriptionForm />);
    await userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      "valid@example.com"
    );
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));
    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again.")
      ).toBeInTheDocument();
    });
  });
});
