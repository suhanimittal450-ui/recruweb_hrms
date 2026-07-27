const dashboardRepository = require("../../repositories/analytics/dashboardRepository");

class DashboardService {
  // =====================================
  // Complete Dashboard
  // =====================================
  async getDashboard() {
    return await dashboardRepository.dashboard();
  }

  // =====================================
  // Overview
  // =====================================
  async getOverview() {
    return await dashboardRepository.overview();
  }

  // =====================================
  // KPI Cards
  // =====================================
  async getKPIs() {
    return await dashboardRepository.dashboardKPIs();
  }

  // =====================================
  // Employee Analytics
  // =====================================
  async getEmployeeAnalytics() {
    return await dashboardRepository.employeeStats();
  }

  // =====================================
  // Candidate Analytics
  // =====================================
  async getCandidateAnalytics() {
    return await dashboardRepository.candidateStats();
  }

  // =====================================
  // Asset Analytics
  // =====================================
  async getAssetAnalytics() {
    return await dashboardRepository.assetStats();
  }

  // =====================================
  // Attendance Analytics
  // =====================================
  async getAttendanceAnalytics() {
    return await dashboardRepository.attendanceStats();
  }

  // =====================================
  // Leave Analytics
  // =====================================
  async getLeaveAnalytics() {
    return await dashboardRepository.leaveStats();
  }

  // =====================================
  // Payroll Analytics
  // =====================================
  async getPayrollAnalytics() {
    return await dashboardRepository.payrollStats();
  }

  // =====================================
  // Department Analytics
  // =====================================
  async getDepartmentAnalytics() {
    return await dashboardRepository.departmentStats();
  }

  // =====================================
  // Monthly Growth
  // =====================================
  async getMonthlyGrowth() {
    return await dashboardRepository.monthlyEmployeeGrowth();
  }

  // =====================================
  // Yearly Growth
  // =====================================
  async getYearlyGrowth() {
    return await dashboardRepository.yearlyEmployeeGrowth();
  }

  // =====================================
  // Recent Records
  // =====================================
  async getRecentData() {
    return {
      employees: await dashboardRepository.recentEmployees(),
      candidates: await dashboardRepository.recentCandidates(),
      assets: await dashboardRepository.recentAssets(),
    };
  }

  // =====================================
  // Dashboard Summary
  // =====================================
  async getSummary() {
    return await dashboardRepository.summary();
  }

  // =====================================
  // Live Counters
  // =====================================
  async getLiveCounters() {
    return await dashboardRepository.liveCounters();
  }
}

module.exports = new DashboardService();
