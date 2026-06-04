import type { HousingApplication } from '#shared/features/housing-applications';

import {
  sendHousingApplicationAcceptedEmail,
  sendHousingApplicationRefusedEmail,
  sendHousingApplicationValidatedEmail,
} from '#server/utils/brevo';
import { randomBytes } from 'node:crypto';

export const onHousingApplicationAccepted = (
  application: HousingApplication
): void => {
  void sendHousingApplicationAcceptedEmail({
    email: application.email,
    firstName: application.firstName,
    lastName: application.lastName,
  });
};

export const onHousingApplicationRefused = (
  application: HousingApplication
): void => {
  void sendHousingApplicationRefusedEmail({
    email: application.email,
    firstName: application.firstName,
    lastName: application.lastName,
    refusalReason: application.refusalReason!,
  });
};

export const onHousingApplicationValidated = async (
  application: HousingApplication
): Promise<void> => {
  const temporaryPassword = randomBytes(12).toString('base64url');

  const hashedPassword = await hashPassword(temporaryPassword);

  await prisma.$transaction(async tx => {
    const user = await tx.user.create({
      data: {
        email: application.email,
        role: 'resident',
      },
    });

    await tx.userIdentity.create({
      data: {
        password: hashedPassword,
        provider: 'email',
        userId: user.id,
      },
    });

    await tx.resident.create({
      data: {
        academicSessionId: application.academicSessionId,
        emergencyNumber: application.emergencyNumber,
        facultyId: application.facultyId,
        firstName: application.firstName,
        gender: application.gender,
        id: user.id,
        imageUrl: application.imageUrl,
        lastName: application.lastName,
        lodgmentId: application.lodgmentId!,
        nic: application.nic,
        origin: application.origin,
        phoneNumber: application.phoneNumber,
      },
    });
  });

  const {
    public: { appUrl },
  } = useRuntimeConfig();

  void sendHousingApplicationValidatedEmail({
    buildingName: application.lodgment!.building.name,
    email: application.email,
    firstName: application.firstName,
    floor: application.lodgment!.floor,
    lastName: application.lastName,
    loginUrl: `${appUrl}/login`,
    roomNumber: application.lodgment!.roomNumber,
    temporaryPassword,
  });
};
