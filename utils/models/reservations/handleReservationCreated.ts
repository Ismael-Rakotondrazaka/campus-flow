import { sendReservationCreatedEmail } from "./sendReservationCreatedEmail";

export const handleReservationCreated = async (
  reservation: ReservationFull,
): Promise<void> => {
  sendReservationCreatedEmail({
    email: reservation.email,
    fullName: reservation.fullName,
  });
};
