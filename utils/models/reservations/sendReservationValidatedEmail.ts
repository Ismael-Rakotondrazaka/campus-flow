export const sendReservationValidatedEmail = (payload: {
  user: {
    fullName: string;
    password: string;
    email: string;
  };
  lodgment: {
    floor: number;
    roomNumber: number;
    buildingName: string;
  };
  email: string;
}) => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const informationEmail: string = runtimeConfig.informationEmail;
  const loginUrl: string = runtimeConfig.clientLoginUrl;
  const fullName: string = sanitize(payload.user.fullName);
  const buildingName: string = payload.lodgment.buildingName;
  const floor: string =
    payload.lodgment.floor === 0
      ? "rez-de-chaussée"
      : payload.lodgment.floor.toString();
  const roomNumber: number = payload.lodgment.roomNumber;
  const email: string = payload.user.email;
  const password: string = payload.user.password;

  return sendEmail({
    from: informationEmail,
    to: payload.email,
    subject: "Confirmation de validation de votre demande de logement étudiant",
    body: formatEmailWithLayout({
      body: `<h2 style="color:#000">Confirmation de validation de votre demande de logement étudiant</h2><p style="font-size:11pt;font-family:sans-serif;color:#000">Cher/Chère ${sanitize(fullName)},</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous espérons que vous vous portez bien.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous sommes heureux de vous informer que votre demande de logement étudiant dans notre cité universitaire a été validée avec succès. Toutes les conditions requises ont été remplies et votre dossier est désormais complet.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Ci-dessous les informations supplémentaires concernant votre logement étudiant&nbsp;:</p><ul style="font-size:11pt;font-family:sans-serif;color:#000;font-weight:bold"><li style="font-size:11pt;font-family:sans-serif;color:#000;font-weight:bold">Bâtiment&nbsp;: ${buildingName}</li><li style="font-size:11pt;font-family:sans-serif;color:#000;font-weight:bold">Étage&nbsp;: ${floor}</li><li style="font-size:11pt;font-family:sans-serif;color:#000;font-weight:bold">Porte&nbsp;: ${roomNumber}</li></ul><p style="font-size:11pt;font-family:sans-serif;color:#000">De plus, nous avons créé un compte résident pour vous, où vous pourrez gérer vos informations personnelles, consulter les règlements de la résidence et accéder à d'autres services. Voici vos informations de connexion :</p><ul style="font-size:11pt;font-family:sans-serif;color:#000;font-weight:bold"><li style="font-size:11pt;font-family:sans-serif;color:#000;font-weight:bold">Email&nbsp;: ${email}</li><li style="font-size:11pt;font-family:sans-serif;color:#000;font-weight:bold">Mot de passe temporaire&nbsp;: ${password}</li></ul><p style="font-size:11pt;font-family:sans-serif;color:#000">Veuillez vous connecter dès que possible pour changer votre mot de passe temporaire et vérifier toutes les informations. Vous pouvez accéder à votre compte résident en utilisant le lien suivant : <a href="${loginUrl}" style="color:#0563c1">${loginUrl}</a></p><p style="font-size:11pt;font-family:sans-serif;color:#000">Encore une fois, félicitations et bienvenue dans notre communauté universitaire. Nous sommes impatients de vous accueillir très bientôt.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Cordialement,</p>`,
      senderEmail: informationEmail,
      senderName: "Équipe administrative",
      title: "Confirmation de validation de votre demande de logement étudiant",
    }),
  });
};
