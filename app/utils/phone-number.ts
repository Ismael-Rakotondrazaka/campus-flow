import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { z } from 'zod';

export const PhoneNumberSchema = z.string().transform((value, ctx) => {
  const invalidIssueData: z.IssueData = {
    code: z.ZodIssueCode.custom,
    message: 'Invalide',
  };

  try {
    const result = parsePhoneNumberWithError(value, {
      defaultCountry: 'FR',
    });

    if (result.isValid() === false) {
      ctx.addIssue(invalidIssueData);

      return z.NEVER;
    }

    return result.formatInternational();
  } catch {
    ctx.addIssue(invalidIssueData);

    return z.NEVER;
  }
});

/* export const PhoneNumberSchema = z.string().refine(
  value => {
    try {
      const result = parsePhoneNumberWithError(value);
      return result.isValid();
    } catch {
      return false;
    }
  },
  {
    message: 'Invalide',
  }
); */

// export const PhoneNumberSchema = z.string();
