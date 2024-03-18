import { prismaCtx, z } from "#imports";
import { AcademicSessionSchema } from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                            ShowAcademicSession param                            */
/* -------------------------------------------------------------------------- */

export type ShowAcademicSessionParam = {
  id: number;
};

export const ShowAcademicSessionParamSchema: z.ZodType<ShowAcademicSessionParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             ShowAcademicSession data                             */
/* -------------------------------------------------------------------------- */

export type ShowAcademicSessionData = {
  academicSession: prismaCtx.AcademicSession;
};

export const ShowAcademicSessionDataSchema: z.ZodType<ShowAcademicSessionData> =
  z.object({
    academicSession: AcademicSessionSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             ShowAcademicSession error                            */
/* -------------------------------------------------------------------------- */

export type ShowAcademicSessionBodyPEM = RequestErrorMessage<
  Record<string, never>
>;

export type ShowAcademicSessionError = RequestError<ShowAcademicSessionBodyPEM>;

export type ShowAcademicSessionResponse = RequestResponse<
  ShowAcademicSessionData,
  Record<string, never>
>;
