import { type Simplify } from "type-fest";
import { z } from "#imports";
import { UserBaseSessionSchema } from "./userBaseSession";

export const StudentSessionSchema = UserBaseSessionSchema.and(
  z.object({
    NIC: z.string(),
  }),
);

export type StudentSession = Simplify<z.infer<typeof StudentSessionSchema>>;
