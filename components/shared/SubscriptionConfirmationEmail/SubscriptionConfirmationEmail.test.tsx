import { SubscriptionConfirmationEmail } from "./SubscriptionConfirmationEmail";

/*
 * Story: A new subscriber receives a confirmation email
 * In order to know their signup worked,
 * a visitor who subscribes wants a branded confirmation in their inbox.
 *
 * Scenario: The logo is embedded by content id
 *   Given a logo content id
 *   When the template is rendered
 *   Then the image should reference that content id and carry the alt text
 *
 * Scenario: The subscriber is told what they will receive
 *   Given the template is rendered
 *   When the body is read
 *   Then it should name what SlimKat Media will write about and sign off
 */
describe("SubscriptionConfirmationEmail", () => {
  const logoContentId = "SlimKat_Logo";

  it("embeds the logo by content id", () => {
    const html = SubscriptionConfirmationEmail(logoContentId);

    expect(html).toContain(`src="cid:${logoContentId}"`);
    expect(html).toContain('alt="SlimKat Media"');
  });

  it("tells the subscriber what they will receive and signs off", () => {
    const html = SubscriptionConfirmationEmail(logoContentId);

    expect(html).toContain("Thanks for subscribing.");
    expect(html).toContain("new documentary");
    expect(html).toContain("Talk soon,");
  });
});
