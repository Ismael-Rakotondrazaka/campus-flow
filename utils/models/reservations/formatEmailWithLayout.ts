export const formatEmailWithLayout = (payload: {
  title: string;
  body: string;
  senderName: string;
  senderEmail: string;
}): string => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const appUrl: string = runtimeConfig.appUrl;
  const year: number = new Date().getFullYear();

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${payload.title}</title></head><body style="font-family:Arial,sans-serif;background-color:#f4f4f4;margin:0;padding:0"><div style="max-width:900px;margin:0 auto;background-color:#fff"><div style="background-color:#4c6ef5;text-align:center;padding:20px"><h1 style="font-size:20pt;font-weight:700;margin:0;padding:0;color:#fff">Lumièrebourg</h1><p style="font-size:15pt;font-weight:700;font-family:sans-serif;color:#fff">La Cité Universitaire: Où Savoir et Vivre se Rencontrent</p></div><div style="background-color:#fff;padding:36px 20px 20px 20px;margin-top:-16px;color:#000">${payload.body}<div style="max-width:900px;margin:0 auto"><p style="font-size:11pt;font-family:sans-serif;color:#000"><strong style="color:#000">${payload.senderName}</strong><br><span style="font-size:9pt;color:gray">E-mail&nbsp;: <a href="mailto:${payload.senderEmail}" style="color:#0563c1">${payload.senderEmail}</a></span><br><span style="font-size:9pt;color:gray">Site web&nbsp;: <a href="${appUrl}" style="color:#0563c1">${appUrl}</a></span><br></p></div></div><hr style="background-color:gray;width:95%;margin:0 auto"><footer style="color:#000;background-color:#fff;text-align:center;padding:10px">&copy; ${year} Lumièrebourg. Tous droits réservés.</footer></div></body></html>`;
};
