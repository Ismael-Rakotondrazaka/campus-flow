import { z } from "#imports";

export type UserBaseSession = {
  id: number;
  email: string;
  name: string;
  firstName: string;
  fullName: string;
};

export const UserBaseSessionSchema: z.ZodType<UserBaseSession> = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  firstName: z.string(),
  fullName: z.string(),
});
