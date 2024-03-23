export const sendReservationCreatedEmail = (payload: {
  email: string;
  fullName: string;
}) => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const informationEmail: string = runtimeConfig.informationEmail;
  const informationPhoneNumber: string = runtimeConfig.informationPhoneNumber;
  const fullName: string = sanitize(payload.fullName);

  return sendEmail({
    from: informationEmail,
    to: payload.email,
    subject:
      "Confirmation de réception de votre dossier d'inscription pour un logement étudiant",
    body: formatEmailWithLayout({
      body: `<h2 style="color:#000">Confirmation de réception de votre dossier</h2><p style="font-size:11pt;font-family:sans-serif;color:#000">Cher/Chère ${sanitize(fullName)},</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous tenons à vous informer que nous avons bien reçu votre dossier d'inscription pour un logement étudiant dans notre cité universitaire. Nous vous remercions pour l'envoi de vos documents dans les délais impartis.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Votre demande est actuellement en cours de traitement par notre équipe administrative. Nous nous efforçons de traiter toutes les demandes dans les plus brefs délais et nous vous contacterons dès que possible pour vous fournir des informations supplémentaires concernant votre demande de logement.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Dans l'intervalle, si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter par email à <a href="mailto:${informationEmail}" style="color:#0563c1">${informationEmail}</a> ou par téléphone au <a href="mailto:${informationPhoneNumber}" style="color:#0563c1">${informationPhoneNumber}</a>.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous vous remercions encore pour votre intérêt pour notre cité universitaire et nous vous souhaitons bonne chance pour la suite de votre parcours académique.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Cordialement,</p>`,
      senderEmail: informationEmail,
      senderName: "Équipe administrative",
      title:
        "Confirmation de réception de votre dossier d'inscription pour un logement étudiant",
    }),
  });
};
