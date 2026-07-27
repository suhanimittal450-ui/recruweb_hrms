const express = require("express");
const router = express.Router();

const assetDashboardController = require("../../controllers/assets/assetDashboardController");

const authMiddleware = require("../../middlewares/authMiddleware");
const authorize = require("../../middlewares/authorize");

// ===========================================
// Dashboard Overview
// ===========================================
router.get(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  assetDashboardController.dashboard,
);

// ===========================================
// KPI Cards
// ===========================================
router.get(
  "/kpis",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  assetDashboardController.kpis,
);

// ===========================================
// Financial Summary
// ===========================================
router.get(
  "/financial",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "ACCOUNTANT"),
  assetDashboardController.financialSummary,
);

// ===========================================
// Assignment Analytics
// ===========================================
router.get(
  "/assignments",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetDashboardController.assignmentChart,
);

// ===========================================
// Maintenance Analytics
// ===========================================
router.get(
  "/maintenance",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "MANAGER"),
  assetDashboardController.maintenanceChart,
);

// ===========================================
// Warranty Expiry
// ===========================================
router.get(
  "/warranty",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  assetDashboardController.warrantyWidget,
);

// ===========================================
// Recent Assets
// ===========================================
router.get(
  "/recent",
  authMiddleware,
  authorize("SUPER_ADMIN", "ADMIN", "HR", "ACCOUNTANT", "MANAGER"),
  assetDashboardController.recentAssets,
);

module.exports = router;
