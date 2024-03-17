export const FileSchema = z.custom<File>(
  (data: unknown) => data instanceof File,
  {
    message: "Fichier non pris en charge.",
  },
);
