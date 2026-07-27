const assetDashboardService = require("../../services/assets/assetDashboardService");

class AssetDashboardController {
  // ===========================================
  // Dashboard Overview
  // ===========================================
  async dashboard(req, res, next) {
    try {
      const data = await assetDashboardService.dashboard();

      return res.status(200).json({
        success: true,
        message: "Asset dashboard fetched successfully.",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================================
  // KPI Cards
  // ===========================================
  async kpis(req, res, next) {
    try {
      const data = await assetDashboardService.kpis();

      return res.status(200).json({
        success: true,
        message: "KPI data fetched successfully.",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================================
  // Financial Summary
  // ===========================================
  async financialSummary(req, res, next) {
    try {
      const data = await assetDashboardService.financialSummary();

      return res.status(200).json({
        success: true,
        message: "Financial summary fetched successfully.",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================================
  // Assignment Analytics
  // ===========================================
  async assignmentChart(req, res, next) {
    try {
      const data = await assetDashboardService.assignmentChart();

      return res.status(200).json({
        success: true,
        message: "Assignment analytics fetched successfully.",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================================
  // Maintenance Analytics
  // ===========================================
  async maintenanceChart(req, res, next) {
    try {
      const data = await assetDashboardService.maintenanceChart();

      return res.status(200).json({
        success: true,
        message: "Maintenance analytics fetched successfully.",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================================
  // Warranty Expiry
  // ===========================================
  async warrantyWidget(req, res, next) {
    try {
      const days = req.query.days || 30;

      const data = await assetDashboardService.warrantyWidget(days);

      return res.status(200).json({
        success: true,
        message: "Warranty report fetched successfully.",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // ===========================================
  // Recent Assets
  // ===========================================
  async recentAssets(req, res, next) {
    try {
      const limit = req.query.limit || 10;

      const data = await assetDashboardService.recentAssets(limit);

      return res.status(200).json({
        success: true,
        message: "Recent assets fetched successfully.",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AssetDashboardController();
