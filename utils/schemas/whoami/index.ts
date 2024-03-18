import { z } from "#imports";
import { UserFull } from "../users";

/* -------------------------------------------------------------------------- */
/*                                 WhoAmI data                                */
/* -------------------------------------------------------------------------- */

export type WhoAmIData = {
  user: UserFull | null;
};

export const WhoAmIDataSchema: z.ZodType<WhoAmIData> = z.object({
  user: UserFullSchema.nullable(),
});

/* -------------------------------------------------------------------------- */
/*                                WhoAmI Error                                */
/* -------------------------------------------------------------------------- */

export type WhoAmIResponse = RequestResponse<WhoAmIData>;
