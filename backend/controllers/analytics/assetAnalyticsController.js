const dashboardService = require("../../services/analytics/dashboardService");

class AssetAnalyticsController {
  async analytics(req, res, next) {
    try {
      const data = await dashboardService.getAssetAnalytics();

      res.json({
        success: true,

        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AssetAnalyticsController();
