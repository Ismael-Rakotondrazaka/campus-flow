import { z } from "#imports";
import { UserBaseSessionSchema } from "./userBaseSession";
import { RoleSchema } from "~/prisma/generated/zod";

export type AdminSession = {
  id: number;
  name: string;
  email: string;
  firstName: string;
  fullName: string;
  role: "ROOT" | "MAINTENANCE" | "RENEWAL" | "RESERVATION";
};

export const AdminSessionSchema: z.ZodType<AdminSession> =
  UserBaseSessionSchema.and(
    z.object({
      role: RoleSchema,
    }),
  );
