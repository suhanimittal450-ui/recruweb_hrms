const dashboardCacheService = require("../../services/cache/dashboardCacheService");
class DashboardController {
  // =====================================
  // Complete Dashboard
  // =====================================
  async dashboard(req, res, next) {
    try {
      const result = await dashboardCacheService.getDashboard();

      return res.status(200).json({
        success: true,
        cache: result.cache,
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Overview
  // =====================================
  async overview(req, res, next) {
    try {
      const data = await dashboardService.getOverview();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // KPI Cards
  // =====================================
  async kpis(req, res, next) {
    try {
      const data = await dashboardService.getKPIs();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Employee Analytics
  // =====================================
  async employees(req, res, next) {
    try {
      const data = await dashboardService.getEmployeeAnalytics();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Candidate Analytics
  // =====================================
  async candidates(req, res, next) {
    try {
      const data = await dashboardService.getCandidateAnalytics();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Asset Analytics
  // =====================================
  async assets(req, res, next) {
    try {
      const data = await dashboardService.getAssetAnalytics();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Attendance Analytics
  // =====================================
  async attendance(req, res, next) {
    try {
      const data = await dashboardService.getAttendanceAnalytics();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Leave Analytics
  // =====================================
  async leaves(req, res, next) {
    try {
      const data = await dashboardService.getLeaveAnalytics();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Payroll Analytics
  // =====================================
  async payroll(req, res, next) {
    try {
      const data = await dashboardService.getPayrollAnalytics();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Department Analytics
  // =====================================
  async departments(req, res, next) {
    try {
      const data = await dashboardService.getDepartmentAnalytics();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Monthly Growth
  // =====================================
  async monthlyGrowth(req, res, next) {
    try {
      const data = await dashboardService.getMonthlyGrowth();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Yearly Growth
  // =====================================
  async yearlyGrowth(req, res, next) {
    try {
      const data = await dashboardService.getYearlyGrowth();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Recent Records
  // =====================================
  async recent(req, res, next) {
    try {
      const data = await dashboardService.getRecentData();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Summary
  // =====================================
  async summary(req, res, next) {
    try {
      const data = await dashboardService.getSummary();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // =====================================
  // Live Counters
  // =====================================
  async counters(req, res, next) {
    try {
      const data = await dashboardService.getLiveCounters();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DashboardController();
