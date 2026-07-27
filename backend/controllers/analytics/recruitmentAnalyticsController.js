const dashboardService = require("../../services/analytics/dashboardService");

class RecruitmentAnalyticsController {
  async analytics(req, res, next) {
    try {
      const data = await dashboardService.getCandidateAnalytics();

      res.json({
        success: true,

        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RecruitmentAnalyticsController();
