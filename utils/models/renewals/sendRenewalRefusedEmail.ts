export const sendRenewalRefusedEmail = (payload: {
  email: string;
  fullName: string;
}) => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const informationEmail: string = runtimeConfig.informationEmail;
  const fullName: string = sanitize(payload.fullName);

  return sendEmail({
    from: informationEmail,
    to: payload.email,
    subject:
      "Notification de refus pour votre demande de renouvellement de logement étudiant",
    body: formatEmailWithLayout({
      body: `<h2 style="color:#000">Notification de refus pour votre demande de renouvellement de logement étudiant</h2><p style="font-size:11pt;font-family:sans-serif;color:#000">Cher/Chère ${sanitize(fullName)},</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous espérons que ce message vous trouve bien.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous regrettons de vous informer que nous ne sommes pas en mesure de renouveler votre demande de logement étudiant dans notre cité universitaire pour la prochaine année académique. Après avoir examiné attentivement les demandes de renouvellement, nous avons dû prendre la difficile décision de ne pas pouvoir accéder favorablement à votre demande.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous vous remercions pour avoir envisagé de rester avec nous et pour votre intérêt continu pour notre cité universitaire.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider à trouver des solutions alternatives.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous vous souhaitons le meilleur pour vos futurs logements et vos études à venir.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Cordialement,</p>`,
      senderEmail: informationEmail,
      senderName: "Équipe administrative",
      title:
        "Notification de refus pour votre demande de renouvellement de logement étudiant",
    }),
  });
};
