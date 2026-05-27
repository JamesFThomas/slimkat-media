import { SubscriptionConfirmationEmail } from "../../../../components/shared/SubscriptionConfirmationEmail/SubscriptionConfirmationEmail";
import { Resend } from "resend";
import path from "path";
import fs from "fs";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
const resend = new Resend(process.env.RESEND_API_KEY);

const filePath = path.join(process.cwd(), "public", "logo", "jktf-logo.png");

const attachment = fs.readFileSync(filePath).toString("base64");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = body?.email;

    // guard for missing email
    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "James & Kayla Thomas Foundation <no-reply@slimkatmedia.com>",
      to: email,
      subject: "You're subscribed — James & Kayla Thomas Foundation",
      html: SubscriptionConfirmationEmail(email, "jktf_logo"),
      attachments: [
        {
          content: attachment,
          filename: "jktf-logo.png",
          contentId: "jktf_logo",
        },
      ],
    });

    if (error) {
      console.error("RESEND_SEND_ERROR", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error("RESEND_SEND_ERROR", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
