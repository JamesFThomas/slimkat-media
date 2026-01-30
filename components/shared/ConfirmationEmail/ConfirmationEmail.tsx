export const ConfirmationEmail = (email: string, logoContentId: string) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
  <img
    src="cid:${logoContentId}"
    alt="SlimKat Media Logo"
    style="display:block; max-width:180px; height:auto; margin: 0 0 16px 0;"
  />

  <h1>Thanks for subscribing to SlimKat Media!</h1>

  <p>
    Hi ${email},
  </p>

  <p>
    Thanks for signing up. You're officially on our list.
  </p>

  <p>
    We're still in the early stages and this email is part of a test while we
    finish building out our content and offerings.
  </p>

  <p>
    When SlimKat Media officially launches, you'll be the first to hear about it.
    We appreciate you checking back in once things are live.
  </p>

  <p>
    Talk soon,<br />
    SlimKat Media
  </p>
</div>

`;
