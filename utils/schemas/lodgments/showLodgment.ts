import { z } from "#imports";
import { LodgmentFull } from "./lodgmentFull";

/* -------------------------------------------------------------------------- */
/*                            ShowLodgment param                            */
/* -------------------------------------------------------------------------- */

export type ShowLodgmentParam = {
  id: number;
};

export const ShowLodgmentParamSchema: z.ZodType<ShowLodgmentParam> = z.object({
  id: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                             ShowLodgment data                             */
/* -------------------------------------------------------------------------- */

export type ShowLodgmentData = {
  lodgment: LodgmentFull;
};

export const ShowLodgmentDataSchema: z.ZodType<ShowLodgmentData> = z.object({
  lodgment: LodgmentFullSchema,
});

/* -------------------------------------------------------------------------- */
/*                             ShowLodgment error                            */
/* -------------------------------------------------------------------------- */

export type ShowLodgmentBodyPEM = RequestErrorMessage<Record<string, never>>;

export type ShowLodgmentError = RequestError<ShowLodgmentBodyPEM>;

export type ShowLodgmentResponse = RequestResponse<
  ShowLodgmentData,
  Record<string, never>
>;
