import { prismaCtx } from "#imports";
import { CellValue, Alignment } from "exceljs";

const formatOrigin = (origin: prismaCtx.Origin): string => {
  const originValue: Record<prismaCtx.Origin, string> = {
    FOREIGNER: "Étranger",
    NATIONAL: "National",
  };

  return originValue[origin];
};

const formatGender = (gender: prismaCtx.Gender): string => {
  const genderValue: Record<prismaCtx.Gender, string> = {
    FEMALE: "Femme",
    MALE: "Homme",
  };

  return genderValue[gender];
};

const formatStatus = (status: prismaCtx.ReservationStatus): string => {
  const reservationValue: Record<prismaCtx.ReservationStatus, string> = {
    ACCEPTED: "Accepté",
    PENDING: "En cours",
    REFUSED: "Refusé",
    VALIDATED: "Validé",
  };

  return reservationValue[status];
};

const formatAcademicSession = (
  academicSession: prismaCtx.AcademicSession,
): string => {
  return `${academicSession.startAt.getFullYear()}-${academicSession.endAt.getFullYear()}`;
};

const formatRow = (reservation: ReservationFull): CellValue[] => {
  return [
    reservation.id,
    reservation.fullName,
    reservation.phoneNumber,
    reservation.NIC,
    reservation.email,
    formatOrigin(reservation.origin),
    formatGender(reservation.gender),
    reservation.faculty.name,
    formatStatus(reservation.status),
    formatAcademicSession(reservation.academicSession),
  ];
};

export const reservationsToExportFormat = (reservations: ReservationFull[]) => {
  const center: Partial<Alignment> = {
    horizontal: "center",
    vertical: "middle",
  };
  const middleLeft: Partial<Alignment> = {
    vertical: "middle",
    horizontal: "left",
  };
  const middleRight: Partial<Alignment> = {
    vertical: "middle",
    horizontal: "right",
  };

  const headers = [
    { value: "# id", width: 10, alignement: middleRight },
    { value: "Nom", width: 30, alignement: middleLeft },
    { value: "Tel.", width: 30, alignement: middleRight },
    { value: "CIN", width: 30, alignement: center },
    { value: "Email", width: 30, alignement: middleLeft },
    { value: "Origine", width: 15, alignement: center },
    { value: "Sexe", width: 15, alignement: center },
    { value: "Faculté", width: 30, alignement: center },
    { value: "Status", width: 15, alignement: center },
    { value: "Année", width: 15, alignement: center },
  ];

  const values: CellValue[][] = reservations.map(
    (reservation: ReservationFull) => formatRow(reservation),
  );

  return formatToExcelJSBuffer({
    headers,
    values,
    worksheetName: "reservations",
  });
};
