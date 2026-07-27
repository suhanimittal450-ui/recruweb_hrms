const dashboardService = require("../../services/analytics/dashboardService");

class PayrollAnalyticsController {
  async analytics(req, res, next) {
    try {
      const data = await dashboardService.getPayrollAnalytics();

      res.json({
        success: true,

        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new PayrollAnalyticsController();
