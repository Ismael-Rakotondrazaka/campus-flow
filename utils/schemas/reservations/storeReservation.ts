import { prismaCtx, z } from "#imports";
import { GenderSchema, OriginSchema } from "~/prisma/generated/zod";
import { ReservationFull, ReservationFullSchema } from "./reservationFull";
import { Simplify } from "type-fest";

/* -------------------------------------------------------------------------- */
/*                             StoreReservation body                             */
/* -------------------------------------------------------------------------- */

export type StoreReservationBody = {
  name: string;
  firstName: string;
  phoneNumber: string;
  profile: File;
  email: string;
  gender: prismaCtx.$Enums.Gender;
  emergencyNumber: string;
  NIC: string;
  NICImage: File;
  schoolCertificate: File;
  facultyId: number;
  academicSessionId: number;
  origin: prismaCtx.$Enums.Origin;
};

export const StoreReservationBodySchema: z.ZodType<
  Simplify<StoreReservationBody>
> = z.object({
  name: UserNameSchema,
  firstName: UserFirstNameSchema,
  phoneNumber: PhoneNumberSchema,
  profile: FileSchema,
  email: EmailSchema,
  gender: GenderSchema,
  emergencyNumber: PhoneNumberSchema,
  NIC: NICSchema,
  NICImage: FileSchema,
  schoolCertificate: FileSchema,
  facultyId: IdentifierSchema,
  academicSessionId: IdentifierSchema,
  origin: OriginSchema,
});

/* -------------------------------------------------------------------------- */
/*                             StoreReservation data                             */
/* -------------------------------------------------------------------------- */

export type StoreReservationData = {
  reservation: ReservationFull;
};
export const StoreReservationDataSchema: z.ZodType<StoreReservationData> =
  z.object({
    reservation: ReservationFullSchema,
  });
/* -------------------------------------------------------------------------- */
/*                             StoreReservation error                            */
/* -------------------------------------------------------------------------- */

export type StoreReservationBodyPEM = RequestErrorMessage<StoreReservationBody>;

export type StoreReservationError = RequestError<StoreReservationBodyPEM>;

export type StoreReservationResponse = RequestResponse<
  StoreReservationData,
  StoreReservationBody
>;
