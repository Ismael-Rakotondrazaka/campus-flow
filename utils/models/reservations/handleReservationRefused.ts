import { sendReservationRefusedEmail } from "./sendReservationRefusedEmail";

export const handleReservationRefused = async (
  reservation: ReservationFull,
): Promise<void> => {
  sendReservationRefusedEmail({
    email: reservation.email,
    fullName: reservation.fullName,
  });
};
