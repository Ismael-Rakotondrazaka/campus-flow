import ExcelJS from "exceljs";

export const formatToExcelJSBuffer = (payload: {
  headers: {
    value: string;
    width: number;
    alignement?: Partial<ExcelJS.Alignment>;
  }[];
  worksheetName: string;
  values: ExcelJS.CellValue[][];
}) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(payload.worksheetName, {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
    },
  });

  // Initialize the row index
  let rowIndex = 1;

  const row = worksheet.getRow(rowIndex);
  row.values = payload.headers.map((header) => header.value);
  row.font = { bold: true };

  row.eachCell((cell, colNumber) => {
    const currentColumn = worksheet.getColumn(colNumber);

    const columnIndex = colNumber - 1;
    currentColumn.width = payload.headers[columnIndex].width;
    currentColumn.alignment = payload.headers[columnIndex].alignement;
  });

  // Loop over the grouped data
  payload.values.forEach((task, index) => {
    const row = worksheet.getRow(rowIndex + index + 1);

    let initialIndex: number = 65; // ASCII A

    task.forEach((rowValue) => {
      row.getCell(String.fromCharCode(initialIndex)).value = rowValue;
      initialIndex += 1;
    });
  });
  // Increment the row index
  rowIndex += payload.values.length;

  for (let i = 1; i <= rowIndex; i++) {
    worksheet.getRow(i).height = 70;
  }

  return workbook.xlsx.writeBuffer();
};
