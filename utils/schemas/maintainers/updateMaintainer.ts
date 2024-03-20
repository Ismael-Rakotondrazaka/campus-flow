import { z } from "#imports";
import { MaintainerFull } from "./maintainerFull";
import { MaintainerNameSchema } from "./maintainerName";

/* -------------------------------------------------------------------------- */
/*                            UpdateMaintainer param                            */
/* -------------------------------------------------------------------------- */

export type UpdateMaintainerParam = {
  id: number;
};

export const UpdateMaintainerParamSchema: z.ZodType<UpdateMaintainerParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateMaintainer body                             */
/* -------------------------------------------------------------------------- */

export type UpdateMaintainerBody = Partial<{
  name: string;
  firstName: string;
  phoneNumber: string;
}>;

export const UpdateMaintainerBodySchema: z.ZodType<UpdateMaintainerBody> = z
  .object({
    name: MaintainerNameSchema,
    firstName: MaintainerFirstNameSchema,
    phoneNumber: PhoneNumberSchema,
  })
  .partial();

/* -------------------------------------------------------------------------- */
/*                             UpdateMaintainer data                             */
/* -------------------------------------------------------------------------- */

export type UpdateMaintainerData = {
  maintainer: MaintainerFull;
};
export const UpdateMaintainerDataSchema: z.ZodType<UpdateMaintainerData> =
  z.object({
    maintainer: MaintainerFullSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateMaintainer error                            */
/* -------------------------------------------------------------------------- */

export type UpdateMaintainerBodyPEM = RequestErrorMessage<UpdateMaintainerBody>;

export type UpdateMaintainerError = RequestError<UpdateMaintainerBodyPEM>;

export type UpdateMaintainerResponse = RequestResponse<
  UpdateMaintainerData,
  UpdateMaintainerBody
>;
