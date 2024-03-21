import { prismaCtx, z } from "#imports";
import { AcademicSessionSchema } from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                            DestroyAcademicSession param                            */
/* -------------------------------------------------------------------------- */

export type DestroyAcademicSessionParam = {
  id: number;
};

export const DestroyAcademicSessionParamSchema: z.ZodType<DestroyAcademicSessionParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             DestroyAcademicSession data                             */
/* -------------------------------------------------------------------------- */

export type DestroyAcademicSessionData = {
  academicSession: prismaCtx.AcademicSession;
};

export const DestroyAcademicSessionDataSchema: z.ZodType<DestroyAcademicSessionData> =
  z.object({
    academicSession: AcademicSessionSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             DestroyAcademicSession error                            */
/* -------------------------------------------------------------------------- */

export type DestroyAcademicSessionBodyPEM = RequestErrorMessage<
  Record<string, never>
>;

export type DestroyAcademicSessionError =
  RequestError<DestroyAcademicSessionBodyPEM>;

export type DestroyAcademicSessionResponse = RequestResponse<
  DestroyAcademicSessionData,
  Record<string, never>
>;
