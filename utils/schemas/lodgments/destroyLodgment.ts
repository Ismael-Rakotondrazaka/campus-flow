import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                            DestroyLodgment param                            */
/* -------------------------------------------------------------------------- */

export type DestroyLodgmentParam = {
  id: number;
};

export const DestroyLodgmentParamSchema: z.ZodType<DestroyLodgmentParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             DestroyLodgment data                             */
/* -------------------------------------------------------------------------- */

export type DestroyLodgmentData = {
  lodgment: LodgmentFull;
};

export const DestroyLodgmentDataSchema: z.ZodType<DestroyLodgmentData> =
  z.object({
    lodgment: LodgmentFullSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             DestroyLodgment error                            */
/* -------------------------------------------------------------------------- */

export type DestroyLodgmentBodyPEM = RequestErrorMessage<Record<string, never>>;

export type DestroyLodgmentError = RequestError<DestroyLodgmentBodyPEM>;

export type DestroyLodgmentResponse = RequestResponse<
  DestroyLodgmentData,
  Record<string, never>
>;
