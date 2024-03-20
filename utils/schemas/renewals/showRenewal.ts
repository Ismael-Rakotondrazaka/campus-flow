import { z } from "#imports";
import { RenewalFull, RenewalFullSchema } from "./renewalFull";

/* -------------------------------------------------------------------------- */
/*                            ShowRenewal param                            */
/* -------------------------------------------------------------------------- */

export type ShowRenewalParam = {
  id: number;
};

export const ShowRenewalParamSchema: z.ZodType<ShowRenewalParam> = z.object({
  id: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                             ShowRenewal data                             */
/* -------------------------------------------------------------------------- */

export type ShowRenewalData = {
  renewal: RenewalFull;
};

export const ShowRenewalDataSchema: z.ZodType<ShowRenewalData> = z.object({
  renewal: RenewalFullSchema,
});

/* -------------------------------------------------------------------------- */
/*                             ShowRenewal error                            */
/* -------------------------------------------------------------------------- */

export type ShowRenewalBodyPEM = RequestErrorMessage<Record<string, never>>;

export type ShowRenewalError = RequestError<ShowRenewalBodyPEM>;

export type ShowRenewalResponse = RequestResponse<
  ShowRenewalData,
  Record<string, never>
>;
