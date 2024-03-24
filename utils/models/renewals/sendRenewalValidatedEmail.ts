export const sendRenewalValidatedEmail = (payload: {
  fullName: string;
  email: string;
}) => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const informationEmail: string = runtimeConfig.informationEmail;
  const fullName: string = sanitize(payload.fullName);

  return sendEmail({
    from: informationEmail,
    to: payload.email,
    subject: "Confirmation de renouvellement de votre logement étudiant",
    body: formatEmailWithLayout({
      body: `<h2 style="color:#000">Confirmation de renouvellement de votre logement étudiant</h2><p style="font-size:11pt;font-family:sans-serif;color:#000">Cher/Chère ${sanitize(fullName)},</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous espérons que vous vous portez bien.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous sommes heureux de vous informer que votre demande de renouvellement de logement étudiant dans notre cité universitaire a été validée avec succès. Toutes les conditions requises ont été remplies et votre renouvellement de logement est désormais confirmé pour la prochaine année académique.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Vous recevrez très bientôt des informations supplémentaires, et les prochaines étapes à suivre.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Nous sommes là pour vous aider à préparer votre arrivée pour l'année à venir.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Encore une fois, félicitations et bienvenue pour une nouvelle année dans notre communauté universitaire. Nous sommes impatients de vous accueillir à nouveau.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Cordialement,</p>`,
      senderEmail: informationEmail,
      senderName: "Équipe administrative",
      title: "Confirmation de renouvellement de votre logement étudiant",
    }),
  });
};
