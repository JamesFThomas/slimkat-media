import {
  ContactConfirmationEmail,
  type ContactConfirmationEmailCopy,
} from "@/components/shared/ContactConfirmationEmail/ContactConfirmationEmail";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import path from "path";
import fs from "fs";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
const resend = new Resend(process.env.RESEND_API_KEY);

// Attached and referenced by content id rather than by URL, so the logo
// always renders even in clients that block remote images.
const filePath = path.join(process.cwd(), "public", "logo", "SlimKat_Logo.png");

const attachment = fs.readFileSync(filePath).toString("base64");

const serviceOptionKeys = ["documentary", "speaking"] as const;

type ServiceOptionKey = (typeof serviceOptionKeys)[number];

const isServiceOptionKey = (value: unknown): value is ServiceOptionKey =>
  serviceOptionKeys.includes(value as ServiceOptionKey);

// The form posts to an unprefixed /api path, so the locale travels in the
// request body rather than the route segment. Anything unrecognised falls
// back to the default locale.
const resolveLocale = (value: unknown): string =>
  typeof value === "string" &&
  (routing.locales as readonly string[]).includes(value)
    ? value
    : routing.defaultLocale;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const { email, firstName, service, locale } = body ?? {};

    // guard for missing required fields
    if (!email || !firstName || !service) {
      return Response.json(
        { error: "email, firstName, and service are required" },
        { status: 400 },
      );
    }

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

    const { data, error } = await resend.emails.send({
      from: "SlimKat Media LLC. <no-reply@slimkatmedia.com>",
      to: email,
      subject: t("subject"),
      html: ContactConfirmationEmail("SlimKat_Logo", copy),
      attachments: [
        {
          content: attachment,
          filename: "SlimKat_Logo.png",
          contentId: "SlimKat_Logo",
        },
      ],
    });

    if (error) {
      console.error("RESEND_CONTACT_CONFIRM_ERROR", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error("RESEND_CONTACT_CONFIRM_ERROR", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
