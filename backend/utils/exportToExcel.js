const ExcelJS = require("exceljs");

/**
 * Builds an .xlsx workbook buffer from rows + column definitions.
 * @param {Array<Object>} rows
 * @param {Array<{key:string,label:string,width?:number}>} columns
 * @param {string} sheetName
 * @returns {Promise<Buffer>}
 */
const toExcelBuffer = async (rows, columns, sheetName = "Report") => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(sheetName);

  sheet.columns = columns.map((c) => ({
    header: c.label,
    key: c.key,
    width: c.width || 20,
  }));

  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFEFEFEF" },
  };

  rows.forEach((row) => sheet.addRow(row));

  return workbook.xlsx.writeBuffer();
};

module.exports = toExcelBuffer;
