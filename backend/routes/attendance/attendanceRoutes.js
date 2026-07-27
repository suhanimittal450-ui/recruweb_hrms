const express = require("express");
const router = express.Router();
const authorize = require("../../middlewares/authorize");

const attendanceController = require("../../controllers/attendance/attendanceController");
const authMiddleware = require("../../middlewares/authMiddleware");
const activityLogger = require("../../middlewares/activityLogger");

// ========================================
// Attendance Actions
// ========================================

// Clock In
activityLogger({
  entityType: "ATTENDANCE",
  action: "CHECK_IN",
  title: "Attendance Marked",
});
router.post("/clock-in", authMiddleware, attendanceController.clockIn);

// Break Start
router.post("/break-in", authMiddleware, attendanceController.breakIn);

// Break End
router.post("/break-out", authMiddleware, attendanceController.breakOut);

// Clock Out
router.post("/clock-out", authMiddleware, attendanceController.clockOut);

// ========================================
// Employee Routes
// ========================================

// My Attendance History
router.get("/my-attendance", authMiddleware, attendanceController.myAttendance);

// Monthly Report
router.get(
  "/monthly-report",
  authMiddleware,
  attendanceController.monthlyReport,
);

// Employee Dashboard
router.get(
  "/dashboard/employee",
  authMiddleware,
  attendanceController.employeeDashboard,
);

// Attendance Calendar
router.get(
  "/attendance-calendar",
  authMiddleware,
  attendanceController.attendanceCalendar,
);

// ========================================
// HR / Admin Routes
// ========================================

// HR Dashboard
router.get("/dashboard/hr", authMiddleware, attendanceController.hrDashboard);

// Team Attendance Summary
router.get("/team-summary", authMiddleware, attendanceController.teamSummary);

// Attendance Analytics
router.get(
  "/analytics",
  authMiddleware,
  attendanceController.attendanceAnalytics,
);

// Late Employees Report
router.get("/late-report", authMiddleware, attendanceController.lateReport);

// Absent Employees Report
router.get("/absent-report", authMiddleware, attendanceController.absentReport);

module.exports = router;
