export const ConfirmationEmail = (email: string, logoContentId: string) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <img
      src="cid:${logoContentId}"
      alt="SlimKat Media"
      style="display:block; max-width:180px; height:auto; margin: 0 0 16px 0;"
    />
    <h1>Thank you ${email} for subscribing to SlimKat Media!</h1>
    <p>You’re officially on the list. We’ll keep you posted on new updates.</p>
  </div>
`;
