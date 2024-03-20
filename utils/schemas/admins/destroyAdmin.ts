import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                            DestroyAdmin param                            */
/* -------------------------------------------------------------------------- */

export type DestroyAdminParam = {
  id: number;
};

export const DestroyAdminParamSchema: z.ZodType<DestroyAdminParam> = z.object({
  id: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                             DestroyAdmin data                             */
/* -------------------------------------------------------------------------- */

export type DestroyAdminData = void;

/* -------------------------------------------------------------------------- */
/*                             DestroyAdmin error                            */
/* -------------------------------------------------------------------------- */

export type DestroyAdminBodyPEM = RequestErrorMessage<Record<string, never>>;

export type DestroyAdminError = RequestError<DestroyAdminBodyPEM>;

export type DestroyAdminResponse = RequestResponse<
  DestroyAdminData,
  Record<string, never>
>;
