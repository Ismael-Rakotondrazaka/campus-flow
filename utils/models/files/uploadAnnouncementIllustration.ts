import { formatFileUrl } from "./formatFileUrl";

export const uploadAnnouncementIllustration = (file: File): string => {
  const { path, url } = formatFileUrl({
    filename: file.name,
    mimeType: file.type,
    subPath: "public/announcement-illustrations",
  });

  saveFile({
    file,
    destination: path,
    isPublic: true,
    mimeType: file.type,
  });

  return url;
};
