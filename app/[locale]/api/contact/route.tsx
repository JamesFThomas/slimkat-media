import {
  ContactConfirmationEmail,
  type ContactConfirmationEmailCopy,
} from "@/components/shared/ContactConfirmationEmail/ContactConfirmationEmail";
import { SubmissionNotificationEmail } from "@/components/shared/SubmissionNotificationEmail/SubmissionNotificationEmail";
import { notificationRecipients } from "@/lib/email/client";
import { resolveLocale } from "@/lib/email/locale";
import { sendSubmissionEmails, type SubmissionEmail } from "@/lib/email/send";
import {
  isHoneypotFilled,
  isSameOrigin,
} from "@/lib/security/formGuards";
import { getTranslations } from "next-intl/server";
import path from "path";
import fs from "fs";
import type { NextRequest } from "next/server";

// fs is used to read the logo off disk, so this route cannot run on edge.
export const runtime = "nodejs";

type GoogleSheetsResponse = {
  status: "success" | "error";
};

// Recorded against the row in the shared spreadsheet, so one tab can hold
// every site's entries. Convention across the sites: slimkat_, foundation_,
// farm_.
const submissionType = "slimkat_contact";

const googleSheetsEndpoint =
  "https://script.google.com/macros/s/AKfycbxMKuWhC3PoJjj1t00WmwRaBy3K-a37eDx6x1D3gmCYdNEvDcBRBr1Dp1RYc8Z_yvoDCg/exec";

const sender = "Slim Kat Media LLC <no-reply@slimkatmedia.com>";

// Attached and referenced by content id rather than by URL, so the logo
// always renders even in clients that block remote images.
const logoPath = path.join(process.cwd(), "public", "logo", "SlimKat_Logo.png");

const logoAttachment = fs.readFileSync(logoPath).toString("base64");

const serviceOptionKeys = ["documentary", "speaking"] as const;

type ServiceOptionKey = (typeof serviceOptionKeys)[number];

const isServiceOptionKey = (value: unknown): value is ServiceOptionKey =>
  serviceOptionKeys.includes(value as ServiceOptionKey);

const errorResponse = (status: number, message: string) =>
  new Response(JSON.stringify({ status: "error", message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const successResponse = (message: string) =>
  new Response(JSON.stringify({ status: "success", message }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

export async function POST(request: NextRequest) {
  try {
    // 1) Turn away anything that is not a browser on this site. The only
    //    one of these checks a scripted POST cannot satisfy.
    if (!isSameOrigin(request)) {
      console.warn("CONTACT_REJECTED_ORIGIN", {
        origin: request.headers.get("origin"),
      });

      return errorResponse(403, "Contact submission failed");
    }

    // 2) Parse request body safely inside try/catch
    const body = await request.json().catch(() => null);
    const { firstName, lastName, email, phone, service, message, locale } =
      body ?? {};

    // 3) Answered as a success so a bot learns nothing, while no row is
    //    written and no email is sent. Logged so the volume is visible.
    if (isHoneypotFilled(body)) {
      console.warn("CONTACT_REJECTED_HONEYPOT");

      return successResponse("Contact submission successful");
    }

    // 4) Validate required fields
    if (!firstName || !lastName || !email || !service || !message) {
      return errorResponse(400, "Missing required fields");
    }

    // 5) Call Apps Script from the server (no browser CORS)
    const upstreamResponse = await fetch(googleSheetsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: submissionType,
        firstName,
        lastName,
        email,
        phone,
        service,
        message,
      }),
      cache: "no-store",
    });

    // 6) Read text first so we can log + handle non-JSON responses cleanly
    const upstreamText = await upstreamResponse.text();

    // 7) If upstream is non-2xx, return a controlled error
    if (!upstreamResponse.ok) {
      console.error("Apps Script error", {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        body: upstreamText,
      });

      return errorResponse(502, "Contact submission failed");
    }

    // 8) Parse upstream JSON if possible, otherwise treat it as an error
    let upstreamJson: GoogleSheetsResponse | null = null;

    try {
      upstreamJson = JSON.parse(upstreamText) as GoogleSheetsResponse;
    } catch {
      console.error("Apps Script returned non-JSON success response", {
        status: upstreamResponse.status,
        body: upstreamText,
      });

      return errorResponse(502, "Contact submission failed");
    }

    // 9) Interpret Apps Script response
    if (upstreamJson?.status !== "success") {
      console.error("Apps Script responded without success status", upstreamJson);

      return errorResponse(502, "Contact submission failed");
    }

    // 10) The row is recorded, so now send the email raised by it. Sending
    //    happens here rather than from the browser, so there is no public
    //    endpoint that will send mail to an arbitrary address on request.
    const resolvedLocale = resolveLocale(locale);
    const trimmedFirstName = String(firstName).trim();

    const t = await getTranslations({
      locale: resolvedLocale,
      namespace: "ContactConfirmationEmail",
    });
    const tForm = await getTranslations({
      locale: resolvedLocale,
      namespace: "ContactForm",
    });

    const serviceLabel = isServiceOptionKey(service)
      ? tForm(`serviceOptions.${service}`)
      : String(service);

    const copy: ContactConfirmationEmailCopy = {
      logoAlt: t("logoAlt"),
      heading: t("heading", { firstName: trimmedFirstName }),
      greeting: t("greeting", { firstName: trimmedFirstName }),
      // The email is an HTML string, so the emphasis is interpolated as markup.
      intro: t("intro", { service: `<strong>${serviceLabel}</strong>` }),
      appreciation: t("appreciation"),
      signOff: t("signOff"),
      team: t("team"),
    };

    const emails: SubmissionEmail[] = [
      {
        from: sender,
        to: email,
        subject: t("subject"),
        html: ContactConfirmationEmail("SlimKat_Logo", copy),
        attachments: [
          {
            content: logoAttachment,
            filename: "SlimKat_Logo.png",
            contentId: "SlimKat_Logo",
          },
        ],
      },
    ];

    const recipients = notificationRecipients();

    if (recipients.length > 0) {
      emails.push({
        from: sender,
        to: recipients,
        // Replying in Outlook answers the sender rather than the mailbox.
        replyTo: email,
        subject: `New contact inquiry from ${trimmedFirstName} ${String(lastName).trim()} on slimkatmedia.com`,
        html: SubmissionNotificationEmail("New Slim Kat Contact", [
          {
            label: "Name",
            value: `${trimmedFirstName} ${String(lastName).trim()}`,
          },
          { label: "Email", value: String(email) },
          { label: "Phone", value: String(phone || "Not given") },
          { label: "Service", value: serviceLabel },
          { label: "Message", value: String(message) },
          { label: "Language", value: resolvedLocale.toUpperCase() },
        ]),
      });
    }

    await sendSubmissionEmails("CONTACT", emails);

    return successResponse("Contact submission successful");
  } catch (error) {
    console.error("Error processing contact submission:", error);

    return errorResponse(500, "Contact submission failed");
  }
}
