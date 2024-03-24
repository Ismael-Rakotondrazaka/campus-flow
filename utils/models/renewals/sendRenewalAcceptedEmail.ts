export const sendRenewalAcceptedEmail = (payload: {
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
      "Notification d'acceptation conditionnelle pour votre demande de renouvellement de logement étudiant",
    body: formatEmailWithLayout({
      body: `<h2 style="color:#000">Notification d'acceptation conditionnelle pour votre demande de renouvellement de logement étudiant</h2><p style="font-size:11pt;font-family:sans-serif;color:#000">Cher/Chère ${sanitize(fullName)},</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous espérons que ce message vous trouve bien.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous sommes heureux de vous informer que votre demande de renouvellement de logement étudiant dans notre cité universitaire a été acceptée conditionnellement. Cela signifie que nous envisageons favorablement votre demande, mais que nous avons besoin de quelques documents supplémentaires ou informations pour finaliser votre renouvellement.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Veuillez trouver ci-dessous la liste des documents supplémentaires requis. Nous vous prions de bien vouloir les fournir dans les plus brefs délais afin que nous puissions finaliser votre demande de logement.</p><ul style="font-size:11pt;font-family:sans-serif;color:#000;font-weight:700"><li style="font-size:11pt;font-family:sans-serif;color:#000;font-weight:700">Un (1) bordereau de paiement des droits et charges complémentaires souscris à votre nom</li></ul><p style="font-size:11pt;font-family:sans-serif;color:#000">Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider à compléter votre dossier.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous attendons votre réponse avec impatience et nous vous remercions encore pour votre intention de renouveler votre séjour dans notre cité universitaire.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Cordialement,</p>`,
      senderEmail: informationEmail,
      senderName: "Équipe administrative",
      title:
        "Notification d'acceptation conditionnelle pour votre demande de renouvellement de logement étudiant",
    }),
  });
};
