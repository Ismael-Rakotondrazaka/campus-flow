export const sendResetPasswordEmail = (payload: {
  email: string;
  fullName: string;
}) => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const informationEmail: string = runtimeConfig.informationEmail;
  const fullName: string = payload.fullName;

  return sendEmail({
    from: informationEmail,
    to: payload.email,
    subject: "Réinitialisation de mot de passe réussie",
    body: formatEmailWithLayout({
      body: `<h2 style="font-size:11pt;font-family:sans-serif;color:#000">Réinitialisation de mot de passe réussie</h2><p style="font-size:11pt;font-family:sans-serif;color:#000">Cher/Chère ${sanitize(fullName)}</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Le mot de passe de votre compte du site web LumièreBourg a été réinitialisé avec succès. Vous pouvez maintenant vous connecter à votre compte avec votre nouveau mot de passe.<br>Si vous avez des questions ou avez besoin d'une assistance supplémentaire, n'hésitez pas à contacter notre équipe d'assistance.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Merci de votre coopération&nbsp;!<br>Cordialement</p>`,
      senderEmail: informationEmail,
      senderName: "Équipe administrative",
      title: "Réinitialisation de mot de passe réussie",
    }),
  });
};
