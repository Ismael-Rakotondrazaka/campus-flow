import { sendReservationAcceptedEmail } from "./sendReservationAcceptedEmail";

export const handleReservationAccepted = async (
  reservation: ReservationFull,
): Promise<void> => {
  sendReservationAcceptedEmail({
    email: reservation.email,
    fullName: reservation.fullName,
  });
};
