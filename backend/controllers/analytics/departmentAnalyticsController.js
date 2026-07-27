const dashboardService = require("../../services/analytics/dashboardService");

class DepartmentAnalyticsController {
  async analytics(req, res, next) {
    try {
      const data = await dashboardService.getDepartmentAnalytics();

      res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new DepartmentAnalyticsController();
