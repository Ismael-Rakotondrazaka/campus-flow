import { sendRenewalRefusedEmail } from "./sendRenewalRefusedEmail";

export const handleRenewalRefused = async (
  renewal: RenewalFull,
): Promise<void> => {
  sendRenewalRefusedEmail({
    email: renewal.student.user.email,
    fullName: renewal.student.user.fullName,
  });
};
