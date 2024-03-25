import { z } from "#imports";
import { Simplify } from "type-fest";

/* -------------------------------------------------------------------------- */
/*                             ResetRequestPassword body                             */
/* -------------------------------------------------------------------------- */

export type ResetRequestPasswordBody = {
  email: string;
};

export const ResetRequestPasswordBodySchema: z.ZodType<
  Simplify<ResetRequestPasswordBody>
> = z.object({
  email: EmailSchema,
});

/* -------------------------------------------------------------------------- */
/*                             ResetRequestPassword data                             */
/* -------------------------------------------------------------------------- */

export type ResetRequestPasswordData = {
  message: string;
};

/* -------------------------------------------------------------------------- */
/*                             ResetRequestPassword error                            */
/* -------------------------------------------------------------------------- */

export type ResetRequestPasswordBodyPEM =
  RequestErrorMessage<ResetRequestPasswordBody>;

export type ResetRequestPasswordError =
  RequestError<ResetRequestPasswordBodyPEM>;

export type ResetRequestPasswordResponse = RequestResponse<
  ResetRequestPasswordData,
  ResetRequestPasswordBody
>;
