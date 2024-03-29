import { CellValue, Alignment } from "exceljs";

const formatRow = (maintenance: MaintenanceFull): CellValue[] => {
  return [
    maintenance.id,
    maintenance.admin.user.fullName,
    maintenance.maintainers
      .map((maintainer) => `- ${maintainer.fullName}`)
      .join("\n"),
    maintenance.lodgment.building.name,
    maintenance.lodgment.floor,
    maintenance.lodgment.roomNumber,
    maintenance.type,
    maintenance.description,
    maintenance.startAt ?? "",
    maintenance.endAt ?? "",
  ];
};

export const maintenancesToExportFormat = (maintenances: MaintenanceFull[]) => {
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
    { value: "Superviseur", width: 30, alignement: middleLeft },
    { value: "Responsables", width: 30, alignement: middleLeft },
    { value: "Bâtiment", width: 10, alignement: center },
    { value: "Étage", width: 10, alignement: center },
    { value: "Porte", width: 10, alignement: middleLeft },
    { value: "Type", width: 20, alignement: middleLeft },
    { value: "Description", width: 100, alignement: middleLeft },
    { value: "Début", width: 20, alignement: center },
    { value: "Fin", width: 20, alignement: center },
  ];

  const values: CellValue[][] = maintenances.map(
    (maintenance: MaintenanceFull) => formatRow(maintenance),
  );

  return formatToExcelJSBuffer({
    headers,
    values,
    worksheetName: "maintenances",
  });
};
