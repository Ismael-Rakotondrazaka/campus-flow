import { formatFileUrl } from "./formatFileUrl";

export const uploadNIC = (file: File): string => {
  const { path, url } = formatFileUrl({
    filename: file.name,
    mimeType: file.type,
    subPath: "public/nics",
  });

  saveFile({
    file,
    destination: path,
    isPublic: true,
    mimeType: file.type,
  });

  return url;
};
