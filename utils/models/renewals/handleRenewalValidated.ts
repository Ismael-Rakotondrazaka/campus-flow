import { sendRenewalValidatedEmail } from "./sendRenewalValidatedEmail";

export const handleRenewalValidated = async (
  renewal: RenewalFull,
): Promise<void> => {
  sendRenewalValidatedEmail({
    email: renewal.student.user.email,
    fullName: renewal.student.user.fullName,
  });
};
