import { prismaCtx } from "#imports";
import { CellValue, Alignment } from "exceljs";

const formatAcademicSession = (
  academicSession: prismaCtx.AcademicSession,
): string => {
  return `${academicSession.startAt.getFullYear()}-${academicSession.endAt.getFullYear()}`;
};

const formatStatus = (status: prismaCtx.RenewalStatus): string => {
  const statusValue: Record<prismaCtx.RenewalStatus, string> = {
    ACCEPTED: "Accepté",
    PENDING: "En cours",
    REFUSED: "Refusé",
    VALIDATED: "Validé",
  };

  return statusValue[status];
};

const formatRow = (renewal: RenewalFull): CellValue[] => {
  return [
    renewal.id,
    renewal.student.user.fullName,
    renewal.student.userId,
    renewal.student.user.phoneNumber,
    renewal.student.NIC,
    formatStatus(renewal.status),
    formatAcademicSession(renewal.academicSession),
  ];
};

export const renewalsToExportFormat = (renewals: RenewalFull[]) => {
  const center: Partial<Alignment> = {
    horizontal: "center",
    vertical: "middle",
  };
  const middleLeft: Partial<Alignment> = {
    wrapText: true,
    horizontal: "left",
    vertical: "middle",
  };
  const middleRight: Partial<Alignment> = {
    vertical: "middle",
    horizontal: "right",
  };

  const headers = [
    { value: "# id", width: 10, alignement: middleRight },
    { value: "Nom", width: 30, alignement: middleLeft },
    { value: "Matricule", width: 10, alignement: center },
    { value: "Tel.", width: 30, alignement: middleRight },
    { value: "CIN", width: 30, alignement: center },
    { value: "Status", width: 15, alignement: center },
    { value: "Année", width: 15, alignement: center },
  ];

  const values: CellValue[][] = renewals.map((renewal: RenewalFull) =>
    formatRow(renewal),
  );

  return formatToExcelJSBuffer({
    headers,
    values,
    worksheetName: "renewals",
  });
};
