import { sendRenewalCreatedEmail } from "./sendRenewalCreatedEmail";

export const handleRenewalCreated = async (
  renewal: RenewalFull,
): Promise<void> => {
  sendRenewalCreatedEmail({
    email: renewal.student.user.email,
    fullName: renewal.student.user.fullName,
  });
};
