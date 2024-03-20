import { formatFileUrl } from "./formatFileUrl";

export const uploadUserProfile = (file: File): string => {
  const { path, url } = formatFileUrl({
    filename: file.name,
    mimeType: file.type,
    subPath: "public/profiles",
  });

  saveFile({
    file,
    destination: path,
    isPublic: true,
    mimeType: file.type,
  });

  return url;
};
