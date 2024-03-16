import { z } from "#imports";

export const safeParseRequestQueryAs = <T extends z.ZodTypeAny>(
  schema: T,
): Promise<
  z.SafeParseReturnType<z.input<typeof schema>, z.output<typeof schema>>
> => {
  const query = getRequestQuery();

  return zfd.formData(schema).safeParseAsync(query);
};
