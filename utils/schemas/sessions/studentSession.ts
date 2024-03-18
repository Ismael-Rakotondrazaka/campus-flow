import { z } from "#imports";
import { UserBaseSessionSchema } from "./userBaseSession";

export type StudentSession = {
  id: number;
  email: string;
  name: string;
  firstName: string;
  fullName: string;
  NIC: string;
};

export const StudentSessionSchema: z.ZodType<StudentSession> =
  UserBaseSessionSchema.and(
    z.object({
      NIC: z.string(),
    }),
  );
