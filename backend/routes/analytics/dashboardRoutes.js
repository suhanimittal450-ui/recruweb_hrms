const express = require("express");
const router = express.Router();

const dashboardController = require("../../controllers/analytics/dashboardController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");
const { dashboardValidator } = require("../../validators/dashboardValidator");
// Optional (agar project me hai)
const validate = require("../../middlewares/validate");

// Optional (agar validator banaya hai)

// ======================================================
// Dashboard Home
// ======================================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  dashboardValidator,
  validate,
  dashboardController.dashboard,
);

// ======================================================
// Overview
// ======================================================
router.get(
  "/overview",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  dashboardValidator,
  validate,
  dashboardController.overview,
);

// ======================================================
// KPI Cards
// ======================================================
router.get(
  "/kpis",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  dashboardValidator,
  validate,
  dashboardController.kpis,
);

// ======================================================
// Employee Analytics
// ======================================================
router.get(
  "/employees",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  dashboardValidator,
  validate,
  dashboardController.employees,
);

// ======================================================
// Candidate Analytics
// ======================================================
router.get(
  "/candidates",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  dashboardValidator,
  validate,
  dashboardController.candidates,
);

// ======================================================
// Asset Analytics
// ======================================================
router.get(
  "/assets",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT"),
  dashboardValidator,
  validate,
  dashboardController.assets,
);

// ======================================================
// Attendance Analytics
// ======================================================
router.get(
  "/attendance",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  dashboardValidator,
  validate,
  dashboardController.attendance,
);

// ======================================================
// Leave Analytics
// ======================================================
router.get(
  "/leaves",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  dashboardValidator,
  validate,
  dashboardController.leaves,
);

// ======================================================
// Payroll Analytics
// ======================================================
router.get(
  "/payroll",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "ACCOUNTANT"),
  dashboardValidator,
  validate,
  dashboardController.payroll,
);

// ======================================================
// Department Analytics
// ======================================================
router.get(
  "/departments",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  dashboardValidator,
  validate,
  dashboardController.departments,
);

// ======================================================
// Monthly Growth
// ======================================================
router.get(
  "/growth/monthly",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  dashboardValidator,
  validate,
  dashboardController.monthlyGrowth,
);

// ======================================================
// Yearly Growth
// ======================================================
router.get(
  "/growth/yearly",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  dashboardValidator,
  validate,
  dashboardController.yearlyGrowth,
);

// ======================================================
// Recent Activities
// ======================================================
router.get(
  "/recent",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR"),
  dashboardValidator,
  validate,
  dashboardController.recent,
);

// ======================================================
// Summary
// ======================================================
router.get(
  "/summary",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  dashboardValidator,
  validate,
  dashboardController.summary,
);

// ======================================================
// Live Counters
// ======================================================
router.get(
  "/counters",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN"),
  dashboardValidator,
  validate,
  dashboardController.counters,
);

module.exports = router;
