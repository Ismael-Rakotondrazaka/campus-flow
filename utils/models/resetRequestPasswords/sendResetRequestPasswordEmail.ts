export const sendResetRequestPasswordEmail = (payload: {
  email: string;
  fullName: string;
  token: string;
  expiresAt: Date;
}) => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const informationEmail: string = runtimeConfig.informationEmail;
  const fullName: string = sanitize(payload.fullName);
  const resetUrl: string = `${runtimeConfig.clientLoginUrl}?t=${payload.token}`;
  const tokenExpiresAt: string = `${Math.round((payload.expiresAt.getTime() - Date.now()) / 3600000)} heure`;

  return sendEmail({
    from: informationEmail,
    to: payload.email,
    subject: "Instructions de réinitialisation de mot de passe",
    body: formatEmailWithLayout({
      body: `<h2 style="color:#000">Instructions de réinitialisation de mot de passe</h2><p style="font-size:11pt;font-family:sans-serif;color:#000">Cher/Chère ${sanitize(fullName)},</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Vous avez demandé la réinitialisation du mot de passe de votre compte du site web LumièreBourg.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Pour réinitialiser votre mot de passe, veuillez suivre les instructions ci-dessous&nbsp;:</p><ol style="font-size:11pt;font-family:sans-serif;color:#000"><li style="font-size:11pt;font-family:sans-serif;color:#000">Cliquez sur le lien suivant pour réinitialiser votre mot de passe&nbsp: <a href="${resetUrl}">${resetUrl}</a></li><li style="font-size:11pt;font-family:sans-serif;color:#000">Vous serez redirigé(e) vers une page où vous pourrez définir un nouveau mot de passe pour votre compte.</li></ol><p style="font-size:11pt;font-family:sans-serif;color:#000">Veuillez noter les points suivants&nbsp;:</p><ul style="font-size:11pt;font-family:calibri,sans-serif"><li>Ce lien de réinitialisation de mot de passe est valide pendant une période limitée et expirera dans ${tokenExpiresAt}.</li><li>Si vous n'avez pas initié cette demande de réinitialisation de mot de passe, veuillez ignorer cet e-mail.</li></ul><p style="font-size:11pt;font-family:sans-serif;color:#000">Veuillez vous rappeler de garder votre mot de passe en sécurité et de ne le partager avec personne. Si vous rencontrez des problèmes ou avez des questions, n'hésitez pas à contacter notre équipe de support à <a href="mailto:${informationEmail}">${informationEmail}</a>.<br>Merci de votre coopération&nbsp;!</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Cordialement,</p>`,
      senderEmail: informationEmail,
      senderName: "Équipe administrative",
      title: "Instructions de réinitialisation de mot de passe",
    }),
  });
};
