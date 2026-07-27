const dashboardService = require("../../services/analytics/dashboardService");

class ChartController {
  // =====================================
  // Employee Monthly Chart
  // =====================================
  async employeeChart(req, res, next) {
    try {
      const data = await dashboardService.getMonthlyGrowth();

      res.status(200).json({
        success: true,
        chart: "employee",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Employee Yearly Chart
  // =====================================
  async yearlyChart(req, res, next) {
    try {
      const data = await dashboardService.getYearlyGrowth();

      res.status(200).json({
        success: true,
        chart: "yearly",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // KPI Chart
  // =====================================
  async kpiChart(req, res, next) {
    try {
      const data = await dashboardService.getKPIs();

      res.status(200).json({
        success: true,
        chart: "kpi",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Dashboard Chart
  // =====================================
  async dashboardChart(req, res, next) {
    try {
      const data = await dashboardService.getDashboard();

      res.status(200).json({
        success: true,
        chart: "dashboard",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChartController();
