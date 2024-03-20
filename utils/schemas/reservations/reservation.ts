import { z } from "zod";
import {
  GenderSchema,
  OriginSchema,
  ReservationStatusSchema,
} from "~/prisma/generated/zod";
import { ReservationComputed } from "./reservationComputed";

export const ReservationSchema: z.ZodType<ReservationComputed> = z.object({
  gender: GenderSchema,
  origin: OriginSchema,
  status: ReservationStatusSchema,
  id: z.number().int(),
  name: z.string(),
  firstName: z.string(),
  fullName: z.string(),
  phoneNumber: z.string(),
  profileUrl: z.string(),
  email: z.string(),
  emergencyNumber: z.string(),
  NIC: z.string(),
  NICUrl: z.string(),
  schoolCertificateUrl: z.string(),
  facultyId: z.number().int(),
  academicSessionId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  adminId: z.number().int(),
});
