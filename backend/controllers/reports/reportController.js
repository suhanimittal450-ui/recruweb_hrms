const reportService = require("../../services/reports/reportService");

class ReportController {
  // ==========================================
  // Create Report
  // ==========================================
  async create(req, res, next) {
    try {
      const payload = {
        ...req.body,
        generatedBy: req.user.id,
      };

      const report = await reportService.create(payload);

      return res.status(201).json({
        success: true,
        message: "Report created successfully.",
        data: report,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Get All Reports
  // ==========================================
  async getAll(req, res, next) {
    try {
      const reports = await reportService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Reports fetched successfully.",
        data: reports,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Get Report By ID
  // ==========================================
  async getById(req, res, next) {
    try {
      const report = await reportService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Report fetched successfully.",
        data: report,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Update Report
  // ==========================================
  async update(req, res, next) {
    try {
      const report = await reportService.update(req.params.id, req.body);

      return res.status(200).json({
        success: true,
        message: "Report updated successfully.",
        data: report,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Download Report
  // ==========================================
  async download(req, res, next) {
    try {
      const report = await reportService.download(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Download count updated successfully.",
        data: report,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Latest Reports
  // ==========================================
  async latest(req, res, next) {
    try {
      const reports = await reportService.latest(req.query.limit);

      return res.status(200).json({
        success: true,
        message: "Latest reports fetched successfully.",
        data: reports,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Count
  // ==========================================
  async count(req, res, next) {
    try {
      const total = await reportService.count();

      return res.status(200).json({
        success: true,
        data: {
          total,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Analytics
  // ==========================================
  async analytics(req, res, next) {
    try {
      const analytics = await reportService.analytics();

      return res.status(200).json({
        success: true,
        message: "Report analytics fetched successfully.",
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Delete
  // ==========================================
  async delete(req, res, next) {
    try {
      await reportService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Report deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
  // ==========================================
  // Export Report
  // ==========================================
  async export(req, res, next) {
    try {
      const { type, format } = req.query;

      const report = await reportService.exportReport(type, format);

      res.setHeader("Content-Type", report.mime);

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${type.toLowerCase()}.${report.extension}"`,
      );

      return res.send(report.buffer);
    } catch (error) {
      next(error);
    }
  }
  async email(req, res, next) {
    try {
      await reportService.emailReport(req.body);

      return res.json({
        success: true,

        message: "Report emailed successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Restore
  // ==========================================
  async restore(req, res, next) {
    try {
      const report = await reportService.restore(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Report restored successfully.",
        data: report,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReportController();
