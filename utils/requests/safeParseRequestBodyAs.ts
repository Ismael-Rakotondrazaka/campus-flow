import { z } from "#imports";

export const safeParseRequestBodyAs = async <T extends z.ZodTypeAny>(
  schema: T,
): Promise<
  z.SafeParseReturnType<z.input<typeof schema>, z.output<typeof schema>>
> => {
  const body = await getRequestBody();

  return zfd.formData(schema).safeParseAsync(body);
};
