import {
  HONEYPOT_FIELD,
  isHoneypotFilled,
  isSameOrigin,
} from "./formGuards";

/*
 * Minimal stand in for a Request. The guard reads the url and the headers
 * and nothing else, so building a real one would add nothing the
 * assertions depend on.
 */
const requestWith = (url: string, headers: Record<string, string>): Request =>
  ({
    url,
    headers: {
      get: (name: string) => headers[name.toLowerCase()] ?? null,
    },
  }) as unknown as Request;

/*
 * Story: A submission is checked before anything is written
 * In order to keep scripted and bot traffic out of the spreadsheet and out
 * of Resend, the submission routes want to recognise a request that did not
 * come from a visitor using the form.
 *
 * Scenario: An untouched honeypot is not treated as filled
 *   Given a body whose honeypot field is an empty string
 *   When the guard checks it
 *   Then the submission should pass
 *
 * Scenario: A honeypot holding only whitespace is not treated as filled
 *   Given a body whose honeypot field is spaces
 *   When the guard checks it
 *   Then the submission should pass
 *
 * Scenario: A body carrying no honeypot field at all passes
 *   Given a body posted without the field
 *   When the guard checks it
 *   Then the submission should pass
 *
 * Scenario: A missing body passes rather than throwing
 *   Given a request whose body failed to parse and is null
 *   When the guard checks it
 *   Then the submission should pass
 *
 * Scenario: A filled honeypot is caught
 *   Given a body whose honeypot field holds text
 *   When the guard checks it
 *   Then the submission should be treated as filled
 *
 * Scenario: A honeypot filled with something other than text is caught
 *   Given a body whose honeypot field holds a number
 *   When the guard checks it
 *   Then the submission should be treated as filled
 *
 * Scenario: A request from the site's own origin passes
 *   Given an Origin header matching the host the request arrived on
 *   When the guard checks it
 *   Then the request should be treated as same origin
 *
 * Scenario: A request from another origin is turned away
 *   Given an Origin header naming a different host
 *   When the guard checks it
 *   Then the request should not be treated as same origin
 *
 * Scenario: A request with no Origin header is turned away
 *   Given a request carrying no Origin at all, as a scripted POST does
 *   When the guard checks it
 *   Then the request should not be treated as same origin
 *
 * Scenario: A malformed Origin is turned away rather than throwing
 *   Given an Origin header that is not a URL
 *   When the guard checks it
 *   Then the request should not be treated as same origin
 *
 * Scenario: The host header decides, not the request URL
 *   Given a request whose URL names a different host to its host header
 *   When the Origin matches the host header
 *   Then the request should be treated as same origin
 *
 * Scenario: The request URL supplies the host when no header does
 *   Given a request with no host header
 *   When the Origin matches the host in the request URL
 *   Then the request should be treated as same origin
 */
describe("formGuards", () => {
  it("treats an empty honeypot as untouched", () => {
    expect(isHoneypotFilled({ [HONEYPOT_FIELD]: "" })).toBe(false);
  });

  it("treats a whitespace only honeypot as untouched", () => {
    expect(isHoneypotFilled({ [HONEYPOT_FIELD]: "   " })).toBe(false);
  });

  it("treats a body without the honeypot field as untouched", () => {
    expect(isHoneypotFilled({ email: "visitor@example.com" })).toBe(false);
  });

  it("treats a missing body as untouched", () => {
    expect(isHoneypotFilled(null)).toBe(false);
  });

  it("catches a honeypot filled with text", () => {
    expect(isHoneypotFilled({ [HONEYPOT_FIELD]: "filled by a bot" })).toBe(
      true,
    );
  });

  it("catches a honeypot filled with a value that is not text", () => {
    expect(isHoneypotFilled({ [HONEYPOT_FIELD]: 1 })).toBe(true);
  });

  it("accepts a request from the site's own origin", () => {
    const request = requestWith("https://example.com/api/subscribe", {
      origin: "https://example.com",
      host: "example.com",
    });

    expect(isSameOrigin(request)).toBe(true);
  });

  it("rejects a request from another origin", () => {
    const request = requestWith("https://example.com/api/subscribe", {
      origin: "https://attacker.example",
      host: "example.com",
    });

    expect(isSameOrigin(request)).toBe(false);
  });

  it("rejects a request carrying no Origin header", () => {
    const request = requestWith("https://example.com/api/subscribe", {
      host: "example.com",
    });

    expect(isSameOrigin(request)).toBe(false);
  });

  it("rejects a malformed Origin rather than throwing", () => {
    const request = requestWith("https://example.com/api/subscribe", {
      origin: "not a url",
      host: "example.com",
    });

    expect(isSameOrigin(request)).toBe(false);
  });

  it("compares against the host header rather than the request URL", () => {
    const request = requestWith("https://internal.vercel.app/api/subscribe", {
      origin: "https://example.com",
      host: "example.com",
    });

    expect(isSameOrigin(request)).toBe(true);
  });

  it("falls back to the request URL when there is no host header", () => {
    const request = requestWith("https://example.com/api/subscribe", {
      origin: "https://example.com",
    });

    expect(isSameOrigin(request)).toBe(true);
  });
});
