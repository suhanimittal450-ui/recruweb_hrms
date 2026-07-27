const Employee = require("../../models/employee/Employee");
const Candidate = require("../../models/candidate/Candidate");
const Asset = require("../../models/assets/Asset");
const Attendance = require("../../models/attendance/Attendance");
const Leave = require("../../models/leave/Leave");
const Payroll = require("../../models/payroll/Payroll");
const Department = require("../../models/organization/Department");

class DashboardRepository {
  // =====================================
  // Employee Statistics
  // =====================================
  async employeeStats() {
    const total = await Employee.countDocuments();

    const active = await Employee.countDocuments({
      status: "Active",
    });

    const inactive = await Employee.countDocuments({
      status: "Inactive",
    });

    const probation = await Employee.countDocuments({
      employmentStatus: "Probation",
    });

    const resigned = await Employee.countDocuments({
      status: "Resigned",
    });

    return {
      total,
      active,
      inactive,
      probation,
      resigned,
    };
  }

  // =====================================
  // Candidate Statistics
  // =====================================
  async candidateStats() {
    const total = await Candidate.countDocuments();

    const shortlisted = await Candidate.countDocuments({
      status: "Shortlisted",
    });

    const selected = await Candidate.countDocuments({
      status: "Selected",
    });

    const rejected = await Candidate.countDocuments({
      status: "Rejected",
    });

    const hired = await Candidate.countDocuments({
      status: "Hired",
    });

    return {
      total,
      shortlisted,
      selected,
      rejected,
      hired,
    };
  }

  // =====================================
  // Asset Statistics
  // =====================================
  async assetStats() {
    const total = await Asset.countDocuments();

    const assigned = await Asset.countDocuments({
      status: "Assigned",
    });

    const available = await Asset.countDocuments({
      status: "Available",
    });

    const maintenance = await Asset.countDocuments({
      status: "Maintenance",
    });

    const retired = await Asset.countDocuments({
      status: "Retired",
    });

    return {
      total,
      assigned,
      available,
      maintenance,
      retired,
    };
  }

  // =====================================
  // Attendance Statistics
  // =====================================
  async attendanceStats() {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const present = await Attendance.countDocuments({
      date: today,
      status: "Present",
    });

    const absent = await Attendance.countDocuments({
      date: today,
      status: "Absent",
    });

    const leave = await Attendance.countDocuments({
      date: today,
      status: "Leave",
    });

    const late = await Attendance.countDocuments({
      date: today,
      status: "Late",
    });

    return {
      present,
      absent,
      leave,
      late,
    };
  }
  // =====================================
  // Leave Statistics
  // =====================================
  async leaveStats() {
    const total = await Leave.countDocuments();

    const pending = await Leave.countDocuments({
      status: "Pending",
    });

    const approved = await Leave.countDocuments({
      status: "Approved",
    });

    const rejected = await Leave.countDocuments({
      status: "Rejected",
    });

    return {
      total,
      pending,
      approved,
      rejected,
    };
  }

  // =====================================
  // Payroll Statistics
  // =====================================
  async payrollStats() {
    const total = await Payroll.countDocuments();

    const processed = await Payroll.countDocuments({
      status: "Processed",
    });

    const pending = await Payroll.countDocuments({
      status: "Pending",
    });

    const totalAmount = await Payroll.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$netSalary",
          },
        },
      },
    ]);

    return {
      total,
      processed,
      pending,
      totalAmount: totalAmount.length > 0 ? totalAmount[0].total : 0,
    };
  }

  // =====================================
  // Department Statistics
  // =====================================
  async departmentStats() {
    return Department.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "department",
          as: "employees",
        },
      },
      {
        $project: {
          name: 1,
          totalEmployees: {
            $size: "$employees",
          },
        },
      },
      {
        $sort: {
          totalEmployees: -1,
        },
      },
    ]);
  }

  // =====================================
  // Monthly Employee Joining
  // =====================================
  async monthlyEmployeeGrowth() {
    return Employee.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          total: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
  }
  // =====================================
  // Yearly Employee Growth
  // =====================================
  async yearlyEmployeeGrowth() {
    return Employee.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
          },
          total: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
        },
      },
    ]);
  }

  // =====================================
  // Recent Employees
  // =====================================
  async recentEmployees(limit = 5) {
    return Employee.find().sort({ createdAt: -1 }).limit(limit).lean();
  }

  // =====================================
  // Recent Candidates
  // =====================================
  async recentCandidates(limit = 5) {
    return Candidate.find().sort({ createdAt: -1 }).limit(limit).lean();
  }

  // =====================================
  // Recent Assets
  // =====================================
  async recentAssets(limit = 5) {
    return Asset.find().sort({ createdAt: -1 }).limit(limit).lean();
  }

  // =====================================
  // Dashboard KPIs
  // =====================================
  async dashboardKPIs() {
    const [employees, candidates, assets, attendance, leaves, payroll] =
      await Promise.all([
        this.employeeStats(),
        this.candidateStats(),
        this.assetStats(),
        this.attendanceStats(),
        this.leaveStats(),
        this.payrollStats(),
      ]);

    return {
      employees,
      candidates,
      assets,
      attendance,
      leaves,
      payroll,
    };
  }

  // =====================================
  // Dashboard Overview
  // =====================================
  async overview() {
    const [
      kpis,
      departments,
      monthlyGrowth,
      yearlyGrowth,
      recentEmployees,
      recentCandidates,
      recentAssets,
    ] = await Promise.all([
      this.dashboardKPIs(),
      this.departmentStats(),
      this.monthlyEmployeeGrowth(),
      this.yearlyEmployeeGrowth(),
      this.recentEmployees(),
      this.recentCandidates(),
      this.recentAssets(),
    ]);

    return {
      kpis,
      departments,
      growth: {
        monthly: monthlyGrowth,
        yearly: yearlyGrowth,
      },
      recent: {
        employees: recentEmployees,
        candidates: recentCandidates,
        assets: recentAssets,
      },
    };
  }
  // =====================================
  // Dashboard Summary
  // =====================================
  async summary() {
    const [
      employeeStats,
      candidateStats,
      assetStats,
      attendanceStats,
      leaveStats,
      payrollStats,
    ] = await Promise.all([
      this.employeeStats(),
      this.candidateStats(),
      this.assetStats(),
      this.attendanceStats(),
      this.leaveStats(),
      this.payrollStats(),
    ]);

    return {
      employeeStats,
      candidateStats,
      assetStats,
      attendanceStats,
      leaveStats,
      payrollStats,
    };
  }

  // =====================================
  // Live Counters
  // =====================================
  async liveCounters() {
    return {
      employees: await Employee.countDocuments(),
      candidates: await Candidate.countDocuments(),
      assets: await Asset.countDocuments(),
      departments: await Department.countDocuments(),
      attendance: await Attendance.countDocuments(),
      leaves: await Leave.countDocuments(),
      payroll: await Payroll.countDocuments(),
    };
  }

  // =====================================
  // Complete Dashboard
  // =====================================
  async dashboard() {
    const [overview, summary, counters] = await Promise.all([
      this.overview(),
      this.summary(),
      this.liveCounters(),
    ]);

    return {
      overview,
      summary,
      counters,
      generatedAt: new Date(),
    };
  }
}

module.exports = new DashboardRepository();
