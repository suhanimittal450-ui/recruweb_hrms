const analyticsService = require("../../services/search/searchAnalyticsService");

class SearchAnalyticsController {
  async dashboard(req, res, next) {
    try {
      const data = await analyticsService.dashboard();

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async daily(req, res, next) {
    try {
      const days = req.query.days || 7;

      const data = await analyticsService.daily(days);

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async monthly(req, res, next) {
    try {
      const data = await analyticsService.monthly();

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SearchAnalyticsController();
