import { z } from "#imports";
import { MaintainerFull } from "./maintainerFull";

/* -------------------------------------------------------------------------- */
/*                            ShowMaintainer param                            */
/* -------------------------------------------------------------------------- */

export type ShowMaintainerParam = {
  id: number;
};

export const ShowMaintainerParamSchema: z.ZodType<ShowMaintainerParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             ShowMaintainer data                             */
/* -------------------------------------------------------------------------- */

export type ShowMaintainerData = {
  maintainer: MaintainerFull;
};

export const ShowMaintainerDataSchema: z.ZodType<ShowMaintainerData> = z.object(
  {
    maintainer: MaintainerFullSchema,
  },
);

/* -------------------------------------------------------------------------- */
/*                             ShowMaintainer error                            */
/* -------------------------------------------------------------------------- */

export type ShowMaintainerBodyPEM = RequestErrorMessage<Record<string, never>>;

export type ShowMaintainerError = RequestError<ShowMaintainerBodyPEM>;

export type ShowMaintainerResponse = RequestResponse<
  ShowMaintainerData,
  Record<string, never>
>;
