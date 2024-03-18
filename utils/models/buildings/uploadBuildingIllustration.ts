import { formatBuildingIllustrationUrl } from "./formatBuildingIllustrationUrl";

export const uploadBuildingIllustration = (file: File): string => {
  const { path, url } = formatBuildingIllustrationUrl({
    filename: file.name,
    mimeType: file.type,
  });

  saveFile({
    file,
    destination: path,
    isPublic: true,
    mimeType: file.type,
  });

  return url;
};
