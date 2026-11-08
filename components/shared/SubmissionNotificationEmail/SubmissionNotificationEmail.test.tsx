import { SubmissionNotificationEmail } from "./SubmissionNotificationEmail";

/*
 * Story: The team is notified of a form submission
 * In order to answer an inquiry without watching the spreadsheet,
 * James and Kayla want an email naming what was submitted.
 *
 * Scenario: The site's accent marks which site the submission came from
 *   Given the template is rendered
 *   When the notification is open beside another site's notification
 *   Then an accent bar and an accent heading should identify the site
 *
 * Scenario: Every submitted field appears
 *   Given a heading and a set of label and value rows
 *   When the template is rendered
 *   Then every label and every value should appear in the output
 *
 * Scenario: Submitted values cannot inject markup
 *   Given a value containing HTML tags
 *   When the template is rendered
 *   Then the tags should be escaped rather than rendered
 *
 * Scenario: Line breaks in a long message survive
 *   Given a value containing newlines
 *   When the template is rendered
 *   Then the newlines should render as line breaks
 */
describe("SubmissionNotificationEmail", () => {
  it("marks the notification with the site accent", () => {
    const html = SubmissionNotificationEmail("New Slim Kat Contact", [
      { label: "Email", value: "visitor@example.com" },
    ]);

    expect(html).toContain("background-color: #3aafa0");
    expect(html).toContain("color: #1f6f67");
  });

  it("renders every label and value it is given", () => {
    const html = SubmissionNotificationEmail("New contact submission", [
      { label: "Name", value: "James Thomas" },
      { label: "Email", value: "james@example.com" },
    ]);

    expect(html).toContain("New contact submission");
    expect(html).toContain("Name");
    expect(html).toContain("James Thomas");
    expect(html).toContain("Email");
    expect(html).toContain("james@example.com");
  });

  it("escapes markup in submitted values", () => {
    const html = SubmissionNotificationEmail("New contact submission", [
      { label: "Message", value: "<script>alert('x')</script>" },
    ]);

    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("renders newlines in a submitted value as line breaks", () => {
    const html = SubmissionNotificationEmail("New contact submission", [
      { label: "Message", value: "first line\nsecond line" },
    ]);

    expect(html).toContain("first line<br />second line");
  });
});
