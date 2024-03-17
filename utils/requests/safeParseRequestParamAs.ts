import { zfd, z } from "#imports";

export const safeParseRequestParamAs = <T extends z.ZodTypeAny>(
  schema: T,
): Promise<
  z.SafeParseReturnType<z.input<typeof schema>, z.output<typeof schema>>
> => {
  const params = getRouterParams(useEvent());

  return zfd.formData(schema).safeParseAsync(params);
};
