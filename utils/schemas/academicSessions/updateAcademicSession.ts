import { prismaCtx, z } from "#imports";
import { AcademicSessionSchema } from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                            UpdateAcademicSession param                            */
/* -------------------------------------------------------------------------- */

export type UpdateAcademicSessionParam = {
  id: number;
};

export const UpdateAcademicSessionParamSchema: z.ZodType<UpdateAcademicSessionParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateAcademicSession body                             */
/* -------------------------------------------------------------------------- */

export type UpdateAcademicSessionBody = {
  startAt: Date;
  endAt: Date;
};

export const UpdateAcademicSessionBodySchema: z.ZodType<UpdateAcademicSessionBody> =
  z.object({
    startAt: z.coerce.date(),
    endAt: z.coerce.date(),
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateAcademicSession data                             */
/* -------------------------------------------------------------------------- */

export type UpdateAcademicSessionData = {
  academicSession: prismaCtx.AcademicSession;
};
export const UpdateAcademicSessionDataSchema: z.ZodType<UpdateAcademicSessionData> =
  z.object({
    academicSession: AcademicSessionSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateAcademicSession error                            */
/* -------------------------------------------------------------------------- */

export type UpdateAcademicSessionBodyPEM =
  RequestErrorMessage<UpdateAcademicSessionBody>;

export type UpdateAcademicSessionError =
  RequestError<UpdateAcademicSessionBodyPEM>;

export type UpdateAcademicSessionResponse = RequestResponse<
  UpdateAcademicSessionData,
  UpdateAcademicSessionBody
>;
