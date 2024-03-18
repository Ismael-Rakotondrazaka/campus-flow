export const formatBuildingIllustrationUrl = ({
  filename,
  mimeType,
}: {
  filename?: string;
  mimeType: string;
}): { path: string; filename: string; url: string } => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const bucketEntryPoint: string = runtimeConfig.bucketEntryPoint;

  const formattedFilename: string = formatFilename({
    filename,
    mimeType,
  });

  const path: string = `public/buildings/${formattedFilename}`;

  return {
    path,
    filename: formattedFilename,
    url: `${bucketEntryPoint}/${path}`,
  };
};
