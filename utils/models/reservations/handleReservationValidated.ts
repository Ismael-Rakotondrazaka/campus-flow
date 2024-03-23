import { sendReservationValidatedEmail } from "./sendReservationValidatedEmail";

export const handleReservationValidated = async (
  reservation: ReservationFull,
  lodgment: LodgmentFull,
): Promise<void> => {
  const temporaryPassword: string = createRandomString(
    passwordConfig.PASSWORD_MIN_LENGTH,
  );
  const hashedPassword: string = hashPassword(temporaryPassword);

  const now: Date = new Date();

  await studentRepository.createFullOne({
    data: {
      emergencyNumber: reservation.emergencyNumber,
      gender: reservation.gender,
      NIC: reservation.NIC,
      origin: reservation.origin,
      faculty: {
        connect: {
          id: reservation.facultyId,
        },
      },
      lodgment: {
        connect: {
          id: lodgment.id,
        },
      },
      user: {
        create: {
          name: reservation.name,
          firstName: reservation.firstName,
          phoneNumber: reservation.phoneNumber,
          profileUrl: reservation.profileUrl,
          email: reservation.email,
          password: hashedPassword,
          createdAt: now,
          updatedAt: now,
        },
      },
    },
  });

  sendReservationValidatedEmail({
    email: reservation.email,
    user: {
      email: reservation.email,
      fullName: reservation.fullName,
      password: temporaryPassword,
    },
    lodgment: {
      buildingName: lodgment.building.name,
      floor: lodgment.floor,
      roomNumber: lodgment.roomNumber,
    },
  });
};
