import { z } from "#imports";
import { Simplify } from "type-fest";
import { MaintainerFull } from "./maintainerFull";
import { MaintainerNameSchema } from "./maintainerName";

/* -------------------------------------------------------------------------- */
/*                             StoreMaintainer body                             */
/* -------------------------------------------------------------------------- */

export type StoreMaintainerBody = {
  name: string;
  firstName: string;
  phoneNumber: string;
};

export const StoreMaintainerBodySchema: z.ZodType<
  Simplify<StoreMaintainerBody>
> = z.object({
  name: MaintainerNameSchema,
  firstName: MaintainerFirstNameSchema,
  phoneNumber: PhoneNumberSchema,
});

/* -------------------------------------------------------------------------- */
/*                             StoreMaintainer data                             */
/* -------------------------------------------------------------------------- */

export type StoreMaintainerData = {
  maintainer: MaintainerFull;
};

export const StoreMaintainerDataSchema: z.ZodType<StoreMaintainerData> =
  z.object({
    maintainer: MaintainerFullSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             StoreMaintainer error                            */
/* -------------------------------------------------------------------------- */

export type StoreMaintainerBodyPEM = RequestErrorMessage<StoreMaintainerBody>;

export type StoreMaintainerError = RequestError<StoreMaintainerBodyPEM>;

export type StoreMaintainerResponse = RequestResponse<
  StoreMaintainerData,
  StoreMaintainerBody
>;
