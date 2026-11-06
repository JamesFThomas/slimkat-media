import { resend } from "./client";

export type SubmissionEmail = Parameters<typeof resend.emails.send>[0];

/**
 * Sends every email raised by a single form submission.
 *
 * Sent in parallel and never throws. A submission that reached the
 * spreadsheet has succeeded from the visitor's point of view, so a failed
 * email is logged for us rather than surfaced to them as a failed
 * submission. Settled rather than all, so one failure cannot prevent the
 * others from being sent.
 */
export const sendSubmissionEmails = async (
  label: string,
  emails: SubmissionEmail[],
): Promise<void> => {
  const results = await Promise.allSettled(
    emails.map((email) => resend.emails.send(email)),
  );

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`${label}_EMAIL_THREW`, { index, reason: result.reason });
      return;
    }

    if (result.value.error) {
      console.error(`${label}_EMAIL_ERROR`, {
        index,
        error: result.value.error,
      });
    }
  });
};
