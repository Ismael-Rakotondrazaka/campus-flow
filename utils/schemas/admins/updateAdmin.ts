import { prismaCtx, z } from "#imports";
import { RoleSchema } from "~/prisma/generated/zod";
import { AdminFull } from "./adminFull";

/* -------------------------------------------------------------------------- */
/*                            UpdateAdmin param                            */
/* -------------------------------------------------------------------------- */

export type UpdateAdminParam = {
  id: number;
};

export const UpdateAdminParamSchema: z.ZodType<UpdateAdminParam> = z.object({
  id: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                             UpdateAdmin body                             */
/* -------------------------------------------------------------------------- */

export type UpdateAdminBody = {
  name?: string | undefined;
  firstName?: string | undefined;
  phoneNumber?: string | undefined;
  profile?: File | undefined;
  role?: prismaCtx.$Enums.Role;
};

export const UpdateAdminBodySchema: z.ZodType<UpdateAdminBody> = z
  .object({
    name: UserNameSchema,
    firstName: UserFirstNameSchema,
    phoneNumber: PhoneNumberSchema,
    profile: FileSchema,
    role: RoleSchema,
  })
  .partial();

/* -------------------------------------------------------------------------- */
/*                             UpdateAdmin data                             */
/* -------------------------------------------------------------------------- */

export type UpdateAdminData = {
  admin: AdminFull;
};
export const UpdateAdminDataSchema: z.ZodType<UpdateAdminData> = z.object({
  admin: AdminFullSchema,
});

/* -------------------------------------------------------------------------- */
/*                             UpdateAdmin error                            */
/* -------------------------------------------------------------------------- */

export type UpdateAdminBodyPEM = RequestErrorMessage<UpdateAdminBody>;

export type UpdateAdminError = RequestError<UpdateAdminBodyPEM>;

export type UpdateAdminResponse = RequestResponse<
  UpdateAdminData,
  UpdateAdminBody
>;
