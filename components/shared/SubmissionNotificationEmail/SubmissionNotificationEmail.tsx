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

/**
 * Internal notification sent to the team when a form is submitted.
 *
 * Deliberately plain and unbranded: it is read by us, not by a visitor, and
 * it stays in English regardless of the locale the visitor used.
 */
export const SubmissionNotificationEmail = (
  heading: string,
  rows: SubmissionNotificationRow[],
) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 640px; color: #1a1a1a;">
    <h1 style="font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">
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
