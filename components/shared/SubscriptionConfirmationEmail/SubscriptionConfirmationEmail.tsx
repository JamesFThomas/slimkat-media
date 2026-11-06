export const SubscriptionConfirmationEmail = (logoContentId: string) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
    <img
      src="cid:${logoContentId}"
      alt="SlimKat Media"
      style="display:block; max-width:180px; height:auto; margin: 0 0 24px 0;"
    />

    <h1 style="font-size: 22px; font-weight: 600; margin: 0 0 16px 0;">
      Thanks for subscribing.
    </h1>

    <p>
      You're on the list. We'll write when there is a new documentary to
      share, when speaking dates are announced, and when something worth your
      attention is happening at SlimKat Media.
    </p>

    <p>
      We don't send often, and we don't share your address with anyone.
    </p>

    <p>
      Talk soon,<br />
      <strong>SlimKat Media</strong>
    </p>
  </div>
`;
