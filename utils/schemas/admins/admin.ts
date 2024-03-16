export const AdminSchema = z.object({
  role: RoleSchema,
  userId: z.number().int(),
});
