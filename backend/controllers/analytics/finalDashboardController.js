const dashboardService = require("../../services/analytics/dashboardService");

class FinalDashboardController {
  async dashboard(req, res, next) {
    try {
      const [
        overview,

        kpis,

        employees,

        attendance,

        assets,

        payroll,

        departments,

        summary,

        counters,
      ] = await Promise.all([
        dashboardService.getOverview(),

        dashboardService.getKPIs(),

        dashboardService.getEmployeeAnalytics(),

        dashboardService.getAttendanceAnalytics(),

        dashboardService.getAssetAnalytics(),

        dashboardService.getPayrollAnalytics(),

        dashboardService.getDepartmentAnalytics(),

        dashboardService.getSummary(),

        dashboardService.getLiveCounters(),
      ]);

      res.status(200).json({
        success: true,

        data: {
          overview,

          kpis,

          employees,

          attendance,

          assets,

          payroll,

          departments,

          summary,

          counters,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FinalDashboardController();
