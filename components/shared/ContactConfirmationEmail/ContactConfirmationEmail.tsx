export type ContactConfirmationEmailCopy = {
  logoAlt: string;
  heading: string;
  greeting: string;
  intro: string;
  appreciation: string;
  signOff: string;
  team: string;
};

export const ContactConfirmationEmail = (
  logoContentId: string,
  copy: ContactConfirmationEmailCopy,
) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
  <img
    src="cid:${logoContentId}"
    alt="${copy.logoAlt}"
    style="display:block; max-width:180px; height:auto; margin: 0 0 16px 0;"
  />

  <h1>${copy.heading}</h1>

  <p>
    ${copy.greeting}
  </p>

  <p>
    ${copy.intro}
  </p>

  <p>
    ${copy.appreciation}
  </p>

  <p>
    ${copy.signOff}<br />
    ${copy.team}
  </p>
</div>

`;
