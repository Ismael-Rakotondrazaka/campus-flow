import { CellValue, Alignment } from "exceljs";

const formatFloor = (floor: number): string | number => {
  return floor == 0 ? "rez-de-chaussée" : floor;
};

const formatRow = (student: StudentFull): CellValue[] => {
  return [
    student.userId,
    student.user.fullName,
    student.user.phoneNumber,
    student.NIC,
    student.faculty.name,
    student._count.renewals,
    student.lodgment.building.name,
    formatFloor(student.lodgment.floor),
    student.lodgment.roomNumber,
  ];
};

export const studentsToExportFormat = (students: StudentFull[]) => {
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
    { value: "Matricule", width: 10, alignement: center },
    { value: "Nom", width: 30, alignement: middleLeft },
    { value: "Tel.", width: 30, alignement: middleRight },
    { value: "CIN", width: 30, alignement: center },
    { value: "Faculté", width: 30, alignement: center },
    { value: "Renouvellements", width: 30, alignement: center },
    { value: "Bâtiment", width: 15, alignement: center },
    { value: "Étage", width: 30, alignement: center },
    { value: "Porte", width: 15, alignement: center },
  ];

  const values: CellValue[][] = students.map((student: StudentFull) =>
    formatRow(student),
  );

  return formatToExcelJSBuffer({
    headers,
    values,
    worksheetName: "students",
  });
};
