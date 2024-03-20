import { z } from "#imports";
import { RenewalFull, RenewalFullSchema } from "./renewalFull";

/* -------------------------------------------------------------------------- */
/*                             StoreRenewal body                             */
/* -------------------------------------------------------------------------- */

export type StoreRenewalBody = {
  phoneNumber: string;
  emergencyNumber: string;
  profile: File;
  NICImage: File;
  schoolCertificate: File;
  facultyId: number;
  academicSessionId: number;
};

export const StoreRenewalBodySchema: z.ZodType<StoreRenewalBody> = z.object({
  phoneNumber: PhoneNumberSchema,
  profile: FileSchema,
  emergencyNumber: PhoneNumberSchema,
  NICImage: FileSchema,
  schoolCertificate: FileSchema,
  facultyId: IdentifierSchema,
  academicSessionId: IdentifierSchema,
});

/* -------------------------------------------------------------------------- */
/*                             StoreRenewal data                             */
/* -------------------------------------------------------------------------- */

export type StoreRenewalData = {
  renewal: RenewalFull;
};
export const StoreRenewalDataSchema: z.ZodType<StoreRenewalData> = z.object({
  renewal: RenewalFullSchema,
});
/* -------------------------------------------------------------------------- */
/*                             StoreRenewal error                            */
/* -------------------------------------------------------------------------- */

export type StoreRenewalBodyPEM = RequestErrorMessage<StoreRenewalBody>;

export type StoreRenewalError = RequestError<StoreRenewalBodyPEM>;

export type StoreRenewalResponse = RequestResponse<
  StoreRenewalData,
  StoreRenewalBody
>;
