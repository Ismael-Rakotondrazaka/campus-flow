import { prismaCtx, z } from "#imports";
import { Simplify } from "type-fest";
import { AcademicSessionSchema } from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                             StoreAcademicSession body                             */
/* -------------------------------------------------------------------------- */

export type StoreAcademicSessionBody = {
  startAt: Date;
  endAt: Date;
};

export const StoreAcademicSessionBodySchema: z.ZodType<
  Simplify<StoreAcademicSessionBody>
> = z.object({
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
});

/* -------------------------------------------------------------------------- */
/*                             StoreAcademicSession data                             */
/* -------------------------------------------------------------------------- */

export type StoreAcademicSessionData = {
  academicSession: prismaCtx.AcademicSession;
};
export const StoreAcademicSessionDataSchema: z.ZodType<StoreAcademicSessionData> =
  z.object({
    academicSession: AcademicSessionSchema,
  });
/* -------------------------------------------------------------------------- */
/*                             StoreAcademicSession error                            */
/* -------------------------------------------------------------------------- */

export type StoreAcademicSessionBodyPEM =
  RequestErrorMessage<StoreAcademicSessionBody>;

export type StoreAcademicSessionError =
  RequestError<StoreAcademicSessionBodyPEM>;

export type StoreAcademicSessionResponse = RequestResponse<
  StoreAcademicSessionData,
  StoreAcademicSessionBody
>;
