import { sendRenewalAcceptedEmail } from "./sendRenewalAcceptedEmail";

export const handleRenewalAccepted = async (
  renewal: RenewalFull,
): Promise<void> => {
  await studentRepository.updateFullOne({
    data: {
      academicSessionId: renewal.academicSessionId,
    },
    where: {
      userId: renewal.studentId,
    },
  });

  sendRenewalAcceptedEmail({
    email: renewal.student.user.email,
    fullName: renewal.student.user.fullName,
  });
};
