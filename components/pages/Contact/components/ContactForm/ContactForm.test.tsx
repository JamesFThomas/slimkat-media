import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { ContactForm } from "./ContactForm";
import { HONEYPOT_FIELD } from "@/lib/security/formGuards";

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
  fireEvent.change(screen.getByPlaceholderText("email@address.com"), {
    target: { name: "email", value: "james@example.com" },
  });
  fireEvent.change(screen.getByRole("combobox"), {
    target: { name: "service", value: "documentary" },
  });
  fireEvent.change(screen.getByPlaceholderText("Share any details about your project..."), {
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
 * Scenario: Phone field rejects a number with too many digits
 *   Given I type a string of digits longer than a US number
 *   When I blur the phone field
 *   Then I should see a phone validation error
 *
 * Scenario: Phone field accepts a formatted US number with country code
 *   Given I type a US number with the country code and punctuation
 *   When I blur the phone field
 *   Then I should not see a phone validation error
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
 *
 * Scenario: Surrounding whitespace is stripped before submission
 *   Given I type a first name with a leading and trailing space
 *   When the form submits successfully
 *   Then the submission should carry the trimmed first name
 *
 * Scenario: The active locale travels with the submission
 *   Given I am viewing the Contact page in a given locale
 *   When the form submits successfully
 *   Then the submission should include that locale
 *
 * Scenario: The form makes one request and leaves the email to the server
 *   Given I have filled the form with valid data
 *   When the form submits successfully
 *   Then only the submission request should be made from the browser
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
    expect(screen.getByPlaceholderText("email@address.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("(555) 000-0000")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Share any details about your project...")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit/i })
    ).toBeInTheDocument();
  });

  // ── Submit Button State ────────────────────────────────────────────────────

  it("submit button is disabled when the form is empty", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("submit button enables once all required fields contain valid data", () => {
    render(<ContactForm />);
    fillValidForm();
    expect(
      screen.getByRole("button", { name: /submit/i })
    ).not.toBeDisabled();
  });

  // ── Field-level Validation ─────────────────────────────────────────────────

  it("shows first name error after blurring an empty first name field", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("First name");
    fireEvent.blur(input);
    expect(screen.getByText("First name is required")).toBeInTheDocument();
  });

  it("shows last name error after blurring an empty last name field", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("Last name");
    fireEvent.blur(input);
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
  });

  it("shows email required error after blurring an empty email field", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("email@address.com");
    fireEvent.blur(input);
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("shows invalid email error when a malformed email is entered", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("email@address.com");
    fireEvent.change(input, {
      target: { name: "email", value: "not-an-email" },
    });
    fireEvent.blur(input);
    expect(
      screen.getByText("email@address.com format is required")
    ).toBeInTheDocument();
  });

  it("shows service required error after blurring without selecting a service", () => {
    render(<ContactForm />);
    const select = screen.getByRole("combobox");
    fireEvent.blur(select);
    expect(screen.getByText("Please select a service")).toBeInTheDocument();
  });

  it("shows message required error after blurring an empty message field", () => {
    render(<ContactForm />);
    const textarea = screen.getByPlaceholderText(
      "Share any details about your project..."
    );
    fireEvent.blur(textarea);
    expect(screen.getByText("Please tell us about your requirement")).toBeInTheDocument();
  });

  it("shows phone validation error when a malformed number is entered", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("(555) 000-0000");
    fireEvent.change(input, {
      target: { name: "phone", value: "12345" },
    });
    fireEvent.blur(input);
    expect(
      screen.getByText("Please enter a valid phone number")
    ).toBeInTheDocument();
  });

  it("shows phone validation error when too many digits are entered", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("(555) 000-0000");
    fireEvent.change(input, {
      target: { name: "phone", value: "555555555555" },
    });
    fireEvent.blur(input);
    expect(
      screen.getByText("Please enter a valid phone number")
    ).toBeInTheDocument();
  });

  it("accepts a formatted US number with a country code", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("(555) 000-0000");
    fireEvent.change(input, {
      target: { name: "phone", value: "+1 (504) 236-9366" },
    });
    fireEvent.blur(input);
    expect(
      screen.queryByText("Please enter a valid phone number")
    ).not.toBeInTheDocument();
  });

  it("does not show a phone error when the phone field is left empty", () => {
    render(<ContactForm />);
    const input = screen.getByPlaceholderText("(555) 000-0000");
    fireEvent.blur(input);
    expect(
      screen.queryByText("Please enter a valid phone number")
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
      "Share any details about your project..."
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
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    await waitFor(() => {
      expect(screen.getByText("Thank you! We'll be in touch soon.")).toBeInTheDocument();
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

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText("Submitting...")).toBeInTheDocument();

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
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
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
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("trims surrounding whitespace from the first name before submitting", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "success" }),
    });

    (global as unknown as { fetch: unknown }).fetch = fetchMock;

    render(<ContactForm />);
    fillValidForm();
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { name: "firstName", value: "  James  " },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    await waitFor(() => {
      const payload = JSON.parse(
        (fetchMock.mock.calls[0] as [string, { body: string }])[1].body
      );
      expect(payload.firstName).toBe("James");
    });
  });

  it("sends the active locale with the submission", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "success" }),
    });

    (global as unknown as { fetch: unknown }).fetch = fetchMock;

    render(<ContactForm />);
    fillValidForm();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    await waitFor(() => {
      const payload = JSON.parse(
        (fetchMock.mock.calls[0] as [string, { body: string }])[1].body
      );
      expect(payload.locale).toBe("en");
    });
  });

  it("makes a single request, leaving the emails to the server", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "success" }),
    });

    (global as unknown as { fetch: unknown }).fetch = fetchMock;

    render(<ContactForm />);
    fillValidForm();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
    expect(fetchMock.mock.calls[0][0]).toBe("/api/contact");
  });

  it("keeps the honeypot out of the tab order and away from assistive technology", () => {
    render(<ContactForm />);

    const honeypot = document.querySelector(`input[name="${HONEYPOT_FIELD}"]`);

    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot).toHaveAttribute("aria-hidden", "true");
    expect(honeypot).toHaveAttribute("autocomplete", "off");
  });

  it("shows the retry message on a 429 without reading the response body", async () => {
    const json = jest.fn().mockRejectedValue(new Error("not json"));

    (global as unknown as { fetch: unknown }).fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json,
    });

    render(<ContactForm />);
    fillValidForm();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByText("Too many attempts. Please wait a few minutes and try again.")
      ).toBeInTheDocument();
    });

    expect(json).not.toHaveBeenCalled();
  });

  it("carries an empty honeypot on a real submission", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "success" }),
    });

    (global as unknown as { fetch: unknown }).fetch = fetchMock;

    render(<ContactForm />);
    fillValidForm();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });

    await waitFor(() => {
      const payload = JSON.parse(
        (fetchMock.mock.calls[0] as [string, { body: string }])[1].body
      );
      expect(payload[HONEYPOT_FIELD]).toBe("");
    });
  });
});
