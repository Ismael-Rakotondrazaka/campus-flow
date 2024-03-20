import { formatFileUrl } from "./formatFileUrl";

export const uploadSchoolCertificate = (file: File): string => {
  const { path, url } = formatFileUrl({
    filename: file.name,
    mimeType: file.type,
    subPath: "public/school-certificates",
  });

  saveFile({
    file,
    destination: path,
    isPublic: true,
    mimeType: file.type,
  });

  return url;
};
