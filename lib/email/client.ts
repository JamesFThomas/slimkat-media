import { Resend } from "resend";

// One Resend client for the whole app, created at module load rather than
// per request.
export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Internal addresses that receive a notification when a form is submitted.
 *
 * Comma separated in the environment so recipients can be added or changed
 * without a code change. Returns an empty list when unset, which callers
 * treat as "send no notification" rather than as an error.
 */
export const notificationRecipients = (): string[] =>
  (process.env.NOTIFICATION_RECIPIENTS ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
