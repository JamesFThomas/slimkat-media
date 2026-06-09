import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

const mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => ({
    get: (key: string) => mockSearchParams.get(key),
  })),
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fillValidForm = () => {
  fireEvent.change(screen.getByPlaceholderText("First name"), {
    target: { name: "firstName", value: "James" },
  });
  fireEvent.change(screen.getByPlaceholderText("Last name"), {
    target: { name: "lastName", value: "Thomas" },
  });
  fireEvent.change(screen.getByPlaceholderText("your@email.com"), {
    target: { name: "email", value: "james@example.com" },
  });
  fireEvent.change(screen.getByRole("combobox"), {
    target: { name: "service", value: "documentary" },
  });
  fireEvent.change(screen.getByPlaceholderText("Tell us about your project..."), {
    target: { name: "message", value: "I would like to book a documentary." },
  });
};

// ─────────────────────────────────────────────────────────────────────────────

/*
 * Story: Visitor submits a contact inquiry
 * In order to reach the Slim Kat Media team,
 * a visitor on the Contact page wants to fill out and submit the form.
 *
 * Scenario: Form renders all required fields
 *   Given I navigate to the Contact page
 *   When the ContactForm mounts
 *   Then I should see fields for name, email, phone, service, and message
 *
 * Scenario: Submit button is disabled until required fields are filled
 *   Given the form is empty
 *   When I have not filled in all required fields
 *   Then the submit button should be disabled
 *
 * Scenario: Inline errors appear on blur for empty required fields
 *   Given I focus then blur a required field without entering a value
 *   When I tab away from that field
 *   Then I should see an inline error message for that field
 *
 * Scenario: Email field rejects an invalid format
 *   Given I type a malformed email address
 *   When I blur the email field
 *   Then I should see an invalid email error message
 *
 * Scenario: Phone field accepts an empty value (optional)
 *   Given I leave the phone field blank
 *   When I fill all other required fields
 *   Then the form should be valid and the submit button enabled
 *
 * Scenario: Phone field rejects a malformed number
 *   Given I type an invalid phone number
 *   When I blur the phone field
 *   Then I should see a phone validation error
 *
 * Scenario: Submit button enables once all required fields are valid
 *   Given I have filled all required fields with valid data
 *   When I inspect the submit button
 *   Then it should be enabled
 *
 * Scenario: Successful submission shows a success message and clears the form
 *   Given I have filled the form with valid data
 *   When I click submit and the API returns success
 *   Then I should see a success message and the form fields should be cleared
 *
 * Scenario: Failed API response shows an error message
 *   Given I have filled the form with valid data
 *   When I click submit and the API returns an error
 *   Then I should see an error message
 *
 * Scenario: Service field pre-fills from ?service=documentary query param
 *   Given the page URL contains ?service=documentary
 *   When the ContactForm mounts
 *   Then the service dropdown should default to "documentary"
 *
 * Scenario: Package message pre-fills from ?package= query param
 *   Given the page URL contains ?package=Standard+Keepsake+Documentary
 *   When the ContactForm mounts
 *   Then the message field should contain the package inquiry text
 *
 * Scenario: Submitting an empty form marks all fields as touched with errors
 *   Given the form is empty
 *   When I click the submit button (if somehow enabled) or trigger validateAll
 *   Then all required field error messages should be visible
 */
describe("ContactForm", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    mockSearchParams.delete("service");
    mockSearchParams.delete("package");
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

  it("renders all required form fields", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("(555) 000-0000")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Tell us about your project...")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  // ── Submit Button State ────────────────────────────────────────────────────

  it("submit button is disabled when the form is empty", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /send message/i })).toBeDisabled();
  });

  it("submit button enables once all required fields contain valid data", () => {
    render(<ContactForm />);
    fillValidForm();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).not.toBeDisabled();
  });

  // ── Field-level Validation ─────────────────────────────────────────────────

  it("shows first name error after blurring an empty first name field", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("First name");
    fireEvent.blur(input);
    expect(screen.getByText("First name is required.")).toBeInTheDocument();
  });

  it("shows last name error after blurring an empty last name field", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("Last name");
    fireEvent.blur(input);
    expect(screen.getByText("Last name is required.")).toBeInTheDocument();
  });

  it("shows email required error after blurring an empty email field", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("your@email.com");
    fireEvent.blur(input);
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
  });

  it("shows invalid email error when a malformed email is entered", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("your@email.com");
    fireEvent.change(input, {
      target: { name: "email", value: "not-an-email" },
    });
    fireEvent.blur(input);
    expect(
      screen.getByText("Please enter a valid email.")
    ).toBeInTheDocument();
  });

  it("shows service required error after blurring without selecting a service", () => {
    render(<ContactForm />);
    const select = screen.getByRole("combobox");
    fireEvent.blur(select);
    expect(screen.getByText("Please select a service.")).toBeInTheDocument();
  });

  it("shows message required error after blurring an empty message field", () => {
    render(<ContactForm />);
    const textarea = screen.getByPlaceholderText(
      "Tell us about your project..."
    );
    fireEvent.blur(textarea);
    expect(screen.getByText("Message is required.")).toBeInTheDocument();
  });

  it("shows phone validation error when a malformed number is entered", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("(555) 000-0000");
    fireEvent.change(input, {
      target: { name: "phone", value: "12345" },
    });
    fireEvent.blur(input);
    expect(
      screen.getByText("Please enter a valid phone number.")
    ).toBeInTheDocument();
  });

  it("does not show a phone error when the phone field is left empty", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("(555) 000-0000");
    fireEvent.blur(input);
    expect(
      screen.queryByText("Please enter a valid phone number.")
    ).not.toBeInTheDocument();
  });

  // ── Query Param Pre-fill ───────────────────────────────────────────────────

  it("pre-fills the service dropdown from the ?service=documentary query param", () => {
    mockSearchParams.set("service", "documentary");
    render(<ContactForm />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("documentary");
  });

  it("pre-fills the service dropdown from the ?service=speaking query param", () => {
    mockSearchParams.set("service", "speaking");
    render(<ContactForm />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("speaking");
  });

  it("leaves service empty when the query param is absent or invalid", () => {
    render(<ContactForm />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("");
  });

  it("pre-fills the message field from the ?package= query param", () => {
    mockSearchParams.set("package", "Standard Keepsake Documentary");
    render(<ContactForm />);
    const textarea = screen.getByPlaceholderText(
      "Tell us about your project..."
    ) as HTMLTextAreaElement;
    expect(textarea.value).toContain("Standard Keepsake Documentary");
  });

  // ── Submission Flow ────────────────────────────────────────────────────────

it("shows success message and clears the form after a successful submission", async () => {
  // React 19 caches console.error at module load, so jest.spyOn can't suppress its
  // internal act() warnings. IS_REACT_ACT_ENVIRONMENT=false is the documented escape
  // hatch — it tells React not to warn about state updates outside act boundaries.
  (global as unknown as { fetch: unknown }).fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ status: "success" }),
  });

    render(<ContactForm />);
    fillValidForm();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    });

    await waitFor(() => {
      expect(screen.getByText("Your message has been sent!")).toBeInTheDocument();
    });

    expect(
      (screen.getByPlaceholderText("First name") as HTMLInputElement).value
    ).toBe("");
});

  it("shows loading state while the submission is in flight", async () => {
    let resolveRequest!: (value: unknown) => void;
    (global as unknown as { fetch: unknown }).fetch = jest.fn().mockReturnValue(
      new Promise((res) => {
        resolveRequest = res;
      })
    );

    render(<ContactForm />);
    fillValidForm();

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText("Sending...")).toBeInTheDocument();

    resolveRequest({
      ok: true,
      json: async () => ({ status: "success" }),
    });
  });

  it("shows an error message when the API returns a non-success response", async () => {
    (global as unknown as { fetch: unknown }).fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ status: "error" }),
    });

    render(<ContactForm />);
    fillValidForm();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("shows an error message when the fetch call throws a network error", async () => {
    (global as unknown as { fetch: unknown }).fetch = jest.fn().mockRejectedValue(
      new Error("Network error")
    );

    render(<ContactForm />);
    fillValidForm();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("fires a confirmation email request after a successful submission", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "success" }),
    });

    (global as unknown as { fetch: unknown }).fetch = fetchMock;

    render(<ContactForm />);
    fillValidForm();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    });

    await waitFor(() => {
      const confirmCall = fetchMock.mock.calls.find(([url]) =>
        (url as string).includes("/api/contact-confirm")
      );
      expect(confirmCall).toBeDefined();
    });
  });
});
