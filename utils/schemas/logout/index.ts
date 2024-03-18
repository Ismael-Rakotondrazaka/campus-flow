import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                                 Logout body                                */
/* -------------------------------------------------------------------------- */

export type LogoutBody = {
  refreshToken: string;
};

export const LogoutBodySchema: z.ZodType<LogoutBody> = z.object({
  refreshToken: z.string(),
});

/* -------------------------------------------------------------------------- */
/*                                 Logout data                                */
/* -------------------------------------------------------------------------- */

export type LogoutData = void;

/* -------------------------------------------------------------------------- */
/*                                Logout error                                */
/* -------------------------------------------------------------------------- */

export type LogoutBodyPEM = RequestErrorMessage<LogoutBody>;

export type LogoutError = RequestError<LogoutBodyPEM>;

export type LogoutResponse = RequestResponse<LogoutData, LogoutBody>;
