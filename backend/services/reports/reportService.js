const reportRepository = require("../../repositories/reports/reportRepository");
const excelExporter = require("../../utils/export/excelExporter");
const pdfExporter = require("../../utils/export/pdfExporter");
const csvExporter = require("../../utils/export/csvExporter");
const reportMailer = require("../email/reportMailer");
// Example repositories
const assetRepository = require("../../repositories/assets/assetRepository");
class ReportService {
  // ==========================================
  // Create Report
  // ==========================================
  // ==========================================
  // Export Report
  // ==========================================
  async emailReport({ emails, type, format }) {
    const report = await this.exportReport(type, format);

    await reportMailer.send({
      to: emails.join(","),

      subject: `${type} Report`,

      text: "Please find attached report.",

      fileName: `${type}.${report.extension}`,

      buffer: report.buffer,

      mimeType: report.mime,
    });

    return true;
  }
  async exportReport(type, format) {
    let data = [];
    let columns = [];
    let fileName = "report";

    switch (type.toUpperCase()) {
      case "ASSET":
        data = await assetRepository.findAll();

        columns = [
          { header: "Asset Code", key: "assetCode" },
          { header: "Asset Name", key: "assetName" },
          { header: "Category", key: "category" },
          { header: "Status", key: "status" },
        ];

        fileName = "asset-report";

        break;

      default:
        throw new Error("Invalid report type.");
    }

    switch (format.toUpperCase()) {
      case "EXCEL":
        return {
          buffer: await excelExporter.export({
            fileName,
            sheetName: "Report",
            columns,
            data,
          }),
          mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          extension: "xlsx",
        };

      case "PDF":
        return {
          buffer: await pdfExporter.export({
            title: fileName,
            columns,
            data,
          }),
          mime: "application/pdf",
          extension: "pdf",
        };

      case "CSV":
        return {
          buffer: await csvExporter.export({
            columns,
            data,
          }),
          mime: "text/csv",
          extension: "csv",
        };

      default:
        throw new Error("Invalid export format.");
    }
  }
  async create(payload) {
    return reportRepository.create(payload);
  }

  // ==========================================
  // Get Report By ID
  // ==========================================
  async getById(id) {
    const report = await reportRepository.findById(id);

    if (!report) {
      throw new Error("Report not found.");
    }

    return report;
  }

  // ==========================================
  // Get All Reports
  // ==========================================
  async getAll(filters = {}) {
    return reportRepository.findAll({
      ...filters,
      isDeleted: false,
    });
  }

  // ==========================================
  // Update Report
  // ==========================================
  async update(id, payload) {
    const report = await reportRepository.update(id, payload);

    if (!report) {
      throw new Error("Report not found.");
    }

    return report;
  }

  // ==========================================
  // Update Status
  // ==========================================
  async updateStatus(id, status) {
    return reportRepository.updateStatus(id, status);
  }

  // ==========================================
  // Download Report
  // ==========================================
  async download(id) {
    const report = await reportRepository.incrementDownload(id);

    if (!report) {
      throw new Error("Report not found.");
    }

    return report;
  }

  // ==========================================
  // Delete Report
  // ==========================================
  async delete(id) {
    const report = await reportRepository.softDelete(id);

    if (!report) {
      throw new Error("Report not found.");
    }

    return report;
  }

  // ==========================================
  // Restore Report
  // ==========================================
  async restore(id) {
    const report = await reportRepository.restore(id);

    if (!report) {
      throw new Error("Report not found.");
    }

    return report;
  }

  // ==========================================
  // Latest Reports
  // ==========================================
  async latest(limit = 10) {
    return reportRepository.latest(limit);
  }

  // ==========================================
  // Total Reports
  // ==========================================
  async count() {
    return reportRepository.count({
      isDeleted: false,
    });
  }

  // ==========================================
  // Report Analytics
  // ==========================================
  async analytics() {
    return reportRepository.analytics();
  }
}

module.exports = new ReportService();
