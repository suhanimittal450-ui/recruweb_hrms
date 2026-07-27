const PDFDocument = require("pdfkit");

class PDFExporter {
  export({ title = "Enterprise HRMS Report", columns = [], data = [] }) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          margin: 40,
          size: "A4",
        });

        const buffers = [];

        doc.on("data", (chunk) => buffers.push(chunk));

        doc.on("end", () => {
          resolve(Buffer.concat(buffers));
        });

        // ==========================
        // Header
        // ==========================
        doc.fontSize(20).fillColor("#1F4E78").text("Enterprise HRMS", {
          align: "center",
        });

        doc.moveDown(0.5);

        doc.fontSize(16).fillColor("black").text(title, {
          align: "center",
        });

        doc.moveDown();

        // ==========================
        // Table Header
        // ==========================
        let y = doc.y;

        columns.forEach((column, index) => {
          doc
            .font("Helvetica-Bold")
            .fontSize(10)
            .text(column.header, 50 + index * 100, y, {
              width: 90,
            });
        });

        y += 20;

        // ==========================
        // Rows
        // ==========================
        data.forEach((row) => {
          columns.forEach((column, index) => {
            doc
              .font("Helvetica")
              .fontSize(9)
              .text(
                row[column.key] !== undefined ? String(row[column.key]) : "",
                50 + index * 100,
                y,
                {
                  width: 90,
                },
              );
          });

          y += 20;

          // Auto page break
          if (y > 760) {
            doc.addPage();
            y = 50;
          }
        });

        // ==========================
        // Footer
        // ==========================
        doc.moveDown(2);

        doc
          .fontSize(9)
          .fillColor("gray")
          .text(`Generated on ${new Date().toLocaleString()}`, {
            align: "right",
          });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new PDFExporter();
