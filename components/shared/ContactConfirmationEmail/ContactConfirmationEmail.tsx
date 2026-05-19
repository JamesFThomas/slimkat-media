export const ContactConfirmationEmail = (
  firstName: string,
  service: string,
  logoContentId: string,
) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
  <img
    src="cid:${logoContentId}"
    alt="SlimKat Media Logo"
    style="display:block; max-width:180px; height:auto; margin: 0 0 16px 0;"
  />

  <h1>We received your inquiry, ${firstName}!</h1>

  <p>
    Hi ${firstName},
  </p>

  <p>
    Thank you for reaching out to SlimKat Media. We've received your inquiry
    regarding <strong>${service}</strong> and will be in touch with you shortly.
  </p>

  <p>
    We appreciate your interest and look forward to connecting with you soon.
  </p>

  <p>
    Talk soon,<br />
    SlimKat Media
  </p>
</div>

`;
