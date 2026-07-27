const dashboardService = require("../../services/analytics/dashboardService");

class AttendanceAnalyticsController {
  async analytics(req, res, next) {
    try {
      const data = await dashboardService.getAttendanceAnalytics();

      res.json({
        success: true,

        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AttendanceAnalyticsController();
