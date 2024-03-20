import { prismaCtx, z } from "#imports";
import { AdminFull } from "./adminFull";

/* -------------------------------------------------------------------------- */
/*                             StoreAdmin body                             */
/* -------------------------------------------------------------------------- */

export type StoreAdminBody = {
  name?: string | undefined;
  firstName?: string | undefined;
  phoneNumber?: string | undefined;
  profile?: File | undefined;
  role?: prismaCtx.$Enums.Role;
};

export const StoreAdminBodySchema: z.ZodType<StoreAdminBody> = z.object({
  name: UserNameSchema,
  firstName: UserFirstNameSchema,
  phoneNumber: PhoneNumberSchema,
  profile: FileSchema,
  role: RoleSchema,
});

/* -------------------------------------------------------------------------- */
/*                             StoreAdmin data                             */
/* -------------------------------------------------------------------------- */

export type StoreAdminData = {
  admin: AdminFull;
};

export const StoreAdminDataSchema: z.ZodType<StoreAdminData> = z.object({
  admin: AdminFullSchema,
});

/* -------------------------------------------------------------------------- */
/*                             StoreAdmin error                            */
/* -------------------------------------------------------------------------- */

export type StoreAdminBodyPEM = RequestErrorMessage<StoreAdminBody>;

export type StoreAdminError = RequestError<StoreAdminBodyPEM>;

export type StoreAdminResponse = RequestResponse<
  StoreAdminData,
  StoreAdminBody
>;
