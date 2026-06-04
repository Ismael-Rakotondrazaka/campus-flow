import { z } from 'zod';

export const LoginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginBody = z.infer<typeof LoginBodySchema>;
