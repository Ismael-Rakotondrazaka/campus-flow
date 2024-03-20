import { z } from "#imports";
import { AdminSessionSchema } from "./adminSession";
import { StudentSessionSchema } from "./studentSession";

export type UserSession = AdminSession | StudentSession;

export const UserSessionSchema: z.ZodType<UserSession> = z.union([
  AdminSessionSchema,
  StudentSessionSchema,
]);
