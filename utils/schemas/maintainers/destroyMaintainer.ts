import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                            DestroyMaintainer param                            */
/* -------------------------------------------------------------------------- */

export type DestroyMaintainerParam = {
  id: number;
};

export const DestroyMaintainerParamSchema: z.ZodType<DestroyMaintainerParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             DestroyMaintainer data                             */
/* -------------------------------------------------------------------------- */

export type DestroyMaintainerData = void;

/* -------------------------------------------------------------------------- */
/*                             DestroyMaintainer error                            */
/* -------------------------------------------------------------------------- */

export type DestroyMaintainerBodyPEM = RequestErrorMessage<
  Record<string, never>
>;

export type DestroyMaintainerError = RequestError<DestroyMaintainerBodyPEM>;

export type DestroyMaintainerResponse = RequestResponse<
  DestroyMaintainerData,
  Record<string, never>
>;
