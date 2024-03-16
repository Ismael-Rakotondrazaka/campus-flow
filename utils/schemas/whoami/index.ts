import { z } from "#imports";

/* -------------------------------------------------------------------------- */
/*                                 WhoAmI data                                */
/* -------------------------------------------------------------------------- */

export const WhoAmIDataSchema = z.object({
  user: UserFullSchema.nullable(),
});

export type WhoAmIData = z.infer<typeof WhoAmIDataSchema>;

/* -------------------------------------------------------------------------- */
/*                                WhoAmI Error                                */
/* -------------------------------------------------------------------------- */

export type WhoAmIResponse = RequestResponse<WhoAmIData>;
