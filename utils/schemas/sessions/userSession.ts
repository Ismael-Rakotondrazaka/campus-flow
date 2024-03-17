import { type Simplify } from "type-fest";
import { z } from "#imports";
import { AdminSessionSchema } from "./adminSession";
import { StudentSessionSchema } from "./studentSession";

export const UserSessionSchema = z.union([
  AdminSessionSchema,
  StudentSessionSchema,
]);

export type UserSession = Simplify<z.infer<typeof UserSessionSchema>>;
