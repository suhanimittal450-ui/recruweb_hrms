const ExcelJS = require("exceljs");

class ExcelExporter {
  async export({
    fileName = "Report",
    sheetName = "Sheet1",
    columns = [],
    data = [],
  }) {
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Enterprise HRMS";
    workbook.company = "Enterprise HRMS";
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.columns = columns;

    // ==========================
    // Header Style
    // ==========================
    worksheet.getRow(1).font = {
      bold: true,
      color: {
        argb: "FFFFFFFF",
      },
      size: 12,
    };

    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "1F4E78",
      },
    };

    worksheet.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    // ==========================
    // Add Data
    // ==========================
    worksheet.addRows(data);

    // ==========================
    // Auto Width
    // ==========================
    worksheet.columns.forEach((column) => {
      let maxLength = 10;

      column.eachCell({ includeEmpty: true }, (cell) => {
        const length = cell.value ? cell.value.toString().length : 10;

        if (length > maxLength) {
          maxLength = length;
        }
      });

      column.width = maxLength + 5;
    });

    // ==========================
    // Borders
    // ==========================
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
          bottom: { style: "thin" },
        };
      });
    });

    // ==========================
    // Auto Filter
    // ==========================
    worksheet.autoFilter = {
      from: "A1",
      to: `${String.fromCharCode(64 + columns.length)}1`,
    };

    return workbook.xlsx.writeBuffer();
  }
}

module.exports = new ExcelExporter();
