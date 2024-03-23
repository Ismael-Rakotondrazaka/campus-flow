export const sendReservationAcceptedEmail = (payload: {
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
      "Notification d'acceptation conditionnelle pour votre demande de logement étudiant",
    body: formatEmailWithLayout({
      body: `<h2 style="color:#000">Notification d'acceptation conditionnelle pour votre demande de logement étudiant</h2><p style="font-size:11pt;font-family:sans-serif;color:#000">Cher/Chère ${sanitize(fullName)},</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous espérons que vous vous portez bien.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous sommes heureux de vous informer que votre demande de logement étudiant dans notre cité universitaire a été acceptée conditionnellement. Cela signifie que votre dossier a été jugé conforme aux critères d'admission initiaux, mais que nous avons besoin de quelques documents supplémentaires pour finaliser votre inscription.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Veuillez trouver ci-dessous la liste des documents supplémentaires requis. Nous vous prions de bien vouloir les fournir dans les plus brefs délais afin que nous puissions finaliser votre demande de logement.</p><ul style="font-size:11pt;font-family:sans-serif;color:#000;font-weight:bold"><li style="font-size:11pt;font-family:sans-serif;color:#000;font-weight:bold">Un (1) bordereau de paiement des droits et charges complémentaires souscris à votre nom</li></ul><p style="font-size:11pt;font-family:sans-serif;color:#000">Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider à compléter votre dossier.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous attendons votre réponse avec impatience et nous vous remercions encore pour votre intérêt pour notre cité universitaire.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Cordialement,</p>`,
      senderEmail: informationEmail,
      senderName: "Équipe administrative",
      title:
        "Notification d'acceptation conditionnelle pour votre demande de logement étudiant",
    }),
  });
};
