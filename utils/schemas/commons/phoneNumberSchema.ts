import { parsePhoneNumber, PhoneNumber } from "libphonenumber-js";
import { z } from "#imports";

export const PhoneNumberSchema = z.string().transform((arg, ctx) => {
  try {
    const phoneNumber: PhoneNumber | undefined = parsePhoneNumber(arg);

    if (phoneNumber !== undefined) {
      if (phoneNumber.isValid()) {
        return phoneNumber.formatInternational();
      }
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La valeur est non valide.",
      fatal: true,
    });
  } catch (error) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La valeur est non valide.",
      fatal: true,
    });
  }

  return z.NEVER;
});
