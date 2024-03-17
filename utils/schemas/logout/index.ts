import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                                 Logout body                                */
/* -------------------------------------------------------------------------- */

export const LogoutBodySchema = z.object({
  refreshToken: z.string(),
});

export type LogoutBody = z.infer<typeof LogoutBodySchema>;

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
