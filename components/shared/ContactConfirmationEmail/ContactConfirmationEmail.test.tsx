import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import {
  ContactConfirmationEmail,
  type ContactConfirmationEmailCopy,
} from "./ContactConfirmationEmail";

const copy: ContactConfirmationEmailCopy = {
  logoAlt: "SlimKat Media Logo",
  heading: "We received your inquiry, James!",
  greeting: "Hi James,",
  intro: "We've received your inquiry regarding <strong>Documentary Services</strong>.",
  appreciation: "We appreciate your interest.",
  signOff: "Talk soon,",
  team: "SlimKat Media",
};

/*
 * Story: A visitor receives a confirmation email in their own language
 * In order to feel confident their inquiry arrived,
 * a visitor who submits the contact form wants a confirmation email
 * written in the language they used on the site.
 *
 * Scenario: The template renders every piece of copy it is given
 *   Given a set of resolved copy strings
 *   When the template is rendered
 *   Then the heading, greeting, intro, appreciation, sign off and team should all appear
 *
 * Scenario: The logo is embedded by content id with localized alt text
 *   Given a logo content id and an alt string
 *   When the template is rendered
 *   Then the image should reference the content id and carry that alt text
 *
 * Scenario: The greeting is rendered exactly as supplied
 *   Given a greeting with no space before its comma
 *   When the template is rendered
 *   Then the rendered greeting should contain no space before the comma
 *
 * Scenario: French copy exists for every English key
 *   Given the ContactConfirmationEmail namespace in the English messages
 *   When it is compared with the French messages
 *   Then both should define exactly the same keys
 */
describe("ContactConfirmationEmail", () => {
  const logoContentId = "SlimKat_Logo";

  it("renders every piece of copy it is given", () => {
    const html = ContactConfirmationEmail(logoContentId, copy);

    expect(html).toContain(copy.heading);
    expect(html).toContain(copy.greeting);
    expect(html).toContain(copy.intro);
    expect(html).toContain(copy.appreciation);
    expect(html).toContain(copy.signOff);
    expect(html).toContain(copy.team);
  });

  it("embeds the logo by content id with the supplied alt text", () => {
    const html = ContactConfirmationEmail(logoContentId, copy);

    expect(html).toContain(`src="cid:${logoContentId}"`);
    expect(html).toContain('alt="SlimKat Media Logo"');
  });

  it("renders the greeting without introducing a space before the comma", () => {
    const html = ContactConfirmationEmail(logoContentId, copy);

    expect(html).toContain("Hi James,");
    expect(html).not.toContain("Hi James ,");
  });

  it("defines the same message keys in English and French", () => {
    const enKeys = Object.keys(en.ContactConfirmationEmail).sort();
    const frKeys = Object.keys(fr.ContactConfirmationEmail).sort();

    expect(frKeys).toEqual(enKeys);
  });
});
