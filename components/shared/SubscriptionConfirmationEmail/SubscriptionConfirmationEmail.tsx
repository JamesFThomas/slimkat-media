export type SubscriptionConfirmationEmailCopy = {
  logoAlt: string;
  heading: string;
  intro: string;
  assurance: string;
  signOff: string;
  team: string;
};

export const SubscriptionConfirmationEmail = (
  logoContentId: string,
  copy: SubscriptionConfirmationEmailCopy,
) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
    <img
      src="cid:${logoContentId}"
      alt="${copy.logoAlt}"
      style="display:block; max-width:180px; height:auto; margin: 0 0 24px 0;"
    />

    <h1 style="font-size: 22px; font-weight: 600; margin: 0 0 16px 0;">
      ${copy.heading}
    </h1>

    <p>
      ${copy.intro}
    </p>

    <p>
      ${copy.assurance}
    </p>

    <p>
      ${copy.signOff}<br />
      <strong>${copy.team}</strong>
    </p>
  </div>
`;
