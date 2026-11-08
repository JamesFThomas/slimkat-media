import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import {
  SubscriptionConfirmationEmail,
  type SubscriptionConfirmationEmailCopy,
} from "./SubscriptionConfirmationEmail";

const copy: SubscriptionConfirmationEmailCopy = {
  logoAlt: "SlimKat Media Logo",
  heading: "Thanks for subscribing.",
  intro: "You're on the list. We'll send word so you can be there.",
  assurance: "No fixed schedule, no spam, and your address goes nowhere else.",
  signOff: "Talk soon,",
  team: "SlimKat Media",
};

/*
 * Story: A new subscriber receives a confirmation email in their own language
 * In order to know their signup worked and what it commits them to,
 * a visitor who subscribes wants a branded confirmation written in the
 * language they used on the site.
 *
 * Scenario: The template renders every piece of copy it is given
 *   Given a set of resolved copy strings
 *   When the template is rendered
 *   Then the heading, intro, assurance, sign off and team should all appear
 *
 * Scenario: The logo is embedded by content id with localized alt text
 *   Given a logo content id and an alt string
 *   When the template is rendered
 *   Then the image should reference the content id and carry that alt text
 *
 * Scenario: French copy exists for every English key
 *   Given the SubscriptionConfirmationEmail namespace in the English messages
 *   When it is compared with the French messages
 *   Then both should define exactly the same keys
 */
describe("SubscriptionConfirmationEmail", () => {
  const logoContentId = "SlimKat_Logo";

  it("renders every piece of copy it is given", () => {
    const html = SubscriptionConfirmationEmail(logoContentId, copy);

    expect(html).toContain(copy.heading);
    expect(html).toContain(copy.intro);
    expect(html).toContain(copy.assurance);
    expect(html).toContain(copy.signOff);
    expect(html).toContain(copy.team);
  });

  it("embeds the logo by content id with the supplied alt text", () => {
    const html = SubscriptionConfirmationEmail(logoContentId, copy);

    expect(html).toContain(`src="cid:${logoContentId}"`);
    expect(html).toContain('alt="SlimKat Media Logo"');
  });

  it("defines the same message keys in English and French", () => {
    const enKeys = Object.keys(en.SubscriptionConfirmationEmail).sort();
    const frKeys = Object.keys(fr.SubscriptionConfirmationEmail).sort();

    expect(frKeys).toEqual(enKeys);
  });
});
