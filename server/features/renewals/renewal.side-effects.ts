import type { Renewal } from '#shared/features/renewals';

import {
  sendRenewalAcceptedEmail,
  sendRenewalRefusedEmail,
  sendRenewalValidatedEmail,
} from '#server/utils/brevo';

export const onRenewalAccepted = async (renewal: Renewal): Promise<void> => {
  await prisma.resident.update({
    data: { academicSessionId: renewal.academicSessionId },
    where: { id: renewal.residentId },
  });

  void sendRenewalAcceptedEmail({
    email: renewal.resident.user.email,
    firstName: renewal.resident.firstName,
    lastName: renewal.resident.lastName,
  });
};

export const onRenewalRefused = (renewal: Renewal): void => {
  void sendRenewalRefusedEmail({
    email: renewal.resident.user.email,
    firstName: renewal.resident.firstName,
    lastName: renewal.resident.lastName,
    refusalReason: renewal.refusalReason!,
  });
};

export const onRenewalValidated = (renewal: Renewal): void => {
  void sendRenewalValidatedEmail({
    email: renewal.resident.user.email,
    firstName: renewal.resident.firstName,
    lastName: renewal.resident.lastName,
  });
};
