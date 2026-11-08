import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubscriptionForm } from "./SubscriptionForm";
import { HONEYPOT_FIELD } from "@/lib/security/formGuards";

function stubFetch(
  ok: boolean,
  body: object,
  status = ok ? 200 : 500,
): void {
  (global as unknown as { fetch: unknown }).fetch = jest
    .fn()
    .mockResolvedValue({ ok, status, json: async () => body });
}

/*
 * Story: Visitor subscribes to Slim Kat Media updates
 * In order to hear about upcoming screenings, panels and speaking dates,
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
 *
 * Scenario: The submission carries the active locale
 *   Given I type a valid email on a page in a known locale
 *   When I click subscribe
 *   Then the posted body should carry that locale alongside the email
 *
 * Scenario: The honeypot cannot be reached by a visitor
 *   Given I visit a page with the form
 *   When the form mounts
 *   Then the honeypot input should be out of the tab order, hidden from
 *   assistive technology, and excluded from autofill
 *
 * Scenario: A rate limited submission shows the retry message
 *   Given the endpoint answers 429 with a body that is not JSON
 *   When I submit the form
 *   Then I should see the retry message and the body should never be read
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
  it("posts the active locale alongside the email", async () => {
    stubFetch(true, { status: "success" });
    render(<SubscriptionForm />);
    await userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      "valid@example.com"
    );
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const [, init] = (global.fetch as jest.Mock).mock.calls[0];

    expect(JSON.parse(init.body)).toEqual({
      email: "valid@example.com",
      locale: "en",
      [HONEYPOT_FIELD]: "",
    });
  });

  it("keeps the honeypot out of the tab order and away from assistive technology", () => {
    render(<SubscriptionForm />);

    const honeypot = document.querySelector(`input[name="${HONEYPOT_FIELD}"]`);

    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot).toHaveAttribute("aria-hidden", "true");
    expect(honeypot).toHaveAttribute("autocomplete", "off");
  });

  it("shows the retry message on a 429 without reading the response body", async () => {
    const json = jest.fn().mockRejectedValue(new Error("not json"));

    (global as unknown as { fetch: unknown }).fetch = jest
      .fn()
      .mockResolvedValue({ ok: false, status: 429, json });

    render(<SubscriptionForm />);
    await userEvent.type(
      screen.getByPlaceholderText("Enter your email"),
      "valid@example.com"
    );
    await userEvent.click(screen.getByRole("button", { name: "Subscribe" }));

    await waitFor(() => {
      expect(
        screen.getByText("Too many attempts. Please wait a few minutes and try again.")
      ).toBeInTheDocument();
    });

    expect(json).not.toHaveBeenCalled();
  });
});
