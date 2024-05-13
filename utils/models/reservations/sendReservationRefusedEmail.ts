import { prismaCtx } from "#imports";

export const sendReservationRefusedEmail = (payload: {
  email: string;
  fullName: string;
  reason: prismaCtx.RefusalReason;
}) => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const informationEmail: string = runtimeConfig.informationEmail;
  const fullName: string = sanitize(payload.fullName);
  const reasonText: string = refusalReasonConfig[payload.reason];

  return sendEmail({
    from: informationEmail,
    to: payload.email,
    subject: "Notification de refus pour votre demande de logement étudiant",
    body: formatEmailWithLayout({
      body: `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Document</title></head><body><h2 style="color:#000">Notification de refus pour votre demande de logement étudiant</h2><p style="font-size:11pt;font-family:sans-serif;color:#000">Cher/Chère ${sanitize(fullName)},</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous espérons que vous vous portez bien.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous regrettons de vous informer que votre demande de logement étudiant dans notre cité universitaire n'a pas été retenue cette fois-ci. Après avoir examiné attentivement votre dossier, nous avons dû prendre la difficile décision de ne pas pouvoir accéder favorablement à votre demande.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Voici la raison du refus de votre demande. N'hésitez pas à nous contacter pour plus d'informations.</p><p style="font-size:11pt;font-family:sans-serif;color:#000;font-weight:700">${reasonText}</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous vous remercions pour l'intérêt que vous avez porté à notre établissement et pour avoir pris le temps de soumettre votre dossier.</p><p style="font-size:11pt;font-family:sans-serif;color:#000">Nous vous souhaitons bonne chance dans vos recherches de logement alternatif et dans la poursuite de vos études.</p></body></html>`,
      senderEmail: informationEmail,
      senderName: "Équipe administrative",
      title: "Notification de refus pour votre demande de logement étudiant",
    }),
  });
};
