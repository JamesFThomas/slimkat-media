export const SubscriptionConfirmationEmail = (
  email: string,
  logoContentId: string,
) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
    <img
      src="cid:${logoContentId}"
      alt="James & Kayla Thomas Foundation"
      style="display:block; max-width:220px; height:auto; margin: 0 auto 24px auto;"
    />

    <h1 style="font-size: 22px; font-weight: 600; margin: 0 0 16px 0;">
      Thank you for believing in people.
    </h1>

    <p>Hi ${email},</p>

    <p>
      You've just joined a community built on one simple idea — that investing
      in people changes everything.
    </p>

    <p>
      The James &amp; Kayla Thomas Foundation is working toward our first program
      launch in <strong>2027</strong>: a media studio and hands-on curriculum
      designed to equip people with the skills to use media as a tool for business,
      storytelling, and opportunity. Think podcasting, content creation, and
      building a voice that works for you.
    </p>

    <p>
      Beyond the studio, we're building toward agricultural programs that connect
      people to the land and to sustainable ways of living and working. There's
      a lot in store.
    </p>

    <p>
      You'll hear from us right here at this email address as we get closer to
      launch — program announcements, updates, and ways to get involved.
      We're glad you're with us early.
    </p>

    <p>
      With purpose,<br />
      <strong>James &amp; Kayla Thomas Foundation</strong>
    </p>
  </div>
`;
