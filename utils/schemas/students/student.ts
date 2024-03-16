export const StudentSchema = z.object({
  gender: GenderSchema,
  userId: z.number().int(),
  facultyId: z.number().int(),
  nationality: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  lodgmentId: z.number().int(),
});
