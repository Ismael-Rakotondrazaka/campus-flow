import { CellValue, Alignment } from "exceljs";

const formatFloor = (floor: number): string | number => {
  return floor == 0 ? "rez-de-chaussée" : floor;
};

const formatRow = (lodgment: LodgmentFull): CellValue[] => {
  return [
    lodgment.id,
    lodgment.building.name,
    formatFloor(lodgment.floor),
    lodgment.roomNumber,
    lodgment.capacity,
    lodgment._count.students,
    lodgment._count.available,
    lodgment._count.maintenances,
  ];
};

export const lodgmentsToExportFormat = (lodgments: LodgmentFull[]) => {
  const center: Partial<Alignment> = {
    horizontal: "center",
    vertical: "middle",
  };
  const middleRight: Partial<Alignment> = {
    vertical: "middle",
    horizontal: "right",
  };

  const headers = [
    { value: "# id", width: 10, alignement: middleRight },
    { value: "Bâtiment", width: 15, alignement: center },
    { value: "Étage", width: 30, alignement: center },
    { value: "Porte", width: 15, alignement: middleRight },
    { value: "Capacité", width: 15, alignement: center },
    { value: "Résidents", width: 15, alignement: center },
    { value: "Disponibles", width: 15, alignement: center },
    { value: "Maintenances", width: 15, alignement: center },
  ];

  const values: CellValue[][] = lodgments.map((lodgment: LodgmentFull) =>
    formatRow(lodgment),
  );

  return formatToExcelJSBuffer({
    headers,
    values,
    worksheetName: "lodgments",
  });
};
