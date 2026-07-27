const { format } = require("@fast-csv/format");

class CSVExporter {
  export({ columns = [], data = [] }) {
    return new Promise((resolve, reject) => {
      const chunks = [];

      const csvStream = format({
        headers: columns.map((col) => col.header),
        writeHeaders: true,
      });

      csvStream.on("error", reject);

      csvStream.on("data", (chunk) => {
        chunks.push(Buffer.from(chunk));
      });

      csvStream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });

      data.forEach((row) => {
        const csvRow = {};

        columns.forEach((column) => {
          csvRow[column.header] = row[column.key];
        });

        csvStream.write(csvRow);
      });

      csvStream.end();
    });
  }
}

module.exports = new CSVExporter();
