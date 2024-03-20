import { z } from "#imports";
import { AdminFull } from "./adminFull";

/* -------------------------------------------------------------------------- */
/*                            ShowAdmin param                            */
/* -------------------------------------------------------------------------- */

export type ShowAdminParam = {
  id: number;
};

export const ShowAdminParamSchema: z.ZodType<ShowAdminParam> = z.object({
  id: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                             ShowAdmin data                             */
/* -------------------------------------------------------------------------- */

export type ShowAdminData = {
  admin: AdminFull;
};

export const ShowAdminDataSchema: z.ZodType<ShowAdminData> = z.object({
  admin: AdminFullSchema,
});

/* -------------------------------------------------------------------------- */
/*                             ShowAdmin error                            */
/* -------------------------------------------------------------------------- */

export type ShowAdminBodyPEM = RequestErrorMessage<Record<string, never>>;

export type ShowAdminError = RequestError<ShowAdminBodyPEM>;

export type ShowAdminResponse = RequestResponse<
  ShowAdminData,
  Record<string, never>
>;
