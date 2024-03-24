import { sendRenewalAcceptedEmail } from "./sendRenewalAcceptedEmail";

export const handleRenewalAccepted = async (
  renewal: RenewalFull,
): Promise<void> => {
  sendRenewalAcceptedEmail({
    email: renewal.student.user.email,
    fullName: renewal.student.user.fullName,
  });
};
