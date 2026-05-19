import { ContactConfirmationEmail } from "@/components/shared/ContactConfirmationEmail/ContactConfirmationEmail";
import { Resend } from "resend";
import path from "path";
import fs from "fs";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
const resend = new Resend(process.env.RESEND_API_KEY);

const filePath = path.join(process.cwd(), "public", "logo", "SlimKat_Logo.png");

const attachment = fs.readFileSync(filePath).toString("base64");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const { email, firstName, service } = body ?? {};

    // guard for missing required fields
    if (!email || !firstName || !service) {
      return Response.json(
        { error: "email, firstName, and service are required" },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "SlimKat Media LLC. <no-reply@slimkatmedia.com>",
      to: email,
      subject: "We received your inquiry — SlimKat Media",
      html: ContactConfirmationEmail(firstName, service, "SlimKat_Logo"),
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
