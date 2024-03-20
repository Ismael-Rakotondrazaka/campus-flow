export const formatFileUrl = (payload: {
  subPath: string;
  filename?: string;
  mimeType: string;
}): { path: string; filename: string; url: string } => {
  const runtimeConfig = useRuntimeConfig(useEvent());
  const bucketEntryPoint: string = runtimeConfig.bucketEntryPoint;

  const formattedFilename: string = formatFilename({
    filename: payload.filename,
    mimeType: payload.mimeType,
  });

  const path: string = `${payload.subPath}/${formattedFilename}`;

  return {
    path,
    filename: formattedFilename,
    url: `${bucketEntryPoint}/${path}`,
  };
};
