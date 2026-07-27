const dashboardService = require("../../services/analytics/dashboardService");

class KPIController {
  async getKPIs(req, res, next) {
    try {
      const data = await dashboardService.getKPIs();

      res.status(200).json({
        success: true,
        message: "KPIs fetched successfully.",
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new KPIController();
