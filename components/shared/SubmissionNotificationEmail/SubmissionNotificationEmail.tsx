export type SubmissionNotificationRow = {
  label: string;
  value: string;
};

// Submitted values are escaped before they reach the markup. The visitor
// controls these strings, and this email is read in our own inbox.
const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const renderValue = (value: string): string =>
  escapeHtml(value).replace(/\n/g, "<br />");

// The site's accent, carried so a notification is identifiable at a glance
// when several are open at once. Matches --accent-link in globals.css.
const accentBar = "#3aafa0";

// Heading text needs the darker variant: the bar colour is only 2.7:1 on
// white, under the 3:1 minimum for large text. Matches --accent-link-hover.
const accentText = "#1f6f67";

/**
 * Internal notification sent to the team when a form is submitted.
 *
 * Carries the site's accent and nothing more: it is read by us, not by a
 * visitor, so a logo would only put an attachment on every notification. It
 * stays in English regardless of the locale the visitor used.
 */
export const SubmissionNotificationEmail = (
  heading: string,
  rows: SubmissionNotificationRow[],
) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 640px; color: #1a1a1a;">
    <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="background-color: ${accentBar}; height: 4px; line-height: 4px; font-size: 0;">&nbsp;</td>
      </tr>
    </table>

    <h1 style="font-size: 18px; font-weight: 600; margin: 20px 0 16px 0; color: ${accentText};">
      ${escapeHtml(heading)}
    </h1>

    <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      ${rows
        .map(
          (row) => `
      <tr>
        <td style="padding: 6px 16px 6px 0; vertical-align: top; color: #555555; white-space: nowrap;">
          ${escapeHtml(row.label)}
        </td>
        <td style="padding: 6px 0; vertical-align: top;">
          ${renderValue(row.value)}
        </td>
      </tr>`,
        )
        .join("")}
    </table>

    <p style="margin: 24px 0 0 0; color: #777777; font-size: 12px;">
      Sent automatically on form submission. Reply to this message to answer
      the sender directly.
    </p>
  </div>
`;
