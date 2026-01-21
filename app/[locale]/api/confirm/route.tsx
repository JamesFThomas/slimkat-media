import { ConfirmationEmail } from '@/components/shared/ConfirmationEmail/ConfirmationEmail';
import { Resend } from 'resend';
import path from 'path';
import fs from 'fs';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
const resend = new Resend(process.env.RESEND_API_KEY);

const filePath = path.join(process.cwd(), 'public', 'logo', 'SlimKat_Logo.png');

const attachment = fs.readFileSync(filePath).toString('base64');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = body?.email;

    // guard for missing email
    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'SlimKat Media LLC. <onboarding@resend.dev>',
      to: 'jamesfeltonthomas@gmail.com', // replace with user email after tests are passing
      subject: 'Subscription Confirmation',
      html: ConfirmationEmail(email, 'SlimKat_Logo'),
      attachments: [
        {
          content: attachment,
          filename: 'SlimKat_Logo.png',
          contentId: 'SlimKat_Logo',
        },
      ],
    });

    if (error) {
      console.error('RESEND_SEND_ERROR', error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error('RESEND_SEND_ERROR', error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
