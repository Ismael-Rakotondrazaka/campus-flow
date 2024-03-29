import { CellValue, Alignment } from "exceljs";

const formatRow = (building: BuildingFull): CellValue[] => {
  return [
    building.id,
    building.name,
    building.floors,
    building._count.lodgments,
    building._count.capacity,
    building._count.students,
    building._count.available,
  ];
};

export const buildingsToExportFormat = (buildings: BuildingFull[]) => {
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
    { value: "Étages", width: 30, alignement: center },
    { value: "Logements", width: 15, alignement: center },
    { value: "Capacité", width: 15, alignement: center },
    { value: "Résidents", width: 15, alignement: center },
    { value: "Disponibles", width: 15, alignement: center },
  ];

  const values: CellValue[][] = buildings.map((building: BuildingFull) =>
    formatRow(building),
  );

  return formatToExcelJSBuffer({
    headers,
    values,
    worksheetName: "buildings",
  });
};
